// Récupération des pièces depuis le fichier JSON
const pieces = await fetch("pieces-autos.json").then(pieces => pieces.json());

// On crée une fonction qui va générer toutes les pièces sur la pages
function genererPieces(pieces){
    for (let i = 0; i < pieces.length; i++) {
        // On pourrait créer une variable article pour éviter de mettre piece[i];
        // const article = pieces[i];

        // Récupération de l'élément du DOM qui accueillera les fiches
        const sectionFiches = document.querySelector(".fiches");
        // Création d’une balise dédiée à une pièce automobile
        const pieceElement = document.createElement("article");
        // Création des balises 
        const imageElement = document.createElement("img");
        imageElement.src = pieces[i].image;
        pieceElement.appendChild(imageElement);
        const nomElement = document.createElement("h2");
        nomElement.innerText = pieces[i].nom;
        pieceElement.appendChild(nomElement);
        const prixElement = document.createElement("p");
        prixElement.innerText = `Prix: ${pieces[i].prix} € (${pieces[i].prix < 35 ? "€" : "€€€"})`;
        pieceElement.appendChild(prixElement);
        const categorieElement = document.createElement("p");
        categorieElement.innerText = pieces[i].categorie ?? "(aucune catégorie)";
        pieceElement.appendChild(categorieElement);
        const descriptionElement = document.createElement("p");
        descriptionElement.innerText = pieces[i].description ?? "Pas de description pour le moment.";
        pieceElement.appendChild(descriptionElement);
        const stockElement = document.createElement("p");
        stockElement.innerText = pieces[i].disponibilite ? "En stock" : "Rupture de stock";
        pieceElement.appendChild(stockElement);
        // On rattache la balise article a la section Fiches
        sectionFiches.appendChild(pieceElement);
     }
}
// Ici on appel une premiere fois les pieces
genererPieces(pieces);
 
 // TRIER CROISSANT
const boutonTrier = document.querySelector(".btn-trier");
boutonTrier.addEventListener("click", function () {
    const piecesOrdonnees = Array.from(pieces);
    piecesOrdonnees.sort(function (a, b) {
        return a.prix - b.prix;
     });
     // On vide la page de son contenu
     document.querySelector(".fiches").innerHTML = "";
     // On affiche uniquement les objets triés par ordre croissant
     genererPieces(piecesOrdonnees);
});

// FILTRER
const boutonFiltrer = document.querySelector(".btn-filtrer");
boutonFiltrer.addEventListener("click", function () {
    const piecesFiltrees = pieces.filter(function (piece) {
        return piece.prix <= 35;
    });
    // On vide la page de son contenu
    document.querySelector(".fiches").innerHTML = "";
    // On affiche uniquement les objets inférieurs à 35 euros
    genererPieces(piecesFiltrees);
});

// AVEC DESCRIPTION
const boutonAvecDescription = document.querySelector(".btn-avecdescription");
boutonAvecDescription.addEventListener("click", function () {
    const piecesDescription = pieces.filter(function (piece) {
        return piece.description;
    });
    // On vide la page de son contenu
    document.querySelector(".fiches").innerHTML = "";
    // On affiche uniquement les objets qui ont une description
    genererPieces(piecesDescription);
});

// TRIER DECROISSANT
const boutonDecroissant = document.querySelector(".btn-decroissant");
boutonDecroissant.addEventListener("click", function () {
    const piecesDecroissantes = Array.from(pieces);
    piecesDecroissantes.sort(function (a, b) {
        return b.prix - a.prix;
     });
     // On vide la page de son contenu
     document.querySelector(".fiches").innerHTML = "";
     // On affiche uniquement les objets triés par ordre décroissant
     genererPieces(piecesDecroissantes);
});
