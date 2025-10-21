interface warningProps {
  isQuizziz: boolean;
}

export default function Warning({ isQuizziz }: warningProps) {
  return (
    <div className="h-[30px] mb-[12px]">
      <h3
        className={`text-center ${
          isQuizziz ? "text-green-400" : "text-red-600"
        }`}
      >
        {!isQuizziz
          ? "You're don't in a quizziz game!"
          : "You're in a quizzis game!"}
      </h3>
    </div>
  );
}
