import React, { useEffect, useMemo, useState } from 'react';
import {
    Box,
    SVGContainer,
    TLComponents,
    TLImageShape,
    TLShapePartial,
    Tldraw,
    getIndicesBetween,
    react,
    sortByIndex,
    track,
    useEditor,
    TLAssetId,
    TLShapeId,
    AssetRecordType,
    createShapeId
} from 'tldraw';
import { ExportPdfButton } from './ExportPdfButton';
import 'pdfjs-dist/build/pdf.worker.min.mjs';


export interface PdfPage {
    src: string
    bounds: Box
    assetId: TLAssetId
    shapeId: TLShapeId
}

export interface Pdf {
    name: string
    pages: PdfPage[]
    source: string | ArrayBuffer
}

export function PdfEditor() {
    const [isLoading, setIsLoading] = useState(false);
    const [pdf, setPdf] = useState<Pdf | null>(null);
    const pageSpacing = 32


    async function loadPdf(name: string, source: ArrayBuffer): Promise<Pdf> {
        const PdfJS = await import('pdfjs-dist');
        // PdfJS.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.min.mjs', import.meta.url).toString();
        const pdf = await PdfJS.getDocument(source.slice(0)).promise;
        const pages: PdfPage[] = [];

        const canvas = window.document.createElement('canvas');
        const context = canvas.getContext('2d');
        if (!context) throw new Error('Failed to create canvas context');

        const visualScale = 1.5;
        const scale = window.devicePixelRatio;

        let top = 0;
        let widest = 0;
        for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const viewport = page.getViewport({ scale: scale * visualScale });
            canvas.width = viewport.width;
            canvas.height = viewport.height;
            const renderContext = {
                canvasContext: context,
                viewport,
            };
            await page.render(renderContext).promise;

            const width = viewport.width / scale;
            const height = viewport.height / scale;
            pages.push({
                src: canvas.toDataURL(),
                bounds: new Box(0, top, width, height),
                assetId: AssetRecordType.createId(),
                shapeId: createShapeId(),
            });
            top += height + pageSpacing;
            widest = Math.max(widest, width);
        }
        canvas.width = 0;
        canvas.height = 0;

        for (const page of pages) {
            page.bounds.x = (widest - page.bounds.width) / 2;
        }

        return {
            name,
            pages,
            source,
        };
    }

    async function fetchPdf() {
        setIsLoading(true);
        try {
            const result = await fetch('/uist24_dynamic_abstraction_workshop.pdf');
            console.log(result);
            const pdf = await loadPdf('uist24_dynamic_abstraction_workshop.pdf', await result.arrayBuffer());
            setPdf(pdf);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchPdf();
    }, []);

    const components = useMemo<TLComponents>(
        () => ({
            PageMenu: null,
            InFrontOfTheCanvas: () => <PageOverlayScreen pdf={pdf as Pdf} />,
            SharePanel: () => <ExportPdfButton pdf={pdf as Pdf} />,
            ContextMenu: null,
            ActionsMenu: null,
            HelpMenu: null,
            ZoomMenu: null,
            MainMenu: null,
            Minimap: null,
            // StylePanel: null,
            NavigationPanel: null,
            // Toolbar: null,
            KeyboardShortcutsDialog: null,
            QuickActions: null,
            HelperButtons: null,
            DebugPanel: null,
            DebugMenu: null,
            MenuPanel: null,
            TopPanel: null,
            CursorChatBubble: null,
        }),
        [pdf]
    );

    if (!pdf) return <div>Loading...</div>;

    return (
        <Tldraw
            onMount={(editor) => {
                editor.updateInstanceState({ isDebugMode: false });
                editor.createAssets(
                    pdf.pages.map((page) => ({
                        id: page.assetId,
                        typeName: 'asset',
                        type: 'image',
                        meta: {},
                        props: {
                            w: page.bounds.w,
                            h: page.bounds.h,
                            mimeType: 'image/png',
                            src: page.src,
                            name: 'page',
                            isAnimated: false,
                        },
                    }))
                );
                editor.createShapes(
                    pdf.pages.map(
                        (page): TLShapePartial<TLImageShape> => ({
                            id: page.shapeId,
                            type: 'image',
                            x: page.bounds.x,
                            y: page.bounds.y,
                            isLocked: true,
                            props: {
                                assetId: page.assetId,
                                w: page.bounds.w,
                                h: page.bounds.h,
                            },
                        })
                    )
                );


                editor.setCurrentTool('highlight');

                const shapeIds = pdf.pages.map((page) => page.shapeId);
                const shapeIdSet = new Set(shapeIds);

                // Don't let the user unlock the pages
                editor.sideEffects.registerBeforeChangeHandler('shape', (prev, next) => {
                    if (!shapeIdSet.has(next.id)) return next;
                    if (next.isLocked) return next;
                    return { ...prev, isLocked: true };
                });

                // Make sure the shapes are below any of the other shapes
                function makeSureShapesAreAtBottom() {
                    const shapes = shapeIds.map((id) => editor.getShape(id)!).sort(sortByIndex);
                    const pageId = editor.getCurrentPageId();

                    const siblings = editor.getSortedChildIdsForParent(pageId);
                    const currentBottomShapes = siblings
                        .slice(0, shapes.length)
                        .map((id) => editor.getShape(id)!);

                    if (currentBottomShapes.every((shape, i) => shape.id === shapes[i].id)) return;

                    const otherSiblings = siblings.filter((id) => !shapeIdSet.has(id));
                    const bottomSibling = otherSiblings[0];
                    const lowestIndex = editor.getShape(bottomSibling)!.index;

                    const indexes = getIndicesBetween(undefined, lowestIndex, shapes.length);
                    editor.updateShapes(
                        shapes.map((shape, i) => ({
                            id: shape.id,
                            type: shape.type,
                            isLocked: shape.isLocked,
                            index: indexes[i],
                        }))
                    );
                }

                makeSureShapesAreAtBottom();
                editor.sideEffects.registerAfterCreateHandler('shape', makeSureShapesAreAtBottom);
                editor.sideEffects.registerAfterChangeHandler('shape', makeSureShapesAreAtBottom);

                // Constrain the camera to the bounds of the pages
                const targetBounds = pdf.pages.reduce(
                    (acc, page) => acc.union(page.bounds),
                    pdf.pages[0].bounds.clone()
                );

                function updateCameraBounds(isMobile: boolean) {
                    editor.setCameraOptions({
                        constraints: {
                            bounds: targetBounds,
                            padding: { x: isMobile ? 16 : 164, y: 64 },
                            origin: { x: 0.5, y: 0 },
                            initialZoom: 'fit-x-100',
                            baseZoom: 'default',
                            behavior: 'contain',
                        },
                    });
                    editor.setCamera(editor.getCamera(), { reset: true });
                }

                let isMobile = editor.getViewportScreenBounds().width < 840;

                react('update camera', () => {
                    const isMobileNow = editor.getViewportScreenBounds().width < 840;
                    if (isMobileNow === isMobile) return;
                    isMobile = isMobileNow;
                    updateCameraBounds(isMobile);
                });

                updateCameraBounds(isMobile);
            }}
            components={components}
        />
    );
}

