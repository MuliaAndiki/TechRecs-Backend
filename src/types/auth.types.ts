import { Document } from "mongoose";

export interface TAuth extends Document {
  _id: any;
  email: string;
  fullName: string;
  password: string;
  token: string;
  role: string;
  createdAt: Date;
  updateAt: Date;
  __v: any;
}

export type JwtPayload = Pick<TAuth, "_id" | "email" | "fullName" | "role">;
export type PickRegister = Pick<
  TAuth,
  "email" | "fullName" | "password" | "role"
>;
export type PickLogin = Pick<TAuth, "email" | "password">;
export type PickLogout = Pick<TAuth, "_id">;
