import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
import { UrlImagesData } from "../data/UrlImagesData";
import { Icons } from "./Icons";
import Topo from "./Topo";

export const PaginaPrincipal = () => {
  const cld = new Cloudinary({
    cloud: {
      cloudName: "dfgbasaxa"
    }

  })
  const myImage = cld.image(`images/LogoIcon.png`);

  return (
    
    <div className="bg-white " id="paginaPrincipal">

      <Topo />

      <div className="grid grid-cols-1 gap-6 place-items-center md:grid-cols-2 lg:grid-cols-3 md:gap-32 md:pb-10 " >
        {UrlImagesData.map((item, index) => (
          <div key={item.id} className={`
             ${index === 12 || index === 19 || index === 20 ? ' lg:col-start-2' : ''}   /*para deixar sozinho*/
             ${index === 13 ? 'lg:col-start-1' : ''}       /*Para deixar certo na coluna*/
             ${index >= 16 ? 'w-48' : ''}                 /*Para modificar o tamanho das imagens para o tamanho 'correto'*/
             `}>
            <Icons
              UrlImagesTypes={item}
            />
          </div>
        ))}
      </div>

      <footer className="flex h-12 bg-[#014A7D] justify-center items-center py-2 text-white font-light text-xs">
        <AdvancedImage className="m-2 max-h-10" cldImg={myImage} alt="icone do rodapé" />
        <img className="m-2 max-h-10" src={`${myImage}`} alt="" />
        <p>Prefeitura Municipal de jacarezinho | <code> Jhoelber - Kellton</code> </p>
      </footer>

    </div>


  )
}