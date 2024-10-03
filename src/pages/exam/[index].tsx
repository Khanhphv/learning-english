import React, { useEffect, useState } from "react";
import SetupExam from "components/exam/setup";
import Layout from "components/layout";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Menu, X } from "lucide-react";
import { useRouter } from "next/router";
import Question from "components/exam/question";
import { type } from "os";
import { Vocabulary } from "../listening/[...index]";
import { is } from "@react-spring/shared";

import { set } from "react-hook-form";
import QuizzesApi from "api-client/quizzesApi";
import axios from "axios";
import httpClient from "api-client/httpClient";

type Option = {
  vocabularyId: string,
  answer: string,
  isCorrect: boolean
}

type Question = {
  id: string;
  vocabulary : Vocabulary;
  options: Option[];
  userAnswerId: string;
  isCorrect: boolean;
  isAnswered: boolean;
  questionType: string;
}


const ExamView = () => {
  const [showOptions, setShowOptions] = useState<boolean>(true); 

  const router = useRouter();
  const { index } = router.query;
  const topicId = Array.isArray(index) ? index[0] : index;
  const [questions, setQuestions] = useState<Question[]>([]);
  const [numberOfQuestions, setNumberOfQuestions] = useState<number>(20); 

  const handleShow = () => {
    setShowOptions(!showOptions); 
  };

  
  const handleSubmit = async (numberOfQuestions: number) => {
    setNumberOfQuestions(numberOfQuestions);
    setShowOptions(false);


    try {
      const response = await httpClient.get(`/quizzes/random?topicId=${topicId}&numberOfQuestions=${numberOfQuestions}`);
      console.log(response);
      setQuestions(response.result); 
    } catch (error) {
      console.error("Error generating quiz:");
    }
  };

  return (
    <div className="flex justify-center items-center flex-col container h-full mx-auto px-14">
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-around px-4 py-2 bg-white border-b">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center">
              <svg
                className=" text-white"
                fill="none"
                height="24"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="m7 21-4.3-4.3c-1-1-1-2.5 0-3.4l9.6-9.6c1-1 2.5-1 3.4 0l5.6 5.6c1 1 1 2.5 0 3.4L13 21" />
                <path d="M22 21H7" />
                <path d="m5 11 9 9" />
              </svg>
            </div>
            <span className="font-semibold text-lg">Test</span>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Progress value={0} className="w-40" />
          <span className="text-sm text-gray-500">0 / 20</span>
        </div>
        <div className="flex items-center space-x-2">
          <Button onClick={handleShow} variant="outline" size="sm">
            Options
          </Button>
          <Button variant="ghost" size="icon" className="text-gray-500">
            <X className="h-6 w-6" />
            <span className="sr-only">Close</span>
          </Button>
        </div>
      </nav>


      <div>
        <Question/>

      </div>



      {showOptions ? (
        <div>
          <div className="w-screen h-screen z-[99] bg-gray-800 bg-opacity-50 absolute top-0 left-0"></div>
          <div className="z-[100] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <SetupExam handleSubmit={handleSubmit} handleClose={handleShow} />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ExamView;
