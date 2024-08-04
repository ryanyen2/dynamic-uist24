'use client';
import React, { useState } from 'react';
import { PdfEditor } from './pdf/PdfEditor'
import { Pdf, PdfPicker } from './pdf/PdfPicker'

const Topic: React.FC = () => {
    // const [state, setState] = useState<State>({ phase: 'pick' })
    // const renderContent = () => {
    //     switch (state.phase) {
    //         case 'pick':
    //             return (
    //                 <div className="PdfEditor">
    //                     <PdfPicker onOpenPdf={(pdf) => setState({ phase: 'edit', pdf })} />
    //                 </div>
    //             );
    //         case 'edit':
    //             return (

    //             );
    //         default:
    //             return null;
    //     }
    // };

    return (
        <section className="py-8 mt-16 pt-16">
            <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-4">
                <div className="flex-1 pr-4">
                    <h2 className="text-blue-500 text-2xl font-bold">Topic</h2>
                    <p className="text-gray-600 mt-2 text-justify">
                        This workshop aims to provide a forum for discussion, brainstorming, and prototyping of the next generation of interfaces that leverage the dynamic experiences enabled by recent advances in AI and the generative capabilities of foundation models. These models simplify complex tasks by generating outputs in various representations (e.g., text, images, videos) through natural language interactions and diverse input modalities like voice and sketch. They interpret user intent, generate, and transform representations, potentially changing how we interact with information and express ideas.
                        Inspired by this potential, technologists, theorists, and researchers are exploring new forms of interaction by building demos and communities dedicated to concretizing and advancing this vision.
                        Our workshop at UIST provides a timely space to discuss AI&apos;s impact on designing and using cognitive tools (e.g., languages, notations, diagrams) dynamically. We will explore use cases, implications across various domains, and the associated challenges and opportunities.
                    </p>
                </div>
                <div className="md:flex-1">
                    <div className="PdfEditor cursor-crosshair">
                        <PdfEditor />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Topic;