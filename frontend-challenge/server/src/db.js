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
const mongoose_1 = __importDefault(require("mongoose"));
const username = encodeURIComponent("matheusperillo");
const password = encodeURIComponent("7QVfIy94yzfcNR4B");
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(`mongodb+srv://${username}:${password}@cluster0.5uoh7ui.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`);
        console.log("Conexão com o MongoDB estabelecida com sucesso!");
    }
    catch (err) {
        console.error("Erro ao estabelecer conexão com o MongoDB:", err.message);
        process.exit(1);
    }
});
exports.default = connectDB;
