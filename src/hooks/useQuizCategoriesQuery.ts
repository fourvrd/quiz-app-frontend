import { useQuery } from "@tanstack/react-query";

export const useQuizCategoriesQuery = () =>
  useQuery({
    queryKey: ["quiz", "categories"],
    queryFn: async () => {
      const response = await fetch("http://localhost:8080/api/quiz/categories");
      if (!response.ok) {
        throw new Error("Failed to fetch quiz categories");
      }
      return response.json();
    },
  });
