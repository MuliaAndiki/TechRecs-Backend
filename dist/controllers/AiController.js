"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Ai_1 = __importDefault(require("../models/Ai"));
const auth_1 = require("../middleware/auth");
const ai_service_1 = require("../service/ai.service");
const Auth_1 = __importDefault(require("../models/Auth"));
class AiController {
    constructor() {
        this.Generate = [
            auth_1.verifyToken,
            async (req, res) => {
                try {
                    const body = req.body;
                    const userId = req.user?._id;
                    if (!userId) {
                        res.status(400).json({
                            status: 400,
                            message: "User Not Found",
                        });
                        return;
                    }
                    if (!body.prompt) {
                        res.status(400).json({
                            status: 400,
                            message: "Prompt is required",
                        });
                        return;
                    }
                    const aiDoc = await Ai_1.default.create({ prompt: body.prompt, user: userId });
                    const text = await (0, ai_service_1.RetryGenerate)(body.prompt.text);
                    aiDoc.response = text;
                    await aiDoc.save();
                    res.status(200).json({
                        status: 200,
                        message: "Succesfuly Generate",
                        data: aiDoc,
                    });
                }
                catch (error) {
                    res.status(500).json({
                        status: 500,
                        message: "Server Internal Error",
                        error: error instanceof Error ? error.message : error,
                    });
                }
            },
        ];
        this.GetID = [
            auth_1.verifyToken,
            async (req, res) => {
                try {
                    const params = { _id: req.params._id };
                    const aiDoc = await Ai_1.default.findById(params._id);
                    if (!params) {
                        res.status(400).json({
                            status: 400,
                            message: "Params Not Found",
                        });
                    }
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
                }
                catch (error) {
                    res.status(500).json({
                        status: 500,
                        message: "Server Internal Error",
                        error: error instanceof Error ? error.message : error,
                    });
                }
            },
        ];
        this.GetAll = [
            auth_1.verifyToken,
            async (req, res) => {
                try {
                    const aiDoc = await Ai_1.default.find();
                    res.status(200).json({
                        status: 200,
                        message: "Successfully getAll",
                        data: aiDoc,
                    });
                }
                catch (error) {
                    res.status(500).json({
                        status: 500,
                        message: "Server Internal Error",
                        error: error instanceof Error ? error.message : error,
                    });
                }
            },
        ];
        this.GetByUser = [
            auth_1.verifyToken,
            async (req, res) => {
                try {
                    const id = req.params?._id;
                    const aiDoc = await Ai_1.default.find({ user: id }).select("prompt _id");
                    res.status(200).json({
                        status: 200,
                        message: "Succesfuly GetByuser",
                        data: aiDoc,
                    });
                }
                catch (error) {
                    res.status(500).json({
                        status: 500,
                        message: "Server Internal Error",
                        error: error instanceof Error ? error.message : error,
                    });
                }
            },
        ];
        // Belum Test
        this.DeleteChatUserById = [
            auth_1.verifyToken,
            async (req, res) => {
                try {
                    const { chatId, userId } = req.params;
                    const user = await Auth_1.default.findById(userId);
                    if (!user) {
                        res.status(400).json({
                            status: 400,
                            message: "User NotFound",
                        });
                        return;
                    }
                    const result = await Ai_1.default.deleteOne({ _id: chatId, user: userId });
                    if (result.deletedCount === 0) {
                        res.status(404).json({
                            status: 404,
                            message: "Chat Not Found or Not Belong to User",
                        });
                        return;
                    }
                    res.status(200).json({
                        status: 200,
                        message: "Succesfully Delete Historty Chat",
                        data: result.deletedCount,
                    });
                }
                catch (error) {
                    res.status(500).json({
                        status: 500,
                        message: "Server Internal Error",
                        error: error instanceof Error ? error.message : error,
                    });
                }
            },
        ];
    }
}
exports.default = new AiController();
