import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { config } from "../config/config.js";

const prisma = new PrismaClient();

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, phone } = req.body;
    if (!email || !password) {
      throw new Error("Email et mot de passe requis");
    }
    const hashedpassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedpassword,
        phone,
      },
    });
    const token = jwt.sign({ userId: user.id }, config.jwtSecret, {
      expiresIn: "1h",
    });
    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async(req: Request, res: Response, next:NextFunction) => {
    try {
        const { email, password} = req.body;
        if (!email || !password) {
            throw new Error("Email et mot de passe requis");
        }

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user || (!await bcrypt.compare(password, user.password))) {
            throw new Error("Utilisateur non trouvé");
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error("Mot de passe incorrect");
        }

        const token = jwt.sign({ userId: user.id }, config.jwtSecret, {
            expiresIn: "1h",
        });
        res.status(200).json({ token });
    } catch (error) {
        
    }
}