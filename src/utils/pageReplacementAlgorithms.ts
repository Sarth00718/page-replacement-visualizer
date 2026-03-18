
// Types for algorithm results
interface AlgorithmResult {
  frames: (number | null)[][];  // Each step's frame state
  faults: number;               // Total page faults
  faultPositions: boolean[];    // Whether each step caused a page fault
}

// FIFO (First In, First Out) Algorithm
export const fifo = (pages: number[], frameCount: number): AlgorithmResult => {
  const frames: (number | null)[] = Array(frameCount).fill(null);
  const result: (number | null)[][] = [];
  const faultPositions: boolean[] = [];
  
  let faults = 0;
  let pointer = 0; // Points to the next position to replace (oldest page)
  
  for (let i = 0; i < pages.length; i++) {
    const currentPage = pages[i];
    
    // Check if page already exists in frames
    const pageExists = frames.indexOf(currentPage) !== -1;
    
    if (!pageExists) {
      // Page fault - need to replace a page
      frames[pointer] = currentPage;
      pointer = (pointer + 1) % frameCount;
      faults++;
      faultPositions.push(true);
    } else {
      // Page hit - no replacement needed
      faultPositions.push(false);
    }
    
    // Save the current state of frames for visualization
    result.push([...frames]);
  }
  
  return {
    frames: result,
    faults,
    faultPositions
  };
};

// LRU (Least Recently Used) Algorithm
export const lru = (pages: number[], frameCount: number): AlgorithmResult => {
  const frames: (number | null)[] = Array(frameCount).fill(null);
  const result: (number | null)[][] = [];
  const faultPositions: boolean[] = [];
  
  // Track last used time for each page in frames
  const lastUsed: Map<number, number> = new Map();
  
  let faults = 0;
  
  for (let i = 0; i < pages.length; i++) {
    const currentPage = pages[i];
    
    // Check if page already exists in frames
    const existingIndex = frames.indexOf(currentPage);
    const pageExists = existingIndex !== -1;
    
    if (!pageExists) {
      // Page fault - need to replace a page
      faults++;
      faultPositions.push(true);
      
      // Find if there's a free frame
      const nullIndex = frames.indexOf(null);
      
      if (nullIndex !== -1) {
        // There's a free frame
        frames[nullIndex] = currentPage;
      } else {
        // No free frame, find the least recently used
        let leastRecentIndex = 0;
        let leastRecentTime = Infinity;
        
        for (let j = 0; j < frameCount; j++) {
          const frameValue = frames[j];
          if (frameValue !== null) {
            const lastUsedTime = lastUsed.get(frameValue) || 0;
            if (lastUsedTime < leastRecentTime) {
              leastRecentTime = lastUsedTime;
              leastRecentIndex = j;
            }
          }
        }
        
        // Replace the least recently used frame
        frames[leastRecentIndex] = currentPage;
      }
    } else {
      // Page hit - update its last used time
      faultPositions.push(false);
    }
    
    // Update last used time for current page
    lastUsed.set(currentPage, i);
    
    // Save the current state of frames for visualization
    result.push([...frames]);
  }
  
  return {
    frames: result,
    faults,
    faultPositions
  };
};

// Optimal (MIN) Algorithm
export const optimal = (pages: number[], frameCount: number): AlgorithmResult => {
  const frames: (number | null)[] = Array(frameCount).fill(null);
  const result: (number | null)[][] = [];
  const faultPositions: boolean[] = [];
  
  let faults = 0;
  
  for (let i = 0; i < pages.length; i++) {
    const currentPage = pages[i];
    
    // Check if page already exists in frames
    const pageExists = frames.indexOf(currentPage) !== -1;
    
    if (!pageExists) {
      // Page fault - need to replace a page
      faults++;
      faultPositions.push(true);
      
      // Find if there's a free frame
      const nullIndex = frames.indexOf(null);
      
      if (nullIndex !== -1) {
        // There's a free frame
        frames[nullIndex] = currentPage;
      } else {
        // No free frame, find the optimal page to replace
        const nextUse: Map<number, number> = new Map();
        
        // For each page in frames, find when it will be used next
        for (let j = 0; j < frameCount; j++) {
          const frameValue = frames[j];
          if (frameValue !== null) {
            let found = false;
            
            // Look ahead in the reference string
            for (let k = i + 1; k < pages.length; k++) {
              if (pages[k] === frameValue) {
                nextUse.set(frameValue, k);
                found = true;
                break;
              }
            }
            
            // If not found in future, set to infinity (won't be used again)
            if (!found) {
              nextUse.set(frameValue, Infinity);
            }
          }
        }
        
        // Find the page that will not be used for the longest time
        let farthestUseIndex = -1;
        let farthestUseTime = -1;
        
        for (let j = 0; j < frameCount; j++) {
          const frameValue = frames[j];
          if (frameValue !== null) {
            const nextUseTime = nextUse.get(frameValue) || Infinity;
            if (nextUseTime > farthestUseTime) {
              farthestUseTime = nextUseTime;
              farthestUseIndex = j;
            }
          }
        }
        
        // Replace the optimal page
        frames[farthestUseIndex] = currentPage;
      }
    } else {
      // Page hit - no replacement needed
      faultPositions.push(false);
    }
    
    // Save the current state of frames for visualization
    result.push([...frames]);
  }
  
  return {
    frames: result,
    faults,
    faultPositions
  };
};
