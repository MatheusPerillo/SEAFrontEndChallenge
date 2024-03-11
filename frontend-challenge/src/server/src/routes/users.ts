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
router.put("/user-update/:id", async (req, res) => {
  const { id } = req.params;
  const {
    name,
    cpf,
    rg,
    dateOfBirth,
    gender,
    status,
    role,
    usesEPI,
    healthCertificate,
    activities,
  } = req.body;

  try {
    const updateFields = {
      name,
      cpf,
      rg,
      dateOfBirth,
      gender,
      status,
      role,
      usesEPI,
      healthCertificate,
      activities,
    };

    const updatedUser = await User.findByIdAndUpdate(id, updateFields, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    return res
      .status(200)
      .json({ message: "Usuário atualizado com sucesso", user: updatedUser });
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// Excluir um usuário específico por ID
router.delete("/:id", getUser, async (req: Request, res: Response) => {
  try {
    await User.findByIdAndDelete(req.params.id);
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
