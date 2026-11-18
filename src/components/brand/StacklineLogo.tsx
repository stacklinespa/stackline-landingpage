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
      viewBox="0 0 232 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Stackline"
    >
      {/* Burnt-orange upward-right folded arrow replacing the dot of the 'i' */}
      <path
        d="M139 14.5L168 4L162.8 31.2L154.6 22.8L145.6 28.4L148.6 19.2L139 14.5Z"
        fill="#D45F32"
      />
      {/* Crisp geometric wordmark using dotless 'ı' so the arrow acts as the tittle */}
      <text
        x="2"
        y="52"
        fill={wordmarkFill}
        fontFamily="var(--font-jakarta), ui-sans-serif, system-ui, sans-serif"
        fontSize="46"
        fontWeight="800"
        letterSpacing="-1.4"
      >
        Stackl&#x0131;ne
      </text>
    </svg>
  );
}
