
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import FrameDisplay from "./FrameDisplay";
import StepControls from "./StepControls";
import { fifo, lru, optimal } from "@/utils/pageReplacementAlgorithms";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Algorithm = "fifo" | "lru" | "optimal";

const PageReplacementVisualizer = () => {
  // Form states
  const [frameCount, setFrameCount] = useState<number>(3);
  const [referenceString, setReferenceString] = useState<string>("1,2,3,4,1,2,5,1,2,3,4,5");
  const [algorithm, setAlgorithm] = useState<Algorithm>("fifo");
  
  // Simulation states
  const [pages, setPages] = useState<number[]>([]);
  const [frames, setFrames] = useState<(number | null)[][]>([]);
  const [pageFaults, setPageFaults] = useState<number>(0);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isSimulationRunning, setIsSimulationRunning] = useState<boolean>(false);
  const [faultPositions, setFaultPositions] = useState<boolean[]>([]);
  
  // Parse reference string into pages array
  const parseReferenceString = (input: string): number[] => {
    try {
      return input.split(',').map(s => {
        const num = parseInt(s.trim());
        if (isNaN(num)) throw new Error(`Invalid number: ${s}`);
        return num;
      });
    } catch (error) {
      toast.error("Please enter valid comma-separated numbers for the reference string");
      return [];
    }
  };
  
  // Run simulation with selected algorithm
  const runSimulation = () => {
    const numFrames = Math.max(1, Math.min(10, frameCount));
    const parsedPages = parseReferenceString(referenceString);
    
    if (parsedPages.length === 0) return;
    
    setPages(parsedPages);
    
    let result;
    switch (algorithm) {
      case "fifo":
        result = fifo(parsedPages, numFrames);
        break;
      case "lru":
        result = lru(parsedPages, numFrames);
        break;
      case "optimal":
        result = optimal(parsedPages, numFrames);
        break;
      default:
        result = { frames: [], faults: 0, faultPositions: [] };
    }
    
    setFrames(result.frames);
    setPageFaults(result.faults);
    setFaultPositions(result.faultPositions);
    setCurrentStep(0);
    setIsSimulationRunning(true);
    
    toast.success(`Simulation started! Algorithm: ${algorithm.toUpperCase()}`);
  };
  
  // Reset simulation
  const resetSimulation = () => {
    setIsSimulationRunning(false);
    setCurrentStep(0);
    setFrames([]);
    setPageFaults(0);
    setFaultPositions([]);
  };
  
  // Handle input changes
  const handleFrameCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0 && value <= 10) {
      setFrameCount(value);
    }
  };

  // Sample reference strings
  const sampleStrings = {
    simple: "1,2,3,4,1,2,5,1,2,3,4,5",
    medium: "7,0,1,2,0,3,0,4,2,3,0,3,2,1,2,0,1,7,0,1",
    complex: "3,4,5,6,3,4,7,3,4,5,6,7,8,1,2,3,4,5"
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="config" className="w-full">
        <TabsList className="grid grid-cols-2 mb-4">
          <TabsTrigger value="config">Configuration</TabsTrigger>
          <TabsTrigger value="examples">Example Sequences</TabsTrigger>
        </TabsList>
        
        <TabsContent value="config" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="frameCount" className="text-blue-800">Frame Count (1-10)</Label>
              <Input
                id="frameCount"
                type="number"
                min="1"
                max="10"
                value={frameCount}
                onChange={handleFrameCountChange}
                className="mt-1"
              />
            </div>
            
            <div className="lg:col-span-2">
              <Label htmlFor="referenceString" className="text-blue-800">Reference String (comma separated)</Label>
              <Input
                id="referenceString"
                value={referenceString}
                onChange={(e) => setReferenceString(e.target.value)}
                placeholder="1,2,3,4,5"
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="algorithm" className="text-blue-800">Algorithm</Label>
              <Select value={algorithm} onValueChange={(value) => setAlgorithm(value as Algorithm)}>
                <SelectTrigger id="algorithm" className="mt-1">
                  <SelectValue placeholder="Select algorithm" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fifo">FIFO</SelectItem>
                  <SelectItem value="lru">LRU</SelectItem>
                  <SelectItem value="optimal">Optimal</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="examples">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setReferenceString(sampleStrings.simple)}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Simple Sequence</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-slate-600 break-words">{sampleStrings.simple}</p>
              </CardContent>
            </Card>
            
            <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setReferenceString(sampleStrings.medium)}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Medium Sequence</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-slate-600 break-words">{sampleStrings.medium}</p>
              </CardContent>
            </Card>
            
            <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setReferenceString(sampleStrings.complex)}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Complex Sequence</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-slate-600 break-words">{sampleStrings.complex}</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="flex justify-center space-x-4">
        <Button onClick={runSimulation} className="bg-blue-600 hover:bg-blue-700">
          Run Simulation
        </Button>
        <Button onClick={resetSimulation} variant="outline">
          Reset
        </Button>
      </div>
      
      {/* Visualization Area */}
      {isSimulationRunning && (
        <div className="mt-6">
          <Card className="bg-blue-50 border-blue-200 mb-6">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h3 className="font-semibold text-lg text-blue-800">Results</h3>
                  <p className="text-slate-600">
                    Total Page Faults: <span className="font-bold">{pageFaults}</span> out of {pages.length} references
                    ({((pageFaults / pages.length) * 100).toFixed(1)}%)
                  </p>
                </div>
                
                <StepControls 
                  currentStep={currentStep}
                  setCurrentStep={setCurrentStep}
                  maxSteps={frames.length - 1}
                />
              </div>
            </CardContent>
          </Card>
          
          <div className="overflow-x-auto border rounded-lg bg-white shadow-sm">
            <FrameDisplay 
              pages={pages}
              frames={frames}
              currentStep={currentStep}
              faultPositions={faultPositions}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PageReplacementVisualizer;
