import { GoogleGenerativeAI } from "@google/generative-ai";
import { constants } from "../constants";

const ai = new GoogleGenerativeAI(constants.gemini_key!);

export async function getAnswerToGemini(
  question: string,
  options: Map<number, string>,
  image?: string
): Promise<string> {
  try {
    let result;

    const geminiModel = ai.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    if (!image) {
      result = await geminiModel.generateContent(
        `Questão de Quizziz:\n\n${question}\n\nAlternativas disponíveis:\n${Array.from(
          options.values()
        ).join(
          "\n"
        )}\n\nEnvie-me apenas a RESPOSTA (não envie nada além da alternativa correta, EXATAMENTE como ela aparece!).`
      );
    }

    result = await geminiModel.generateContent(
      `Questão de Quizziz:\n${image}\n\n${question}\n\nAlternativas disponíveis:\n${Array.from(
        options.values()
      ).join(
        "\n"
      )}\n\nEnvie-me apenas a RESPOSTA (não envie nada além da alternativa correta, EXATAMENTE como ela aparece!).`
    );

    const response = result.response;
    return response.text();
  } catch (err) {
    console.error(err);
  }

  return "";
}
