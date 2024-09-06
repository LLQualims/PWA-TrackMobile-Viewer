import './ChampsUISimples.css';

export default function TextFieldReadonly({ libelleErreur }) {

    if (libelleErreur === undefined) {
        return (
            <div className="erreur_div">
                <p className="erreur_titre">Erreur lors du chargement de la page</p>
            </div>
        );
    }

    return (
        <div className="erreur_div">
            <p className="erreur_titre">Erreur lors du chargement de la page</p>
            <p className="erreur_detail">{libelleErreur}</p>
        </div>
    );
};