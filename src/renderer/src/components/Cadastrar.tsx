import { Cloudinary } from "@cloudinary/url-gen";
import AutoComplete from "./AutoComplete";

export const Cadastrar = () => {

    const cld = new Cloudinary({
        cloud: {
            cloudName: "dfgbasaxa"
        }
    });



    return (
        <div className=" h-screen w-scrren">
            <div className="grid grid-cols-2">

                <div className=" rounded-md  flex flex-col items-center h-screen">
                   
                    <img src={cld.image(`imagesLogin/icon`).toURL()} className="mr-auto pb-14" alt="Icone logo da cidade" />
                    <h1 className="text-4xl mb-8">Cadastro</h1>
                    <form action="" className="flex flex-col w-56  gap-2">

                        <label htmlFor="" className="text-2xl">Nome completo</label>
                        <input type="text" className=" p-2 border rounded-md h-8 bg-transparent   border-zinc-400" placeholder="digite seu nome" />

                        <label htmlFor="" className="text-2xl">Data de nascimento</label>
                        <input type="datetime" name="" id="" className=" p-2 border rounded-md bg-transparent  border-zinc-400 h-8" placeholder="Exemplo: 15012000" />

                        <label htmlFor="" className="text-2xl">Telefone</label>
                        <input type="text" className=" p-2 border bg-transparent  border-zinc-400 rounded-md h-8" placeholder="Ex.: 43 9 96619529" />





                        <label htmlFor="" className="text-2xl">Sexo</label>
                        <select name="sexo" id="sexo" className=" border bg-transparent  border-zinc-400 rounded-md h-8 " >
                            <option value="masculino">masculino</option>
                            <option value="feminino">feminino</option>

                        </select>
                        <label htmlFor="" className="text-2xl" >Senha</label>
                        <input type="password" name="senha" id="" className=" p-2 border bg-transparent  border-zinc-400 rounded-md h-8" placeholder="digite sua senha" />

                        <label htmlFor="" className="text-2xl">Confirmar senha</label>
                        <input type="password" name="confirmarSenha" id="" className=" p-2 border bg-transparent  border-zinc-400 rounded-md h-8" placeholder="confirme sua senha" />
                        <AutoComplete />
                        <input type="submit" value="Cadastrar" className="border-2 rounded-md h-8  bg-sky-200 mt-2 cursor-pointer" />

                    </form>



                </div>

                <div className="bg-[#DBEAFE] ">
                    <img src={cld.image(`imagesLogin/iconLogin3`).toURL()} alt="" className="w-96 pb-4" />
                    <h1>Totem de autoatendimento</h1>

                </div>


            </div>




        </div>




    )

}