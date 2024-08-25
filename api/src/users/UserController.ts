import { NextFunction, Request, Response } from "express";
import UserSchema from "./UserSchema";
import bcrypt from 'bcrypt';
import { sign } from "jsonwebtoken";
import config from "../config/config";
import { AuthRequest } from "../middlewares/authenticate";
import { error } from "console";


const register = async ( req: Request, res: Response, next: NextFunction ) => {

  const { name, email, password } = req.body

  if(!name || !email || !password ) {
    return res.status(400).json({ error: " Semua belum terisi! "})
  }

  const user = await UserSchema.findOne({email});
  if(user){
    return res.status(400).json({ error: "Akun sudah tersedia!"})
  }

  try {

    const hashedPassword = await bcrypt.hash(password, 10);
    const newuser = await UserSchema.create({
      name,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      status: true,
      message: "User Dibuat",
      data: { _id: newuser._id, email: newuser.email },
    })

  } catch (error) {
    return res.status(500).json({ error: " Terjadi sebuah kesalahan " })
  }
};

const login = async ( req: Request, res: Response, next: NextFunction ) => {

  const { email, password } = req.body

  if( !email || !password ) {
    return res.status(400).json({ error: " Semua belum terisi! "})
  }

  const user = await UserSchema.findOne({email});
    if(!user){
      return res.status(400).json({ error: "Akun Tidak ditemukan"})
    }

  const isPasswordMatch = await bcrypt.compare(password, user.password);
    if(!isPasswordMatch){
        return res.status(400).json({ error: " Password anda salah "})
    }

    try {

      if (!config.jwtSecret) {
        return res.status(500).json({ error: "Server configuration error: Missing JWT secret" });
    }

      const token = sign({ sub: user._id }, config.jwtSecret as string, {
        expiresIn: '1d',
      })

      return res.status(200).json({
        status: true,
        message: " Akun anda berhasil login ",
        data: { _id: user._id, email: user.email, name: user.name },
        token,
      })

    } catch (error) {
      return res.status(500).json({ error: " Terjadi sebuah kesalahan saat login  " })
    }
}

const me = async ( req: Request, res: Response, next: NextFunction ) => {

  const  _request = req as AuthRequest;
  const user = await UserSchema.findById(_request.userId);
  if(user){

    return  res.status(200).json({
      status: true,
      message: " Me anda ada ",
      data: { _id: user._id, email: user.email, name: user.name},
    });

  }

  return res.status(500).json({ error: " Terjadi kesalahan saat menggunakan me"})
}

export { register , login , me }
