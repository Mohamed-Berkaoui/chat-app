import jwt from 'jsonwebtoken';

import asyncHandler from '../config/asyncHandler.js';
import {AppFail } from '../config/Responces.js'
import UserModel from '../models/User.js';

const verifyUser = function(){

  return asyncHandler( async (req, res, next) => {
    let token = req.headers.authorization || req.headers.Authorization
    if (!token) {
      return res.json(new AppFail("Non autorisé, aucun token fourni"));
  
    }
    token = token.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT);
    req.user = await UserModel.findById(decoded.id).select('-password');
    if (!req.user) {
      return res.json(new AppFail("Utilisateur non trouvé"));
    }
    
    next()
  
  })
};


// const verifyAdmin = asyncHandler(async (req, res, next) => {
//   let token = req.headers.authorization || req.headers.Authorization
//   if (!token) {
//     return res.json(new AppFail("Non autorisé, aucun token fourni"));

//   }
//   token = token.split(' ')[1];
//   const decoded = jwt.verify(token, process.env.JWT);
  
//   const  user = await User.findById(decoded.id).select('-password');
//   if (!user) {
//     return res.json(new AppFail("Utilisateur non trouvé"));
//   }

//   if(!(user.role=="admin" ||user.role=="super admin")){
//     return res.json(new AppFail("Unauthorized"));

//   }
//   req.user=user
//   next()

// });

// const verifySuperAdmin = asyncHandler(async (req, res, next) => {
//   let token = req.headers.authorization || req.headers.Authorization
//   if (!token) {
//     return res.json(new AppFail("Non autorisé, aucun token fourni"));

//   }
//   token = token.split(' ')[1];
//   const decoded = jwt.verify(token, process.env.JWT);
  
//   const  user = await User.findById(decoded.id).select('-password');
//   if (!user) {
//     return res.json(new AppFail("Utilisateur non trouvé"));
//   }

//   if(user.role!="super admin"){
//     return res.json(new AppFail("Unauthorized"));

//   }
//   req.user=user
//   next()

// });



export { verifyUser }; 

