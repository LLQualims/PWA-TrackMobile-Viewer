export const getCouleurWindev = (color) => {
    console.log(color);
    const bleu = Math.floor(color / 65536);
    const vert = Math.floor((color - (bleu * 65536)) / 256);
    const rouge = color - (bleu * 65536) - (vert * 256);

    // Retourne la couleur au format rgb
    return `rgb(${rouge}, ${vert}, ${bleu})`;
};