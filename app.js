// ============================================
// ROCYINTER SERVICES - app.js V3 FINAL
// 1 seul fichier pour les 46 pages
// Logo + Header + Footer + Langue + Monnaie + Pays + Localité + Rôles
// ============================================

// --- 1. CONFIG SUPABASE ---
const SUPABASE_URL = "https://gdwgjsloivrpxxvggxyz.supabase.co";
const SUPABASE_KEY = "sb_publishable_toAIjzrpbo2mNqPqLKlI9Q_sqzcR6dF";
let supabaseClient = null;
if (window.supabase && window.supabase.createClient) {
  supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
  window.supabaseClient = supabaseClient;
}

// --- 2. ETAT GLOBAL ---
let LANG = localStorage.getItem('rocy_lang') || 'fr';
let DEVISE = localStorage.getItem('rocy_devise') || 'FCFA';
let PAYS = localStorage.getItem('rocy_pays') || '';
let LOCALITE = localStorage.getItem('rocy_localite') || '';

// --- 3. PAYS - MONDIAL ---
const PAYS_LISTE = [
  "Tous les pays","Bénin","Togo","Ghana","Nigeria","Côte d'Ivoire","Sénégal","Mali","Burkina Faso","Niger","Cameroun","Gabon","Congo","RDC","Kenya","Afrique du Sud","Maroc","Algérie","Tunisie","Égypte","France","Belgique","Suisse","Canada","États-Unis","Brésil","Mexique","Inde","Chine","Japon","Émirats Arabes Unis","Royaume-Uni","Allemagne","Espagne","Portugal","Italie"
];

// --- 4. MONNAIES - Base FCFA ---
const TAUX = { FCFA:1, EUR:0.00152, USD:0.00165, NGN:2.45, GHS:0.025, XOF:1, GBP:0.0013, CAD:0.0022 };
const SYMBOLE = { FCFA:'FCFA', EUR:'€', USD:'$', NGN:'₦', GHS:'₵', XOF:'FCFA', GBP:'£', CAD:'C$' };
function convertirPrix(prixFCFA){
  const taux = TAUX[DEVISE] || 1;
  const val = prixFCFA * taux;
  if(DEVISE==='FCFA'||DEVISE==='XOF'||DEVISE==='NGN') return Math.round(val).toLocaleString('fr-FR') + ' ' + (SYMBOLE[DEVISE]||DEVISE);
  return val.toFixed(2) + ' ' + (SYMBOLE[DEVISE]||DEVISE);
}
function appliquerMonnaies(){
  document.querySelectorAll('[data-prix]').forEach(el=>{
    const base = parseFloat(el.getAttribute('data-prix')) || 0;
    el.textContent = convertirPrix(base);
  });
  const l = document.getElementById('deviseLabel'); if(l) l.textContent = DEVISE;
}

// --- 5. TRADUCTIONS - FR / EN - Toutes les pages changent en même temps ---
const TRADUCTIONS = {
  fr: { accueil:"Accueil", manger:"Manger", domicile:"Services à domicile", pro:"Services Professionnels", sejour:"Séjourner & Immobilier", connexion:"Connexion", inscription:"Inscription", escrow:"Portefeuille Escrow", monCompte:"Mon compte", heroTitre:"Manger, Se faire servir, Séjourner.", heroSous:"Partout, depuis chez vous.", heroDesc:"Commandez un plat, trouvez un artisan de confiance, un professionnel qualifié ou un lieu pour séjourner. Paiement 100% sécurisé en escrow.", commentCaMarche:"Comment ça marche ?", ccmDesc:"Vous choisissez, vous payez en escrow, le prestataire travaille, vous validez, nous libérons l'argent. Simple, transparent et sécurisé pour tous.", escrowTitre:"Paiement 100% Escrow", escrowDesc:"Vous payez à Rocyinter. Nous bloquons l'argent. Le prestataire fait le travail. Vous validez. Nous libérons l'argent.", voirPortefeuille:"Voir mon portefeuille Escrow", aPropos:"À propos", aide:"Aide & FAQ", conditions:"Conditions Générales", confidentialite:"Confidentialité", droits:"Rocyinter Services - Rocyinter Commerce Général. Tous droits réservés.", descriptionFooter:"La plateforme mondiale qui connecte clients, prestataires et livreurs. Paiement sécurisé en escrow pour chaque mission." },
  en: { accueil:"Home", manger:"Food", domicile:"Home Services", pro:"Professional Services", sejour:"Stay & Real Estate", connexion:"Login", inscription:"Sign Up", escrow:"Escrow Wallet", monCompte:"My Account", heroTitre:"Eat, Get Served, Stay.", heroSous:"Everywhere, from home.", heroDesc:"Order a meal, find a trusted artisan, a qualified professional or a place to stay. 100% secure escrow payment.", commentCaMarche:"How it works ?", ccmDesc:"You choose, you pay in escrow, the provider works, you validate, we release the money. Simple, transparent and secure for everyone.", escrowTitre:"100% Escrow Payment", escrowDesc:"You pay Rocyinter. We hold the money. The provider does the work. You validate. We release the money.", voirPortefeuille:"View my Escrow Wallet", aPropos:"About", aide:"Help & FAQ", conditions:"Terms", confidentialite:"Privacy", droits:"Rocyinter Services - Rocyinter General Trade. All rights reserved.", descriptionFooter:"The global platform connecting clients, providers and couriers. Secure escrow payment for every mission." }
};
function t(cle){ const lang = TRADUCTIONS[LANG] || TRADUCTIONS['fr']; return lang[cle] || TRADUCTIONS['fr'][cle] || cle; }
function appliquerTraductions(){
  document.querySelectorAll('[data-trad]').forEach(el=>{ el.textContent = t(el.getAttribute('data-trad')); });
  const l = document.getElementById('langLabel'); if(l) l.textContent = LANG.toUpperCase();
}

