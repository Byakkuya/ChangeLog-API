import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const comparePasswords = (password:any,hash:any) => {
    return bcrypt.compare(password, hash);

}

export const hashPassword = (password:any) => {
    return bcrypt.hash(password, 10);
}

export const createJWT = (user: { id: any; username: any; }) => {
  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET || "",
  );
  return token;
}

export const protect = (req:any, res:any,next:any) => {
    const bearer = req.headers.authorization;
    if (!bearer || !bearer.startsWith("Bearer ")) {
        res.sendStatus(401);
        res.json({message: 'Unauthorized'})
        return;
    }
    const [, token] = bearer.split(' ');
    if (!token) {
        res.sendStatus(401);
        res.json({message: 'not valid token'})
        return;
    }

    try{
        const user = jwt.verify(token, process.env.JWT_SECRET || "");
        req.user = user;
        next();

    } catch (err) {
        res.sendStatus(401);
        res.json({message: 'not valid token'})
        return;
    }
}