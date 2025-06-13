import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { CoreButton } from "@/components/CoreButton";
import { useQuizQuestionsQuery } from "@/hooks/useQuizQuestionsQuery";
import { useState } from "react";
import { useSubmitQuizAnswersMutation } from "@/hooks/useSubmitQuizAnswersMutation";
import classNames from "classnames";
import { XmarkIcon } from "@/components/XmarkIcon";
import { CheckMarkIcon } from "@/components/CheckMarkIcon";

export const Route = createFileRoute("/quiz")({
  component: QuizMain,
  validateSearch: (search: Record<string, unknown>) => ({
    category: search.category as string | undefined,
    questions: search.questions as string | undefined,
  }),
});

function QuizMain() {
  const navigate = useNavigate();
  const { category, questions } = Route.useSearch();
  const { data: unsortedData = [] } = useQuizQuestionsQuery({
    category: category || "matematyka",
    questions: Number(questions) || 10,
  });
  const data = [...unsortedData].sort((a, b) => a.id - b.id);
  const submitQuizMutation = useSubmitQuizAnswersMutation();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [quizResult, setQuizResult] = useState<null | {
    result: {
      correct: number[];
      wrong: number[];
    };
  }>(null);

  const currentQuestion = data[currentQuestionIndex] || {};
  const { id, content, options = [] } = currentQuestion;
  const isLastQuestion = currentQuestionIndex === data.length - 1;
  const isAnswerSelected = answers[id] !== undefined;

  const handleAnswerSelect = (index: number) => {
    setAnswers((prev) => ({ ...prev, [id]: index }));
  };

  const handleNextQuestion = async () => {
    if (!isLastQuestion) {
      setCurrentQuestionIndex((prev) => prev + 1);
      return null;
    }

    try {
      const answersArray = Object.entries(answers).map(
        ([questionId, selectedAnswerIndex]) => ({
          questionId: Number(questionId),
          selectedAnswerIndex,
        })
      );

      const response = await submitQuizMutation.mutateAsync({
        answers: answersArray,
      });
      setQuizResult(response);
      return response;
    } catch (error) {
      console.error("Error submitting quiz:", error);
      return null;
    }
  };

  const correctAnswers = quizResult?.result.correct.length || 0;
  const correctPercentage = Math.round((correctAnswers / data.length) * 100);

  return (
    <div className="flex place-content-center flex-1 overflow-auto h-[calc(100vh-3rem-79px-3rem)] mt-[3rem]">
      <div className="w-[90%] h-[90%] rounded-3xl overflow-hidden relative">
        <div className="bg-[url('@assets/fingerprints.png')] bg-cover bg-center w-full h-full absolute opacity-35"></div>
        <div className="bg-[#02715D] h-[20%] relative">
          <h1
            className={classNames(
              "flex items-center place-content-center text-white text-[2rem] h-full",
              { "text-[4rem]": quizResult }
            )}
          >
            {quizResult
              ? "Twój wynik:"
              : `${currentQuestionIndex + 1} / ${data.length} : ${content}`}
          </h1>
        </div>
        <div className="h-[55%] grid grid-cols-2 pt-[5rem] gap-[5rem] relative">
          {quizResult ? (
            <div className="flex items-center justify-center h-full col-span-2">
              <div className="w-full h-full border-r-[4px] border-white/50">
                <div className="text-white flex flex-col items-center place-content-center h-full">
                  <span className="text-[7.5rem] font-bold text-[#54E5CB]">
                    {correctPercentage}%
                  </span>
                  <div className="relative w-2/3 h-[1rem] bg-white rounded-full mb-[0.75rem]">
                    <div
                      className="absolute left-0 top-0 h-full bg-[#54E5CB] rounded-full"
                      style={{ width: `${correctPercentage}%` }}
                    />
                  </div>
                  <p className="mt-[1.5rem] text-[1.75rem] font-semibold">
                    Poprawnych odpowiedzi: {correctAnswers} z {data.length}
                  </p>
                </div>
              </div>

              <div className="w-full h-full flex flex-col items-center pt-[2rem]">
                <div className="grid grid-cols-2 w-fit gap-x-[10vw] gap-y-[1.5rem]">
                  {data.map((question, idx) => {
                    const isCorrect = quizResult?.result.correct.includes(
                      question.id
                    );
                    return (
                      <div
                        key={idx}
                        className="flex text-white text-[1.75rem] font-bold items-center gap-[0.75rem]"
                      >
                        <span>{idx + 1}</span>
                        <span
                          className={classNames(
                            "w-[2rem] h-[2rem] flex items-center justify-center rounded-full",
                            {
                              "text-green-500": isCorrect,
                              "text-red-500": !isCorrect,
                            }
                          )}
                        >
                          {isCorrect ? (
                            <CheckMarkIcon height={20} />
                          ) : (
                            <XmarkIcon thickness={4} />
                          )}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            <div className="col-span-2 grid grid-cols-2 gap-[5rem] px-[5rem]">
              {options.map((option: string, index: number) => (
                <CoreButton
                  key={index}
                  className="w-[100%] h-[100%]"
                  text={option}
                  selected={answers[id] === index}
                  onClick={() => handleAnswerSelect(index)}
                />
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-center items-center h-[25%] relative">
          {!quizResult ? (
            <CoreButton
              className="w-[20%]"
              text={isLastQuestion ? "ZAKOŃCZ" : "DALEJ"}
              variant="submit"
              onClick={handleNextQuestion}
              disabled={!isAnswerSelected}
            />
          ) : (
            <div className="flex gap-[6rem] w-[60%]">
              <CoreButton
                className="w-1/2"
                text="RESTART"
                onClick={() => {
                  setCurrentQuestionIndex(0);
                  setAnswers({});
                  setQuizResult(null);
                }}
              />
              <CoreButton
                className="w-1/2"
                text="POWRÓT DO MENU"
                onClick={() => {
                  navigate({ to: "/" });
                }}
                variant="submit"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
