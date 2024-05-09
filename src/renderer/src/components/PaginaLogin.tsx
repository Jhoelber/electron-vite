import { Cloudinary } from "@cloudinary/url-gen";
import { useState } from "react";
import { Cadastrar } from "./Cadastrar";
import { PaginaPrincipal } from "./PaginaPrincipal";

export const PaginaLogin = () => {
  const cld = new Cloudinary({
    cloud: {
      cloudName: "dfgbasaxa"
    }
  })

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [corretLogin, setcorretLogin] = useState('hidden');
  const [ClickLogIn, setClickLogIn] = useState(false);

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
        // Verifique se há um usuário com o nome de usuário e senha fornecidos
        const user = data.find(user => user.telefone === username && user.senha === password);
        if (user) {
          // Se o usuário for encontrado, faça algo (por exemplo, definir o estado de isLoggedIn como true)
          setIsLoggedIn(true);
        } else {
          // Se o usuário não for encontrado, faça algo (por exemplo, exibir uma mensagem de erro)
          setcorretLogin('block');
        }
      })
      .catch(error => {
        // Tratar erros de solicitação, se houver
        console.error('Erro ao buscar dados de usuário:', error);
      });
  };

  const handleCadastrar = () => {
    if (ClickLogIn == false) {
      setClickLogIn(true)
    }
  }

  return (
    <div className="bg-[#DBEAFE] h-screen">
      {ClickLogIn ?
        (<Cadastrar /> // Se clicar no cadastrar passa a ser verdadeiro e renderiza a pagina de cadastro
        ) : (
          isLoggedIn ? ( // se a credencial bater torna verdadeiro e direciona para a pagina principal
            <PaginaPrincipal />
          ) : (
            <div className="grid grid-cols-2 ">
              <div className="flex flex-col items-center" >
                <img src={cld.image(`imagesLogin/icon`).toURL()} className="mr-auto p-2" alt="Icone logo da cidade" />
                <h1 className="text-3xl font-bold text-zinc-800">TOTEM DE AUTO ATENDIMENTO</h1>
                <h2 className="text-3xl font-bold text-zinc-800">SALA DO EMPREENDEDOR</h2>

                <div className="flex items-center gap-10">
                  <img src={cld.image(`imagesLogin/mulherTotem`).toURL()} className="w-86 h-96" alt="Mulher mexendo no totem" />
                  <div className="flex-col pr-10 pl-10 pt-10">
                    <img src={cld.image(`imagesLogin/Parcelasimplesnacional`).toURL()} className="w-32 animate-bounce " alt="Icone parcela Naciol" />
                    <img src={cld.image(`imagesLogin/Imprimirboleto`).toURL()} className="w-32 animate-bounce2" alt="Icone Imprimir boleto das" />
                    <img src={cld.image(`imagesLogin/Formalizacaomei`).toURL()} className="w-32 animate-bounce" alt="Icone formalização mei" />
                    <img src={cld.image(`imagesLogin/ImprimirCNPJ`).toURL()} className="w-32 animate-bounce2" alt="Icone imprimir cpnj" />
                    <img src={cld.image(`imagesLogin/Debitoautomatico`).toURL()} className="w-32 animate-bounce" alt="Icone debito automatico" />
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center bg-white col-span-1 h-screen ">
                <img src={cld.image(`imagesLogin/iconLogin3`).toURL()} alt="" className="w-96 pb-4" />
                {/* <h2 className="pb-24 text-3xl font-bold text-zinc-800">BEM VINDO AO TOTEM</h2>  verificar oq fica
            melhor, imagem ou texto*/}

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
                  <p className="text-sky-400"><a href="">Esqueci minha senha</a></p>
                  <p className="text-sky-400"><a href="#">alterar dados</a> </p>
                </div>

                <p>Ainda nao possui conta? clique em <span className="text-sky-400 cursor-pointer" onClick={handleCadastrar}  >Cadastrar</span></p>

              </div>
            </div>
          )
        )}
    </div>
  );
}
