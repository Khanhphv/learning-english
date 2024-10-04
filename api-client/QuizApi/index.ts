import httpClient from "api-client/httpClient";


const QuizApi = {
    generateQuizzes: async (topicId: string | undefined, numberOfQuestions: number) => {
        return await httpClient.get(`/quizzes/random?topicId=${topicId}&numberOfQuestions=${numberOfQuestions}`);
    },
}

export default QuizApi;