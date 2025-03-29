import React, { useState } from "react";

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  loading?: "lazy" | "eager";
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = "",
  width,
  height,
  loading = "lazy",
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setError(true);
  };

  const generateSrcSet = () => {
    if (!width) return undefined;

    const sizes = [0.5, 1, 1.5, 2];
    return sizes
      .map((size) => {
        const w = Math.round(width * size);
        return `${src}?w=${w} ${w}w`;
      })
      .join(", ");
  };

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
      {error ? (
        <div className="flex items-center justify-center w-full h-full bg-gray-200 dark:bg-gray-700">
          <span className="text-gray-500 dark:text-gray-400">
            Erro ao carregar imagem
          </span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          className={`w-full h-full object-cover ${
            isLoading ? "opacity-0" : "opacity-100"
          }`}
          width={width}
          height={height}
          loading={loading}
          onLoad={handleLoad}
          onError={handleError}
          srcSet={generateSrcSet()}
          sizes={
            width ? `(max-width: ${width}px) 100vw, ${width}px` : undefined
          }
        />
      )}
    </div>
  );
};

export default OptimizedImage;
