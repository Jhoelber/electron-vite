import { Cloudinary } from "@cloudinary/url-gen";
import { useState } from "react";
import AutoComplete from "./AutoComplete";
import { PaginaPrincipal } from "./PaginaPrincipal";

export const Cadastrar = () => {
    const cld = new Cloudinary({
        cloud: {
            cloudName: "dfgbasaxa"
        }
    });

    const [formData, setFormData] = useState({
        nome: '',
        dataNascimento: '',
        telefone: '',
        sexo: '',
        senha: ''

    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
    const [senhaCorreta, setSenhaCorreta] = useState('');
    const [cadastrado, setCadastrado] =useState(false)
    const handleSenha = (e) => {
        const { name, value } = e.target;
        if (name == 'confirmarSenha') {
            setSenhaCorreta(value);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
      
        fetch('http://localhost:5000/Usuario', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
            .then(response => {
                if (response) {
                   
                    setCadastrado(true)

                            setFormData({

                        nome: '',
                        dataNascimento: '',
                        telefone: '',
                        sexo: '',
                        senha: ''

                    });
                } else {
                    alert('Erro ao cadastrar usuário. Por favor, tente novamente.');
                }
            })
            .catch(error => {
                console.error('Erro ao enviar dados para o backend:', error);
                alert('Erro ao cadastrar usuário. Por favor, tente novamente.');
            });
    };

    return (
       
        <div className="h-screen w-scrren">
             {cadastrado ? 
           ( <PaginaPrincipal/> ):
         
            <div className="bg-white h-screen grid grid-cols-2">
                <div className="rounded-md flex flex-col items-center h-screen">
                    <img src={cld.image(`imagesLogin/icon`).toURL()} className="mr-auto pb-14" alt="Icone logo da cidade" />
                    <h1 className="text-4xl mb-8">Cadastro</h1>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                        <label htmlFor="nome" className="text-2xl">Nome completo</label>
                        <input type="text" name="nome" value={formData.nome} onChange={handleInputChange} className="p-2 border rounded-md h-8 bg-transparent border-zinc-400" placeholder="Digite seu nome" required />

                        <label htmlFor="dataNascimento" className="text-2xl">Data de Nascimento</label>
                        <input type="date" name="dataNascimento" value={formData.dataNascimento} onChange={handleInputChange} className="p-2 border rounded-md h-8 bg-transparent border-zinc-400" required />

                        <label htmlFor="telefone" className="text-2xl">Telefone</label>
                        <input type="tel" name="telefone" value={formData.telefone} onChange={handleInputChange} className="p-2 border rounded-md h-8 bg-transparent border-zinc-400" placeholder="Ex.: 43 9 96619529" required />

                        <label htmlFor="sexo" className="text-2xl">Sexo</label>
                        <select name="sexo" value={formData.sexo} onChange={handleInputChange} className=" border rounded-md h-9 bg-transparent border-zinc-400" required>
                            <option value="masculino" >Masculino</option>
                            <option value="feminino">Feminino</option>
                        </select>

                        <label htmlFor="senha" className="text-2xl">Senha</label>
                        <input type="password" name="senha" value={formData.senha} onChange={handleInputChange} className="p-2 border rounded-md h-8 bg-transparent border-zinc-400" placeholder="Digite sua senha"required />

                        <label htmlFor="" className="text-2xl">Confirmar Senha</label>
                        <input type="password" name="confirmarSenha" onChange={handleSenha} className="p-2 border rounded-md h-8 bg-transparent border-zinc-400" placeholder="Confirme sua senha"required />

                        <AutoComplete/>
                        {formData.senha == senhaCorreta ? 
                            < input type="submit" value="Cadastrar" className="border-2 rounded-md h-8 bg-sky-200 mt-2 cursor-pointer" />
                            : <h1 className="text-red-400">As senhas precisam ser iguais</h1>
                        }
                    </form>
                </div>
                <div className="bg-[#DBEAFE] h-screen">
                    <img src={cld.image(`imagesLogin/iconLogin3`).toURL()} alt="" className="w-96 pb-4" />
                    <h1>Totem de autoatendimento</h1>
                </div>
            </div>
            }
        </div>
    );
};
