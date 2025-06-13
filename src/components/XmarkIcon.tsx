type XmarkIconProps = {
  thickness?: number;
  className?: string;
} & React.SVGProps<SVGSVGElement>;

export const XmarkIcon: React.FC<XmarkIconProps> = (props) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M6 6L18 18M18 6L6 18"
      stroke="currentColor"
      strokeWidth={props.thickness || 2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={props.className}
    />
  </svg>
);
