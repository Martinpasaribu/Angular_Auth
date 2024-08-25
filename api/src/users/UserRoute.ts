import express from "express";

import { register, login , me,  } from "./UserController";
import authenticate from "../middlewares/authenticate";

const UserRoute = express.Router();

 UserRoute.post('/register', register);
 UserRoute.post('/login',login )
 UserRoute.get('/me', authenticate, me)

 export default UserRoute;

