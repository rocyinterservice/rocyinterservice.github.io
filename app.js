// ============================================
// ROCYINTER SERVICES - app.js V4 FINAL CORRIGÉ
// NE FAIT PLUS header / footer / langue / devise
// Ça c'est déjà dans rocy-layout.js - ne pas dupliquer
// app.js = UNIQUEMENT filtre Pays > Ville > Quartier
// ============================================

// --- 1. CONFIG SUPABASE - On réutilise celui de rocy-layout.js ---
// Ne pas recréer un client. rocy-layout.js l'a déjà fait.
function rocyGetSupabase(){
  return window.supabaseClient || null;
}

// --- 2. ETAT GLOBAL - Filtre Pays / Ville / Quartier ---
let PAYS = localStorage.getItem('rocy_pays') || '';
let VILLE = localStorage.getItem('rocy_ville') || '';
let QUARTIER = localStorage.getItem('rocy_localite') || localStorage.getItem('rocy_quartier') || '';

// --- 3. SELECT PAYS + VILLE + QUARTIER - SUR CHAQUE PAGE ---
function creerSelectPays(){
  const zone = document.getElementById('select-pays-zone');
  if(!zone) return;
  // On utilise la vraie liste de pays.js, pas une petite liste de 35 pays
  const listePays = window.ROCY_PAYS || [];
  const optionsPays = listePays.map(p=>{
    const nom = p.nom || p;
    const drapeau = p.drapeau || '📍';
    return `<option value="${nom}" ${PAYS===nom?'selected':''}>${drapeau} ${nom}</option>`;
  }).join('');
  const villes = PAYS && window.rocyVillesPourPays ? window.rocyVillesPourPays(PAYS) : [];
  const optionsVilles = villes.map(v=>`<option value="${v}" ${VILLE===v?'selected':''}>${v}</option>`).join('');
  const quartiers = VILLE && window.rocyQuartiersPourVille ? window.rocyQuartiersPourVille(VILLE) : [];
  const optionsQuartiers = quartiers.map(q=>`<option value="${q}" ${QUARTIER===q?'selected':''}>${q}</option>`).join('');

  zone.innerHTML = `
    <div style="background:#fff;border:1px solid #D8E2F0;border-radius:16px;padding:14px;max-width:860px;margin:0 auto 16px;box-shadow:0 6px 20px rgba(10,26,51,.08)">
      <div style="display:flex;gap:10px;flex-wrap:wrap;justify-content:center">
        <select id="selectPays" onchange="changerPays(this.value)" style="flex:1;min-width:180px;padding:12px;border-radius:10px;border:1px solid #D8E2F0;font-size:15px;font-weight:700">
          <option value="">🌍 Tous les pays</option>
          ${optionsPays}
        </select>
        <select id="selectVille" onchange="changerVille(this.value)" style="flex:1;min-width:180px;padding:12px;border-radius:10px;border:1px solid #D8E2F0;font-size:15px;font-weight:700">
          <option value="">-- Ville / Localité --</option>
          ${optionsVilles}
        </select>
        <select id="selectQuartier" onchange="changerQuartier(this.value)" style="flex:1;min-width:180px;padding:12px;border-radius:10px;border:1px solid #D8E2F0;font-size:15px">
          <option value="">-- Quartier --</option>
          ${optionsQuartiers}
        </select>
        <button onclick="effacerFiltrePays()" style="background:#0A1A33;color:#fff;padding:12px 16px;border-radius:10px;font-weight:700">Effacer</button>
      </div>
      <p id="infoPays" style="text-align:center;font-size:13px;color:#5E6B7F;margin-top:8px"></p>
    </div>`;
  majInfoPays();
}
function majInfoPays(){
  const info = document.getElementById('infoPays');
  if(!info) return;
  if(!PAYS && !VILLE && !QUARTIER) info.textContent = "🌍 Tu vois tous les pays. Choisis un pays pour voir seulement ses prestataires.";
  else {
    let txt = "📍 Résultats pour : ";
    if(PAYS) txt += PAYS;
    if(VILLE) txt += " • " + VILLE;
    if(QUARTIER) txt += " • " + QUARTIER;
    info.textContent = txt;
  }
}
function changerPays(val){
  PAYS = val; VILLE=''; QUARTIER='';
  localStorage.setItem('rocy_pays', PAYS);
  localStorage.removeItem('rocy_ville');
  localStorage.removeItem('rocy_localite');
  localStorage.removeItem('rocy_quartier');
  creerSelectPays();
  filtrerParPays();
}
function changerVille(val){
  VILLE = val; QUARTIER='';
  localStorage.setItem('rocy_ville', VILLE);
  localStorage.removeItem('rocy_localite');
  localStorage.removeItem('rocy_quartier');
  creerSelectPays();
  filtrerParPays();
}
function changerQuartier(val){
  QUARTIER = val;
  localStorage.setItem('rocy_localite', QUARTIER);
  localStorage.setItem('rocy_quartier', QUARTIER);
  majInfoPays();
  filtrerParPays();
}
function changerLocalite(val){
  // Ancien nom, gardé pour compatibilité avec les vieilles pages
  changerQuartier(val);
}
function effacerFiltrePays(){
  PAYS=''; VILLE=''; QUARTIER='';
  localStorage.removeItem('rocy_pays');
  localStorage.removeItem('rocy_ville');
  localStorage.removeItem('rocy_localite');
  localStorage.removeItem('rocy_quartier');
  creerSelectPays();
  filtrerParPays();
}

