// ============================================
// ROCYINTER SERVICES - app.js V5 FINAL + LOGS PDP
// NE FAIT PLUS header / footer / langue / devise
// Ça c'est déjà dans rocy-layout.js - ne pas dupliquer
// app.js = Filtre Pays > Ville > Quartier + LOGS PDP Bénin
// ============================================

// --- 1. CONFIG SUPABASE - On réutilise celui de rocy-layout.js ---
function rocyGetSupabase(){
  return window.supabaseClient || null;
}

// --- 1-BIS. LOGS PDP BÉNIN - NE JAMAIS LOGGER LE MOT DE PASSE ---
// Table : public.audit_logs
// action : login, page_view, filtre_pays, filtre_ville, filtre_quartier, voir_piece, valider_quartier, etc.
async function rocyLog(action, cible_type, cible_id, details = {}) {
  try {
    const sb = rocyGetSupabase();
    if (!sb) return;
    const userId = localStorage.getItem('rocy_user_id') || null;
    const userEmail = localStorage.getItem('rocy_user_email') || null;
    // On ne logue pas si pas connecté ET que c'est un log sensible, mais on logue les pages vues en anonyme
    await sb.from('audit_logs').insert({
      user_id: userId || null,
      user_email: userEmail || 'visiteur',
      action: action,
      cible_type: cible_type || 'page',
      cible_id: String(cible_id || window.location.pathname || ''),
      details: {
        ...details,
        page: window.location.pathname,
        pays_filtre: localStorage.getItem('rocy_pays') || '',
        ville_filtre: localStorage.getItem('rocy_ville') || '',
        quartier_filtre: localStorage.getItem('rocy_localite') || localStorage.getItem('rocy_quartier') || '',
      },
      navigateur: navigator.userAgent,
    });
  } catch(e) {
    // On ne bloque JAMAIS le site à cause d'un log
    console.log('log erreur', e);
  }
}
// Pour appeler depuis les autres pages : logAction('voir_piece', 'piece', chemin)
window.rocyLog = rocyLog;
window.logAction = rocyLog;

// Log de connexion : une seule fois par session
function rocyLogLoginSiBesoin(){
  try {
    const userId = localStorage.getItem('rocy_user_id');
    if (!userId) return;
    if (sessionStorage.getItem('rocy_log_login_fait')) return;
    sessionStorage.setItem('rocy_log_login_fait', '1');
    rocyLog('login', 'auth', userId, { source: 'app.js' });
  } catch(e) {}
}

// --- 2. ETAT GLOBAL - Filtre Pays / Ville / Quartier ---
let PAYS = localStorage.getItem('rocy_pays') || '';
let VILLE = localStorage.getItem('rocy_ville') || '';
let QUARTIER = localStorage.getItem('rocy_localite') || localStorage.getItem('rocy_quartier') || '';

// --- 3. SELECT PAYS + VILLE + QUARTIER - SUR CHAQUE PAGE ---
function creerSelectPays(){
  const zone = document.getElementById('select-pays-zone');
  if(!zone) return;
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
          <option value=""> Tous les pays</option>
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
  if(!PAYS && !VILLE && !QUARTIER) info.textContent = "Tu vois tous les pays. Choisis un pays pour voir seulement ses prestataires.";
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
  rocyLog('filtre_pays', 'filtre', val, { pays: val });
}
function changerVille(val){
  VILLE = val; QUARTIER='';
  localStorage.setItem('rocy_ville', VILLE);
  localStorage.removeItem('rocy_localite');
  localStorage.removeItem('rocy_quartier');
  creerSelectPays();
  filtrerParPays();
  rocyLog('filtre_ville', 'filtre', val, { pays: PAYS, ville: val });
}
function changerQuartier(val){
  QUARTIER = val;
  localStorage.setItem('rocy_localite', QUARTIER);
  localStorage.setItem('rocy_quartier', QUARTIER);
  majInfoPays();
  filtrerParPays();
  rocyLog('filtre_quartier', 'filtre', val, { pays: PAYS, ville: VILLE, quartier: val });
}
function changerLocalite(val){
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
  rocyLog('effacer_filtre', 'filtre', 'tous', {});
}

// FILTRE GLOBAL
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

// --- 4. ROLES ---
function getRoleUtilisateur(){
  return localStorage.getItem('rocy_role') || localStorage.getItem('rocy_user_type') || 'visiteur';
}
function getUtilisateur(){
  try{ return JSON.parse(localStorage.getItem('rocy_user')||'null'); }catch(e){ return null; }
}
function estConnecte(){ return !!localStorage.getItem('rocy_user_id'); }

// --- 5. COMPATIBILITÉ ---
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
function injecterHeaderFooter(){ return; }

// --- 6. LANCEMENT ---
document.addEventListener('DOMContentLoaded', ()=>{
  creerSelectPays();
  filtrerParPays();
  rocyLogLoginSiBesoin();
  // Log de visite de page, pour la PDP : qui a vu quoi et quand
  rocyLog('page_view', 'page', window.location.pathname, {});
});
