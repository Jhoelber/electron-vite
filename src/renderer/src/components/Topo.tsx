import { AdvancedImage } from "@cloudinary/react"
import { Cloudinary } from "@cloudinary/url-gen";

export const Topo = () => {
  const cld = new Cloudinary({
    cloud: {
      cloudName: "dfgbasaxa"
    }

  })
  const myImage = cld.image(`images/icon.png`);


  return (

    <header>
      <AdvancedImage className="p-4" cldImg={myImage} />

      <div className="flex items-center justify-center gap-24 pb-10 mt-10 ">
        <h1 className="text-xl text-center text-zinc-400 md:text-3xl" >SALA DO EMPREENDEDOR</h1>
      </div>

    </header>



  )




}
