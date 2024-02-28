import mongoose from "mongoose";

const username = encodeURIComponent("matheusperillo");
const password = encodeURIComponent("7QVfIy94yzfcNR4B");

const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${username}:${password}@cluster0.5uoh7ui.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
    );
    console.log("Conexão com o MongoDB estabelecida com sucesso!");
  } catch (err: any) {
    console.error("Erro ao estabelecer conexão com o MongoDB:", err.message);
    process.exit(1);
  }
};

export default connectDB;
