"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("../models/user"));
const router = express_1.default.Router();
// Criar um novo usuário
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = new user_1.default(req.body);
        const savedUser = yield user.save();
        res.json(savedUser);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}));
// Obter todos os usuários
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_1.default.find();
        res.json(users);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}));
// Obter um usuário específico por ID
router.get("/:id", getUser, (req, res) => {
    res.json(res.locals.user);
});
router.put("/user-update/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, cpf, rg, dateOfBirth, gender, status, role, usesEPI, healthCertificate, activities, } = req.body;
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
        const updatedUser = yield user_1.default.findByIdAndUpdate(id, updateFields, {
            new: true,
        });
        if (!updatedUser) {
            return res.status(404).json({ error: "User not found" });
        }
        return res
            .status(200)
            .json({ message: "Usuário atualizado com sucesso", user: updatedUser });
    }
    catch (error) {
        console.error("Erro ao atualizar usuário:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}));
// Excluir um usuário específico por ID
router.delete("/:id", getUser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield user_1.default.findByIdAndDelete(req.params.id);
        res.json({ message: "Usuário excluído" });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}));
// Middleware para obter um usuário por ID
function getUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let user;
        try {
            user = yield user_1.default.findById(req.params.id);
            if (user == null) {
                return res.status(404).json({ message: "Usuário não encontrado" });
            }
        }
        catch (err) {
            return res.status(500).json({ message: err.message });
        }
        res.locals.user = user;
        next();
    });
}
exports.default = router;
