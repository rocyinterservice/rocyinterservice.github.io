// pays.js - ROCYINTER - VERSION FINALE
// Pays + Villes + Quartiers + Fonctions pour les selects Pays > Ville > Quartier
window.ROCY_PAYS = [
  { nom: "Bénin", drapeau: "🇧🇯", code: "+229" },
  { nom: "Algérie", drapeau: "🇩🇿", code: "+213" },
  { nom: "Angola", drapeau: "🇦🇴", code: "+244" },
  { nom: "Burkina Faso", drapeau: "🇧🇫", code: "+226" },
  { nom: "Burundi", drapeau: "🇧🇮", code: "+257" },
  { nom: "Cameroun", drapeau: "🇨🇲", code: "+237" },
  { nom: "Cap-Vert", drapeau: "🇨🇻", code: "+238" },
  { nom: "Centrafrique", drapeau: "🇨🇫", code: "+236" },
  { nom: "Tchad", drapeau: "🇹🇩", code: "+235" },
  { nom: "Comores", drapeau: "🇰🇲", code: "+269" },
  { nom: "Congo", drapeau: "🇨🇬", code: "+242" },
  { nom: "Congo RDC", drapeau: "🇨🇩", code: "+243" },
  { nom: "Côte d'Ivoire", drapeau: "🇨🇮", code: "+225" },
  { nom: "Djibouti", drapeau: "🇩🇯", code: "+253" },
  { nom: "Égypte", drapeau: "🇪🇬", code: "+20" },
  { nom: "Guinée Équatoriale", drapeau: "🇬🇶", code: "+240" },
  { nom: "Érythrée", drapeau: "🇪🇷", code: "+291" },
  { nom: "Éthiopie", drapeau: "🇪🇹", code: "+251" },
  { nom: "Gabon", drapeau: "🇬🇦", code: "+241" },
  { nom: "Gambie", drapeau: "🇬🇲", code: "+220" },
  { nom: "Ghana", drapeau: "🇬🇭", code: "+233" },
  { nom: "Guinée", drapeau: "🇬🇳", code: "+224" },
  { nom: "Guinée-Bissau", drapeau: "🇬🇼", code: "+245" },
  { nom: "Kenya", drapeau: "🇰🇪", code: "+254" },
  { nom: "Lesotho", drapeau: "🇱🇸", code: "+266" },
  { nom: "Liberia", drapeau: "🇱🇷", code: "+231" },
  { nom: "Libye", drapeau: "🇱🇾", code: "+218" },
  { nom: "Madagascar", drapeau: "🇲🇬", code: "+261" },
  { nom: "Malawi", drapeau: "🇲🇼", code: "+265" },
  { nom: "Mali", drapeau: "🇲🇱", code: "+223" },
  { nom: "Maroc", drapeau: "🇲🇦", code: "+212" },
  { nom: "Maurice", drapeau: "🇲🇺", code: "+230" },
  { nom: "Mauritanie", drapeau: "🇲🇷", code: "+222" },
  { nom: "Mozambique", drapeau: "🇲🇿", code: "+258" },
  { nom: "Namibie", drapeau: "🇳🇦", code: "+264" },
  { nom: "Niger", drapeau: "🇳🇪", code: "+227" },
  { nom: "Nigeria", drapeau: "🇳🇬", code: "+234" },
  { nom: "Rwanda", drapeau: "🇷🇼", code: "+250" },
  { nom: "Sao Tomé", drapeau: "🇸🇹", code: "+239" },
  { nom: "Sénégal", drapeau: "🇸🇳", code: "+221" },
  { nom: "Seychelles", drapeau: "🇸🇨", code: "+248" },
  { nom: "Sierra Leone", drapeau: "🇸🇱", code: "+232" },
  { nom: "Somalie", drapeau: "🇸🇴", code: "+252" },
  { nom: "Afrique du Sud", drapeau: "🇿🇦", code: "+27" },
  { nom: "Soudan du Sud", drapeau: "🇸🇸", code: "+211" },
  { nom: "Soudan", drapeau: "🇸🇩", code: "+249" },
  { nom: "Eswatini", drapeau: "🇸🇿", code: "+268" },
  { nom: "Tanzanie", drapeau: "🇹🇿", code: "+255" },
  { nom: "Togo", drapeau: "🇹🇬", code: "+228" },
  { nom: "Tunisie", drapeau: "🇹🇳", code: "+216" },
  { nom: "Ouganda", drapeau: "🇺🇬", code: "+256" },
  { nom: "Zambie", drapeau: "🇿🇲", code: "+260" },
  { nom: "Zimbabwe", drapeau: "🇿🇼", code: "+263" },
  { nom: "Botswana", drapeau: "🇧🇼", code: "+267" },
  { nom: "France", drapeau: "🇫🇷", code: "+33" },
  { nom: "Belgique", drapeau: "🇧🇪", code: "+32" },
  { nom: "Suisse", drapeau: "🇨🇭", code: "+41" },
  { nom: "Luxembourg", drapeau: "🇱🇺", code: "+352" },
  { nom: "Italie", drapeau: "🇮🇹", code: "+39" },
  { nom: "Espagne", drapeau: "🇪🇸", code: "+34" },
  { nom: "Portugal", drapeau: "🇵🇹", code: "+351" },
  { nom: "Allemagne", drapeau: "🇩🇪", code: "+49" },
  { nom: "Royaume-Uni", drapeau: "🇬🇧", code: "+44" },
  { nom: "Pays-Bas", drapeau: "🇳🇱", code: "+31" },
  { nom: "Autriche", drapeau: "🇦🇹", code: "+43" },
  { nom: "Danemark", drapeau: "🇩🇰", code: "+45" },
  { nom: "Suède", drapeau: "🇸🇪", code: "+46" },
  { nom: "Norvège", drapeau: "🇳🇴", code: "+47" },
  { nom: "Finlande", drapeau: "🇫🇮", code: "+358" },
  { nom: "Irlande", drapeau: "🇮🇪", code: "+353" },
  { nom: "Grèce", drapeau: "🇬🇷", code: "+30" },
  { nom: "Pologne", drapeau: "🇵🇱", code: "+48" },
  { nom: "Roumanie", drapeau: "🇷🇴", code: "+40" },
  { nom: "Hongrie", drapeau: "🇭🇺", code: "+36" },
  { nom: "Tchéquie", drapeau: "🇨🇿", code: "+420" },
  { nom: "Slovaquie", drapeau: "🇸🇰", code: "+421" },
  { nom: "Croatie", drapeau: "🇭🇷", code: "+385" },
  { nom: "Slovénie", drapeau: "🇸🇮", code: "+386" },
  { nom: "Bosnie", drapeau: "🇧🇦", code: "+387" },
  { nom: "Serbie", drapeau: "🇷🇸", code: "+381" },
  { nom: "Monténégro", drapeau: "🇲🇪", code: "+382" },
  { nom: "Albanie", drapeau: "🇦🇱", code: "+355" },
  { nom: "Bulgarie", drapeau: "🇧🇬", code: "+359" },
  { nom: "Ukraine", drapeau: "🇺🇦", code: "+380" },
  { nom: "Biélorussie", drapeau: "🇧🇾", code: "+375" },
  { nom: "Lituanie", drapeau: "🇱🇹", code: "+370" },
  { nom: "Lettonie", drapeau: "🇱🇻", code: "+371" },
  { nom: "Estonie", drapeau: "🇪🇪", code: "+372" },
  { nom: "Islande", drapeau: "🇮🇸", code: "+354" },
  { nom: "Malte", drapeau: "🇲🇹", code: "+356" },
  { nom: "Chypre", drapeau: "🇨🇾", code: "+357" },
  { nom: "Russie", drapeau: "🇷🇺", code: "+7" },
  { nom: "Turquie", drapeau: "🇹🇷", code: "+90" },
  { nom: "Arménie", drapeau: "🇦🇲", code: "+374" },
  { nom: "Azerbaïdjan", drapeau: "🇦🇿", code: "+994" },
  { nom: "Géorgie", drapeau: "🇬🇪", code: "+995" },
  { nom: "Moldavie", drapeau: "🇲🇩", code: "+373" },
  { nom: "USA", drapeau: "🇺🇸", code: "+1" },
  { nom: "Canada", drapeau: "🇨🇦", code: "+1" },
  { nom: "Mexique", drapeau: "🇲🇽", code: "+52" },
  { nom: "Brésil", drapeau: "🇧🇷", code: "+55" },
  { nom: "Argentine", drapeau: "🇦🇷", code: "+54" },
  { nom: "Colombie", drapeau: "🇨🇴", code: "+57" },
  { nom: "Pérou", drapeau: "🇵🇪", code: "+51" },
  { nom: "Chili", drapeau: "🇨🇱", code: "+56" },
  { nom: "Venezuela", drapeau: "🇻🇪", code: "+58" },
  { nom: "Équateur", drapeau: "🇪🇨", code: "+593" },
  { nom: "Bolivie", drapeau: "🇧🇴", code: "+591" },
  { nom: "Paraguay", drapeau: "🇵🇾", code: "+595" },
  { nom: "Uruguay", drapeau: "🇺🇾", code: "+598" },
  { nom: "Guatemala", drapeau: "🇬🇹", code: "+502" },
  { nom: "Salvador", drapeau: "🇸🇻", code: "+503" },
  { nom: "Honduras", drapeau: "🇭🇳", code: "+504" },
  { nom: "Nicaragua", drapeau: "🇳🇮", code: "+505" },
  { nom: "Costa Rica", drapeau: "🇨🇷", code: "+506" },
  { nom: "Panama", drapeau: "🇵🇦", code: "+507" },
  { nom: "Haïti", drapeau: "🇭🇹", code: "+509" },
  { nom: "Cuba", drapeau: "🇨🇺", code: "+53" },
  { nom: "République Dominicaine", drapeau: "🇩🇴", code: "+1" },
  { nom: "Jamaïque", drapeau: "🇯🇲", code: "+1" },
  { nom: "Trinité-et-Tobago", drapeau: "🇹🇹", code: "+1" },
  { nom: "Inde", drapeau: "🇮🇳", code: "+91" },
  { nom: "Chine", drapeau: "🇨🇳", code: "+86" },
  { nom: "Japon", drapeau: "🇯🇵", code: "+81" },
  { nom: "Corée du Sud", drapeau: "🇰🇷", code: "+82" },
  { nom: "Vietnam", drapeau: "🇻🇳", code: "+84" },
  { nom: "Thaïlande", drapeau: "🇹🇭", code: "+66" },
  { nom: "Indonésie", drapeau: "🇮🇩", code: "+62" },
  { nom: "Philippines", drapeau: "🇵🇭", code: "+63" },
  { nom: "Malaisie", drapeau: "🇲🇾", code: "+60" },
  { nom: "Singapour", drapeau: "🇸🇬", code: "+65" },
  { nom: "Myanmar", drapeau: "🇲🇲", code: "+95" },
  { nom: "Cambodge", drapeau: "🇰🇭", code: "+855" },
  { nom: "Laos", drapeau: "🇱🇦", code: "+856" },
  { nom: "Bangladesh", drapeau: "🇧🇩", code: "+880" },
  { nom: "Pakistan", drapeau: "🇵🇰", code: "+92" },
  { nom: "Sri Lanka", drapeau: "🇱🇰", code: "+94" },
  { nom: "Népal", drapeau: "🇳🇵", code: "+977" },
  { nom: "Afghanistan", drapeau: "🇦🇫", code: "+93" },
  { nom: "Iran", drapeau: "🇮🇷", code: "+98" },
  { nom: "Irak", drapeau: "🇮🇶", code: "+964" },
  { nom: "Émirats", drapeau: "🇦🇪", code: "+971" },
  { nom: "Arabie Saoudite", drapeau: "🇸🇦", code: "+966" },
  { nom: "Qatar", drapeau: "🇶🇦", code: "+974" },
  { nom: "Koweït", drapeau: "🇰🇼", code: "+965" },
  { nom: "Bahreïn", drapeau: "🇧🇭", code: "+973" },
  { nom: "Oman", drapeau: "🇴🇲", code: "+968" },
  { nom: "Jordanie", drapeau: "🇯🇴", code: "+962" },
  { nom: "Liban", drapeau: "🇱🇧", code: "+961" },
  { nom: "Syrie", drapeau: "🇸🇾", code: "+963" },
  { nom: "Israël", drapeau: "🇮🇱", code: "+972" },
  { nom: "Palestine", drapeau: "🇵🇸", code: "+970" },
  { nom: "Yémen", drapeau: "🇾🇪", code: "+967" },
  { nom: "Australie", drapeau: "🇦🇺", code: "+61" },
  { nom: "Nouvelle-Zélande", drapeau: "🇳🇿", code: "+64" },
  { nom: "Fidji", drapeau: "🇫🇯", code: "+679" },
  { nom: "Papouasie", drapeau: "🇵🇬", code: "+675" },
  { nom: "Îles Salomon", drapeau: "🇸🇧", code: "+677" },
  { nom: "Vanuatu", drapeau: "🇻🇺", code: "+678" },
  { nom: "Îles Cook", drapeau: "🇨🇰", code: "+682" },
  { nom: "Nouvelle-Calédonie", drapeau: "🇳🇨", code: "+687" },
  { nom: "Polynésie", drapeau: "🇵🇫", code: "+689" }
];
window.PAYS = window.ROCY_PAYS;
window.COUNTRIES = window.ROCY_PAYS;

