import prisma from "../db";
import { hashPassword, createJWT, comparePasswords } from "../modules/auth";

export const createNewUser = async (req:any, res:any) => {
  const user = await prisma.user.create({
    data: {
      username: req.body.username,
      password: await hashPassword(req.body.password),
    },
  });
  const token = createJWT(user);
  res.json({ token });
  
};

export const signin = async (req:any, res:any) => {
    const user = await prisma.user.findUnique({
        where: {
            username: req.body.username,
        },
    });
    if (!user) {
        res.sendStatus(401);
        res.json({message: 'user not found'})
        return;
    }
    const isValid = await comparePasswords(req.body.password, user.password);
    if (!isValid) {
        res.sendStatus(401);
        res.json({message: 'not valid password'})
        return;
    }
    const token = createJWT(user);
    res.json({ token });
    
}