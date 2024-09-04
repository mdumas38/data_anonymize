"use client";

import { useState } from "react";
import { AnimatedText } from "../../../../../../web/src/components/animated-text";
import { Button } from "@v1/ui/button";
import { Textarea } from "../../../../../../../packages/ui/src/components/textarea";
import { useToast } from "../../../../../../../packages/ui/src/components/use-toast";

export default function Page() {
  const { addToast } = useToast();
  const [inputData, setInputData] = useState("");
  const [anonymizedData, setAnonymizedData] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAnonymize = async () => {
    console.log("Starting anonymization process");
    setIsLoading(true);
    try {
      // Attempt to parse the input as JSON
      let dataToAnonymize;
      try {
        dataToAnonymize = JSON.parse(inputData);
        console.log("Successfully parsed input as JSON:", dataToAnonymize);
      } catch {
        // If parsing fails, treat it as a plain string
        dataToAnonymize = inputData;
        console.log("Failed to parse as JSON, treating as plain string:", dataToAnonymize);
      }

      console.log("Sending request to anonymize data");
      const response = await fetch("/api/anonymize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: dataToAnonymize }),
      });
      
      if (!response.ok) {
        console.error("Anonymization request failed:", response.status, response.statusText);
        throw new Error("Anonymization failed");
      }
      
      const result = await response.json();
      console.log("Received anonymized data:", result);
      setAnonymizedData(JSON.stringify(result.anonymizedData, null, 2));
      addToast({
        title: "Success",
        description: "Your data has been anonymized.",
      });
    } catch (error) {
      console.error("Anonymization error:", error);
      addToast({
        title: "Error",
        description: "Failed to anonymize data. Please ensure your input is valid JSON or a string.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      console.log("Anonymization process completed");
    }
  };

  return (
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
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
            console.log("Input data changed:", e.target.value);
            setInputData(e.target.value);
          }}
          rows={10}
          className="w-full"
        />

        <div className="flex space-x-4">
          <Button 
            onClick={handleAnonymize} 
            disabled={!inputData || isLoading}
            className="flex-1"
          >
            {isLoading ? "Anonymizing..." : "Anonymize Data"}
          </Button>

          <Button variant="outline" className="flex-1" disabled>
            Pending
          </Button>
        </div>

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
  );
}