const PageOverlayScreen = track(function PageOverlayScreen({ pdf }: { pdf: Pdf }) {
    const editor = useEditor();

    const viewportPageBounds = editor.getViewportPageBounds();
    const viewportScreenBounds = editor.getViewportScreenBounds();

    const relevantPageBounds = pdf.pages
        .map((page) => {
            if (!viewportPageBounds.collides(page.bounds)) return null;
            const topLeft = editor.pageToViewport(page.bounds);
            const bottomRight = editor.pageToViewport({ x: page.bounds.maxX, y: page.bounds.maxY });
            return new Box(topLeft.x, topLeft.y, bottomRight.x - topLeft.x, bottomRight.y - topLeft.y);
        })
        .filter((bounds): bounds is Box => bounds !== null);

    function pathForPageBounds(bounds: Box) {
        return `M ${bounds.x} ${bounds.y} L ${bounds.maxX} ${bounds.y} L ${bounds.maxX} ${bounds.maxY} L ${bounds.x} ${bounds.maxY} Z`;
    }

    const viewportPath = `M 0 0 L ${viewportScreenBounds.w} 0 L ${viewportScreenBounds.w} ${viewportScreenBounds.h} L 0 ${viewportScreenBounds.h} Z`;

    return (
        <>
            <SVGContainer className="PageOverlayScreen-screen">
                <path
                    d={`${viewportPath} ${relevantPageBounds.map(pathForPageBounds).join(' ')}`}
                    fillRule="evenodd"
                />
            </SVGContainer>
            {relevantPageBounds.map((bounds, i) => (
                <div
                    key={i}
                    className="PageOverlayScreen-outline"
                    style={{
                        width: bounds.w,
                        height: bounds.h,
                        transform: `translate(${bounds.x}px, ${bounds.y}px)`,
                    }}
                />
            ))}
        </>
    );
});
