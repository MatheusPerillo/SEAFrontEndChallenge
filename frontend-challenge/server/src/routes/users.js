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
// Atualizar um usuário específico por ID
router.patch("/:id", getUser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.body.name != null) {
        res.locals.user.name = req.body.name;
    }
    if (req.body.cpf != null) {
        res.locals.user.cpf = req.body.cpf;
    }
    if (req.body.rg != null) {
        res.locals.user.rg = req.body.rg;
    }
    if (req.body.dateOfBirth != null) {
        res.locals.user.dateOfBirth = req.body.dateOfBirth;
    }
    if (req.body.gender != null) {
        res.locals.user.gender = req.body.gender;
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
        res.locals.user.activities = req.body.activities.map((activity) => ({
            name: activity.name,
            EPIs: activity.EPIs.map((epi) => ({
                name: epi.name,
                CA: epi.CA,
            })),
        }));
    }
    try {
        const updatedUser = yield res.locals.user.save();
        res.json(updatedUser);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
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
