import { CoreButton } from "./CoreButton";
import classNames from "classnames";

type MenuButtonProps = {
  className?: string;
  onClick?: () => void;
  text: string;
  selected?: boolean;
  disabled?: boolean;
};

export const MenuButton: React.FC<MenuButtonProps> = ({
  className,
  text,
  onClick,
  selected,
  disabled,
}) => {
  return (
    <div
      className={classNames(
        "h-[12rem] rounded-2xl relative overflow-hidden bg-black/25 shadow-xl",
        className
      )}
    >
      <img
        src="src/assets/menu_button_bg.png"
        className="h-full w-full absolute -z-10 object-cover"
      />
      <CoreButton
        className="w-[calc(100%-3rem)] h-[calc(100%-3rem)] m-[1.5rem] text-[1.5rem]"
        text={text}
        onClick={onClick}
        selected={selected}
        disabled={disabled}
      />
    </div>
  );
};
