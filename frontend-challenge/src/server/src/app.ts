import express from "express";
import cors from "cors";
import userRoutes from "./routes/users";
import connectDB from "./db";

const app = express();

app.use(express.json());
app.use(cors());

connectDB();

app.use("/users", userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
