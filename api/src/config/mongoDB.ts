import mongoose from "mongoose";
import config from "./config";

const database = async () => {
  await mongoose
  .connect(config.mongoUrl as string )
  .then(() => {
    console.log(' MongoDB terhubung ');
  })
  .catch((error) => {
    console.log(' Ada masalah :', error);
  })
}

export default database;


