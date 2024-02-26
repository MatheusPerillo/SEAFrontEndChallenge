import express, { Request, Response, NextFunction } from "express";
import User, { IUser } from "../models/user";

const router = express.Router();

// Criar um novo usuário
router.post("/", async (req: Request, res: Response) => {
  try {
    const user = new User(req.body) as IUser;
    const savedUser = await user.save();
    res.json(savedUser);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

// Obter todos os usuários
router.get("/", async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

// Obter um usuário específico por ID
router.get("/:id", getUser, (req: Request, res: Response) => {
  res.json(res.locals.user);
});

// Atualizar um usuário específico por ID
router.patch("/:id", getUser, async (req: Request, res: Response) => {
  if (req.body.name != null) {
    res.locals.user.name = req.body.name;
  }
  if (req.body.cpf != null) {
    res.locals.user.cpf = req.body.cpf;
  }
  if (req.body.status != null) {
    res.locals.user.status = req.body.status;
  }
  if (req.body.role != null) {
    res.locals.user.role = req.body.role;
  }
  if (req.body.usesEPI != null) {
    res.locals.user.usesEPI = req.body.usesEPI;
  }
  if (req.body.healthCertificate != null) {
    res.locals.user.healthCertificate = req.body.healthCertificate;
  }
  if (req.body.activities != null) {
    res.locals.user.activities = req.body.activities;
  }
  try {
    const updatedUser = await res.locals.user.save();
    res.json(updatedUser);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

// Excluir um usuário específico por ID
router.delete("/:id", getUser, async (req: Request, res: Response) => {
  try {
    await res.locals.user.remove();
    res.json({ message: "Usuário excluído" });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware para obter um usuário por ID
async function getUser(req: Request, res: Response, next: NextFunction) {
  let user;
  try {
    user = await User.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
  res.locals.user = user;
  next();
}

export default router;
