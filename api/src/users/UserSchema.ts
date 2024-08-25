import mongoose from "mongoose";
import { User } from "./UserTypes";

const  UserSchema = new mongoose.Schema<User>({

    name: {
      type: String,
      required: true
    },

    email: {
      type: String,
      required: true,
      unique: true,

    },

    password: {
      type: String,
      required: true
    },

   },

   { timestamps: true }

  );

  export default mongoose.model<User>('UserAngularAuth', UserSchema, 'UserAngularAuth');
