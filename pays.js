// pays.js - LA SEULE LISTE DE PAYS POUR TOUT LE SITE
window.ROCY_PAYS = [
"Bénin","Togo","Côte d'Ivoire","Sénégal","Cameroun","Nigeria","Ghana","Mali","Burkina Faso","Niger","Guinée","Guinée-Bissau","Guinée Équatoriale","Gambie","Sierra Leone","Liberia","Cap-Vert","Mauritanie","Maroc","Algérie","Tunisie","Libye","Égypte","Soudan","Soudan du Sud","Éthiopie","Érythrée","Djibouti","Somalie","Kenya","Ouganda","Tanzanie","Rwanda","Burundi","Congo","Congo RDC","Gabon","Centrafrique","Tchad","Angola","Zambie","Zimbabwe","Mozambique","Malawi","Madagascar","Maurice","Seychelles","Comores","Afrique du Sud","Namibie","Botswana","Lesotho","Eswatini",
"France","Belgique","Suisse","Luxembourg","Italie","Espagne","Portugal","Allemagne","Royaume-Uni","Pays-Bas","Autriche","Danemark","Suède","Norvège","Finlande","Irlande","Grèce","Pologne","Roumanie","Hongrie","Tchéquie","Slovaquie","Croatie","Slovénie","Bosnie","Serbie","Monténégro","Albanie","Bulgarie","Ukraine","Biélorussie","Lituanie","Lettonie","Estonie","Islande","Malte","Chypre","Russie","Turquie","Arménie","Azerbaïdjan","Géorgie","Moldavie",
"USA","Canada","Mexique","Brésil","Argentine","Colombie","Pérou","Chili","Venezuela","Équateur","Bolivie","Paraguay","Uruguay","Guatemala","Salvador","Honduras","Nicaragua","Costa Rica","Panama","Haïti","Cuba","République Dominicaine","Jamaïque","Trinité-et-Tobago",
"Inde","Chine","Japon","Corée du Sud","Vietnam","Thaïlande","Indonésie","Philippines","Malaisie","Singapour","Myanmar","Cambodge","Laos","Bangladesh","Pakistan","Sri Lanka","Népal","Afghanistan","Iran","Irak","Émirats","Arabie Saoudite","Qatar","Koweït","Bahreïn","Oman","Jordanie","Liban","Syrie","Israël","Palestine","Yémen",
"Australie","Nouvelle-Zélande","Fidji","Papouasie","Îles Salomon","Vanuatu","Îles Cook","Nouvelle-Calédonie","Polynésie"
];
window.rocyRemplirPays = function(selectId){
  const sel = document.getElementById(selectId);
  if(!sel) return;
  const actuel = sel.value;
  sel.innerHTML = '<option value="">Tous les pays</option>' + window.ROCY_PAYS.map(p=>`<option value="${p}">${p}</option>`).join('');
  if(actuel) sel.value = actuel;
};
