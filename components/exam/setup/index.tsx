import React, { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { TextToSpeechRequest } from "api-client/textToSpeech";

const SetupExam = ({ handleSubmit, handleClose }: { handleSubmit: (numberOfQuestions: number) => void, handleClose: () => void }) => {
  const [questions, setQuestions] = useState(20);

  

  return (
    <div>
      <Card className=" w-[400px] z-[100]">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl font-bold">Set up your test</CardTitle>
          <X onClick={handleClose} className="h-4 w-4 cursor-pointer" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col space-y-2">
              <Label htmlFor="questions">Questions</Label>
              <input
                className="p-2 border-2 border-gray-300 rounded-md"
                id="questions"
                type="number"
                value={questions}
                onChange={(e) => setQuestions(Number(e.target.value))}
                min={1}
              />
            </div>
            <Button onClick={() => handleSubmit(questions)} className="w-full">Start test</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SetupExam;
