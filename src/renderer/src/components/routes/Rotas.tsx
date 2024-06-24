import { Route, Routes } from "react-router-dom";
import { Cadastrar } from "../Cadastrar";
import { EditarDados } from "../EditarDados";
import { PaginaLogin } from "../PaginaLogin";
import { PaginaPrincipal } from "../PaginaPrincipal";

const Rotas = () => {

  return (
    <div>
      <Routes>
        <Route path="/" element={<PaginaLogin />} />
        <Route path="/cadastro" element={<Cadastrar />} />
        <Route path="/principal" element={<PaginaPrincipal />} />
        <Route path="/login" element={<PaginaLogin />} />
        <Route path="/editarDados" element={<EditarDados />} />
      </Routes>
    </div>
  );
}

export default Rotas;