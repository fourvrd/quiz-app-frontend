import { createFileRoute } from "@tanstack/react-router";
import { MenuButton } from "@/components/MenuButton";
import { useQuizCategoriesQuery } from "@/hooks/useQuizCategoriesQuery";
import { useState } from "react";
import { QuizSetupModal } from "@/components/QuizSetupModal";

interface QuizSettings {
  quizCategory: string | null;
  quizLevel: string | null;
  quizLength: number | null;
}

export const Route = createFileRoute("/")({
  component: QuizMenu,
});

function QuizMenu() {
  const [quizSettings, setQuizSettings] = useState<QuizSettings>({
    quizCategory: null,
    quizLevel: null,
    quizLength: null,
  });

  const { data: categories = [] } = useQuizCategoriesQuery();

  const handleCategorySelect = (quizCategory: string): void =>
    setQuizSettings((prev) => ({ ...prev, quizCategory }));

  return (
    <div className="grid grid-cols-2 px-[6rem] pt-[6rem] gap-[6rem]">
      {categories.map((category: string) => (
        <MenuButton
          key={category}
          text={category.charAt(0).toUpperCase() + category.slice(1)}
          onClick={() => handleCategorySelect(category)}
          selected={quizSettings.quizCategory === category}
        />
      ))}
      {quizSettings.quizCategory && (
        <QuizSetupModal
          quizSettings={quizSettings}
          setQuizSettings={setQuizSettings}
        />
      )}
    </div>
  );
}
