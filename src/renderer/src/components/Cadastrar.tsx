import { Cloudinary } from "@cloudinary/url-gen";
import { useState } from "react";
import 'react-phone-input-2/lib/style.css';
import { useNavigate } from "react-router-dom";
import AutoComplete from "./AutoComplete";
import { Botoes } from "./Botoes";


export const Cadastrar = () => {
    const cld = new Cloudinary({
        cloud: {
            cloudName: "dfgbasaxa"
        }
    });

    const [formData, setFormData] = useState({
        id: 0,
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
    const [telefoneCorreto, setTelefoneCorreto] = useState('')



    const handleSenha = (e) => {
        const { name, value } = e.target;
        if (name == 'confirmarSenha') {
            setSenhaCorreta(value);
        }
    }
    const navigate = useNavigate()
    const [lastId, setLastId] = useState(0);
    const handleSubmit = (e) => {
        e.preventDefault();
        const newId = lastId + 1;
        const newFormData = { ...formData, id: newId };
        fetch('http://localhost:5000/Usuario', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newFormData)
        })
            .then(response => {
                if (response) {

                    setFormData({
                        id: newId,
                        nome: '',
                        dataNascimento: '',
                        telefone: '',
                        sexo: '',
                        senha: ''

                    });
                    setLastId(newId);
                    navigate('/principal')


                } else {
                    alert('Erro ao cadastrar usuario');
                }
            })
            .catch(error => {
                console.error('Erro ao enviar dados: ', error);
                alert('Erro ao cadastrar usuario');
            });
    };

    const validNumber = [
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "Backspace",
    ];

    return (
        <div className="h-screen w-scrren">

            <div className="bg-white h-screen grid grid-cols-2">
                <div className="rounded-md flex flex-col items-center h-screen">
                    <img src={cld.image(`imagesLogin/icon`).toURL()} className="mr-auto " alt="Icone logo da cidade" />

                    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                        <label htmlFor="nome" className="text-xl">Nome completo</label>
                        <input type="text" name="nome" value={formData.nome} onChange={handleInputChange} className="p-2 border rounded-md h-8 bg-transparent border-zinc-400" placeholder="Digite seu nome" required />

                        <label htmlFor="dataNascimento" className="text-xl">Data de Nascimento</label>
                        <input type="date" name="dataNascimento" value={formData.dataNascimento} onChange={handleInputChange} className="p-2 border rounded-md h-8 bg-transparent border-zinc-400" required />

                        <label htmlFor="telefone" className="text-xl">Telefone</label>

                        <input
                            className="p-2 border rounded-md h-8 bg-transparent border-zinc-400"
                            type="tel"
                            required
                            placeholder="Digite seu telefone"
                            value={formData.telefone}
                            onChange={(handleInputChange) => {
                                setFormData((prevData) => ({
                                    ...prevData,
                                    telefone: handleInputChange.target.value,
                                }));
                            }}
                            onKeyDown={(e) => {
                                if (!validNumber.includes(e.key)) {
                                    e.preventDefault();
                                }
                            }}
                        />

                        <label htmlFor="telefone" className="text-xl">Confirmar Telefone</label>

                        <input
                            className="p-2 border rounded-md h-8 bg-transparent border-zinc-400"
                            type="tel"
                            name="confirmarTelefone"
                            id="confirmarTelefone"
                            value={telefoneCorreto}
                            onChange={(e) => setTelefoneCorreto(e.target.value)}
                            placeholder="Confirme seu telefone"
                            required
                            onKeyDown={(e) => {
                                if (!validNumber.includes(e.key)) {
                                    e.preventDefault();
                                }
                            }}
                        />

                        <div >
                            <label htmlFor="sexo" className="text-xl mr-2">Sexo</label>
                            <select name="sexo" value={formData.sexo} onChange={handleInputChange} className=" border rounded-md h-9 bg-transparent border-zinc-400" required>
                                <option value="" >Selecione uma opção</option>
                                <option value="masculino" >Masculino</option>
                                <option value="feminino">Feminino</option>
                            </select>
                        </div>

                        <label htmlFor="senha" className="text-xl">Senha</label>
                        <input type="password" name="senha" value={formData.senha} onChange={handleInputChange} className="p-2 border rounded-md h-8 bg-transparent border-zinc-400" placeholder="Digite sua senha" required />

                        <label htmlFor="" className="text-xl">Confirmar Senha</label>
                        <input type="password" name="confirmarSenha" onChange={handleSenha} className="p-2 border rounded-md h-8 bg-transparent border-zinc-400" placeholder="Confirme sua senha" required />

                        <AutoComplete />

                        {formData.senha == senhaCorreta && formData.telefone == telefoneCorreto && senhaCorreta != null ?
                            < input type="submit" value="Cadastrar" className="border-2 rounded-md h-8 bg-sky-200 mt-2 cursor-pointer" />
                            : <h1 className="text-red-400">telefone ou senha estão incorretos</h1>
                        }

                    </form>
                </div>
                <div className="bg-[#DBEAFE] h-screen">
                    <div className="flex justify-end m-2">

                        <Botoes />
                    </div>
                    <div className="flex justify-center mt-40">
                        <img src={cld.image(`imagesLogin/logoCadastro`).toURL()} alt="" className="w-96 pb-4" />
                    </div>

                </div>
            </div>

        </div>
    );
};