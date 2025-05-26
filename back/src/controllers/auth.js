import bcrypt from "bcrypt";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import UserModel from "../models/User.js";
import asyncHandler from "../config/asyncHandler.js";
import { AppFail, AppSuccess } from "../config/Responces.js";
import path from "path"
import dotenv from "dotenv"
import { fileURLToPath } from 'url';
import generatetoken from "../middelwares/generatetoken.js";
import Codemodel from "../models/code.js";
import sendVerificationEmail from "../config/sendmailer.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../a.env') });


const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const existingEmail = await UserModel.findOne({ email });
  if (existingEmail) {
    return res.status(400).json(new AppFail("L'email est invalide ou déjà utilisé. "));
  }
  
  const hashedPassword =  bcrypt.hashSync(password, 10);
  const activationToken = crypto.randomBytes(32).toString("hex");
  let newUser = await UserModel.create({
      name,
      password: hashedPassword,
      email,
    });
    
    let code=await Codemodel.create({code:activationToken,user:newUser._id})
    sendVerificationEmail(email,code.code)

  res.status(201).json( new AppSuccess(newUser));
});

export const verifycode=asyncHandler(async(req,res)=>{
const verifcode=await Codemodel.findOne({code:req.params.code})
if(!verifcode){
    return res.status(400).json(new AppFail('code expired'))
}
const user=await UserModel.findById(verifcode.user)
user.isVerified=true
await verifcode.deleteOne()
await user.save()
const token=await generatetoken(user._id)
  res.status(201).json( new AppSuccess({user,token}));

})

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new AppError("Veuillez remplir tous les champs.");
  }

  const user = await UserModel.findOne({ email });
  if (!user) {
    return res.status(400).json(new AppError("Utilisateur non trouvé."));
  }

  if (!user.isVerified) {
    return res.status(400).json(
      new AppFail("your acoount is not verified please ched email")
    );
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json(new AppFail("Mot de passe incorrect."));
  }

const token=await generatetoken(user._id)
delete user.password
  res.status(200).json(new AppSuccess({token:token,user:user}));
});

// const activateAccount = asyncHandler(async (req, res) => {
//   const { token } = req.params;
//   const user = await User.findOne({ activationToken: token });
//   console.log("Token reçu:", token);
//   if (!user) {
//     return res.json(new AppError("Lien d'activation invalide ou expiré."));
//   }

//   user.isVerified = true;
//   user.activationToken = null; // Supprimer le token après activation
//   await user.save();

//   res.json(new AppSuccess("Compte activé avec succès !"));
// });

export { register, login };
