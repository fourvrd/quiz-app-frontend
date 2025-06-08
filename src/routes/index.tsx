import { createFileRoute } from "@tanstack/react-router";
import { MenuButton } from "@/components/MenuButton";
import { useQuizCategoriesQuery } from "@/hooks/useQuizCategoriesQuery";
import { useState } from "react";
import { QuizSetupModal } from "@/components/QuizSetupModal";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  const [quizSettings, setQuizSettings] = useState({
    quizCategory: null as string | null,
    quizLevel: null as string | null,
    quizLength: null as number | null,
  });

  const { data: categories = [] } = useQuizCategoriesQuery();

  const handleCategorySelect = (quizCategory: string) =>
    setQuizSettings((prev) => ({ ...prev, quizCategory }));

  return (
    <div className="grid grid-cols-2 px-[6rem] pt-[6rem] gap-[6rem]">
      {categories.map((category) => (
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
