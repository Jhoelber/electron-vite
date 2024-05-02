
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
import { UrlImagesTypes } from "../types/UrlImagesTypes";

type Props = {
  UrlImagesTypes: UrlImagesTypes
}

export const Icons = ({ UrlImagesTypes }: Props) => {
  const cld = new Cloudinary({
    cloud: {
      cloudName: "dfgbasaxa"
    }

  })
  const myImage = cld.image(`images/${UrlImagesTypes.imagem}`);

  return (

    <div className="mx-auto" >

      <a className="text-black" href={UrlImagesTypes.url}>

        <div className="card">
        <AdvancedImage className="image"  cldImg={myImage} alt={`icone de ${UrlImagesTypes.descricao}`}  />
          <img className="image" src={`${myImage}`} alt="" />
          <div>
            <h2 className="h-10 text-center tamanhoTexto" >{UrlImagesTypes.descricao}</h2>
          </div>
        </div>
      </a>


    </div>

  );
};
