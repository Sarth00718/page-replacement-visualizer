
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import PageReplacementVisualizer from "@/components/PageReplacementVisualizer";
import AlgorithmInfo from "@/components/AlgorithmInfo";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-slate-100">
      <header className="border-b border-blue-100 bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-800">Page Replacement Algorithm Simulator</h1>
          <p className="text-slate-600 mt-2">Visualize how operating systems manage memory with different page replacement strategies</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-10">
          <Card className="bg-white shadow-md">
            <CardHeader>
              <CardTitle className="text-2xl text-blue-800">About This Project</CardTitle>
              <CardDescription>Understanding Memory Management in Operating Systems</CardDescription>
            </CardHeader>
            <CardContent className="text-left">
              <p className="mb-4">
                Page replacement algorithms are crucial components of operating systems' memory management. 
                They determine which memory pages to keep in RAM and which to swap out when memory is full.
              </p>
              <p className="mb-4">
                This simulator allows you to visualize how different page replacement algorithms work, 
                helping you understand their efficiency and behavior under various scenarios.
              </p>
              <p>
                A <span className="font-semibold">page fault</span> occurs when a program requests a page that is not currently in physical memory, 
                requiring the operating system to retrieve it from secondary storage. Efficient page replacement 
                algorithms minimize the number of page faults, improving system performance.
              </p>
            </CardContent>
          </Card>
        </div>
        
        <ResizablePanelGroup 
          direction="horizontal" 
          className="min-h-[600px] rounded-lg border"
        >
          <ResizablePanel defaultSize={70} minSize={40}>
            <div className="h-full p-4 bg-white">
              <PageReplacementVisualizer />
            </div>
          </ResizablePanel>
          
          <ResizableHandle withHandle />
          
          <ResizablePanel defaultSize={30} minSize={20}>
            <div className="h-full p-4 bg-blue-50">
              <AlgorithmInfo />
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </main>

      <footer className="bg-blue-800 text-white py-6 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p>Page Replacement Algorithm Simulator </p>
          <p className="text-blue-200 mt-2 text-sm">Presented By : 23BCE194 AND 23BE195</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
