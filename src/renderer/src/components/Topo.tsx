// Topo.jsx
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
import { Botoes } from "./Botoes";

const Topo = () => {



  const cld = new Cloudinary({
    cloud: {
      cloudName: "dfgbasaxa"
    }
  });

  const myImage = cld.image(`images/icon.png`);

  return (
    <header>
      <div className="flex justify-between items-center">
        <AdvancedImage className="p-4" cldImg={myImage} alt="icone do topo" />
                
          <Botoes />
                 
      </div>
      <div className="flex items-center justify-center gap-24 pb-10 mt-10 ">
        <h1 className="text-xl text-center text-zinc-400 md:text-3xl">SALA DO EMPREENDEDOR</h1>
      </div>
    </header>
  );
};
export default Topo;