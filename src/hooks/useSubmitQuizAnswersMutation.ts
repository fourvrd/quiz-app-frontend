import { useMutation } from "@tanstack/react-query";

interface QuizAnswer {
  questionId: number;
  selectedAnswerIndex: number;
}

interface QuizSubmitRequest {
  answers: QuizAnswer[];
}

interface QuizResult {
  correct: number[];
  wrong: number[];
}

interface QuizSubmitResponse {
  result: QuizResult;
}

export const useSubmitQuizAnswersMutation = () => {
  return useMutation<QuizSubmitResponse, Error, QuizSubmitRequest>({
    mutationFn: async (data: QuizSubmitRequest) => {
      const response = await fetch("http://localhost:8080/api/quiz/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to submit quiz answers");
      }

      return response.json();
    },
  });
};
