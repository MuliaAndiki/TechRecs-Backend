import { Request, Response } from "express";
import Ai from "../models/Ai";
import { verifyToken } from "../middleware/auth";
import { PayloadAi } from "../types/ai.types";
import { PickGenerate, PickGetById } from "../types/ai.types";
import { RetryGenerate } from "../service/ai.service";

declare global {
  namespace Express {
    interface Request {
      ai: PayloadAi;
    }
  }
}

class AiController {
  public Generate = [
    verifyToken,
    async (req: Request, res: Response): Promise<void> => {
      try {
        const body: PickGenerate = req.body;
        if (!body.prompt) {
          res.status(400).json({
            status: 400,
            message: "Prompt is required",
          });
          return;
        }

        const aiDoc = await Ai.create({ prompt: body.prompt });
        const text = await RetryGenerate(body.prompt);

        aiDoc.response = text;
        await aiDoc.save();

        res.json({
          _id: aiDoc._id,
          prompt: aiDoc.prompt,
          response: text,
        });
      } catch (error) {
        res.status(500).json({
          status: 500,
          message: "Server Internal Error",
          error: error instanceof Error ? error.message : error,
        });
      }
    },
  ];
  public GetID = [
    verifyToken,
    async (req: Request, res: Response): Promise<void> => {
      try {
        const params: PickGetById = { _id: req.params._id };
        const aiDoc = await Ai.findById(params._id);

        if (!aiDoc) {
          res.status(404).json({
            status: 404,
            message: "ID Not Found",
          });
          return;
        }

        res.status(200).json({
          status: 200,
          message: "Successfuly Get",
          data: aiDoc,
        });
      } catch (error) {
        res.status(500).json({
          status: 500,
          message: "Server Internal Error",
          error: error instanceof Error ? error.message : error,
        });
      }
    },
  ];
  public GetAll = [
    verifyToken,
    async (req: Request, res: Response): Promise<void> => {
      try {
        const aiDoc = await Ai.find().sort({ createdAt: -1 });
        res.status(200).json({
          status: 200,
          message: "Successfully getAll",
          data: aiDoc,
        });
      } catch (error) {
        res.status(500).json({
          status: 500,
          message: "Server Internal Error",
          error: error instanceof Error ? error.message : error,
        });
      }
    },
  ];
}

export default new AiController();
