// rocy-layout.js - ROCYINTER SERVICE - HEADER + TRADUCTION AUTO POUR TOUTES LES PAGES + MONNAIE + ROLES
(function(){
  const uid = localStorage.getItem('rocy_user_id');
  const typeLocal = localStorage.getItem('rocy_user_type') || localStorage.getItem('rocy_role') || '';
  const nom = localStorage.getItem('rocy_user_nom') || '';
  const isConnecte = !!uid;
  const isPresta = typeLocal === 'prestataire' || typeLocal === 'livreur';

  const LANGUES = [
    {code:'fr', label:'🇫🇷 FR - Français'},
    {code:'en', label:'🇬🇧 EN - English'},
    {code:'yo', label:'🇳🇬 YO - Yoruba'},
    {code:'ig', label:'🇳🇬 IG - Igbo'},
    {code:'ha', label:'🇳🇬 HA - Hausa'},
    {code:'fon', label:'🇧🇯 FON - Fon / Fongbe'},
    {code:'wo', label:'🇸🇳 WO - Wolof'},
    {code:'bm', label:'🇲🇱 BM - Bambara'},
    {code:'ee', label:'🇹🇬 EE - Ewe'},
    {code:'tw', label:'🇬🇭 TW - Twi'},
    {code:'ln', label:'🇨🇩 LN - Lingala'},
    {code:'sw', label:'🇹🇿 SW - Kiswahili'},
    {code:'am', label:'🇪🇹 AM - Amharic'},
    {code:'so', label:'🇸🇴 SO - Somali'},
    {code:'es', label:'🇪🇸 ES - Español'},
    {code:'pt', label:'🇵🇹 PT - Português'},
    {code:'ar', label:'🇸🇦 AR - العربية'},
    {code:'de', label:'🇩🇪 DE - Deutsch'},
    {code:'it', label:'🇮🇹 IT - Italiano'},
    {code:'nl', label:'🇳🇱 NL - Nederlands'},
    {code:'ru', label:'🇷🇺 RU - Русский'},
    {code:'tr', label:'🇹🇷 TR - Türkçe'},
    {code:'zh', label:'🇨🇳 ZH - 中文'},
    {code:'ja', label:'🇯🇵 JA - 日本語'},
    {code:'ko', label:'🇰🇷 KO - 한국어'},
    {code:'hi', label:'🇮🇳 HI - हिन्दी'}
  ];

  let langue = localStorage.getItem('rocy_langue') || 'fr';
  const CODE_API = { fr:'fr', en:'en', yo:'yo', ig:'ig', ha:'ha', fon:'fr', wo:'wo', bm:'bm', ee:'ee', tw:'tw', ln:'ln', sw:'sw', am:'am', so:'so', es:'es', pt:'pt', ar:'ar', de:'de', it:'it', nl:'nl', ru:'ru', tr:'tr', zh:'zh-CN', ja:'ja', ko:'ko', hi:'hi' };

  const BASE_FR = {
    accueil:'Accueil', connexion:'Connexion', devenir:'Devenir Prestataire', espace:'Mon espace', bonjour:'Bonjour', visiteur:'Bienvenue, visiteur', compte:'MON COMPTE', seConnecter:'🔑 Se connecter', creerCompte:'📝 Créer un compte', favoris:'❤️ Mes Favoris', panier:'🛒 Mon Panier', notif:'🔔 Notifications', deconnexion:'🚪 Déconnexion', services:'SERVICES', immobilier:'🏘️ Immobilier', livreurs:'🛵 Livreurs', escrow:'🔒 Mon Escrow', abonnement:'⭐ Abonnement Prestataire', aide:'AIDE', comment:'❓ Comment ça marche ?', faq:'💬 Aide / FAQ', contact:'📞 Contact', tarifs:'💰 Tarifs', cgu:'📄 CGU', conf:'🔐 Confidentialité', fermer:'✕ Fermer', proposer:'➕ Créer une annonce',
    heroTitre1:'Trouvez un vrai service', heroTitre2:'près de chez vous',
    heroSous:'Des prestataires vérifiés près de chez vous. Découvrez leurs services, comparez leurs offres, discutez directement et commandez en toute sécurité avec le paiement Escrow.',
    bandeauVisiteur:'Découvrez les entreprises et leurs services. Connectez-vous pour discuter et commander.',
    bandeauClient:'Découvrez les entreprises, discutez, comparez et commandez en toute sécurité avec le paiement Escrow.',
    bandeauPresta:'Gérez vos activités et vos annonces. Vos services sont visibles par tous les clients et visiteurs.',
    bandeauAdmin:'Vous contrôlez et validez les annonces et les prestataires.',
    pasConnexion:'Pas de connexion', erreurConnexion:'Erreur de connexion', reessayer:'Réessayer',
    pays:'PAYS', ville:'VILLE / LOCALITÉ', rechercher:'RECHERCHER UN SERVICE', villePh:'Ex: Calavi, Cotonou, Godomey...', searchPh:'Ex: Plombier, Traiteur, Nettoyage...',
    tous:'Tous', manger:'Se nourrir', domicile:'Domicile', pro:'Services professionnels', sejour:'Séjour', immo:'Immobilier', livreursTitre:'Livreurs',
    proposerTitre:'Proposer un service', annoncesTitre:'Annonces réelles près de vous', aucuneTitre:'Aucune annonce pour le moment', aucuneSous:'Sois le premier à proposer un service dans ta localité.', discuter:'Discuter', voirProfil:'Voir profil', voirEntreprise:"Voir l'entreprise", prixFixe:'Prix fixe', aPartir:'À partir de', prixDiscuter:'Prix à discuter dans le chat', connectePourCommander:'Connecte-toi pour discuter et commander',
    mangerTitre:'Se nourrir', domicileTitre:'Domicile', proTitre:'Services professionnels', sejourTitre:'Séjour', immoTitre:'Immobilier', mesAnnonces:'Mes Annonces', mesRevenus:'Mes Revenus', monAgenda:'Mon Agenda', mesActivites:'Mes Activités', creerAnnonce:'Créer une annonce', mesCommandes:'Mes Commandes', mesFavoris:'Mes Favoris', monPanier:'Mon Panier', monEscrow:'Mon Escrow', valider:'Valider', refuser:'Refuser', envoyer:'Envoyer', rechercherBtn:'Rechercher', commander:'Commander', payer:'Payer', retourAccueil:"Retour à l'accueil"
  };

  window.rocyT = function(key){
    if(langue==='fr') return BASE_FR[key] || key;
    const cache = localStorage.getItem('rocy_trad_' + langue + '_' + key);
    if(cache) return cache;
    return BASE_FR[key] || key;
  };
  window.rocySetLangue = function(l){ localStorage.setItem('rocy_langue', l); location.reload(); };

  async function traduireAuto(texte, langueCible){
    if(!texte || langueCible==='fr') return texte;
    const code = CODE_API[langueCible] || langueCible;
    try{
      const url = 'https://api.mymemory.translated.net/get?q=' + encodeURIComponent(texte) + '&langpair=fr|' + code;
      const res = await fetch(url);
      const j = await res.json();
      if(j && j.responseData && j.responseData.translatedText) return j.responseData.translatedText;
    }catch(e){}
    return texte;
  }

  async function traduirePageEntiere(){
    if(langue==='fr'){
      document.querySelectorAll('[data-i18n]').forEach(el=>{ const k=el.getAttribute('data-i18n'); if(BASE_FR[k]) el.textContent = BASE_FR[k]; });
      document.querySelectorAll('[data-i18n-ph]').forEach(el=>{ const k=el.getAttribute('data-i18n-ph'); if(BASE_FR[k]) el.placeholder = BASE_FR[k]; });
      return;
    }
    const els = Array.from(document.querySelectorAll('[data-i18n]'));
    for(const el of els){
      const k = el.getAttribute('data-i18n');
      let base = BASE_FR[k];
      if(!base){ base = (el.getAttribute('data-i18n-base') || el.textContent || '').trim(); if(!base) continue; el.setAttribute('data-i18n-base', base); }
      else { el.setAttribute('data-i18n-base', base); }
      const cacheKey = 'rocy_trad_' + langue + '_' + k;
      let trad = localStorage.getItem(cacheKey);
      if(!trad){ trad = await traduireAuto(base, langue); localStorage.setItem(cacheKey, trad); }
      el.textContent = trad;
    }
    const phs = Array.from(document.querySelectorAll('[data-i18n-ph]'));
    for(const el of phs){
      const k = el.getAttribute('data-i18n-ph');
      let base = BASE_FR[k] || el.getAttribute('data-i18n-base') || el.placeholder || '';
      if(!base) continue;
      el.setAttribute('data-i18n-base', base);
      const cacheKey = 'rocy_trad_' + langue + '_' + k;
      let trad = localStorage.getItem(cacheKey);
      if(!trad){ trad = await traduireAuto(base, langue); localStorage.setItem(cacheKey, trad); }
      el.placeholder = trad;
    }
  }
  window.rocyAppliquerTraduction = traduirePageEntiere;

  function observerNouveauContenu(){
    if(!window.MutationObserver) return;
    const obs = new MutationObserver(()=>{
      const nouveaux = document.querySelectorAll('[data-i18n]:not([data-traduit="1"])');
      if(nouveaux.length>0 && langue!=='fr'){ nouveaux.forEach(el=>el.setAttribute('data-traduit','1')); traduirePageEntiere(); }
    });
    obs.observe(document.body, {childList:true, subtree:true});
  }

  const DEVISES = [{code:'FCFA', label:'FCFA'}, {code:'EUR', label:'€ EUR'}, {code:'USD', label:'$ USD'}, {code:'NGN', label:'₦ NGN'}, {code:'GHS', label:'₵ GHS'}, {code:'XOF', label:'XOF'}, {code:'GBP', label:'£ GBP'}];
  let devise = localStorage.getItem('rocy_devise') || 'FCFA';
  let tauxJour = JSON.parse(localStorage.getItem('rocy_taux')||'{}');
  async function chargerTaux(){
    try{ const res = await fetch('https://open.er-api.com/v6/latest/XOF'); const j = await res.json(); if(j && j.rates){ tauxJour = j.rates; localStorage.setItem('rocy_taux', JSON.stringify(tauxJour)); } }catch(e){}
    if(!tauxJour || !tauxJour.EUR) tauxJour = { XOF:1, FCFA:1, EUR:0.00152, USD:0.00165, NGN:2.45, GHS:0.025, GBP:0.0013 };
  }
  window.rocyFormatPrix = function(prixFCFA){
    if(!prixFCFA || prixFCFA<=0) return window.rocyT('prixDiscuter');
    const taux = tauxJour[devise] || tauxJour[devise==='FCFA'?'XOF':devise] || 1;
    const v = prixFCFA * taux;
    if(devise==='FCFA' || devise==='XOF') return Math.round(v).toLocaleString('fr-FR') + ' FCFA';
    if(devise==='EUR' || devise==='USD' || devise==='GBP') return v.toFixed(2) + ' ' + devise;
    return Math.round(v).toLocaleString('fr-FR') + ' ' + devise;
  };
  window.rocySetDevise = function(d){ localStorage.setItem('rocy_devise', d); location.reload(); };
  async function verifierAdmin(){
    if(!uid || typeLocal !== 'admin') return false;
    try{
      if(!window.supabase) return false;
      const sb = window.supabase.createClient("https://gdwgjsloivrpxxvggxyz.supabase.co", "sb_publishable_toAIjzrpbo2mNqPqLKlI9Q_sqzcR6dF");
      const {data} = await sb.from('profiles').select('type, type_compte, role').eq('id', uid).single();
      if(!data) return false;
      const vraiType = data.type || data.type_compte || data.role || '';
      if(vraiType !== 'admin'){ localStorage.setItem('rocy_user_type', vraiType); localStorage.setItem('rocy_role', vraiType); return false; }
      return true;
    }catch(e){ return false; }
  }
  window.rocyOuvrirMenu = function(){ const d=document.getElementById('rocyDrawer'); const o=document.getElementById('rocyOverlay'); if(!d||!o) return; d.classList.add('open'); o.classList.add('show'); };
  window.rocyFermerMenu = function(){ const d=document.getElementById('rocyDrawer'); const o=document.getElementById('rocyOverlay'); if(!d||!o) return; d.classList.remove('open'); o.classList.remove('show'); };
  window.rocyAllerEspace = function(){ if(typeLocal==='prestataire'||typeLocal==='livreur') location.href='dashboard-prestataire.html'; else if(typeLocal==='admin') location.href='admin.html'; else location.href='dashboard-client.html'; };
  window.rocyDeconnexion = function(){ ['rocy_user_id','rocy_user_nom','rocy_user_type','rocy_role','rocy_user_whatsapp','rocy_user_pays','rocy_user_ville','rocy_user_localite'].forEach(k=>localStorage.removeItem(k)); location.href='index.html'; };
  window.rocyProposerService = function(){
    if(!isConnecte) location.href='inscription.html';
    else if(isPresta) location.href='creer-annonce.html';
    else location.href='inscription.html?type=prestataire';
  };
  async function construire(){
    await chargerTaux();
    const isAdmin = await verifierAdmin();
    const t = window.rocyT;
    const optsLangue = LANGUES.map(l=>`<option value="${l.code}" ${langue===l.code?'selected':''}>${l.label}</option>`).join('');
    const optsDevise = DEVISES.map(d=>`<option value="${d.code}" ${devise===d.code?'selected':''}>${d.label}</option>`).join('');
    const headerHTML = `
    <style>
      .rocy-header{background:#0f172a;color:#fff;padding:10px 12px 8px;display:flex;flex-direction:column;gap:8px;position:sticky;top:0;z-index:100}
      .rocy-header-ligne1{display:flex;align-items:center;gap:8px}
      .rocy-header-ligne2{display:flex;justify-content:flex-end;gap:8px}
      .rocy-burger{font-size:26px;cursor:pointer;background:none;border:none;color:#fff;line-height:1;padding:6px 8px;border-radius:8px}
      .rocy-logo{font-size:20px;font-weight:800;cursor:pointer;flex:1;min-width:120px;line-height:1} .rocy-logo span{color:#f59e0b}
      .rocy-header .btn{background:#f59e0b;color:#000;border:none;padding:8px 12px;border-radius:999px;font-weight:700;cursor:pointer;font-size:12px;white-space:nowrap}
      .rocy-header .btn-white{background:#fff;color:#111}
      .rocy-top-select{background:#1e293b;color:#fff;border:1px solid #334155;border-radius:999px;padding:7px 8px;font-size:12px;font-weight:700;cursor:pointer;max-width:135px}
      .rocy-espace-btn{background:#1e293b;color:#fff;border:1px solid #334155;border-radius:999px;padding:7px 14px;font-size:12px;font-weight:700;cursor:pointer;white-space:nowrap}
      .rocy-drawer{position:fixed;top:0;left:-300px;width:280px;max-width:85vw;height:100%;background:#fff;z-index:200;transition:left .25s;box-shadow:4px 0 20px rgba(0,0,0,.2);overflow-y:auto;padding-bottom:20px}
      .rocy-drawer.open{left:0}
      .rocy-drawer-head{background:#0f172a;color:#fff;padding:16px}
      .rocy-drawer-head b{font-size:18px} .rocy-drawer-head b span{color:#f59e0b} .rocy-drawer-head small{opacity:.8}
      .rocy-menu-item{display:flex;align-items:center;gap:10px;width:100%;text-align:left;background:none;border:none;border-bottom:1px solid #f1f5f9;padding:14px 16px;font-size:14px;cursor:pointer;color:#111}
      .rocy-menu-label{font-size:11px;font-weight:800;color:#94a3b8;padding:14px 16px 4px}
      .rocy-overlay{position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:150;display:none;pointer-events:none}
      .rocy-overlay.show{display:block;pointer-events:auto}
      .rocy-footer{text-align:center;padding:20px;color:#94a3b8;font-size:12px;line-height:1.8}
      .rocy-footer a{color:#94a3b8;text-decoration:none}
    </style>
    <div class="rocy-overlay" id="rocyOverlay" onclick="rocyFermerMenu()"></div>
    <header class="rocy-header">
      <div class="rocy-header-ligne1">
        <button type="button" class="rocy-burger" onclick="rocyOuvrirMenu()">☰</button>
        <div class="rocy-logo" onclick="location.href='index.html'">Rocy<span>inter</span> Service</div>
        <select class="rocy-top-select" onchange="rocySetLangue(this.value)">${optsLangue}</select>
        <select class="rocy-top-select" onchange="rocySetDevise(this.value)">${optsDevise}</select>
      </div>
      <div class="rocy-header-ligne2">
        ${!isConnecte ? `<button type="button" class="rocy-espace-btn" onclick="location.href='connexion.html'">${t('connexion')}</button>` : `<button type="button" class="rocy-espace-btn" onclick="rocyAllerEspace()">👤 ${t('espace')}</button>`}
      </div>
    </header>
    <div class="rocy-drawer" id="rocyDrawer">
      <div class="rocy-drawer-head"><b>Rocy<span>inter</span> Service</b><br><small>${isConnecte ? '👋 '+t('bonjour')+', '+nom : t('visiteur')}</small><br><button type="button" style="margin-top:8px;background:#f59e0b;border:none;padding:6px 12px;border-radius:999px;font-weight:700;cursor:pointer" onclick="rocyFermerMenu()">${t('fermer')}</button></div>
      <div class="rocy-menu-label">${t('compte')}</div>
      ${!isConnecte ? `<button type="button" class="rocy-menu-item" onclick="location.href='connexion.html'">${t('seConnecter')}</button><button type="button" class="rocy-menu-item" onclick="location.href='inscription.html'">${t('creerCompte')}</button>` : `<button type="button" class="rocy-menu-item" onclick="rocyAllerEspace()">👤 ${t('espace')}</button><button type="button" class="rocy-menu-item" onclick="location.href='favoris.html'">${t('favoris')}</button><button type="button" class="rocy-menu-item" onclick="location.href='panier.html'">${t('panier')}</button><button type="button" class="rocy-menu-item" onclick="location.href='notifications.html'">${t('notif')}</button><button type="button" class="rocy-menu-item" onclick="rocyDeconnexion()">${t('deconnexion')}</button>`}
      <div class="rocy-menu-label">${t('services')}</div>
      <button type="button" class="rocy-menu-item" onclick="location.href='index.html'">🏠 ${t('accueil')}</button>
      <button type="button" class="rocy-menu-item" onclick="location.href='immobilier.html'">${t('immobilier')}</button>
      <button type="button" class="rocy-menu-item" onclick="location.href='livreurs.html'">${t('livreurs')}</button>
      <button type="button" class="rocy-menu-item" onclick="location.href='escrow.html'">${t('escrow')}</button>
      <button type="button" class="rocy-menu-item" onclick="location.href='abonnement.html'">${t('abonnement')}</button>
      <div class="rocy-menu-label">${t('aide')}</div>
      <button type="button" class="rocy-menu-item" onclick="location.href='comment-ca-marche.html'">${t('comment')}</button>
      <button type="button" class="rocy-menu-item" onclick="location.href='aide-faq.html'">${t('faq')}</button>
      <button type="button" class="rocy-menu-item" onclick="location.href='contact.html'">${t('contact')}</button>
      <button type="button" class="rocy-menu-item" onclick="location.href='tarifs.html'">${t('tarifs')}</button>
      <button type="button" class="rocy-menu-item" onclick="location.href='cgu.html'">${t('cgu')}</button>
      <button type="button" class="rocy-menu-item" onclick="location.href='confidentialite.html'">${t('conf')}</button>
      ${isAdmin ? `<div class="rocy-menu-label">ADMIN - QUE POUR TOI</div><button type="button" class="rocy-menu-item" onclick="location.href='admin.html'">🛡️ Panel Admin</button>` : ''}
      ${isPresta ? `<div class="rocy-menu-label">PRESTATAIRE</div><button type="button" class="rocy-menu-item" onclick="rocyProposerService()">${t('proposer')}</button><button type="button" class="rocy-menu-item" onclick="location.href='revenus.html'">💰 Mes Revenus</button><button type="button" class="rocy-menu-item" onclick="location.href='agenda.html'">📅 Mon Agenda</button>` : ''}
    </div>`;
    const footerHTML = `<footer class="rocy-footer">Rocyinter Service © 2026 - Paiement sécurisé Escrow - Bénin<br><a href="tarifs.html">${t('tarifs')}</a> | <a href="cgu.html">${t('cgu')}</a> | <a href="confidentialite.html">${t('conf')}</a> | <a href="aide-faq.html">${t('faq')}</a> | <a href="contact.html">${t('contact')}</a></footer>`;
    document.querySelectorAll('header:not(.rocy-header)').forEach(h=>h.remove());
    document.querySelectorAll('footer:not(.rocy-footer)').forEach(f=>f.remove());
    document.body.insertAdjacentHTML('afterbegin', headerHTML);
    document.body.insertAdjacentHTML('beforeend', footerHTML);
    await traduirePageEntiere();
    observerNouveauContenu();
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', construire);
  else construire();
})();
