import { Document } from "mongoose";

export interface IIA extends Document {
  _id: any;
  prompt: string;
  response?: string;
}

export type PayloadAi = Pick<IIA, "prompt" | "_id">;
export type PickGenerate = Pick<IIA, "prompt">;
export type PickGetById = Pick<IIA, "_id">;
