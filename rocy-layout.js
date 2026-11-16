// rocy-layout.js - HEADER COMMUN + LANGUE + MONNAIE - VERSION FINALE
(function(){
  const uid = localStorage.getItem('rocy_user_id');
  const typeLocal = localStorage.getItem('rocy_user_type') || localStorage.getItem('rocy_role') || '';
  const nom = localStorage.getItem('rocy_user_nom') || '';
  const isConnecte = !!uid;
  const isPresta = typeLocal === 'prestataire' || typeLocal === 'livreur';

  // ========== LANGUES - COMPLET PAR PAYS ==========
  // fr = Français (Bénin, Togo, Sénégal, Côte d'Ivoire, France...), en = English (Nigeria, Ghana, USA...), es, pt, ar
  const LANGUES = [
    {code:'fr', label:'🇫🇷 FR'}, {code:'en', label:'🇬🇧 EN'}, {code:'es', label:'🇪🇸 ES'},
    {code:'pt', label:'🇵🇹 PT'}, {code:'ar', label:'🇸🇦 AR'}, {code:'de', label:'🇩🇪 DE'}
  ];
  let langue = localStorage.getItem('rocy_langue');
  if(!langue){
    // Auto : si le navigateur est en anglais, on met anglais, sinon français
    langue = (navigator.language||'fr').startsWith('en') ? 'en' : 'fr';
    localStorage.setItem('rocy_langue', langue);
  }

  const TRAD = {
    fr: { accueil:'Accueil', connexion:'Connexion', devenir:'Devenir Prestataire', espace:'Mon espace', bonjour:'Bonjour', visiteur:'Bienvenue, visiteur', compte:'MON COMPTE', seConnecter:'🔑 Se connecter', creerCompte:'📝 Créer un compte', favoris:'❤️ Mes Favoris', panier:'🛒 Mon Panier', notif:'🔔 Notifications', deconnexion:'🚪 Déconnexion', services:'SERVICES', immobilier:'🏘️ Immobilier', livreurs:'🛵 Livreurs', escrow:'🔒 Mon Escrow', abonnement:'⭐ Abonnement Prestataire', aide:'AIDE', comment:'❓ Comment ça marche ?', faq:'💬 Aide / FAQ', contact:'📞 Contact', tarifs:'💰 Tarifs', cgu:'📄 CGU', conf:'🔐 Confidentialité', fermer:'✕ Fermer', proposer:'➕ Créer une annonce' },
    en: { accueil:'Home', connexion:'Login', devenir:'Become Provider', espace:'My space', bonjour:'Hello', visiteur:'Welcome, visitor', compte:'MY ACCOUNT', seConnecter:'🔑 Login', creerCompte:'📝 Create account', favoris:'❤️ My Favorites', panier:'🛒 My Cart', notif:'🔔 Notifications', deconnexion:'🚪 Logout', services:'SERVICES', immobilier:'🏘️ Real Estate', livreurs:'🛵 Couriers', escrow:'🔒 My Escrow', abonnement:'⭐ Provider Subscription', aide:'HELP', comment:'❓ How does it work?', faq:'💬 Help / FAQ', contact:'📞 Contact', tarifs:'💰 Prices', cgu:'📄 Terms', conf:'🔐 Privacy', fermer:'✕ Close', proposer:'➕ Create an ad' },
    es: { accueil:'Inicio', connexion:'Iniciar sesión', devenir:'Ser Proveedor', espace:'Mi espacio', bonjour:'Hola', visiteur:'Bienvenido, visitante', compte:'MI CUENTA', seConnecter:'🔑 Iniciar sesión', creerCompte:'📝 Crear cuenta', favoris:'❤️ Mis Favoritos', panier:'🛒 Mi Carrito', notif:'🔔 Notificaciones', deconnexion:'🚪 Cerrar sesión', services:'SERVICIOS', immobilier:'🏘️ Inmobiliario', livreurs:'🛵 Repartidores', escrow:'🔒 Mi Escrow', abonnement:'⭐ Suscripción', aide:'AYUDA', comment:'❓ ¿Cómo funciona?', faq:'💬 Ayuda / FAQ', contact:'📞 Contacto', tarifs:'💰 Precios', cgu:'📄 Términos', conf:'🔐 Privacidad', fermer:'✕ Cerrar', proposer:'➕ Crear anuncio' },
    pt: { accueil:'Início', connexion:'Entrar', devenir:'Ser Prestador', espace:'Meu espaço', bonjour:'Olá', visiteur:'Bem-vindo, visitante', compte:'MINHA CONTA', seConnecter:'🔑 Entrar', creerCompte:'📝 Criar conta', favoris:'❤️ Meus Favoritos', panier:'🛒 Meu Carrinho', notif:'🔔 Notificações', deconnexion:'🚪 Sair', services:'SERVIÇOS', immobilier:'🏘️ Imobiliário', livreurs:'🛵 Entregadores', escrow:'🔒 Meu Escrow', abonnement:'⭐ Assinatura', aide:'AJUDA', comment:'❓ Como funciona?', faq:'💬 Ajuda / FAQ', contact:'📞 Contato', tarifs:'💰 Preços', cgu:'📄 Termos', conf:'🔐 Privacidade', fermer:'✕ Fechar', proposer:'➕ Criar anúncio' },
    ar: { accueil:'الرئيسية', connexion:'تسجيل الدخول', devenir:'كن مقدم خدمة', espace:'مساحتي', bonjour:'مرحبا', visiteur:'أهلا بك، زائر', compte:'حسابي', seConnecter:'🔑 تسجيل الدخول', creerCompte:'📝 إنشاء حساب', favoris:'❤️ مفضلاتي', panier:'🛒 سلة التسوق', notif:'🔔 الإشعارات', deconnexion:'🚪 تسجيل الخروج', services:'الخدمات', immobilier:'🏘️ العقارات', livreurs:'🛵 السعاة', escrow:'🔒 الضمان', abonnement:'⭐ الاشتراك', aide:'مساعدة', comment:'❓ كيف يعمل؟', faq:'💬 مساعدة', contact:'📞 اتصل بنا', tarifs:'💰 الأسعار', cgu:'📄 الشروط', conf:'🔐 الخصوصية', fermer:'✕ إغلاق', proposer:'➕ إنشاء إعلان' },
    de: { accueil:'Start', connexion:'Anmelden', devenir:'Anbieter werden', espace:'Mein Bereich', bonjour:'Hallo', visiteur:'Willkommen, Besucher', compte:'MEIN KONTO', seConnecter:'🔑 Anmelden', creerCompte:'📝 Konto erstellen', favoris:'❤️ Favoriten', panier:'🛒 Warenkorb', notif:'🔔 Benachrichtigungen', deconnexion:'🚪 Abmelden', services:'DIENSTLEISTUNGEN', immobilier:'🏘️ Immobilien', livreurs:'🛵 Kuriere', escrow:'🔒 Mein Escrow', abonnement:'⭐ Abo', aide:'HILFE', comment:'❓ Wie funktioniert es?', faq:'💬 Hilfe / FAQ', contact:'📞 Kontakt', tarifs:'💰 Preise', cgu:'📄 AGB', conf:'🔐 Datenschutz', fermer:'✕ Schließen', proposer:'➕ Anzeige erstellen' }
  };
  window.rocyT = function(key){ return (TRAD[langue]||TRAD.fr)[key] || (TRAD.fr)[key] || key; };
  window.rocySetLangue = function(l){ localStorage.setItem('rocy_langue', l); location.reload(); };
  // Traduction auto pour les pages : on traduit tous les éléments avec data-i18n="cle"
  window.rocyAppliquerTraduction = function(){
    document.querySelectorAll('[data-i18n]').forEach(el=>{ const k = el.getAttribute('data-i18n'); el.textContent = window.rocyT(k); });
    document.querySelectorAll('[data-i18n-ph]').forEach(el=>{ const k = el.getAttribute('data-i18n-ph'); el.placeholder = window.rocyT(k); });
  };

  // ========== MONNAIE - TAUX DU JOUR ==========
  const DEVISES = [
    {code:'FCFA', label:'FCFA'}, {code:'EUR', label:'€ EUR'}, {code:'USD', label:'$ USD'},
    {code:'NGN', label:'₦ NGN'}, {code:'GHS', label:'₵ GHS'}, {code:'XOF', label:'XOF'}, {code:'GBP', label:'£ GBP'}
  ];
  let devise = localStorage.getItem('rocy_devise') || 'FCFA';
  let tauxJour = JSON.parse(localStorage.getItem('rocy_taux')||'{}');
  // On va chercher le vrai taux du jour sur internet
  async function chargerTaux(){
    try{
      const res = await fetch('https://open.er-api.com/v6/latest/XOF');
      const j = await res.json();
      if(j && j.rates){
        tauxJour = j.rates;
        localStorage.setItem('rocy_taux', JSON.stringify(tauxJour));
        localStorage.setItem('rocy_taux_date', new Date().toLocaleDateString('fr-FR'));
      }
    }catch(e){}
    // Fallback si pas internet
    if(!tauxJour || !tauxJour.EUR) tauxJour = { XOF:1, FCFA:1, EUR:0.00152, USD:0.00165, NGN:2.45, GHS:0.025, GBP:0.0013 };
  }
  window.rocyFormatPrix = function(prixFCFA){
    if(!prixFCFA || prixFCFA<=0) return langue==='en' ? 'Price to discuss' : 'Prix à discuter';
    const taux = tauxJour[devise] || tauxJour[devise==='FCFA'?'XOF':devise] || 1;
    const v = prixFCFA * taux;
    if(devise==='FCFA' || devise==='XOF') return Math.round(v).toLocaleString('fr-FR') + ' FCFA';
    if(devise==='EUR' || devise==='USD' || devise==='GBP') return v.toFixed(2) + ' ' + devise;
    return Math.round(v).toLocaleString('fr-FR') + ' ' + devise;
  };
  window.rocySetDevise = function(d){ localStorage.setItem('rocy_devise', d); location.reload(); };

  // ========== ADMIN SÉCURISÉ ==========
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
  // PROPOSER UN SERVICE : si connecté -> creer-annonce, sinon inscription
  window.rocyProposerService = function(){
    if(isConnecte) location.href='creer-annonce.html';
    else location.href='inscription.html';
  };

  async function construire(){
    await chargerTaux();
    const isAdmin = await verifierAdmin();
    const t = window.rocyT;
    const optsLangue = LANGUES.map(l=>`<option value="${l.code}" ${langue===l.code?'selected':''}>${l.label}</option>`).join('');
    const optsDevise = DEVISES.map(d=>`<option value="${d.code}" ${devise===d.code?'selected':''}>${d.label}</option>`).join('');
    const headerHTML = `
    <style>
      .rocy-header{background:#0f172a;color:#fff;padding:10px 12px;display:flex;align-items:center;gap:8px;position:sticky;top:0;z-index:100;flex-wrap:wrap}
      .rocy-burger{font-size:26px;cursor:pointer;background:none;border:none;color:#fff;line-height:1;padding:6px 8px;border-radius:8px}
      .rocy-logo{font-size:20px;font-weight:800;cursor:pointer;flex:1;min-width:90px} .rocy-logo span{color:#f59e0b}
      .rocy-header .btn{background:#f59e0b;color:#000;border:none;padding:8px 12px;border-radius:999px;font-weight:700;cursor:pointer;font-size:12px;white-space:nowrap}
      .rocy-header .btn-white{background:#fff;color:#111}
      .rocy-top-select{background:#1e293b;color:#fff;border:1px solid #334155;border-radius:999px;padding:7px 8px;font-size:12px;font-weight:700;cursor:pointer}
      .rocy-drawer{position:fixed;top:0;left:-300px;width:280px;max-width:85vw;height:100%;background:#fff;z-index:200;transition:left .25s;box-shadow:4px 0 20px rgba(0,0,0,.2);overflow-y:auto;padding-bottom:20px}
      .rocy-drawer.open{left:0}
      .rocy-drawer-head{background:#0f172a;color:#fff;padding:16px}
      .rocy-drawer-head b{font-size:18px} .rocy-drawer-head b span{color:#f59e0b}
      .rocy-menu-item{display:flex;align-items:center;gap:10px;width:100%;text-align:left;background:none;border:none;border-bottom:1px solid #f1f5f9;padding:14px 16px;font-size:14px;cursor:pointer;color:#111}
      .rocy-menu-label{font-size:11px;font-weight:800;color:#94a3b8;padding:14px 16px 4px}
      .rocy-overlay{position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:150;display:none;pointer-events:none}
      .rocy-overlay.show{display:block;pointer-events:auto}
      .rocy-footer{text-align:center;padding:20px;color:#94a3b8;font-size:12px;line-height:1.8}
      .rocy-footer a{color:#94a3b8;text-decoration:none}
    </style>
    <div class="rocy-overlay" id="rocyOverlay" onclick="rocyFermerMenu()"></div>
    <header class="rocy-header">
      <button type="button" class="rocy-burger" onclick="rocyOuvrirMenu()">☰</button>
      <div class="rocy-logo" onclick="location.href='index.html'">Rocy<span>inter</span></div>
      <select class="rocy-top-select" onchange="rocySetLangue(this.value)" title="Langue">${optsLangue}</select>
      <select class="rocy-top-select" onchange="rocySetDevise(this.value)" title="Monnaie">${optsDevise}</select>
      ${!isConnecte ? `<button type="button" class="btn btn-white" onclick="location.href='connexion.html'">${t('connexion')}</button><button type="button" class="btn" onclick="location.href='inscription.html'">${t('devenir')}</button>` : `<button type="button" class="btn btn-white" onclick="rocyAllerEspace()">${t('espace')}</button>`}
    </header>
    <div class="rocy-drawer" id="rocyDrawer">
      <div class="rocy-drawer-head"><b>Rocy<span>inter</span></b><br><small>${isConnecte ? '👋 '+t('bonjour')+', '+nom : t('visiteur')}</small><br><button type="button" style="margin-top:8px;background:#f59e0b;border:none;padding:6px 12px;border-radius:999px;font-weight:700;cursor:pointer" onclick="rocyFermerMenu()">${t('fermer')}</button></div>
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
      ${isPresta ? `<div class="rocy-menu-label">PRESTATAIRE</div><button type="button" class="rocy-menu-item" onclick="rocyProposerService()">${t('proposer')}</button>` : ''}
    </div>`;
    const footerHTML = `<footer class="rocy-footer">Rocyinter Services © 2026 - Paiement sécurisé Escrow - Bénin<br><a href="tarifs.html">${t('tarifs')}</a> | <a href="cgu.html">${t('cgu')}</a> | <a href="confidentialite.html">${t('conf')}</a> | <a href="aide-faq.html">${t('faq')}</a> | <a href="contact.html">${t('contact')}</a></footer>`;
    document.querySelectorAll('header:not(.rocy-header)').forEach(h=>h.remove());
    document.querySelectorAll('footer:not(.rocy-footer)').forEach(f=>f.remove());
    document.body.insertAdjacentHTML('afterbegin', headerHTML);
    document.body.insertAdjacentHTML('beforeend', footerHTML);
    window.rocyAppliquerTraduction();
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', construire);
  else construire();
})();