// --- 6. SELECT PAYS + LOCALITE - SUR CHAQUE PAGE ---
function creerSelectPays(){
  const zone = document.getElementById('select-pays-zone');
  if(!zone) return;
  zone.innerHTML = `
    <div style="background:#fff;border:1px solid #D8E2F0;border-radius:16px;padding:14px;max-width:860px;margin:0 auto 16px;box-shadow:0 6px 20px rgba(10,26,51,.08)">
      <div style="display:flex;gap:10px;flex-wrap:wrap;justify-content:center">
        <select id="selectPays" onchange="changerPays(this.value)" style="flex:1;min-width:180px;padding:12px;border-radius:10px;border:1px solid #D8E2F0;font-size:15px;font-weight:700">
          ${PAYS_LISTE.map(p=>`<option value="${p==='Tous les pays'?'':p}" ${PAYS===p?'selected':''} ${p==='Tous les pays' && !PAYS ? 'selected':''}>${p==='Tous les pays' ? '🌍 Tous les pays' : '📍 ' + p}</option>`).join('')}
        </select>
        <input id="inputLocalite" type="text" placeholder="🔍 Ville / Quartier / Localité... Ex: Abomey-Calavi" value="${LOCALITE}" oninput="changerLocalite(this.value)" style="flex:1;min-width:200px;padding:12px;border-radius:10px;border:1px solid #D8E2F0;font-size:15px">
        <button onclick="effacerFiltrePays()" style="background:#0A1A33;color:#fff;padding:12px 16px;border-radius:10px;font-weight:700">Effacer</button>
      </div>
      <p id="infoPays" style="text-align:center;font-size:13px;color:#5E6B7F;margin-top:8px"></p>
    </div>`;
  majInfoPays();
}
function majInfoPays(){
  const info = document.getElementById('infoPays');
  if(!info) return;
  if(!PAYS && !LOCALITE) info.textContent = "🌍 Tu vois tous les pays. Choisis un pays pour voir seulement ses restaurants / prestataires.";
  else if(PAYS && LOCALITE) info.textContent = `📍 Résultats pour : ${PAYS} • Localité : ${LOCALITE}`;
  else if(PAYS) info.textContent = `📍 Résultats pour : ${PAYS} • Toutes les localités`;
  else info.textContent = `📍 Localité : ${LOCALITE} • Tous les pays`;
}
function changerPays(val){
  PAYS = val; localStorage.setItem('rocy_pays', PAYS);
  majInfoPays();
  if(typeof filtrerParPays === 'function') filtrerParPays();
}
function changerLocalite(val){
  LOCALITE = val; localStorage.setItem('rocy_localite', LOCALITE);
  majInfoPays();
  if(typeof filtrerParPays === 'function') filtrerParPays();
}
function effacerFiltrePays(){
  PAYS=''; LOCALITE=''; localStorage.removeItem('rocy_pays'); localStorage.removeItem('rocy_localite');
  const s=document.getElementById('selectPays'); if(s) s.value='';
  const l=document.getElementById('inputLocalite'); if(l) l.value='';
  majInfoPays();
  if(typeof filtrerParPays === 'function') filtrerParPays();
}

// FILTRE GLOBAL - Chaque carte doit avoir data-pays="Bénin" data-localite="Abomey-Calavi"
function filtrerParPays(){
  const items = document.querySelectorAll('[data-pays]');
  if(!items.length) return;
  let visibles = 0;
  items.forEach(item=>{
    const paysItem = (item.getAttribute('data-pays')||'').toLowerCase();
    const locItem = (item.getAttribute('data-localite')||'').toLowerCase();
    const okPays = !PAYS || paysItem === PAYS.toLowerCase() || paysItem === '';
    const okLoc = !LOCALITE || locItem.includes(LOCALITE.toLowerCase());
    const show = okPays && okLoc;
    item.style.display = show ? 'flex' : 'none';
    if(show) visibles++;
  });
  const vide = document.getElementById('message-vide');
  if(vide){
    if(visibles===0){
      vide.style.display='block';
      vide.innerHTML = `Aucun résultat pour <b>${PAYS||'tous les pays'}</b> ${LOCALITE?`• <b>${LOCALITE}</b>`:''}.<br>Sois le premier à proposer un service ici.<br><br><a href="devenir-prestataire.html" class="btn">Devenir prestataire →</a>`;
    } else vide.style.display='none';
  }
}

