import { Cloudinary } from "@cloudinary/url-gen";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { EditarDados } from "./EditarDados";
import { useUser } from './context/UseUser';

export const PaginaLogin = () => {
  const { setUserData } = useUser();
  const navigate = useNavigate();
  const cld = new Cloudinary({
    cloud: {
      cloudName: "dfgbasaxa"
    }
  })
  //MODIFICAR PARA AO INVES DE CLICAR E DEIXAR COMO HIDDEN OU BLOCK, RENDERIZAR A EDIÇAO
  // {openModal && (
  //               <AbrirModal open={openModal} handleClose={handleCloseModal} />
  //           )}
  // CRIANDO UMA CONDICIONAL, SE CLICAR, ABRE, SE NAO, FECHA... Simples e nao gera problema

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [corretLogin, setcorretLogin] = useState('hidden');



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'login') {
      setUsername(value);
    } else if (name === 'senha') {
      setPassword(value);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    fetch('http://localhost:5000/Usuario')
      .then(response => response.json())
      .then(data => {
        const user = data.find(user => user.telefone === username && user.senha === password);
        if (user) {
          setUserData(user);
          navigate('/principal');
        } else {
          setcorretLogin('block');
        }
      })
      .catch(error => {
        console.error('Erro ao buscar dados de usuário:', error);
      });
  };


  const [clickEditar, setClickEditar] = useState(false)

  const HandleEditar = () => {
    setClickEditar(!clickEditar)

  }



  console.log(`${clickEditar} clique editar`)

  return (
    <div className="bg-[#DBEAFE] h-screen">
      {clickEditar &&
        <div className="z-auto">
          <EditarDados />

        </div>

      }


      <div className="grid grid-cols-2 ">
        <div className="flex flex-col items-center" >

          <img src={cld.image(`imagesLogin/icon`).toURL()} className="mr-auto p-2" alt="Icone logo da cidade" />
          <h1 className="text-3xl font-bold text-zinc-800">TOTEM DE AUTO ATENDIMENTO</h1>
          <h2 className="text-3xl font-bold text-zinc-800">SALA DO EMPREENDEDOR</h2>

          <div className="flex items-center gap-10">
            <img src={cld.image(`imagesLogin/mulherTotem`).toURL()} className="w-86 h-96" alt="Mulher mexendo no totem" />
            <div className="flex-col pr-10 pl-10 pt-10">
              <img src={cld.image(`imagesLogin/Parcelasimplesnacional`).toURL()} className="lg:w-24 animate-bounce " alt="Icone parcela Naciol" />
              <img src={cld.image(`imagesLogin/Imprimirboleto`).toURL()} className="lg:w-24 animate-bounce2" alt="Icone Imprimir boleto das" />
              <img src={cld.image(`imagesLogin/Formalizacaomei`).toURL()} className="lg:w-24 animate-bounce" alt="Icone formalizaÃ§Ã£o mei" />
              <img src={cld.image(`imagesLogin/ImprimirCNPJ`).toURL()} className="lg:w-24 animate-bounce2" alt="Icone imprimir cpnj" />
              <img src={cld.image(`imagesLogin/Debitoautomatico`).toURL()} className="lg:w-24 animate-bounce" alt="Icone debito automatico" />
            </div>
          </div>

        </div>

        <div className="flex flex-col items-center justify-center bg-white col-span-1 h-screen ">
          <img src={cld.image(`imagesLogin/iconLogin3`).toURL()} alt="" className="w-96 pb-4" />

          <form className="flex flex-col gap-2">
            <label htmlFor="login" className="text-3xl">Telefone</label>
            <input
              type="text"
              name="login"
              id="login"
              value={username}
              onChange={handleInputChange}
              className="w-56 rounded-md bg-[#DBEAFE] h-8 p-2"
              placeholder="Digite seu numero"
            />

            <label htmlFor="senha" className="text-3xl">Senha</label>
            <input
              type="password"
              name="senha"
              id="senha"
              value={password}
              onChange={handleInputChange}
              className="w-56 rounded-md bg-[#DBEAFE] h-8 p-2"
              placeholder="Digite sua senha"
            />

            <input
              type="submit"
              value="ENTRAR"
              className="w-56 bg-sky-400 rounded-md mt-2 text-white p-1"
              onClick={handleLogin}
            />

          </form>

          <div className={`${corretLogin} text-red-500`} >
            <h1>Usuario ou senha incorreto! </h1>
          </div>

          <div className="flex flex-col items-end ml-20">
            <p className="text-sky-400"><a href="#">Esqueci minha senha</a></p>

            <button onClick={HandleEditar} className="text-sky-400">alterar dados  </button>

          </div>

          <p>Ainda nao possui conta? clique em <span className="text-sky-400 cursor-pointer">
            <Link to={'/cadastro'}>Cadastrar</Link></span></p>

        </div>
      </div>


    </div>
  );
}