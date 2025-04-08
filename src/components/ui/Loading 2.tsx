import React from "react";

const Loading: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary-600 border-t-transparent"></div>
      <p className="text-gray-600 text-lg">Carregando...</p>
    </div>
  );
};

export default Loading;
