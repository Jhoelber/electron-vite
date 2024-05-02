# totem

An Electron application with React and TypeScript

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) + [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

## Project Setup

### Install

```bash
$ npm install
```

### Development

```bash
$ npm run dev
```

### Build

```bash
# For windows
$ npm run build:win

# For macOS
$ npm run build:mac

# For Linux
$ npm run build:linux
```
Para a utilização das imagens - As mesmas foram armazenadas no cloudinary para conseguir modificar de forma externa sem problemas
o modo para utilizar segue o seguinte template
 const cld = new Cloudinary({
    cloud: {
      cloudName: "dfgbasaxa"
    }

  })
  const myImage = cld.image(`images/icon.png`);
    onde o icone pode ser passado de forma dinamica
    ↓                     ↓                       ↓
    const myImage = cld.image(`images/${UrlImagesTypes.imagem}`); --> o nome dos icones estão sendo passados pelo array

 <AdvancedImage className="p-4" cldImg={myImage} />  --> forma para renderizar as imagens 





