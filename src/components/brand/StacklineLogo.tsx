interface StacklineLogoProps {
  variant?: "light" | "dark";
  className?: string;
}

export function StacklineLogo({
  variant = "light",
  className = "h-8 w-auto",
}: StacklineLogoProps) {
  const wordmarkFill = variant === "dark" ? "#FFFFFF" : "#162B47";

  return (
    <svg
      viewBox="0 0 226 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Stackline"
    >
      {/* Burnt-orange upward-right folded arrow aligned directly over the dotless 'ı' stem */}
      <path
        d="M130.5 11.8L156.5 2L151.8 25.8L144.4 18.8L136.6 23.6L139.1 15.8L130.5 11.8Z"
        fill="#D95D30"
      />
      {/* Crisp geometric wordmark using dotless 'ı' so the folded arrow replaces the dot */}
      <text
        x="2"
        y="53"
        fill={wordmarkFill}
        fontFamily="var(--font-jakarta), ui-sans-serif, system-ui, sans-serif"
        fontSize="45"
        fontWeight="800"
        letterSpacing="-1.4"
      >
        Stackl&#x0131;ne
      </text>
    </svg>
  );
}
