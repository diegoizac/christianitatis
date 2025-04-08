import React from "react";

interface LoadingProps {
  size?: "sm" | "md" | "lg";
  color?: string;
}

const Loading: React.FC<LoadingProps> = ({
  size = "md",
  color = "blue-500",
}) => {
  const sizeClasses = {
    sm: "h-6 w-6",
    md: "h-12 w-12",
    lg: "h-16 w-16",
  };

  return (
    <div className="flex items-center justify-center min-h-[200px]">
      <div
        className={`animate-spin rounded-full border-t-2 border-b-2 border-${color} ${sizeClasses[size]}`}
        role="status"
        aria-label="Carregando..."
      >
        <span className="sr-only">Carregando...</span>
      </div>
    </div>
  );
};

export default Loading;
