import type { MouseEventHandler } from "react";

interface startButtonProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
}

export default function StartButton({ onClick }: startButtonProps) {
  return (
    <div className="flex justify-center h-[60px]">
      <button
        onClick={onClick}
        className="bg-blue-500 rounded-[12px] text-white h-[32px] w-[150px] cursor-pointer transition-all duration-300 hover:bg-blue-400"
      >
        Start
      </button>
    </div>
  );
}