// ===== VILLES PAR PAYS - Les plus utilisés en premier =====
window.ROCY_VILLES = {
  "Bénin": ["Calavi","Godomey","Cotonou","Porto-Novo","Parakou","Bohicon","Abomey","Ouidah","Natitingou","Djougou","Kandi","Lokossa","Comè","Sakété","Kétou","Dassa","Savè","Malanville","Nikki","Bembèrèkè","Tchaourou","Allada","Aplahoué","Dangbo","Covè","Zogbodomey","Grand-Popo","Kpomassè","Tori-Bossito","Zè","Sô-Ava","Adjohoun","Avrankou","Adjarra","Sèmè-Kpodji","Aguégués","Akpro-Missérété","Bonou","Ouinhi","Zagnanado","Za-Kpota","Agbangnizoun","Lalo","Klouékanmè","Dogbo","Toviklin","Houéyogbé","Bopa","Athiémé","Ouèssè","Glazoué","Savalou","Bantè","Bassila","Copargo","Ouaké","Péhunco","Kérou","Banikoara","Gogounou","Ségbana","Karimama","Matéri","Cobly","Tanguiéta","Toucountouna","Boukoumbé","Kouandé","Sinendé","Kalalé","N'Dali","Pèrèrè"],
  "Togo": ["Lomé","Sokodé","Kara","Kpalimé","Atakpamé","Dapaong","Tsévié","Aného","Mango","Niamtougou"],
  "Nigeria": ["Lagos","Abuja","Ibadan","Kano","Port Harcourt","Benin City","Maiduguri","Zaria","Aba","Jos"],
  "Ghana": ["Accra","Kumasi","Takoradi","Tamale","Cape Coast","Ho","Sunyani","Bolgatanga","Wa","Koforidua"],
  "Côte d'Ivoire": ["Abidjan","Bouaké","Yamoussoukro","Daloa","San-Pédro","Korhogo","Man","Gagnoa","Divo","Abengourou"],
  "Sénégal": ["Dakar","Thiès","Kaolack","Ziguinchor","Saint-Louis","Mbour","Rufisque","Diourbel","Tambacounda","Kolda"],
  "Cameroun": ["Douala","Yaoundé","Bafoussam","Garoua","Bamenda","Ngaoundéré","Maroua","Kumba","Limbe","Kribi"],
  "Mali": ["Bamako","Sikasso","Mopti","Kayes","Ségou","Gao","Koulikoro","Koutiala","Tombouctou"],
  "Niger": ["Niamey","Zinder","Maradi","Agadez","Tahoua","Dosso","Diffa","Tillabéri"],
  "Burkina Faso": ["Ouagadougou","Bobo-Dioulasso","Koudougou","Banfora","Ouahigouya","Kaya","Tenkodogo","Dédougou","Fada N'Gourma"],
  "Guinée": ["Conakry","Nzérékoré","Kankan","Kindia","Labé","Mamou","Faranah","Boké"],
  "France": ["Paris","Lyon","Marseille","Lille","Bordeaux","Nantes","Toulouse","Montpellier","Nice","Strasbourg"],
  "Belgique": ["Bruxelles","Anvers","Gand","Charleroi","Liège","Bruges","Namur","Louvain"],
  "Canada": ["Montréal","Toronto","Vancouver","Ottawa","Québec","Calgary","Edmonton"],
  "USA": ["New York","Los Angeles","Miami","Houston","Chicago","Atlanta","Dallas","Washington"],
  "Royaume-Uni": ["Londres","Manchester","Birmingham","Liverpool","Leeds","Glasgow","Bristol"]
};
window.ROCY_VILLES_DEFAULT = ["Calavi","Godomey","Cotonou"];

