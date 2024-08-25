import  express  from "express";
import config from "./config/config";
import dotenv from 'dotenv';
import UserRoute from "./users/UserRoute";
import database from "./config/mongoDB";
import cors from 'cors'


dotenv.config();


const app = express ();
app.use(express.json());
app.use(cors());

// app.get('/', ( req, res) => {
//   res.json({ message: "Aplication work! "})
// })

database();

app.use('/api/users', UserRoute);


app.listen(config.port , ()=> {
  console.log(`Server up and running... ${config.port} `);
});
