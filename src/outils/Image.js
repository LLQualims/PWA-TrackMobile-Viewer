export const getImageOperation = (idappNatureOperation, nomImage) => {
    let img = nomImage;
  
    switch(idappNatureOperation) {
      case 1: case 2:
        return require('../assets/Images/APP_Acquisition-128-1.png');
      case 90: case 98:
        return require('../assets/Images/APP_Derogation-128-1.png');
      case 94:
        return require('../assets/Images/APP_MiseHorsService-128-1.png');
      case 95:
        return require('../assets/Images/APP_RemiseEnService-128-1.png');
      case 96:
        return require('../assets/Images/APP_MiseEnReserve-128-1.png');
      case 97:
        return require('../assets/Images/APP_MiseAuRebut-128-1.png');
      default:
        return require(`../assets/Images/${img.replace("XX-X.XXX", "128-1.png")}`);
    }
  };