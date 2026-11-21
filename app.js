// ============================================
// ROCYINTER SERVICES - app.js V6 FINAL + LOGS PDP
// NE FAIT PLUS header / footer / langue / devise
// Ça c'est déjà dans rocy-layout.js - ne pas dupliquer
// app.js = Filtre Pays > Ville > Quartier + LOGS PDP Bénin
// + Carte Conversation partagée pour TOUS les dashboards
// ============================================

// --- 1. CONFIG SUPABASE - On réutilise celui de rocy-layout.js ---
function rocyGetSupabase(){
  return window.supabaseClient || null;
}

// --- 1-BIS. LOGS PDP BÉNIN - NE JAMAIS LOGGER LE MOT DE PASSE ---
async function rocyLog(action, cible_type, cible_id, details = {}) {
  try {
    const sb = rocyGetSupabase();
    if (!sb) return;
    const userId = localStorage.getItem('rocy_user_id') || null;
    const userEmail = localStorage.getItem('rocy_user_email') || null;
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
    console.log('log erreur', e);
  }
}
window.rocyLog = rocyLog;
window.logAction = rocyLog;

function rocyLogLoginSiBesoin(){
  try {
    const userId = localStorage.getItem('rocy_user_id');
    if (!userId) return;
    if (sessionStorage.getItem('rocy_log_login_fait')) return;
    sessionStorage.setItem('rocy_log_login_fait', '1');
    rocyLog('login', 'auth', userId, { source: 'app.js' });
  } catch(e) {}
}

// --- 1-TER. CONVERSATIONS : POUR CHACUN, PAREIL PARTOUT ---
// Utilisé par dashboard-client.html ET dashboard-prestataire.html
// Comme Facebook : Nom + Dernier message + Heure + Gras si Nouveau

function rocyEsc(s){ return String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }

function rocyEstNonLu(convId, dernierMsg, uid){
  if(!dernierMsg) return false;
  if(String(dernierMsg.sender_id)===String(uid)) return false;
  const luA = Number(localStorage.getItem('rocy_lu_' + convId) || 0);
  return new Date(dernierMsg.created_at).getTime() > luA;
}

function rocyMarquerLu(convId){
  try{ if(convId) localStorage.setItem('rocy_lu_' + convId, Date.now().toString()); }catch(e){}
}
window.rocyMarquerLu = rocyMarquerLu;
window.rocyEstNonLu = rocyEstNonLu;

// LA fonction partagée : une seule fois ici, les dashboards l'appellent
window.rocyCarteConversation = function(cv, nom, titre, dernierMsg, uid, texteBouton, onClick){
  const texte = dernierMsg ? dernierMsg.contenu : 'Aucun message pour l’instant';
  const heure = dernierMsg ? new Date(dernierMsg.created_at).toLocaleTimeString('fr-FR',{hour:'2-digit',minute:'2-digit'}) : '';
  const date = new Date(cv.created_at).toLocaleDateString('fr-FR');
  const isNonLu = rocyEstNonLu(cv.id, dernierMsg, uid);
  const nomSafe = rocyEsc(nom || 'Utilisateur');
  const titreSafe = rocyEsc(titre || 'Discussion');
  const texteSafe = rocyEsc(String(texte).slice(0,80)) + (String(texte).length>80 ? '...' : '');
  return `<div class="card" onclick="${onClick}" style="cursor:pointer;${isNonLu ? 'border:2px solid #0f172a;' : ''}">
    <div style="display:flex;justify-content:space-between;align-items:center">
      <b style="${isNonLu ? 'font-weight:900;' : ''}">👤 ${nomSafe}</b>
      <span style="font-size:11px;color:#64748b">${heure} • ${date}</span>
    </div>
    <p style="margin:6px 0 0;font-weight:${isNonLu ? '700' : '400'};color:${isNonLu ? '#111' : '#64748b'}">${texteSafe}</p>
    <p style="font-size:12px;color:#64748b;margin:4px 0 0">📦 ${titreSafe}</p>
    ${isNonLu ? `<span style="display:inline-block;margin-top:6px;background:#f59e0b;color:#fff;font-size:11px;font-weight:800;padding:4px 8px;border-radius:999px">● Nouveau</span>` : ''}
    <button class="btn btn-dark" onclick="event.stopPropagation(); ${onClick}">${rocyEsc(texteBouton)}</button>
  </div>`;
};

// Helper : charge noms + titres + derniers messages pour une liste de conversations
// Retourne { noms, titres, dernierMsg }
window.rocyChargerInfosConvs = async function(sb, convs, champAutre){
  const noms = {}, titres = {}, dernierMsg = {};
  if(!convs || !convs.length) return { noms, titres, dernierMsg };
  const autreIds = [...new Set(convs.map(c=>c[champAutre]).filter(Boolean))];
  if(autreIds.length){
    const {data: profs} = await sb.from('profiles').select('id, nom, nom_entreprise').in('id', autreIds);
    (profs||[]).forEach(p=> noms[p.id] = p.nom_entreprise || p.nom || 'Utilisateur');
  }
  const annonceIds = [...new Set(convs.map(c=>c.annonce_id).filter(Boolean))];
  if(annonceIds.length){
    const {data: anns} = await sb.from('annonces').select('id, titre').in('id', annonceIds);
    (anns||[]).forEach(a=> titres[a.id]=a.titre);
  }
  const convIds = convs.map(c=>c.id);
  if(convIds.length){
    const {data: msgs} = await sb.from('messages').select('conversation_id, sender_id, contenu, created_at').in('conversation_id', convIds).order('created_at',{ascending:false});
    (msgs||[]).forEach(m=>{ if(!dernierMsg[m.conversation_id]) dernierMsg[m.conversation_id]=m; });
  }
  return { noms, titres, dernierMsg };
};

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
  rocyLog('page_view', 'page', window.location.pathname, {});
});
