import { Modal } from '@mui/material';
import { useState } from 'react';
import { useUser } from './context/UseUser';

export const AbrirModal = ({ open, handleClose }) => {
    const { userData, setUserData } = useUser();
    const [editedUserData, setEditedUserData] = useState(userData  );
    const [senhaCorreta, setSenhaCorreta] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedUserData({...editedUserData!, [name]:value});

    };
    const handleSenha = (e) => {
        const { name, value } = e.target;
        if (name === 'confirmarSenha') {
            setSenhaCorreta(value);
        }
    }
    const handleSaveChanges = () => {

        fetch(`http://localhost:5000/Usuario/${editedUserData!.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(editedUserData),
        })
            .then(response => response.json())
            .then(updatedUserData => {
                setUserData(updatedUserData);
                handleClose();
            })
            .catch(error => {
                console.error('Erro ao atualizar os dados do usuário:', error);
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

        <div>
            <Modal open={open} onClose={handleClose}>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-md">
                    <div className='flex justify-end'>
                        <button onClick={handleClose} className="text-sm">Fechar</button>
                    </div>
                    <form className="flex flex-col gap-2">
                        <label htmlFor="nome" className="text-xl">Nome completo</label>
                        <input
                            type="text"
                            name="nome"
                            className="p-2 border rounded-md h-8 bg-transparent border-zinc-400"
                            placeholder="Digite seu nome"
                            value={editedUserData?.nome}
                            onChange={handleInputChange}
                        />

                        <label htmlFor="dataNascimento" className="text-xl">Data de Nascimento</label>
                        <input
                            type="date"
                            name="dataNascimento"
                            className="p-2 border rounded-md h-8 bg-transparent border-zinc-400"
                            value={editedUserData?.dataNascimento}
                            onChange={handleInputChange}
                        />

                        <div >
                            <label htmlFor="sexo" className="text-xl mr-2">Sexo</label>
                            <select name="sexo" value={editedUserData?.sexo} onChange={handleInputChange} className=" border rounded-md h-9 bg-transparent border-zinc-400" required>
                                <option value="" >Selecione uma opção</option>
                                <option value="masculino" >Masculino</option>
                                <option value="feminino">Feminino</option>
                            </select>
                        </div>

                        <label htmlFor="tel" className="text-xl">Telefone</label>
                        <input
                            type="tel"
                            name="telefone"
                            className="p-2 border rounded-md h-8 bg-transparent border-zinc-400"
                            placeholder="Digite seu telefone"
                            value={editedUserData?.telefone}
                            onChange={handleInputChange}
                            onKeyDown={(e) => {
                                if (!validNumber.includes(e.key)) {
                                    e.preventDefault();
                                }
                            }}
                        />

                        <label htmlFor="senha" className="text-xl">Nova senha</label>
                        <input
                            type="password"
                            name="senha"
                            className="p-2 border rounded-md h-8 bg-transparent border-zinc-400"
                            value={editedUserData?.senha}
                            onChange={handleInputChange}
                        />

                        <label htmlFor="senha" className="text-xl">Confirmar nova senha</label>
                        <input
                            type="password"
                            name="confirmarSenha"
                            className="p-2 border rounded-md h-8 bg-transparent border-zinc-400"
                            onChange={handleSenha}
                        />

                        {editedUserData?.senha == senhaCorreta ?
                            <button type="button" onClick={handleSaveChanges} className="bg-sky-400 rounded-md mt-2 text-white p-1">
                                Salvar
                            </button>
                            : <h1 className='text-red-600'>Nova senha incorreta</h1>
                        }

                    </form>
                </div>
            </Modal>
        </div>
    );
};