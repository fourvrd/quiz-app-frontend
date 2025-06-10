import { CoreButton } from "./CoreButton";
import { XmarkIcon } from "./XmarkIcon";
import { useNavigate } from "@tanstack/react-router";

interface QuizSettings {
  quizCategory: string | null;
  quizLevel: string | null;
  quizLength: number | null;
}

type QuizSetupModalProps = {
  quizSettings: QuizSettings;
  setQuizSettings?: (settings: QuizSettings) => void;
};

const DIFFICULTY_LEVELS = ["łatwy", "średni", "trudny"];
const QUIZ_LENGTHS = [5, 10, 15];

const capitalize = (text: string) =>
  text.charAt(0).toUpperCase() + text.slice(1);

export const QuizSetupModal = ({
  quizSettings,
  setQuizSettings,
}: QuizSetupModalProps) => {
  const navigate = useNavigate();

  const resetSettings = () =>
    setQuizSettings?.({
      quizCategory: null,
      quizLevel: null,
      quizLength: null,
    });

  const updateSettings = (updates: Partial<QuizSettings>) =>
    setQuizSettings?.({ ...quizSettings, ...updates });

  const startQuiz = () => {
    const params: Record<string, string | number> = {};
    if (quizSettings.quizCategory) params.category = quizSettings.quizCategory;
    // if (quizSettings.quizLevel) params.level = quizSettings.quizLevel;
    if (quizSettings.quizLength) params.length = quizSettings.quizLength;

    navigate({
      to: "/quiz",
      search: params,
    });
  };

  const isQuizReady =
    quizSettings.quizCategory &&
    quizSettings.quizLevel &&
    quizSettings.quizLength;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/50 z-50">
      <div className="relative text-white w-1/2 h-fit from-secondary to-primary bg-linear-to-tr rounded-3xl shadow-2xl flex flex-col items-center justify-center py-[5rem]">
        <p
          className="group absolute top-[1rem] right-[1rem] bg-white/50 rounded-full w-[2.5rem] h-[2.5rem] flex items-center place-content-center font-bold cursor-pointer hover:bg-white/60 duration-200 text-[1.35rem]"
          onClick={resetSettings}
        >
          <XmarkIcon className="group-hover:scale-[125%] duration-200" />
        </p>
        <h1 className="text-[2.5rem]">Kategoria:</h1>
        <h2 className="text-[5rem]">
          {quizSettings.quizCategory
            ? capitalize(quizSettings.quizCategory)
            : null}
        </h2>
        <hr className="w-5/6 border-t-2 border-white/75 my-[2rem]" />

        <p className="text-[2.5rem]">Wybierz poziom trudności:</p>
        <div className="flex w-5/6 my-[1rem]">
          {DIFFICULTY_LEVELS.map((level) => (
            <CoreButton
              key={level}
              className="m-[1rem] w-full h-[5.75rem]"
              text={capitalize(level)}
              onClick={() => updateSettings({ quizLevel: level })}
              selected={quizSettings.quizLevel === level}
            />
          ))}
        </div>

        <p className="text-[2.5rem]">Wybierz ilość pytań:</p>
        <div className="flex w-5/6 my-[1rem]">
          {QUIZ_LENGTHS.map((length) => (
            <CoreButton
              key={length}
              className="m-[1rem] w-full h-[5.75rem]"
              onClick={() => updateSettings({ quizLength: length })}
              selected={quizSettings.quizLength === length}
              text={length.toString()}
            />
          ))}
        </div>

        <CoreButton
          className="w-5/6 h-[5.75rem] mt-[2rem]"
          text="Rozpocznij quiz"
          onClick={startQuiz}
          disabled={!isQuizReady}
          variant="submit"
        />
      </div>
    </div>
  );
};
