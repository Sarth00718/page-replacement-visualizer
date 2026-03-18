
import { Button } from "@/components/ui/button";
import { 
  ChevronFirst, 
  ChevronLast, 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause 
} from "lucide-react";
import { useState, useEffect } from "react";

interface StepControlsProps {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  maxSteps: number;
}

const StepControls = ({ currentStep, setCurrentStep, maxSteps }: StepControlsProps) => {
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setCurrentStep((prev) => {
          const nextStep = prev + 1;
          if (nextStep > maxSteps) {
            setIsAutoPlaying(false);
            return prev;
          }
          return nextStep;
        });
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [isAutoPlaying, maxSteps, setCurrentStep]);
  
  const goToFirst = () => setCurrentStep(0);
  const goToPrevious = () => setCurrentStep(Math.max(0, currentStep - 1));
  const goToNext = () => setCurrentStep(Math.min(maxSteps, currentStep + 1));
  const goToLast = () => setCurrentStep(maxSteps);
  
  const toggleAutoPlay = () => {
    if (isAutoPlaying) {
      setIsAutoPlaying(false);
    } else {
      if (currentStep >= maxSteps) {
        setCurrentStep(0);
      }
      setIsAutoPlaying(true);
    }
  };
  
  return (
    <div className="flex items-center space-x-2">
      <Button 
        variant="outline" 
        size="icon" 
        onClick={goToFirst}
        disabled={currentStep === 0}
      >
        <ChevronFirst className="h-4 w-4" />
      </Button>
      
      <Button 
        variant="outline" 
        size="icon" 
        onClick={goToPrevious}
        disabled={currentStep === 0}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      
      <Button variant="outline" size="icon" onClick={toggleAutoPlay}>
        {isAutoPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
      </Button>
      
      <Button 
        variant="outline" 
        size="icon" 
        onClick={goToNext}
        disabled={currentStep === maxSteps}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
      
      <Button 
        variant="outline" 
        size="icon" 
        onClick={goToLast}
        disabled={currentStep === maxSteps}
      >
        <ChevronLast className="h-4 w-4" />
      </Button>
      
      <span className="ml-2 text-sm text-slate-600">
        Step {currentStep + 1} of {maxSteps + 1}
      </span>
    </div>
  );
};

export default StepControls;
