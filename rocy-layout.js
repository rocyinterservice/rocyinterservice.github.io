// rocy-layout.js - ROCYINTER - VERSION MONDIALE V5 CORRIGÉE
// En-tête qui ne disparaît plus + Design global + Cache 5 min + EUR fixe 655,957 + Taux figé au paiement
(function(){
  if (window.supabase && !window.supabaseClient) {
    try { window.supabaseClient = window.supabase.createClient("https://gdwgjsloivrpxxvggxyz.supabase.co", "sb_publishable_toAIjzrpbo2mNqPqLKlI9Q_sqzcR6dF"); } catch(e) {}
  }
  let uid = localStorage.getItem('rocy_user_id') || '';
  let typeLocal = localStorage.getItem('rocy_user_type') || localStorage.getItem('rocy_role') || '';
  let nom = localStorage.getItem('rocy_user_nom') || '';
  let isConnecte = !!uid;
  let isPresta = ['prestataire','livreur','entreprise','fournisseur','professionnel','pro'].includes(typeLocal);

  const LANGUES = [
    {code:'fr', court:'FR', long:'Français', flag:'🇫🇷'},
    {code:'en', court:'EN', long:'English', flag:'🇬🇧'},
    {code:'yo', court:'YO', long:'Yoruba', flag:'🇳🇬'},
    {code:'ig', court:'IG', long:'Igbo', flag:'🇳🇬'},
    {code:'ha', court:'HA', long:'Hausa', flag:'🇳🇬'},
    {code:'fon', court:'FON', long:'Fon / Fongbe', flag:'🇧🇯'},
    {code:'wo', court:'WO', long:'Wolof', flag:'🇸🇳'},
    {code:'bm', court:'BM', long:'Bambara', flag:'🇲🇱'},
    {code:'ee', court:'EE', long:'Ewe', flag:'🇹🇬'},
    {code:'tw', court:'TW', long:'Twi', flag:'🇬🇭'},
    {code:'ln', court:'LN', long:'Lingala', flag:'🇨🇩'},
    {code:'sw', court:'SW', long:'Kiswahili', flag:'🇹🇿'},
    {code:'am', court:'AM', long:'Amharic', flag:'🇪🇹'},
    {code:'so', court:'SO', long:'Somali', flag:'🇸🇴'},
    {code:'es', court:'ES', long:'Español', flag:'🇪🇸'},
    {code:'pt', court:'PT', long:'Português', flag:'🇵🇹'},
    {code:'ar', court:'AR', long:'العربية', flag:'🇸🇦'},
    {code:'de', court:'DE', long:'Deutsch', flag:'🇩🇪'},
    {code:'it', court:'IT', long:'Italiano', flag:'🇮🇹'},
    {code:'nl', court:'NL', long:'Nederlands', flag:'🇳🇱'},
    {code:'ru', court:'RU', long:'Русский', flag:'🇷🇺'},
    {code:'tr', court:'TR', long:'Türkçe', flag:'🇹🇷'},
    {code:'zh', court:'ZH', long:'中文', flag:'🇨🇳'},
    {code:'ja', court:'JA', long:'日本語', flag:'🇯🇵'},
    {code:'ko', court:'KO', long:'한국어', flag:'🇰🇷'},
    {code:'hi', court:'HI', long:'हिन्दी', flag:'🇮🇳'}
  ];
  let langue = localStorage.getItem('rocy_langue') || 'fr';
  const CODE_API = { fr:'fr', en:'en', yo:'yo', ig:'ig', ha:'ha', fon:'fon', wo:'wo', bm:'bm', ee:'ee', tw:'tw', ln:'ln', sw:'sw', am:'am', so:'so', es:'es', pt:'pt', ar:'ar', de:'de', it:'it', nl:'nl', ru:'ru', tr:'tr', zh:'zh-CN', ja:'ja', ko:'ko', hi:'hi' };
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
    tous:'Tous', manger:'Se nourrir', domicile:'Domicile', pro:'Services professionnels', sejour:'Séjour', immo:'Immobilier', livreursTitre:'Livreurs', evenement:'Évènement',
    proposerTitre:'Proposer un service', annoncesTitre:'Annonces réelles près de vous', aucuneTitre:'Aucune annonce pour le moment', aucuneSous:'Sois le premier à proposer un service dans ta localité.', discuter:'Discuter', voirProfil:'Voir profil', voirEntreprise:"Voir l'entreprise", prixFixe:'Prix fixe', aPartir:'À partir de', prixDiscuter:'Prix à discuter dans le chat', connectePourCommander:'Connecte-toi pour discuter et commander',
    mangerTitre:'Se nourrir', domicileTitre:'Domicile', proTitre:'Services professionnels', sejourTitre:'Séjour', immoTitre:'Immobilier', evenementTitre:'Évènement', mesAnnonces:'Mes Annonces', mesRevenus:'Mes Revenus', monAgenda:'Mon Agenda', mesActivites:'Mes Activités', creerAnnonce:'Créer une annonce', mesCommandes:'Mes Commandes', mesFavoris:'Mes Favoris', monPanier:'Mon Panier', monEscrow:'Mon Escrow', valider:'Valider', refuser:'Refuser', envoyer:'Envoyer', rechercherBtn:'Rechercher', commander:'Commander', payer:'Payer', retourAccueil:"Retour à l'accueil",
    panierTitre:'Mon Panier', panierVide:'Panier vide', panierInfo:"Ton panier, c'est tes propositions acceptées en attente de paiement en Escrow. Tu paies à Rocyinter, pas au prestataire.", payerEscrow:'Payer en Escrow', voirDiscussion:'Voir la discussion', annuler:'Annuler', montant:'Montant', prestataire:'Prestataire', chargement:'Chargement...'
  };

  window.rocyT = function(key){ if(langue==='fr') return BASE_FR[key] || key; const cache = localStorage.getItem('rocy_trad_' + langue + '_' + key); if(cache) return cache; return BASE_FR[key] || key; };
  window.rocySetLangue = function(l){ localStorage.setItem('rocy_langue', l); location.reload(); };
  window.rocyToggleLangue = function(e){ if(e) e.stopPropagation(); const m = document.getElementById('rocyLangueMenu'); if(m) m.classList.toggle('show'); };
  document.addEventListener('click', function(e){ if(e.target.closest('.rocy-langue-wrap')) return; const m = document.getElementById('rocyLangueMenu'); if(m) m.classList.remove('show'); });

  async function traduireAuto(texte, langueCible){
    if(!texte || langueCible==='fr') return texte;
    const code = CODE_API[langueCible] || langueCible;
    const cacheKey = 'rocy_trad_txt_' + langueCible + '_' + texte;
    const cached = localStorage.getItem(cacheKey);
    if(cached) return cached;
    try{ const url = 'https://api.mymemory.translated.net/get?q=' + encodeURIComponent(texte) + '&langpair=fr|' + code; const res = await fetch(url); const j = await res.json(); if(j && j.responseData && j.responseData.translatedText){ const t = j.responseData.translatedText; try{ localStorage.setItem(cacheKey, t); }catch(e){} return t; } }catch(e){}
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
      const k = el.getAttribute('data-i18n'); let base = BASE_FR[k];
      if(!base){ base = (el.getAttribute('data-i18n-base') || el.textContent || '').trim(); if(!base) continue; el.setAttribute('data-i18n-base', base); } else { el.setAttribute('data-i18n-base', base); }
      const cacheKey = 'rocy_trad_' + langue + '_' + k; let trad = localStorage.getItem(cacheKey);
      if(!trad){ trad = await traduireAuto(base, langue); localStorage.setItem(cacheKey, trad); }
      el.textContent = trad;
    }
    const phs = Array.from(document.querySelectorAll('[data-i18n-ph]'));
    for(const el of phs){
      const k = el.getAttribute('data-i18n-ph'); let base = BASE_FR[k] || el.getAttribute('data-i18n-base') || el.placeholder || ''; if(!base) continue;
      el.setAttribute('data-i18n-base', base); const cacheKey = 'rocy_trad_' + langue + '_' + k; let trad = localStorage.getItem(cacheKey);
      if(!trad){ trad = await traduireAuto(base, langue); localStorage.setItem(cacheKey, trad); }
      el.placeholder = trad;
    }
    const autoEls = Array.from(document.querySelectorAll('.rocy-header [data-traduire], .rocy-drawer [data-traduire], .rocy-footer [data-traduire]'));
    for(const el of autoEls){ const base = el.getAttribute('data-traduire'); if(!base) continue; const trad = await traduireAuto(base, langue); el.textContent = trad; }
  }
  window.rocyAppliquerTraduction = traduirePageEntiere;
  window.rocyTraduireTexte = traduireAuto;

  function observerNouveauContenu(){
    if(!window.MutationObserver) return;
    let enCours = false;
    const obs = new MutationObserver(()=>{ if(enCours) return; enCours = true; setTimeout(()=>{ enCours = false; traduirePageEntiere(); appliquerDevises(); }, 400); });
    obs.observe(document.body, {childList:true, subtree:true});
  }

  const DEVISES = [{code:'FCFA', label:'FCFA'}, {code:'EUR', label:'€ EUR'}, {code:'USD', label:'$ USD'}, {code:'NGN', label:'₦ NGN'}, {code:'GHS', label:'₵ GHS'}, {code:'XOF', label:'XOF'}, {code:'GBP', label:'£ GBP'}];
  let devise = localStorage.getItem('rocy_devise') || 'FCFA';
  const TAUX_FIXE_EUR = 655.957;
  let tauxJour = null;
  let tauxTimestamp = 0;
  try{ const saved = JSON.parse(localStorage.getItem('rocy_taux')||'null'); if(saved && saved.rates && Date.now() - saved.ts < 5*60*1000){ tauxJour = saved.rates; tauxTimestamp = saved.ts; } }catch(e){}

  async function chargerTaux(){
    if(tauxJour && tauxJour.USD && Date.now() - tauxTimestamp < 5*60*1000) return;
    try{ const res = await fetch('https://open.er-api.com/v6/latest/XOF'); const j = await res.json(); if(j && j.rates){ tauxJour = j.rates; tauxTimestamp = Date.now(); try{ localStorage.setItem('rocy_taux', JSON.stringify({rates:tauxJour, ts:tauxTimestamp})); }catch(e){} } }catch(e){}
    if(!tauxJour || !tauxJour.USD) tauxJour = { XOF:1, FCFA:1, EUR:0.00152, USD:0.00165, NGN:2.45, GHS:0.025, GBP:0.0013 };
    if(!tauxJour.FCFA) tauxJour.FCFA = tauxJour.XOF || 1;
    tauxJour.EUR = 1 / TAUX_FIXE_EUR;
  }

  window.rocyGetTauxActuel = function(){
    if(!tauxJour) return 1;
    if(devise==='FCFA' || devise==='XOF') return 1;
    if(devise==='EUR') return 1 / TAUX_FIXE_EUR;
    return tauxJour[devise] || 1;
  };

  window.rocyFormatPrix = function(prixFCFA){
    if(!prixFCFA || prixFCFA<=0) return window.rocyT('prixDiscuter');
    if(!tauxJour) tauxJour = { XOF:1, FCFA:1, EUR:0.00152, USD:0.00165, NGN:2.45, GHS:0.025, GBP:0.0013 };
    let taux = 1;
    if(devise==='FCFA' || devise==='XOF') taux = 1;
    else if(devise==='EUR') taux = 1 / TAUX_FIXE_EUR;
    else taux = tauxJour[devise] || 1;
    const v = Number(prixFCFA) * taux;
    if(devise==='FCFA' || devise==='XOF') return Math.round(v).toLocaleString('fr-FR') + ' FCFA';
    if(devise==='EUR' || devise==='USD' || devise==='GBP') return v.toFixed(2) + ' ' + devise;
    return Math.round(v).toLocaleString('fr-FR') + ' ' + devise;
  };

  window.rocyFigerTauxPaiement = function(montantFCFA){
    const taux = window.rocyGetTauxActuel();
    const montantAffiche = window.rocyFormatPrix(montantFCFA);
    const info = { montant_fcfa: Number(montantFCFA), devise_affichee: devise, taux_utilise: taux, montant_affiche: montantAffiche, date_heure: new Date().toISOString() };
    try{ localStorage.setItem('rocy_dernier_taux_paiement', JSON.stringify(info)); }catch(e){}
    return info;
  };

  function appliquerDevises(){
    document.querySelectorAll('[data-prix-fcfa]').forEach(el=>{
      const raw = el.getAttribute('data-prix-fcfa');
      const val = Number(raw);
      if(!isNaN(val) && val>0) el.textContent = window.rocyFormatPrix(val);
    });
  }
  window.rocyAppliquerDevises = appliquerDevises;
  window.rocySetDevise = function(d){ localStorage.setItem('rocy_devise', d); location.reload(); };

  async function chargerNotifs(){
    try{
      const sb = window.supabaseClient; if(!sb || !uid) return;
      const {count} = await sb.from('notifications').select('id', {count:'exact', head:true}).eq('user_id', uid).eq('lu', false);
      const badge = document.getElementById('rocyNotifBadge');
      const badgeMenu = document.getElementById('rocyNotifBadgeMenu');
      if(badge){ badge.textContent = count||0; badge.style.display = (count>0) ? 'flex' : 'none'; }
      if(badgeMenu){ badgeMenu.textContent = count>0 ? ' ('+count+')' : ''; }
    }catch(e){}
  }
  window.rocyRefreshNotifs = chargerNotifs;
  function ecouterNotifs(){
    try{
      const sb = window.supabaseClient; if(!sb || !uid) return;
      sb.channel('rocy-notifs-'+uid).on('postgres_changes',{event:'*',schema:'public',table:'notifications',filter:'user_id=eq.'+uid},()=>chargerNotifs()).subscribe();
    }catch(e){}
  }
  async function verifierAdmin(){
    if(!uid || typeLocal !== 'admin') return false;
    try{
      const sb = window.supabaseClient; if(!sb) return false;
      const {data} = await sb.from('profiles').select('type, type_compte, role, type_fournisseur').eq('id', uid).single();
      if(!data) return false;
      const vraiType = data.type || data.type_compte || data.role || data.type_fournisseur || '';
      if(vraiType !== 'admin'){ localStorage.setItem('rocy_user_type', vraiType); localStorage.setItem('rocy_role', vraiType); return false; }
      return true;
    }catch(e){ return false; }
  }
  window.rocyOuvrirMenu = function(){ const d=document.getElementById('rocyDrawer'); const o=document.getElementById('rocyOverlay'); if(!d||!o) return; d.classList.add('open'); o.classList.add('show'); };
  window.rocyFermerMenu = function(){ const d=document.getElementById('rocyDrawer'); const o=document.getElementById('rocyOverlay'); if(!d||!o) return; d.classList.remove('open'); o.classList.remove('show'); };
  window.rocyAllerEspace = async function(){
    try{
      const sb = window.supabaseClient;
      if(sb){
        const { data: { user } } = await sb.auth.getUser();
        if(!user){ location.href='connexion.html'; return; }
        const { data: prof } = await sb.from('profiles').select('type_compte, role, type, type_fournisseur').eq('id', user.id).maybeSingle();
        const r = String(prof?.type_compte || prof?.role || prof?.type || prof?.type_fournisseur || '').toLowerCase();
        if(r){ localStorage.setItem('rocy_user_type', r); localStorage.setItem('rocy_role', r); typeLocal = r; }
        if(r === 'admin'){ location.href='admin.html'; return; }
        if(['prestataire','livreur','fournisseur','professionnel','entreprise','pro'].includes(r)){ location.href='dashboard-prestataire.html'; return; }
        if(r === 'client'){ location.href='dashboard-client.html'; return; }
      }
    }catch(e){}
    if(['prestataire','livreur','entreprise','fournisseur','professionnel','pro'].includes(typeLocal)) location.href='dashboard-prestataire.html';
    else if(typeLocal==='admin') location.href='admin.html';
    else location.href='dashboard-client.html';
  };
  window.rocyDeconnexion = async function(){
    try{ if(window.supabaseClient) await window.supabaseClient.auth.signOut(); }catch(e){}
    ['rocy_user_id','rocy_user_nom','rocy_user_type','rocy_role','rocy_user_whatsapp','rocy_user_pays','rocy_user_ville','rocy_user_localite'].forEach(k=>localStorage.removeItem(k));
    location.href='index.html';
  };
  window.rocyProposerService = function(){ if(!isConnecte) location.href='inscription.html'; else if(isPresta) location.href='creer-annonce.html'; else location.href='inscription.html?type=prestataire'; };

  // ===== DESIGN MONDIAL GLOBAL - CORRIGÉ, EN-TÊTE NE DISPARAÎT PLUS =====
  function injecterDesignMondial(){
    if(!document.querySelector('link[href="style.css"]')){
      const css = document.createElement('link');
      css.rel = 'stylesheet';
      css.href = 'style.css';
      document.head.appendChild(css);
    }
    if(document.getElementById('rocyDesignMondial')) return;
    const link = document.createElement('link');
    link.id = 'rocyDesignMondialFont';
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap';
    document.head.appendChild(link);
    const style = document.createElement('style');
    style.id = 'rocyDesignMondial';
    style.textContent = `
      .rocy-header{display:flex !important;flex-direction:column !important;position:fixed !important;top:0 !important;left:0 !important;right:0 !important;z-index:100 !important;background:#0f172a !important;visibility:visible !important;opacity:1 !important}
      body{font-family:'Inter',system-ui,sans-serif !important;-webkit-font-smoothing:antialiased;background:#f7f8fa !important;color:#0f172a !important}
      h1,h2,h3{font-family:'Plus Jakarta Sans','Inter',sans-serif !important;letter-spacing:-0.02em}
      .hero{background:linear-gradient(180deg,#0b1220 0%,#111c33 100%) !important;color:#fff !important;padding:34px 20px 26px !important;text-align:center !important}
      .hero h1{font-size:28px !important;line-height:1.25 !important;font-weight:800 !important;max-width:520px;margin:0 auto !important}
      .hero h1 span{color:#fbbf24 !important}
      .hero p{color:#cbd5e1 !important;font-size:14.5px !important;line-height:1.6 !important;max-width:480px;margin:10px auto 0 !important}
      .hero-decouvrir{margin-top:16px !important;padding-top:16px !important;border-top:1px solid rgba(255,255,255,.12) !important;font-size:13px !important;color:#94a3b8 !important;max-width:480px;margin-left:auto !important;margin-right:auto !important}
      .cta-bas{text-align:center;padding:18px 16px 6px}
      .cta-bas-cta{display:flex;gap:8px;justify-content:center;flex-wrap:wrap}
      .cta-bas-cta button{padding:10px 18px !important;border-radius:999px !important;font-weight:600 !important;font-size:13px !important;border:none !important;font-family:'Inter',sans-serif !important}
      .cta-bas-cta .btn-jaune{background:#fbbf24 !important;color:#111 !important;box-shadow:0 4px 14px rgba(251,191,36,.25)}
      .cta-bas-cta .btn-noir{background:#fff !important;color:#0f172a !important;border:1px solid #e2e8f0 !important}
      .filters{background:#fff !important;border-radius:18px !important;box-shadow:0 4px 24px rgba(15,23,42,.06) !important}
      .filters label{font-size:11px !important;letter-spacing:.06em;color:#64748b !important}
      .filters select,.filters input{border-radius:12px !important;font-family:'Inter',sans-serif !important}
      .card-u{border-radius:999px !important;padding:9px 13px !important;font-weight:600 !important;box-shadow:0 1px 3px rgba(0,0,0,.04) !important}
      .card{border-radius:18px !important;box-shadow:0 2px 12px rgba(15,23,42,.05) !important;border:1px solid #f1f5f9 !important}
      .card-actions button{border-radius:12px !important;font-weight:600 !important;font-family:'Inter',sans-serif !important}
      .btn{font-family:'Inter',sans-serif !important;font-weight:600 !important}
      input,select,textarea,button{font-family:'Inter',system-ui,sans-serif}
      input,select,textarea{border-radius:12px !important}
      button{cursor:pointer}
    `;
    document.head.appendChild(style);
  }

  async function construire(){
    injecterDesignMondial();
    // CORRECTION EN-TÊTE : si un vieux header vide existe, on l'efface et on reconstruit le vrai
    const vieuxHeader = document.querySelector('.rocy-header');
    if(vieuxHeader){
      if(vieuxHeader.querySelector('.rocy-logo')){
        await traduirePageEntiere();
        appliquerDevises();
        return;
      }
      vieuxHeader.remove();
      const vieuxDrawer = document.getElementById('rocyDrawer');
      if(vieuxDrawer) vieuxDrawer.remove();
      const vieuxOverlay = document.getElementById('rocyOverlay');
      if(vieuxOverlay) vieuxOverlay.remove();
    }
    try{
      const sb = window.supabaseClient;
      if(sb){ const {data:{user}} = await sb.auth.getUser(); if(user){ uid = user.id; isConnecte = true; const {data:prof} = await sb.from('profiles').select('nom, type_compte, role, type, type_fournisseur').eq('id', uid).maybeSingle(); if(prof){ nom = prof.nom||nom; typeLocal = String(prof.type_compte||prof.role||prof.type||prof.type_fournisseur||typeLocal||'').toLowerCase(); isPresta = ['prestataire','livreur','entreprise','fournisseur','professionnel','pro'].includes(typeLocal); localStorage.setItem('rocy_user_id', uid); localStorage.setItem('rocy_user_type', typeLocal); localStorage.setItem('rocy_user_nom', nom); } } }
    }catch(e){}
    await chargerTaux();
    const isAdmin = await verifierAdmin();
    const t = window.rocyT;
    const langueActuelle = LANGUES.find(l=>l.code===langue) || LANGUES[0];
    const listeLangue = LANGUES.map(l=>`<button type="button" class="rocy-langue-item ${l.code===langue?'actif':''}" onclick="rocySetLangue('${l.code}')">${l.flag} ${l.long}</button>`).join('');
    const optsDevise = DEVISES.map(d=>`<option value="${d.code}" ${devise===d.code?'selected':''}>${d.label}</option>`).join('');
    const headerHTML = `
    <style>
      *{box-sizing:border-box}
      html,body{overflow-x:hidden;width:100%;margin:0;padding:0}
      body{padding-top:92px !important}
      .rocy-header{background:#0f172a;color:#fff;padding:10px 8px 8px;display:flex;flex-direction:column;gap:8px;position:fixed;top:0;left:0;right:0;z-index:100;width:100%;max-width:100vw;overflow:visible;box-shadow:0 4px 14px rgba(0,0,0,.25);font-family:'Inter',system-ui,sans-serif}
      .rocy-header-ligne1{display:flex;align-items:center;gap:6px;width:100%;max-width:100%}
      .rocy-header-ligne2{display:flex;justify-content:flex-end;gap:8px;width:100%;align-items:center}
      .rocy-burger{font-size:22px;cursor:pointer;background:none;border:none;color:#fff;line-height:1;padding:4px 4px;border-radius:8px;flex-shrink:0}
      .rocy-logo{cursor:pointer;flex:1;min-width:0;line-height:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
      .rocy-logo .rocy-nom{font-size:19px;font-weight:800;letter-spacing:.2px;font-family:'Plus Jakarta Sans',sans-serif}
      .rocy-logo .rocy-blanc{color:#fff}
      .rocy-logo .rocy-jaune{color:#fbbf24}
      .rocy-logo .rocy-services{display:block;color:#fff;font-size:10px;font-weight:700;letter-spacing:3.5px;margin-top:3px;opacity:.95}
      .rocy-header .btn{background:#fbbf24;color:#000;border:none;padding:8px 12px;border-radius:999px;font-weight:600;cursor:pointer;font-size:12px;white-space:nowrap}
      .rocy-header .btn-white{background:#fff;color:#111}
      .rocy-top-select{background:#1e293b;color:#fff;border:1px solid #334155;border-radius:999px;padding:6px 4px;font-size:11px;font-weight:600;cursor:pointer;flex-shrink:0}
      .rocy-select-devise{width:64px;max-width:64px}
      .rocy-espace-btn{background:#1e293b;color:#fff;border:1px solid #334155;border-radius:999px;padding:7px 14px;font-size:12px;font-weight:600;cursor:pointer;white-space:nowrap}
      .rocy-langue-wrap{position:relative;flex-shrink:0}
      .rocy-langue-btn{background:#1e293b;color:#fff;border:1px solid #334155;border-radius:999px;padding:6px 8px;font-size:11px;font-weight:600;cursor:pointer;white-space:nowrap}
      .rocy-langue-menu{display:none;position:absolute;top:calc(100% + 6px);right:0;width:180px;max-height:320px;overflow-y:auto;background:#fff;color:#111;border-radius:14px;box-shadow:0 10px 30px rgba(0,0,0,.25);padding:6px;z-index:300}
      .rocy-langue-menu.show{display:block}
      .rocy-langue-item{display:block;width:100%;text-align:left;background:none;border:none;border-bottom:1px solid #f1f5f9;padding:11px 10px;font-size:14px;cursor:pointer;color:#111}
      .rocy-langue-item.actif{background:#fef3c7;font-weight:700}
      .rocy-drawer{position:fixed;top:0;left:-300px;width:280px;max-width:85vw;height:100%;background:#fff;z-index:200;transition:left .25s;box-shadow:4px 0 20px rgba(0,0,0,.2);overflow-y:auto;padding-bottom:20px;font-family:'Inter',sans-serif}
      .rocy-drawer.open{left:0}
      .rocy-drawer-head{background:#0f172a;color:#fff;padding:16px}
      .rocy-drawer-head b{font-size:18px} .rocy-drawer-head b .blanc{color:#fff} .rocy-drawer-head b .jaune{color:#fbbf24} .rocy-drawer-head small{opacity:.8}
      .rocy-menu-item{display:flex;align-items:center;gap:10px;width:100%;text-align:left;background:none;border:none;border-bottom:1px solid #f1f5f9;padding:14px 16px;font-size:14px;cursor:pointer;color:#111}
      .rocy-menu-label{font-size:11px;font-weight:800;color:#94a3b8;padding:14px 16px 4px}
      .rocy-overlay{position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:150;display:none;pointer-events:none}
      .rocy-overlay.show{display:block;pointer-events:auto}
      .rocy-footer{text-align:center;padding:20px;color:#94a3b8;font-size:12px;line-height:1.8}
      .rocy-footer a{color:#94a3b8;text-decoration:none}
      .rocy-bell{position:relative;background:#1e293b;color:#fff;border:1px solid #334155;border-radius:999px;padding:7px 11px;font-size:14px;font-weight:700;cursor:pointer;white-space:nowrap}
      .rocy-bell-badge{position:absolute;top:-6px;right:-4px;background:#ef4444;color:#fff;font-size:10px;font-weight:800;min-width:18px;height:18px;border-radius:999px;display:none;align-items:center;justify-content:center;padding:0 4px}
      .rocy-notif-count{color:#ef4444;font-weight:800}
    </style>
    <div class="rocy-overlay" id="rocyOverlay" onclick="rocyFermerMenu()"></div>
    <header class="rocy-header">
      <div class="rocy-header-ligne1">
        <button type="button" class="rocy-burger" onclick="rocyOuvrirMenu()">☰</button>
        <div class="rocy-logo" onclick="location.href='index.html'">
          <div class="rocy-nom"><span class="rocy-blanc">ROCY</span><span class="rocy-jaune">INTER</span></div>
          <span class="rocy-services">SERVICES</span>
        </div>
        <div class="rocy-langue-wrap">
          <button type="button" class="rocy-langue-btn" onclick="rocyToggleLangue(event)">${langueActuelle.flag} ${langueActuelle.court} ▾</button>
          <div class="rocy-langue-menu" id="rocyLangueMenu">${listeLangue}</div>
        </div>
        <select class="rocy-top-select rocy-select-devise" onchange="rocySetDevise(this.value)">${optsDevise}</select>
      </div>
      <div class="rocy-header-ligne2">
        ${isConnecte ? `<button type="button" class="rocy-bell" onclick="location.href='notifications.html'">🔔<span class="rocy-bell-badge" id="rocyNotifBadge">0</span></button>` : ''}
        ${!isConnecte ? `<button type="button" class="rocy-espace-btn" onclick="location.href='connexion.html'"><span data-traduire="Connexion">Connexion</span></button>` : `<button type="button" class="rocy-espace-btn" onclick="rocyAllerEspace()">👤 <span data-traduire="Mon espace">Mon espace</span></button>`}
      </div>
    </header>
    <div class="rocy-drawer" id="rocyDrawer">
      <div class="rocy-drawer-head"><b><span class="blanc">ROCY</span><span class="jaune">INTER</span></b><br><small style="letter-spacing:3px">SERVICES</small><br><small>${isConnecte ? '👋 '+t('bonjour')+', '+nom : t('visiteur')}</small><br><button type="button" style="margin-top:8px;background:#fbbf24;border:none;padding:6px 12px;border-radius:999px;font-weight:600;cursor:pointer" onclick="rocyFermerMenu()"><span data-traduire="Fermer">Fermer</span></button></div>
      <div class="rocy-menu-label"><span data-traduire="MON COMPTE">MON COMPTE</span></div>
      ${!isConnecte ? `<button type="button" class="rocy-menu-item" onclick="location.href='connexion.html'"><span data-traduire="Se connecter">Se connecter</span></button><button type="button" class="rocy-menu-item" onclick="location.href='inscription.html'"><span data-traduire="Créer un compte">Créer un compte</span></button>` : `<button type="button" class="rocy-menu-item" onclick="rocyAllerEspace()">👤 <span data-traduire="Mon espace">Mon espace</span></button><button type="button" class="rocy-menu-item" onclick="location.href='favoris.html'"><span data-traduire="Mes Favoris">Mes Favoris</span></button><button type="button" class="rocy-menu-item" onclick="location.href='panier.html'"><span data-traduire="Mon Panier">Mon Panier</span></button><button type="button" class="rocy-menu-item" onclick="location.href='notifications.html'"><span data-traduire="Notifications">Notifications</span><span class="rocy-notif-count" id="rocyNotifBadgeMenu"></span></button><button type="button" class="rocy-menu-item" onclick="rocyDeconnexion()"><span data-traduire="Déconnexion">Déconnexion</span></button>`}
      <div class="rocy-menu-label"><span data-traduire="SERVICES">SERVICES</span></div>
      <button type="button" class="rocy-menu-item" onclick="location.href='index.html'">🏠 <span data-traduire="Accueil">Accueil</span></button>
      <button type="button" class="rocy-menu-item" onclick="location.href='manger.html'">🍽️ <span data-traduire="Se nourrir">Se nourrir</span></button>
      <button type="button" class="rocy-menu-item" onclick="location.href='services-domicile.html'">🏠 <span data-traduire="Domicile">Domicile</span></button>
      <button type="button" class="rocy-menu-item" onclick="location.href='services-pro.html'">💼 <span data-traduire="Services professionnels">Services professionnels</span></button>
      <button type="button" class="rocy-menu-item" onclick="location.href='sejour.html'">✈️ <span data-traduire="Séjour">Séjour</span></button>
      <button type="button" class="rocy-menu-item" onclick="location.href='evenement.html'">🎉 <span data-traduire="Évènement">Évènement</span></button>
      <button type="button" class="rocy-menu-item" onclick="location.href='immobilier.html'"><span data-traduire="Immobilier">Immobilier</span></button>
      <button type="button" class="rocy-menu-item" onclick="location.href='livreurs.html'"><span data-traduire="Livreurs">Livreurs</span></button>
      <button type="button" class="rocy-menu-item" onclick="location.href='escrow.html'"><span data-traduire="Mon Escrow">Mon Escrow</span></button>
      <button type="button" class="rocy-menu-item" onclick="location.href='abonnement.html'"><span data-traduire="Abonnement Prestataire">Abonnement Prestataire</span></button>
      <div class="rocy-menu-label"><span data-traduire="AIDE">AIDE</span></div>
      <button type="button" class="rocy-menu-item" onclick="location.href='comment-ca-marche.html'"><span data-traduire="Comment ça marche ?">Comment ça marche ?</span></button>
      <button type="button" class="rocy-menu-item" onclick="location.href='aide-faq.html'"><span data-traduire="Aide / FAQ">Aide / FAQ</span></button>
      <button type="button" class="rocy-menu-item" onclick="location.href='contact.html'"><span data-traduire="Contact">Contact</span></button>
      <button type="button" class="rocy-menu-item" onclick="location.href='tarifs.html'"><span data-traduire="Tarifs">Tarifs</span></button>
      <button type="button" class="rocy-menu-item" onclick="location.href='cgu.html'"><span data-traduire="CGU">CGU</span></button>
      <button type="button" class="rocy-menu-item" onclick="location.href='confidentialite.html'"><span data-traduire="Confidentialité">Confidentialité</span></button>
      ${isAdmin ? `<div class="rocy-menu-label">ADMIN - QUE POUR TOI</div><button type="button" class="rocy-menu-item" onclick="location.href='admin.html'">🛡️ Panel Admin</button>` : ''}
      ${isPresta ? `<div class="rocy-menu-label">PRESTATAIRE</div><button type="button" class="rocy-menu-item" onclick="rocyProposerService()"><span data-traduire="Créer une annonce">Créer une annonce</span></button><button type="button" class="rocy-menu-item" onclick="location.href='revenus.html'">💰 <span data-traduire="Mes Revenus">Mes Revenus</span></button><button type="button" class="rocy-menu-item" onclick="location.href='agenda.html'">📅 <span data-traduire="Mon Agenda">Mon Agenda</span></button>` : ''}
    </div>`;
    const footerHTML = `<footer class="rocy-footer">Rocyinter Service © 2026 - Paiement sécurisé Escrow - Bénin<br><a href="tarifs.html"><span data-traduire="Tarifs">Tarifs</span></a> | <a href="cgu.html"><span data-traduire="CGU">CGU</span></a> | <a href="confidentialite.html"><span data-traduire="Confidentialité">Confidentialité</span></a> | <a href="aide-faq.html"><span data-traduire="Aide / FAQ">Aide / FAQ</span></a> | <a href="contact.html"><span data-traduire="Contact">Contact</span></a></footer>`;
    // On n'efface que les vieux header/footer qui ne sont PAS ceux de rocy-layout
    document.querySelectorAll('header:not(.rocy-header)').forEach(h=>h.remove());
    document.querySelectorAll('footer:not(.rocy-footer)').forEach(f=>f.remove());
    document.body.insertAdjacentHTML('afterbegin', headerHTML);
    document.body.insertAdjacentHTML('beforeend', footerHTML);
    await traduirePageEntiere();
    appliquerDevises();
    observerNouveauContenu();
    chargerNotifs();
    ecouterNotifs();
    setInterval(chargerNotifs, 30000);
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', construire);
  else construire();
})();
