import React, { useEffect, useState } from "react";
import SetupExam from "components/exam/setup";
import Layout from "components/layout";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Logs, X } from "lucide-react";
import { useRouter } from "next/router";
import { Vocabulary } from "../listening/[...index]";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import QuizApi from "api-client/QuizApi";
import QuestionComponent from "components/exam/question";
import { toast } from "sonner";
import ResultBar from "components/exam/result/result bar";
import { AnimatePresence, motion } from "framer-motion";

export type Option = {
  vocabularyId: string;
  answer: string;
  correct: boolean;
};

export enum QuestionType {
  MULTIPLE_CHOICE_BASIC = "MULTIPLE_CHOICE_BASIC",
  SPEAK = "SPEAK",
  LISTEN = "LISTEN",
}

export type Question = {
  id: string;
  vocabulary: Vocabulary;
  options: Option[];
  userAnswerId: string;
  correct: boolean;
  answered: boolean;
  questionType: QuestionType;
};

const ExamView = () => {
  const [showOptions, setShowOptions] = useState<boolean>(true);
  const router = useRouter();
  const { index } = router.query;
  const topicId = Array.isArray(index) ? index[0] : index;
  const [questions, setQuestions] = useState<Question[]>();
  const [numberOfQuestions, setNumberOfQuestions] = useState<number>(20);
  const [numberOfQuestionsAnswered, setNumberOfQuestionsAnswered] =
    useState<number>(0);
  const [createdExamFirstTime, setCreatedExamFirstTime] =
    useState<boolean>(false);

  const [isOpenResult, setIsOpenResult] = useState<boolean>(false);
  const [submitAnswer, setSubmitAnswer] = useState<boolean>(false);
 

  const handleShowResult = () => {
    setIsOpenResult(!isOpenResult);
  };

  const handleShow = () => {
    if (createdExamFirstTime === false) {
      handleSubmit(numberOfQuestions);
      setCreatedExamFirstTime(true);
    }
    setShowOptions(!showOptions);
  };

  const handleClose = () => {
    router.back();
  };
  const handleSubmit = async (numberOfQuestions: number) => {
    if (numberOfQuestions < 1) {
      toast.error("Please enter a valid number of questions");
      return;
    }
    setNumberOfQuestions(numberOfQuestions);
    setShowOptions(false);

    try {
      const response = await QuizApi.generateQuizzes(
        topicId,
        numberOfQuestions
      );
      setQuestions(response.result);
      console.log(response.result);
    } catch (error) {
      toast.error("Error generating quiz:");
      console.error("Error generating quiz:");
    }
  };

  const handleSelectAnswer = (questionId: string, vocabularyId: string) => {
    setQuestions((prevQuestions = []) =>
      prevQuestions.map((question) => {
        if (question.id === questionId) {
          if (!question.answered)
            setNumberOfQuestionsAnswered(numberOfQuestionsAnswered + 1);

          if (question.userAnswerId === vocabularyId) {
            setNumberOfQuestionsAnswered(numberOfQuestionsAnswered - 1);
            return {
              ...question,
              userAnswerId: "",
              answered: false,
            };
          }

          return {
            ...question,
            userAnswerId: vocabularyId,
            answered: true,
          };
        }
        return question;
      })
    );
  };

  const submitExam = async () => {
    setSubmitAnswer(true);

    try {
      setQuestions((prevQuestions = []) => {
        const updatedQuestions = prevQuestions.map((question) => {
          if (
            question.answered === true &&
            question.userAnswerId === question.vocabulary.id
          ) {
            
            return {
              ...question,
              correct: true,
            };
          }
          return question;
        });
        QuizApi.submitQuizzes(updatedQuestions);
        return updatedQuestions;
      });
      window.scrollTo(0, 0);
    } catch (error) {
      toast.error("Error submitting exam");
      console.log(error);
    }
  };

  return (
    <div className="flex ">
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-2 bg-white border-b">
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
          <Progress
            value={(numberOfQuestionsAnswered / numberOfQuestions) * 100}
            className="w-40 [&>*]:bg-gradient-to-r from-red-500 to-orange-400"
          />
          <span className="text-sm text-gray-500">
            {numberOfQuestionsAnswered} / {numberOfQuestions}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          {submitAnswer === false ? (
            <Button onClick={handleShow} variant="outline" size="sm">
              Options
            </Button>
          ) : null}
          <Button variant="ghost" size="icon" className="text-gray-500">
            <X className="h-6 w-6" onClick={handleClose} />
            <span className="sr-only" onClick={handleClose}>
              Close
            </span>
          </Button>
        </div>
      </nav>

      <AnimatePresence>
        {!isOpenResult ? (
          <div className="fixed top-[10%] left-[24px] right-0 w-fit hover:bg-gray-50 hover:cursor-pointer bg-white border-2 border-gray-200 p-2 rounded-full ">
            <Logs onClick={handleShowResult} className="text-gray-500" />
          </div>
        ) : (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="w-40 flex flex-col fixed top-[10%] left-[24px] z-50"
          >
            <ResultBar
              questions={questions || []}
              handleShow={handleShowResult}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex justify-center items-center flex-col container mx-auto py-20 px-14">
        {submitAnswer && (
          <div className="flex flex-col items-start justify-start">
            <div className="text-3xl font-bold">
              Try Your Best! Confident in yourself!
            </div>
            <div className="my-5 grid grid-cols-2 grid-rows-2 gap-x-8 font-medium text-xl gap-y-2">
              <span className="col-span-1 text-[#59E8B5]">Correct</span>
              <span className="col-span-1 text-[#59E8B5] bg-green-200 rounded-xl py-0.5 text-center">
                {questions?.filter((question) => question.correct).length || 0}
              </span>
              <span className="col-span-1 text-[#FF983A]">Wrong</span>
              <span className="col-span-1 text-[#FF983A] bg-orange-200 rounded-xl py-0.5 text-center">
                {questions?.filter((question) => !question.correct).length || 0}
              </span>
            </div>
          </div>
        )}

        <div className="flex flex-col space-y-4">
          {questions &&
            questions.map((question, index) => (
              <QuestionComponent
                handleSelectAnswer={handleSelectAnswer}
                key={index}
                index={index}
                question={question}
                numberOfQuestions={numberOfQuestions}
                submitAnswer={submitAnswer}
              />
            ))}
        </div>

        {showOptions ? (
          <div>
            <div className="w-screen h-screen z-[99] bg-gray-800 bg-opacity-50 absolute top-0 left-0"></div>
            <div className="z-[100] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <SetupExam handleSubmit={handleSubmit} handleClose={handleShow} />
            </div>
          </div>
        ) : null}
        {questions && !submitAnswer && (
          <div className="mt-20 flex flex-col justify-center items-center gap-5">
            <img className="w-40" src="/finish-exam.png" alt="" />
            <p className="text-center font-medium text-lg">
              You have completed the test. Please click the button below to
              submit your test!
            </p>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button className="bg-blue-400 hover:bg-blue-500 px-10 py-8">
                  Submit
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="font-medium h-52 top-1/4">
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Are you sure you want to submit the test?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    {numberOfQuestionsAnswered < numberOfQuestions && (
                      <p className="text-red-400">
                        You have not answered all the questions. Are you sure
                        you want to submit the test?
                      </p>
                    )}
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={submitExam}>
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExamView;
