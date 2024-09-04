"use client";

import { useState } from "react";
import { AnimatedText } from "../../../../../../web/src/components/animated-text";
import { Button } from "@v1/ui/button";
import { Textarea } from "../../../../../../../packages/ui/src/components/textarea";
import { useToast } from "../../../../../../../packages/ui/src/components/use-toast";

export default function Page() {
  const { addToast } = useToast();
  const [crawledData, setCrawledData] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorLog, setErrorLog] = useState("");

  const handleCrawl = async () => {
    setIsLoading(true);
    setErrorLog("");
    try {
      const response = await fetch("/api/crawl", {
        method: "GET",
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Crawling failed: ${response.status} ${response.statusText}`);
      }
      
      const result = await response.json();
      setCrawledData(result.data);
      addToast({
        title: "Success",
        description: "arXiv data has been crawled successfully.",
      });
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      const errorStack = error instanceof Error ? error.stack : '';
      setErrorLog(`Error: ${errorMessage}\n${errorStack}`);
      addToast({
        title: "Error",
        description: "Failed to crawl arXiv data. Check console for details.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4">
      <h1 className="font-departure text-4xl md:text-6xl text-center mb-8">
        <AnimatedText text="arXiv Web Scraper" />
      </h1>

      <p className="text-center max-w-2xl mb-8">
        Crawl the latest Computer Science AI papers from arXiv. This tool fetches recent papers and formats them for easy reading.
      </p>

      <div className="w-full max-w-2xl space-y-4">
        <Button 
          onClick={handleCrawl} 
          disabled={isLoading}
          className="w-full"
        >
          {isLoading ? "Crawling..." : "Crawl arXiv Data"}
        </Button>

        {crawledData && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-2">Crawled Data:</h2>
            <Textarea
              value={crawledData}
              readOnly
              rows={20}
              className="w-full"
            />
          </div>
        )}

        {errorLog && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-2 text-red-500">Error Log:</h2>
            <Textarea
              value={errorLog}
              readOnly
              rows={10}
              className="w-full text-red-500"
            />
          </div>
        )}
      </div>
    </div>
  );
}
