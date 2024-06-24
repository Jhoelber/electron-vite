
import { Link } from "react-router-dom"

export const Botoes = () => {
    console.log(<Link to={'/login'}>sair</Link>)
    return (
        <div className="flex items-center">



            <Link to={'/login'}>
                <button className=" flex bg-[#eee;] shadow-lg h-5 border-2 border-zinc-200  p-5 items-center rounded-md ">sair </button>
            </Link>
        </div>





    )
}