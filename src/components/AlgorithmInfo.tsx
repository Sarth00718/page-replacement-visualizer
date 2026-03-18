
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AlgorithmInfo = () => {
  const [selectedTab, setSelectedTab] = useState("fifo");
  
  return (
    <Card className="bg-white shadow-md">
      <CardHeader className="border-b border-blue-100">
        <CardTitle className="text-2xl text-blue-800">Algorithm Explanations</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <Tabs defaultValue="fifo" value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="fifo">FIFO</TabsTrigger>
            <TabsTrigger value="lru">LRU</TabsTrigger>
            <TabsTrigger value="optimal">Optimal</TabsTrigger>
          </TabsList>
          
          <TabsContent value="fifo" className="space-y-4">
            <h3 className="font-bold text-lg text-blue-700">First In, First Out (FIFO)</h3>
            <p>
              FIFO replaces the page that has been in memory for the longest time. It operates like a queue, 
              where the oldest page is selected for replacement.
            </p>
            <div className="mt-4 p-4 bg-blue-50 rounded-md">
              <h4 className="font-semibold mb-2">Characteristics:</h4>
              <ul className="list-disc list-inside space-y-1">
                <li>Simple to implement and understand</li>
                <li>Does not require page usage history</li>
                <li>May suffer from "Belady's Anomaly" - more frames can lead to more page faults</li>
                <li>Doesn't consider how frequently or recently a page was accessed</li>
              </ul>
            </div>
          </TabsContent>
          
          <TabsContent value="lru" className="space-y-4">
            <h3 className="font-bold text-lg text-blue-700">Least Recently Used (LRU)</h3>
            <p>
              LRU replaces the page that has not been used for the longest period of time. It assumes that pages 
              that have been used recently will likely be used again soon.
            </p>
            <div className="mt-4 p-4 bg-blue-50 rounded-md">
              <h4 className="font-semibold mb-2">Characteristics:</h4>
              <ul className="list-disc list-inside space-y-1">
                <li>Based on the principle of locality of reference</li>
                <li>Usually performs better than FIFO in real-world scenarios</li>
                <li>Requires tracking when each page was last accessed</li>
                <li>More complex to implement in hardware than FIFO</li>
                <li>Immune to Belady's Anomaly</li>
              </ul>
            </div>
          </TabsContent>
          
          <TabsContent value="optimal" className="space-y-4">
            <h3 className="font-bold text-lg text-blue-700">Optimal (MIN)</h3>
            <p>
              The Optimal algorithm (also called MIN or OPT) replaces the page that will not be used for the longest 
              period of time in the future. This requires future knowledge of the reference string.
            </p>
            <div className="mt-4 p-4 bg-blue-50 rounded-md">
              <h4 className="font-semibold mb-2">Characteristics:</h4>
              <ul className="list-disc list-inside space-y-1">
                <li>Theoretically optimal - guarantees the minimum number of page faults</li>
                <li>Not implementable in real systems as it requires future knowledge</li>
                <li>Useful as a benchmark to compare other algorithms</li>
                <li>Immune to Belady's Anomaly</li>
              </ul>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AlgorithmInfo;
