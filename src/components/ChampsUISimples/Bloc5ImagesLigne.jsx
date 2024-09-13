import './ChampsUISimples.css';

export default function Bloc5ImagesLigne({ titre, image1, image2, image3, image4, image5 }) {

    function DonneBaliseImage({ srcImage, classNameCSS, titre }) {
        if (srcImage === undefined) { return null; }

        return <img src={srcImage} className={classNameCSS} alt={titre} />
    }

    return (
        <div className="bloc5imagesligne_div">
            
            <fieldset className="bloc5imagesligne_fieldset">
                <legend className="bloc5imagesligne_legend">{titre}</legend>
                    <DonneBaliseImage srcImage={image1} classNameCSS="bloc5imagesligne_img" titre={`${titre} 1`} />
                    <DonneBaliseImage srcImage={image2} classNameCSS="bloc5imagesligne_img" titre={`${titre} 2`} />

                    <DonneBaliseImage srcImage={image3} classNameCSS="bloc5imagesligne_img" titre={`${titre} 3`} />

                    <DonneBaliseImage srcImage={image4} classNameCSS="bloc5imagesligne_img" titre={`${titre} 4`} />
                    <DonneBaliseImage srcImage={image5} classNameCSS="bloc5imagesligne_img" titre={`${titre} 5`} />
            </fieldset>
        </div>
    );

};