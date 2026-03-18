
import { useEffect, useRef } from "react";

interface FrameDisplayProps {
  pages: number[];
  frames: (number | null)[][];
  currentStep: number;
  faultPositions: boolean[];
}

const FrameDisplay = ({ pages, frames, currentStep, faultPositions }: FrameDisplayProps) => {
  const tableRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Scroll to the current step when it changes
    if (tableRef.current) {
      const scrollElement = tableRef.current.querySelector(`#step-${currentStep}`);
      if (scrollElement) {
        scrollElement.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center"
        });
      }
    }
  }, [currentStep]);
  
  if (!frames.length) return null;
  
  const frameData = frames[currentStep];
  
  return (
    <div ref={tableRef} className="overflow-x-auto">
      <div className="min-w-full inline-block align-middle">
        <table className="min-w-full text-center">
          <thead>
            <tr>
              <th className="px-4 py-3 bg-blue-50 text-left text-sm font-semibold text-blue-900 border-b">
                Reference String
              </th>
              {pages.map((page, index) => (
                <th 
                  key={index} 
                  id={`step-${index}`}
                  className={`px-4 py-3 text-sm font-medium border-b ${
                    index === currentStep ? "bg-blue-100" : "bg-blue-50"
                  }`}
                >
                  {page}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {frameData.map((_, frameIndex) => (
              <tr key={frameIndex}>
                <td className="px-4 py-3 text-sm font-medium text-left border-r">
                  Frame {frameIndex + 1}
                </td>
                {frames.map((step, stepIndex) => {
                  const value = stepIndex <= currentStep ? step[frameIndex] : null;
                  const isHighlighted = stepIndex === currentStep && 
                                        faultPositions[stepIndex] && 
                                        step[frameIndex] === pages[stepIndex];
                  
                  return (
                    <td 
                      key={stepIndex}
                      className={`px-4 py-4 text-sm border ${
                        stepIndex === currentStep ? "bg-blue-50" : ""
                      } ${isHighlighted ? "bg-amber-100" : ""}`}
                    >
                      {value !== null ? value : ""}
                    </td>
                  );
                })}
              </tr>
            ))}
            <tr>
              <td className="px-4 py-3 text-sm font-medium text-left border-r bg-blue-50">
                Page Fault
              </td>
              {faultPositions.map((isFault, index) => (
                <td 
                  key={index}
                  className={`px-4 py-3 text-sm font-medium ${
                    index === currentStep ? "bg-blue-50" : ""
                  }`}
                >
                  {index <= currentStep && (
                    isFault ? 
                    <span className="text-red-500 font-bold">Yes</span> : 
                    <span className="text-green-500">No</span>
                  )}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FrameDisplay;
