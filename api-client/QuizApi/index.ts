import { Question } from "@/pages/exam/[index]";
import httpClient from "api-client/httpClient";


const QuizApi = {
    generateQuizzes: async (topicId: string | undefined, numberOfQuestions: number) => {
        return await httpClient.get(`/quizzes/random?topicId=${topicId}&numberOfQuestions=${numberOfQuestions}`);
    },
    submitQuizzes: async (quizQuestions : Question[] | undefined) => {
        return await httpClient.post("/quizzes/submit", quizQuestions);
    }
}

export default QuizApi;