// FILTRE GLOBAL - Chaque carte doit avoir data-pays="Bénin" data-ville="Calavi" data-quartier="Ouèdo"
// Compatibilité : on lit aussi data-localite si data-ville / data-quartier manquent
function filtrerParPays(){
  const items = document.querySelectorAll('[data-pays]');
  if(!items.length) return;
  let visibles = 0;
  items.forEach(item=>{
    const paysItem = (item.getAttribute('data-pays')||'').toLowerCase();
    const villeItem = (item.getAttribute('data-ville')||item.getAttribute('data-localite')||'').toLowerCase();
    const quartierItem = (item.getAttribute('data-quartier')||item.getAttribute('data-localite')||'').toLowerCase();
    const okPays = !PAYS || paysItem === PAYS.toLowerCase() || paysItem === '';
    const okVille = !VILLE || villeItem.includes(VILLE.toLowerCase()) || quartierItem.includes(VILLE.toLowerCase());
    const okQuartier = !QUARTIER || quartierItem.includes(QUARTIER.toLowerCase()) || villeItem.includes(QUARTIER.toLowerCase());
    const show = okPays && okVille && okQuartier;
    item.style.display = show ? '' : 'none';
    if(show) visibles++;
  });
  const vide = document.getElementById('message-vide');
  if(vide){
    if(visibles===0){
      vide.style.display='block';
      vide.innerHTML = `Aucun résultat pour <b>${PAYS||'tous les pays'}</b> ${VILLE?`• <b>${VILLE}</b>`:''} ${QUARTIER?`• <b>${QUARTIER}</b>`:''}.<br>Sois le premier à proposer un service ici.<br><br><a href="devenir-fournisseur.html" class="btn">Devenir prestataire →</a>`;
    } else vide.style.display='none';
  }
}

// --- 4. ROLES - VISITEUR / CLIENT / PRESTATAIRE / ADMIN ---
// Lecture seule, ne pas réécrire rocy-layout.js
function getRoleUtilisateur(){
  return localStorage.getItem('rocy_role') || localStorage.getItem('rocy_user_type') || 'visiteur';
}
function getUtilisateur(){
  try{ return JSON.parse(localStorage.getItem('rocy_user')||'null'); }catch(e){ return null; }
}
function estConnecte(){ return !!localStorage.getItem('rocy_user_id'); }

// --- 5. COMPATIBILITÉ - Anciennes fonctions appelées par les pages ---
// Les vieilles pages appellent convertirPrix / appliquerMonnaies / appliquerTraductions
// On les redirige vers rocy-layout.js, on ne duplique pas la logique
function convertirPrix(prixFCFA){
  if(window.rocyFormatPrix) return window.rocyFormatPrix(prixFCFA);
  return Math.round(Number(prixFCFA)||0).toLocaleString('fr-FR') + ' FCFA';
}
function appliquerMonnaies(){
  if(window.rocyAppliquerDevises) window.rocyAppliquerDevises();
}
function appliquerTraductions(){
  if(window.rocyAppliquerTraduction) window.rocyAppliquerTraduction();
}
// Ancien injecterHeaderFooter : NE RIEN FAIRE, rocy-layout.js s'en occupe déjà
function injecterHeaderFooter(){ return; }

// --- 6. LANCEMENT ---
document.addEventListener('DOMContentLoaded', ()=>{
  creerSelectPays();
  filtrerParPays();
});
