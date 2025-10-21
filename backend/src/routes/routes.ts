import { getAnswer } from "../controllers/getAnswer";
import { Router } from "express";

const router = Router();

router.post("/get-quizziz-answer", getAnswer);

export default router;
