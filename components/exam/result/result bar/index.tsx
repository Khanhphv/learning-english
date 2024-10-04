import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, Menu, ChevronLeft } from "lucide-react";
import { Question } from "@/pages/exam/[index]";
import { Button } from "@/components/ui/button";
import styles from "./_.module.scss";
const ResultBar = ({
  questions,
  handleShow,
}: {
  questions: Question[];
  handleShow: () => void;
}) => {
  return (
    <>
      <Button
        variant="ghost"
        className="p-4 flex items-center justify-between w-full text-left border-b"
        onClick={handleShow}
      >
        <span className="text-lg font-semibold">Hide result</span>
        <ChevronLeft className="h-4 w-4 transition-transform" />
      </Button>

      <ul className={`p-4 space-y-1 overflow-auto overflow-y-auto max-h-[500px] ${styles["result-bar"]}`}>
        {questions &&
          questions.map((question, index) => (
            <li key={index} className="flex items-center space-x-2">
              {question.isCorrect  ? (
                <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
              ) : (
                <XCircle className="h-4 w-4 text-red-500 flex-shrink-0" />
              )}
              <span>{index + 1}</span>
            </li>
          ))}
      </ul>
    </>
  );
};

export default ResultBar;
