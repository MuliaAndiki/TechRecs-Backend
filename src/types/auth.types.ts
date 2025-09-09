import { Document } from "mongoose";

export interface IAuth extends Document {
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

export type JwtPayload = Pick<IAuth, "_id" | "email" | "fullName" | "role">;
export type PickRegister = Pick<
  IAuth,
  "email" | "fullName" | "password" | "role"
>;
export type PickLogin = Pick<IAuth, "email" | "password">;
export type PickLogout = Pick<IAuth, "_id">;
export type PickGetProfile = Pick<IAuth, "_id">;
