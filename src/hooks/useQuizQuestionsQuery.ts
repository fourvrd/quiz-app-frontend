import { useQuery } from "@tanstack/react-query";

interface QuizQuestionsQueryParams {
  category?: string;
  questions?: number;
}

export const useQuizQuestionsQuery = (params?: QuizQuestionsQueryParams) =>
  useQuery({
    queryKey: ["quiz", "category", params?.category, params?.questions],
    queryFn: async () => {
      const url = new URL("http://localhost:8080/api/quiz/category");
      if (params?.category) {
        url.searchParams.append("category", params.category);
      }
      if (params?.questions) {
        url.searchParams.append("questions", params.questions.toString());
      }
      const response = await fetch(url.toString());
      if (!response.ok) {
        throw new Error("Failed to fetch quiz questions");
      }
      return response.json();
    },
  });
