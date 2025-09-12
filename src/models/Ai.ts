import mongoose, { Document, Schema } from "mongoose";
import { IIA } from "../types/ai.types";

type partialAi = Partial<IIA>;

const Ai = new Schema<partialAi>({
  prompt: {
    type: String,
    required: true,
  },
  response: {
    type: String,
  },
});

export default mongoose.model("Ai", Ai);
