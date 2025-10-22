import { Request, Response } from "express";
import { getAnswerToGemini } from "../services/gemini";

interface GeminiRequestBody {
  question: string;
  options: Record<number, string>;
  image?: string;
}

export async function getAnswer(
  req: Request<{}, {}, GeminiRequestBody>,
  res: Response
) {
  try {
    const { question, options, image } = req.body;

    if (!question || !options) {
      res.status(400).json({
        err: "questions ans options is missing!",
      });
    }

    const optionsMap = new Map<number, string>(
      Object.entries(options).map(([key, value]) => [Number(key), value])
    );

    const answer = await getAnswerToGemini(question, optionsMap, image);

    res.status(200).json({
      response: answer,
    });
  } catch (err) {
    res.status(500).json({
      err: err,
    });
  }
}
