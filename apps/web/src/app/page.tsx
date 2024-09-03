"use client";

import { useState } from "react";
import { AnimatedText } from "@/components/animated-text";
import { Button } from "@v1/ui/button";
import { Textarea } from "../../../../packages/ui/src/components/textarea";
import { useToast, ToastProvider } from "../../../../packages/ui/src/components/use-toast";

export default function Page() {
  const { addToast } = useToast();
  const [inputData, setInputData] = useState("");
  const [anonymizedData, setAnonymizedData] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAnonymize = async () => {
    setIsLoading(true);
    try {
      // Replace this with your actual API call
      const response = await fetch("/api/anonymize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: inputData }),
      });
      
      if (!response.ok) throw new Error("Anonymization failed");
      
      const result = await response.json();
      setAnonymizedData(result.anonymizedData);
      addToast({
        title: "Success",
        description: "Your data has been anonymized.",
      });
    } catch (error) {
      console.error("Anonymization error:", error);
      addToast({
        title: "Error",
        description: "Failed to anonymize data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ToastProvider>
      <div className="min-h-screen w-full flex flex-col items-center justify-center p-4">
        <h1 className="font-departure text-4xl md:text-6xl text-center mb-8">
          <AnimatedText text="Data Anonymizer" />
        </h1>

        <p className="text-center max-w-2xl mb-8">
          Protect your sensitive data with our advanced anonymization tool. Simply paste your data below and let our AI-driven system anonymize it for you.
        </p>

        <div className="w-full max-w-2xl space-y-4">
          <Textarea
            placeholder="Paste your data here..."
            value={inputData}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setInputData(e.target.value)}
            rows={10}
            className="w-full"
          />

          <Button 
            onClick={handleAnonymize} 
            disabled={!inputData || isLoading}
            className="w-full"
          >
            {isLoading ? "Anonymizing..." : "Anonymize Data"}
          </Button>

          {anonymizedData && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-2">Anonymized Data:</h2>
              <Textarea
                value={anonymizedData}
                readOnly
                rows={10}
                className="w-full"
              />
            </div>
          )}
        </div>
      </div>
    </ToastProvider>
  );
}
