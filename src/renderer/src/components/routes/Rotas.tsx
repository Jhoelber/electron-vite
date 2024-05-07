import { BrowserRouter, Route, Routes } from "react-router-dom"
import { PaginaPrincipal } from "../PaginaPrincipal"
import { PaginaLogin } from "../PaginaLogin"

export const Rotas = () => {
  return (

    <BrowserRouter>
      <Routes>
        <Route element={<PaginaPrincipal />}path="/home" />
        <Route element={<PaginaLogin />} path="/login" />
      </Routes>
    </BrowserRouter>

  )
}
