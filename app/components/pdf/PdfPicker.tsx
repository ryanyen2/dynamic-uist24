import { useState, useEffect } from 'react'
import { AssetRecordType, Box, TLAssetId, TLShapeId, createShapeId } from 'tldraw'
// import tldrawPdf from '../../assets/public/uist24_dynamic_abstraction_workshop.pdf'

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

const pageSpacing = 32

export function PdfPicker({ onOpenPdf }: { onOpenPdf: (pdf: Pdf) => void }) {
	const [isLoading, setIsLoading] = useState(false)

	async function loadPdf(name: string, source: ArrayBuffer): Promise<Pdf> {
		const PdfJS = await import('pdfjs-dist')
		PdfJS.GlobalWorkerOptions.workerSrc = new URL(
			'pdfjs-dist/build/pdf.worker.min.mjs',
			import.meta.url
		).toString()
		const pdf = await PdfJS.getDocument(source.slice(0)).promise
		const pages: PdfPage[] = []

		const canvas = window.document.createElement('canvas')
		const context = canvas.getContext('2d')
		if (!context) throw new Error('Failed to create canvas context')

		const visualScale = 1.5
		const scale = window.devicePixelRatio

		let top = 0
		let widest = 0
		for (let i = 1; i <= pdf.numPages; i++) {
			const page = await pdf.getPage(i)
			const viewport = page.getViewport({ scale: scale * visualScale })
			canvas.width = viewport.width
			canvas.height = viewport.height
			const renderContext = {
				canvasContext: context,
				viewport,
			}
			await page.render(renderContext).promise

			const width = viewport.width / scale
			const height = viewport.height / scale
			pages.push({
				src: canvas.toDataURL(),
				bounds: new Box(0, top, width, height),
				assetId: AssetRecordType.createId(),
				shapeId: createShapeId(),
			})
			top += height + pageSpacing
			widest = Math.max(widest, width)
		}
		canvas.width = 0
		canvas.height = 0

		for (const page of pages) {
			page.bounds.x = (widest - page.bounds.width) / 2
		}

		return {
			name,
			pages,
			source,
		}
	}

    async function fetchPdf() {
        setIsLoading(true)
        try {
			const result = await fetch('/uist24_dynamic_abstraction_workshop.pdf')
            console.log(result)
			const pdf = await loadPdf('uist24_dynamic_abstraction_workshop.pdf', await result.arrayBuffer())
			onOpenPdf(pdf)
		} finally {
			setIsLoading(false)
		}
    }

    useEffect(() => {
        fetchPdf()
    }, [])

	
    return <div className="PdfPicker">{isLoading? 'Loading':''} </div>

	// return (
	// 	<div className="PdfPicker">
	// 		{/* <button onClick={onClickOpenPdf}>Open PDF</button> */}
	// 		<button onClick={onClickUseExample}>Use an example</button>
	// 	</div>
	// )
}