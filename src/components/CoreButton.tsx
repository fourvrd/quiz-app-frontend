import classNames from "classnames";

type CoreButtonProps = {
  className?: string;
  text: string;
  onClick?: () => void;
  selected?: boolean;
  disabled?: boolean;
  variant?: "default" | "submit";
};

export const CoreButton: React.FC<CoreButtonProps> = ({
  className,
  text,
  onClick,
  selected,
  disabled,
  variant = "default",
}) => {
  return (
    <button
      className={classNames(
        "border-3 border-white/75 rounded-2xl text-[2rem] font-bold px-8 py-4",
        className,
        {
          "bg-linear-to-tr from-secondary to-primary border-none shadow-xl scale-105":
            selected,
          "cursor-pointer hover:border-white/50 duration-200 hover:scale-105":
            !disabled,
          "opacity-50 cursor-not-allowed": disabled,
          "bg-white text-primary": variant === "submit",
          "text-white hover:bg-white/10": variant === "default",
        }
      )}
      onClick={onClick}
    >
      {text}
    </button>
  );
};
