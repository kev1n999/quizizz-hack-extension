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
          ? "Você não está em uma atividade de Quizizz agora!"
          : "Você está em uma atividade do Quizziz agora!"}
      </h3>
    </div>
  );
}
