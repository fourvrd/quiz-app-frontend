import classNames from "classnames";

type CoreButtonProps = {
  className?: string;
  text: string;
  onClick?: () => void;
  selected?: boolean;
  disabled?: boolean;
};

export const CoreButton: React.FC<CoreButtonProps> = ({
  className,
  text,
  onClick,
  selected,
  disabled,
}) => {
  return (
    <button
      className={classNames(
        "text-white border-3 border-white/75 rounded-2xl text-[2rem] font-bold px-8 py-4",
        className,
        {
          "bg-linear-135 from-secondary/80 to-[rgb(0,77,63)] to-70% border-none shadow-xl hover:text-[2rem]":
            selected,
          "cursor-pointer hover:border-white/50 duration-200 hover:text-[2.25rem] hover:bg-white/10":
            !disabled,
          "opacity-50 cursor-not-allowed": disabled,
        }
      )}
      onClick={onClick}
    >
      {text}
    </button>
  );
};
