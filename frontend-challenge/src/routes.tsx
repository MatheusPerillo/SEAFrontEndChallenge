import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./components/sidebar";
import CreateUser from "./pages/createUser";
import Items from "./pages/items";
import Equipes from "./pages/equipes";
import Notificacoes from "./pages/notificacoes";
import Restaurar from "./pages/restaurar";
import Perfil from "./pages/userPerfil";

const Rotas: React.FC = () => {
  return (
    <Router>
      <Sidebar />
      <Routes>
        <Route path="/items" element={<Items />} />
        <Route path="/create-user" element={<CreateUser />} />
        <Route path="/equipes" element={<Equipes />} />
        <Route path="/notificacoes" element={<Notificacoes />} />
        <Route path="/restaurar" element={<Restaurar />} />
        <Route path="/perfil" element={<Perfil />} />
      </Routes>
    </Router>
  );
};

export default Rotas;
