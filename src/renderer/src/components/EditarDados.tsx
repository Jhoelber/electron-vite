import { useState } from "react";
import { AbrirModal } from "./AbrirModal";
import { useUser } from "./context/UseUser";




export const EditarDados = () => {
    const [open, setOpen] = useState(false);
    const { setUserData } = useUser();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [corretLogin, setCorretLogin] = useState('hidden');

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
                    setOpen(true);
                    setUsername('')
                    setPassword('')
                } else {
                    setCorretLogin('block');
                }
            })
            .catch(error => {
                console.error('Erro ao buscar dados de usuário:', error);
            });
    };

    const handleClose = () => {
        setOpen(false);

    };
    const [CloseEditar, setCloseEditar] = useState(true)

    const fecharEdicao = () => {
        setCloseEditar(false)

    }
    


    console.log(`${CloseEditar} editar dados`)
    return (
        <div>
            {CloseEditar &&
                <div className={` ${CloseEditar} absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                 bg-[#adc6e5]  p-4 rounded-md shadow-xl `}>

                    <div className="flex justify-between items-center">
                        <h1 className="text-3xl">Login</h1>
                        <button onClick={fecharEdicao} className="text-sm bg-zinc-300 p-2 rounded-md ">Fechar
                        </button>
                    </div>
                    <form className="flex flex-col gap-2">

                        <label htmlFor="login" className="text-3xl">Telefone</label>
                        <input
                            type="text"
                            name="login"
                            id="login"
                            value={username}
                            onChange={handleInputChange}
                            className="w-56 rounded-md  h-8 p-2"
                            placeholder="Digite seu numero"
                        />

                        <label htmlFor="senha" className="text-3xl">Senha</label>
                        <input
                            type="password"
                            name="senha"
                            id="senha"
                            value={password}
                            onChange={handleInputChange}
                            className="w-56 rounded-md  h-8 p-2"
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



                    {open && <AbrirModal open={open} handleClose={handleClose} />}

                </div>
            }
        </div>
    )
}