// --- 7. ROLES - VISITEUR / CLIENT / PRESTATAIRE / ADMIN ---
function getRoleUtilisateur(){
  return localStorage.getItem('rocy_role') || 'visiteur';
}
function getUtilisateur(){
  try{ return JSON.parse(localStorage.getItem('rocy_user')||'null'); }catch(e){ return null; }
}
function estConnecte(){ return !!getUtilisateur(); }

// --- 8. EN-TETE + PIED DE PAGE - LOGO TEXTE ROCYINTER ---
function injecterHeaderFooter(){
  const header = document.getElementById('site-header');
  if(header){
    header.className='site-header';
    const connecte = estConnecte();
    const role = getRoleUtilisateur();
    let lienCompte = 'connexion.html';
    let texteCompte = t('connexion');
    if(connecte){
      if(role==='admin') lienCompte='dashboard-admin.html';
      else if(role==='prestataire') lienCompte='dashboard-prestataire.html';
      else lienCompte='dashboard-client.html';
      texteCompte = t('monCompte');
    }
    header.innerHTML=`
      <div class="header-inner">
        <a href="index.html" class="logo">ROCY<span>INTER</span><small>SERVICES</small></a>
        <nav class="main-nav">
          <a href="index.html" data-trad="accueil">Accueil</a>
          <a href="manger.html" data-trad="manger">Manger</a>
          <a href="services-domicile.html" data-trad="domicile">Services à domicile</a>
          <a href="services-pro.html" data-trad="pro">Services Professionnels</a>
          <a href="sejourner.html" data-trad="sejour">Séjourner & Immobilier</a>
        </nav>
        <div class="header-actions">
          <button class="pill" onclick="changerLangue()">🌐 <span id="langLabel">${LANG.toUpperCase()}</span></button>
          <button class="pill" onclick="changerMonnaie()">💰 <span id="deviseLabel">${DEVISE}</span></button>
          <a href="${lienCompte}" class="pill pill-jaune">${texteCompte}</a>
        </div>
      </div>`;
  }
  const footer = document.getElementById('site-footer');
  if(footer){
    footer.className='site-footer';
    footer.innerHTML=`
      <div class="footer-inner">
        <div><div class="logo" style="font-size:22px">ROCY<span>INTER</span><small>SERVICES</small></div><p data-trad="descriptionFooter" style="margin-top:10px">La plateforme mondiale qui connecte clients, prestataires et livreurs. Paiement sécurisé en escrow pour chaque mission.</p></div>
        <div><h4 data-trad="accueil">Accueil</h4><a href="manger.html" data-trad="manger">Manger</a><a href="services-domicile.html" data-trad="domicile">Services à domicile</a><a href="services-pro.html" data-trad="pro">Services Professionnels</a><a href="sejourner.html" data-trad="sejour">Séjourner & Immobilier</a><a href="escrow.html" data-trad="escrow">Portefeuille Escrow</a></div>
        <div><h4 data-trad="aPropos">À propos</h4><a href="comment-ca-marche.html" data-trad="commentCaMarche">Comment ça marche ?</a><a href="aide.html" data-trad="aide">Aide & FAQ</a><a href="conditions.html" data-trad="conditions">Conditions Générales</a><a href="confidentialite.html" data-trad="confidentialite">Confidentialité</a><a href="connexion.html" data-trad="connexion">Connexion</a></div>
      </div>
      <div class="footer-bottom">© 2026 <span data-trad="droits">Rocyinter Services - Rocyinter Commerce Général. Tous droits réservés.</span></div>`;
  }
}

// --- 9. ACTIONS ---
function changerLangue(){
  const choix = prompt("Choisis ta langue : fr, en", LANG);
  if(choix && TRADUCTIONS[choix.toLowerCase()]){ LANG=choix.toLowerCase(); localStorage.setItem('rocy_lang',LANG); location.reload(); }
}
function changerMonnaie(){
  const choix = prompt("Choisis ta monnaie : FCFA, EUR, USD, NGN, GHS, GBP, CAD", DEVISE);
  if(choix && TAUX[choix.toUpperCase()]){ DEVISE=choix.toUpperCase(); localStorage.setItem('rocy_devise',DEVISE); location.reload(); }
}

// --- 10. LANCEMENT ---
document.addEventListener('DOMContentLoaded', ()=>{
  injecterHeaderFooter();
  creerSelectPays();
  appliquerTraductions();
  appliquerMonnaies();
  filtrerParPays();
});
