"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AiController_1 = __importDefault(require("../controllers/AiController"));
class AiRouter {
    constructor() {
        this.aiRouter = express_1.default.Router();
        this.routes();
    }
    routes() {
        this.aiRouter.post("/generate", AiController_1.default.Generate);
        this.aiRouter.get("/get/:_id", AiController_1.default.GetID);
        this.aiRouter.get("/getAll", AiController_1.default.GetAll);
        this.aiRouter.get("/getByUser/:_id", AiController_1.default.GetByUser);
    }
}
exports.default = new AiRouter().aiRouter;
