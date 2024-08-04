'use client';

import React, { useContext, createContext, useState } from 'react';
import { FaRegComments, FaEnvelope } from 'react-icons/fa';
import {
  Tldraw,
  TLUiComponents,
  DefaultMenuPanel, DefaultToolbar, DefaultMinimap, DefaultNavigationPanel,
  Editor,
  useValue,
  DefaultStylePanel,
  TldrawUiIcon
} from 'tldraw';
import { useSyncDemo } from '@tldraw/sync';
import 'tldraw/tldraw.css'

import { TbPointer } from "react-icons/tb";
import { LuEraser, LuPencil } from "react-icons/lu";
import { IoText } from "react-icons/io5";



const components: Required<TLUiComponents> = {
  ContextMenu: null,
  ActionsMenu: null,
  HelpMenu: null,
  ZoomMenu: null,
  MainMenu: null,
  Minimap: DefaultMinimap,
  StylePanel: DefaultStylePanel,
  PageMenu: null,
  NavigationPanel: DefaultNavigationPanel,
  // Toolbar: DefaultToolbar,
  Toolbar: null,
  KeyboardShortcutsDialog: null,
  QuickActions: null,
  HelperButtons: null,
  DebugPanel: null,
  DebugMenu: null,
  SharePanel: null,
  MenuPanel: DefaultMenuPanel,
  TopPanel: null,
  CursorChatBubble: null,
}
const editorContext = createContext({} as { editor: Editor })

const Banner: React.FC = () => {
  const store = useSyncDemo({ roomId: 'uuid-uist24-workshop-dynamic-abstraction' });
  const [editor, setEditor] = useState<Editor | null>(null)

  return (
    <div className='mt-8 flex flex-col justify-center items-center relative' style={{ height: '52vh', minHeight: '72vh' }}>
      <div className="absolute top-0 left-0 right-0 bottom-0">
        <Tldraw store={store} components={components} onMount={(editor) => setEditor(editor)} />
        {editor && (
          <editorContext.Provider value={{ editor }}>
            <ExternalToolbar />
          </editorContext.Provider>
        )}
      </div>
      <div className="relative p-6 w-full max-w-4xl mx-auto" style={{ maxWidth: '50%', minWidth: '300px' }}>
        <div className="relative px-4 py-6 shadow-lg rounded-lg text-center waveGradient" style={{ backgroundColor: 'rgb(248, 243, 232)' }}>
          <h1 className="text-blue-500 text-4xl font-bold">Dynamic Abstractions</h1>
          {/* add small image */}
          <img src="/banner.png" alt="UIST 2024" className="w-full h-24 mx-auto" />
          <p className=" font-semibold text-2xl">
            Building the Next Generation of Cognitive Tools and Interfaces
          </p>
          <hr className="my-4 w-1/3 border-gray-300 mx-auto" />
          <p>UIST&apos;24 Workshop @ Pittsburgh, USA</p>
          <p>Oct. 13 - Oct. 16, 2024</p>

          {/* <div className="flex justify-center mt-4 space-x-4">
            <FaRegComments className="text-2xl cursor-pointer" />
            <FaEnvelope className="text-2xl cursor-pointer" />
          </div> */}
        </div>
      </div>
    </div>
  );
};

const ExternalToolbar = () => {
  const { editor } = useContext(editorContext)

  const currentToolId = useValue('current tool id', () => editor?.getCurrentToolId(), [editor])

  return (
    <div>
      <div className="external-toolbar">
        <button
          className="external-button"
          data-isactive={currentToolId === 'select'}
          onClick={() => editor.setCurrentTool('select')}
        >
          <TbPointer />
        </button>
        <button
          className="external-button"
          data-isactive={currentToolId === 'draw'}
          onClick={() => { console.log('draw', editor); editor.setCurrentTool('draw') }}
        >
          <LuPencil />
        </button>
        <button
          className="external-button"
          data-isactive={currentToolId === 'eraser'}
          onClick={() => { console.log('eraser', editor); editor.setCurrentTool('eraser') }}
        >
          <LuEraser />
        </button>
        <button
          className="external-button"
          data-isactive={currentToolId === 'text'}
          onClick={() => { console.log('text', editor); editor.setCurrentTool('text') }}
        >
          <IoText />
        </button>
      </div>
    </div>
  )
}

export default Banner;