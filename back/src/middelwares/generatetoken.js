
import path from "path"
import dotenv from "dotenv"
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../a.env') });
import jwt from 'jsonwebtoken'
async function generatetoken(id){
      const token = await jwt.sign({ id: id }, process.env.JWT, {
    expiresIn: "1d",


  });
      return token
}
export default generatetoken