// ===== QUARTIERS / LOCALITÉS - Bénin en détail, les autres en Autre =====
window.ROCY_QUARTIERS = {
  "Calavi": ["Calavi Centre","Ouèdo","Akassato","Glo-Djigbé","Hêvié","Kpanroun","Togba","Zinvié","Ouédo","Arconville","Womey","Cococodji","Cococotomey","Adjagbo","Agbatito","Aïfa","Akossavié","Alogbèdji","Atchonsa","Bodji","Djadjo","Djègbadji","Finafa","Gbodjoko","Houèto","Kandévié","Kpossidja","Lissèzoun","Missèbo","Ouéga","Sodjèatinmè","Tankpè","Togoudo","Zopah"],
  "Godomey": ["Godomey Centre","Godomey Togoudo","Hlacomey","Dèkoungbé","Sègbèya","Agbodjèdo","Aïdoha","Akogbato","Alloumè","Avlékété","Bèmbè","Dénou","Fidjrossè","Fifadji","Gbéga","Houakpè","Hounsa","Kpankpan","Kpodji","Mènontin","Sèhouè","Togbin","Wlacodji","Yagbé"],
  "Cotonou": ["Akpakpa","Fidjrossè","Ganhi","Godomey","Hlacomey","Jéricho","Kindonou","Mènontin","Missèbo","Sainte-Cécile","Sikècodji","St Michel","Vodjè","Wlacodji","Xwlacodji","Zongo","Agla","Aïbatin","Ahouansori","Ahouato","Aibatin","Akogbato","Avotrou","Bèbè","Cadjehoun","Dantokpa","Dèkoungbé","Fifadji","Gbécon","Gbéto","Guinkomey","Hindé","Houénoussou","Kpota","Kouhounou","Ladji","Marina","Midombo","N'vè","Ouidah","Plage","Port","Quartier JAK","Sègbèya","Sèkandji","Sodjatimè","Sodjeatinmè","Tokpa","Vossa","Yénawa","Zoungo"],
  "Porto-Novo": ["Dowa","Houinmè","Ouando","Tokpota","Avlékété","Dowa","Gbodjè","Houèto","Kétonou","Oganla","Sogbé","Tokpa"],
  "Parakou": ["Albarika","Baka","Banikanni","Bèrè","Dépôt","Gandokossikana","Garnou","Guèma","Korobororou","Ladji Farani","Madina","Nima","Okpara","Sinangourou","Tourou","Wansirou","Zongo"],
  "Ouidah": ["Ouidah Centre","Agbadjihoun","Agbodji","Ahouicodji","Avlékété","Djègbadji","Gbéna","Houakpè","Pahou","Savi","Tovè","Zoungbodji"],
  "Abomey": ["Abomey Centre","Djidja","Hounli","Sè","Vidolé","Zounzonmè","Agbokpa","Dètohou","Djègbé","Houndjro","Kpota","Sèhoun"],
  "Bohicon": ["Bohicon Centre","Agongointo","Avogbanna","Gnidonou","Hèssouhoun","Hountondji","Lissèzoun","Ouassaho","Passagon","Saclo","Sodohomè","Tohouè"]
};
window.rocyVillesPourPays = function(pays){
  if(!pays) return [];
  if(window.ROCY_VILLES[pays]) return window.ROCY_VILLES[pays];
  return [];
};
window.rocyQuartiersPourVille = function(ville){
  if(!ville) return [];
  if(window.ROCY_QUARTIERS[ville]) return window.ROCY_QUARTIERS[ville];
  return [];
};
window.rocyRemplirSelectPays = function(selectEl, valeurActuelle){
  if(!selectEl) return;
  selectEl.innerHTML = '<option value="">-- Choisir un pays --</option>' + window.ROCY_PAYS.map(p=>`<option value="${p.nom}" ${valeurActuelle===p.nom?'selected':''}>${p.drapeau} ${p.nom}</option>`).join('');
};
window.rocyRemplirSelectVilles = function(selectEl, pays, valeurActuelle){
  if(!selectEl) return;
  const villes = window.rocyVillesPourPays(pays);
  if(!villes.length){
    selectEl.innerHTML = '<option value="">-- Tape ta ville --</option>';
    return;
  }
  selectEl.innerHTML = '<option value="">-- Choisir une ville --</option>' + villes.map(v=>`<option value="${v}" ${valeurActuelle===v?'selected':''}>${v}</option>`).join('');
};
window.rocyRemplirSelectQuartiers = function(selectEl, ville, valeurActuelle){
  if(!selectEl) return;
  const q = window.rocyQuartiersPourVille(ville);
  if(!q.length){
    selectEl.innerHTML = '<option value="">-- Tape ton quartier --</option>';
    return;
  }
  selectEl.innerHTML = '<option value="">-- Choisir un quartier --</option>' + q.map(x=>`<option value="${x}" ${valeurActuelle===x?'selected':''}>${x}</option>`).join('');
};
window.rocyBrancherPaysVilleQuartier = function(selPays, selVille, selQuartier){
  if(!selPays || !selVille) return;
  window.rocyRemplirSelectPays(selPays, selPays.value);
  const majVille = function(){
    window.rocyRemplirSelectVilles(selVille, selPays.value, selVille.value);
    if(selQuartier) window.rocyRemplirSelectQuartiers(selQuartier, selVille.value, selQuartier.value);
  };
  selPays.addEventListener('change', majVille);
  selVille.addEventListener('change', function(){ if(selQuartier) window.rocyRemplirSelectQuartiers(selQuartier, selVille.value, ''); });
  majVille();
};
