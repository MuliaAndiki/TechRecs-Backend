import express from "express";
import AiController from "../controllers/AiController";

class AiRouter {
  public aiRouter;
  constructor() {
    this.aiRouter = express.Router();
    this.routes();
  }

  private routes() {
    this.aiRouter.post("/generate", AiController.Generate);
    this.aiRouter.get("/get/:_id", AiController.GetID);
    this.aiRouter.get("/getAll", AiController.GetAll);
    this.aiRouter.get("/getByUser/:_id", AiController.GetByUser);
  }
}

export default new AiRouter().aiRouter;
