import { CoreButton } from "./CoreButton";
import { XmarkIcon } from "./XmarkIcon";

type QuizSetupModalProps = {
  quizSettings: {
    quizCategory: string | null;
    quizLevel: string | null;
    quizLength: number | null;
  };
  setQuizSettings?: (settings: {
    quizCategory: string | null;
    quizLevel: string | null;
    quizLength: number | null;
  }) => void;
};

export const QuizSetupModal = ({
  quizSettings,
  setQuizSettings,
}: QuizSetupModalProps) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/50 z-50">
      <div className="relative text-white w-1/2 h-fit from-secondary to-primary bg-linear-to-tr rounded-3xl shadow-2xl flex flex-col items-center justify-center py-[5rem]">
        <p
          className="group absolute top-[1rem] right-[1rem] bg-white/50 rounded-full w-[2.5rem] h-[2.5rem] flex items-center place-content-center font-bold cursor-pointer hover:bg-white/60 duration-200 text-[1.35rem]"
          onClick={() => {
            if (setQuizSettings) {
              setQuizSettings({
                quizCategory: null,
                quizLevel: null,
                quizLength: null,
              });
            }
          }}
        >
          <XmarkIcon className="group-hover:scale-[125%] duration-200" />
        </p>
        <h1 className="text-[2.5rem]">Kategoria:</h1>
        <h2 className="text-[5rem]">
          {quizSettings.quizCategory
            ? quizSettings.quizCategory.charAt(0).toUpperCase() +
              quizSettings.quizCategory.slice(1)
            : null}
        </h2>
        <hr className="w-5/6 border-t-2 border-white/75 my-[2rem]" />
        <p className="text-[2.5rem]">Wybierz poziom trudności:</p>
        <div className="flex w-5/6 my-[1rem]">
          {["łatwy", "średni", "trudny"].map((level) => (
            <CoreButton
              key={level}
              className="m-[1rem] w-full h-[5.75rem]"
              text={level.charAt(0).toUpperCase() + level.slice(1)}
              onClick={() =>
                setQuizSettings &&
                setQuizSettings({
                  ...quizSettings,
                  quizLevel: level,
                })
              }
              selected={quizSettings.quizLevel === level}
            />
          ))}
        </div>
        <p className="text-[2.5rem]">Wybierz ilość pytań:</p>
        <div className="flex w-5/6 my-[1rem]">
          {[5, 10, 15].map((length) => (
            <CoreButton
              key={length}
              className="m-[1rem] w-full h-[5.75rem]"
              onClick={() =>
                setQuizSettings &&
                setQuizSettings({
                  ...quizSettings,
                  quizLength: length,
                })
              }
              selected={quizSettings.quizLength === length}
              text={length.toString()}
            />
          ))}
        </div>
        <CoreButton
          className="w-5/6 h-[5.75rem] mt-[2rem]"
          text="Rozpocznij quiz"
          onClick={() => {
            if (setQuizSettings) {
              setQuizSettings({
                ...quizSettings,
                quizCategory: quizSettings.quizCategory,
              });
            }
          }}
          disabled={
            !quizSettings.quizCategory ||
            !quizSettings.quizLevel ||
            !quizSettings.quizLength
          }
          variant="submit"
        />
      </div>
    </div>
  );
};
