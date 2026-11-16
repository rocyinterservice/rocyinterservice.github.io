// rocy-layout.js - HEADER + LANGUE + MONNAIE - VERSION FINALE
(function(){
  const uid = localStorage.getItem('rocy_user_id');
  const typeLocal = localStorage.getItem('rocy_user_type') || localStorage.getItem('rocy_role') || '';
  const nom = localStorage.getItem('rocy_user_nom') || '';
  const isConnecte = !!uid;
  const isPresta = typeLocal === 'prestataire' || typeLocal === 'livreur';

  const LANGUES = [
    {code:'fr', label:'🇫🇷 FR'}, {code:'en', label:'🇬🇧 EN'}, {code:'es', label:'🇪🇸 ES'},
    {code:'pt', label:'🇵🇹 PT'}, {code:'ar', label:'🇸🇦 AR'}, {code:'de', label:'🇩🇪 DE'}
  ];
  let langue = localStorage.getItem('rocy_langue');
  if(!langue){ langue = (navigator.language||'fr').startsWith('en') ? 'en' : 'fr'; localStorage.setItem('rocy_langue', langue); }

  const TRAD = {
    fr: {
      accueil:'Accueil', connexion:'Connexion', devenir:'Devenir Prestataire', espace:'Mon espace', bonjour:'Bonjour', visiteur:'Bienvenue, visiteur', compte:'MON COMPTE', seConnecter:'🔑 Se connecter', creerCompte:'📝 Créer un compte', favoris:'❤️ Mes Favoris', panier:'🛒 Mon Panier', notif:'🔔 Notifications', deconnexion:'🚪 Déconnexion', services:'SERVICES', immobilier:'🏘️ Immobilier', livreurs:'🛵 Livreurs', escrow:'🔒 Mon Escrow', abonnement:'⭐ Abonnement Prestataire', aide:'AIDE', comment:'❓ Comment ça marche ?', faq:'💬 Aide / FAQ', contact:'📞 Contact', tarifs:'💰 Tarifs', cgu:'📄 CGU', conf:'🔐 Confidentialité', fermer:'✕ Fermer', proposer:'➕ Créer une annonce',
      heroTitre1:'Trouvez un vrai service', heroTitre2:'près de chez vous', heroSous:'Pas de faux produits. Que des vrais prestataires validés, près de vous, avec paiement sécurisé.',
      pays:'PAYS', ville:'VILLE / LOCALITÉ', rechercher:'RECHERCHER UN SERVICE', tousPays:'Tous les pays', villePh:'Ex: Calavi, Cotonou, Godomey...', searchPh:'Ex: Plombier, Traiteur, Nettoyage...',
      tous:'Tous', tousSous:'Tous les services réels', manger:'Se nourrir', mangerSous:'Traiteur, Restaurant, Livraison', domicile:'Domicile', domicileSous:'Nettoyage, Ménage, Plomberie, Électricité', pro:'Services professionnels', proSous:'Design, Dev, Marketing, Compta', sejour:'Séjour', sejourSous:'Hôtel, Location, Guide, Transport', immo:'Immobilier', immoSous:'Location, Vente, Chambre, Visite', livreursTitre:'Livreurs', livreursSous:'Prix à discuter - Choix, pas obligatoire', proposerTitre:'Proposer un service', proposerSous:"Gagnez de l'argent - Si ta catégorie n'existe pas, tu l'écris toi-même",
      voirImmo:'🏠 Voir tout Immobilier', chercherLivreur:'🛵 Chercher un livreur', abonnementBtn:'⭐ Abonnement Prestataire - 1er mois offert*', commentBtn:'❓ Comment ça marche ?', escrowBtn:'🔒 Mon Escrow', favorisBtn:'❤️ Mes Favoris',
      annoncesTitre:'Annonces réelles près de vous', aucuneTitre:'Aucune annonce pour le moment', aucuneSous:'Sois le premier à proposer un service dans ta localité.', discuter:'Discuter', voirProfil:'Voir profil', prixFixe:'Prix fixe', aPartir:'À partir de', prixDiscuter:'Prix à discuter dans le chat'
    },
    en: {
      accueil:'Home', connexion:'Login', devenir:'Become Provider', espace:'My space', bonjour:'Hello', visiteur:'Welcome, visitor', compte:'MY ACCOUNT', seConnecter:'🔑 Login', creerCompte:'📝 Create account', favoris:'❤️ My Favorites', panier:'🛒 My Cart', notif:'🔔 Notifications', deconnexion:'🚪 Logout', services:'SERVICES', immobilier:'🏘️ Real Estate', livreurs:'🛵 Couriers', escrow:'🔒 My Escrow', abonnement:'⭐ Provider Subscription', aide:'HELP', comment:'❓ How does it work?', faq:'💬 Help / FAQ', contact:'📞 Contact', tarifs:'💰 Prices', cgu:'📄 Terms', conf:'🔐 Privacy', fermer:'✕ Close', proposer:'➕ Create an ad',
      heroTitre1:'Find a real service', heroTitre2:'near you', heroSous:'No fake products. Only real validated providers, near you, with secure payment.',
      pays:'COUNTRY', ville:'CITY / AREA', rechercher:'SEARCH A SERVICE', tousPays:'All countries', villePh:'Ex: Calavi, Cotonou, Godomey...', searchPh:'Ex: Plumber, Caterer, Cleaning...',
      tous:'All', tousSous:'All real services', manger:'Food', mangerSous:'Caterer, Restaurant, Delivery', domicile:'Home', domicileSous:'Cleaning, Housekeeping, Plumbing, Electricity', pro:'Professional Services', proSous:'Design, Dev, Marketing, Accounting', sejour:'Stay', sejourSous:'Hotel, Rental, Guide, Transport', immo:'Real Estate', immoSous:'Rental, Sale, Room, Visit', livreursTitre:'Couriers', livreursSous:'Price to discuss - Optional choice', proposerTitre:'Offer a service', proposerSous:'Earn money - If your category does not exist, write it yourself',
      voirImmo:'🏠 See all Real Estate', chercherLivreur:'🛵 Find a courier', abonnementBtn:'⭐ Provider Subscription - 1st month free*', commentBtn:'❓ How does it work?', escrowBtn:'🔒 My Escrow', favorisBtn:'❤️ My Favorites',
      annoncesTitre:'Real ads near you', aucuneTitre:'No ads for now', aucuneSous:'Be the first to offer a service in your area.', discuter:'Chat', voirProfil:'View profile', prixFixe:'Fixed price', aPartir:'From', prixDiscuter:'Price to discuss in chat'
    },
    es: {
      accueil:'Inicio', connexion:'Iniciar sesión', devenir:'Ser Proveedor', espace:'Mi espacio', bonjour:'Hola', visiteur:'Bienvenido, visitante', compte:'MI CUENTA', seConnecter:'🔑 Iniciar sesión', creerCompte:'📝 Crear cuenta', favoris:'❤️ Mis Favoritos', panier:'🛒 Mi Carrito', notif:'🔔 Notificaciones', deconnexion:'🚪 Cerrar sesión', services:'SERVICIOS', immobilier:'🏘️ Inmobiliario', livreurs:'🛵 Repartidores', escrow:'🔒 Mi Escrow', abonnement:'⭐ Suscripción', aide:'AYUDA', comment:'❓ ¿Cómo funciona?', faq:'💬 Ayuda / FAQ', contact:'📞 Contacto', tarifs:'💰 Precios', cgu:'📄 Términos', conf:'🔐 Privacidad', fermer:'✕ Cerrar', proposer:'➕ Crear anuncio',
      heroTitre1:'Encuentra un servicio real', heroTitre2:'cerca de ti', heroSous:'Sin productos falsos. Solo proveedores reales validados, cerca de ti, con pago seguro.',
      pays:'PAÍS', ville:'CIUDAD / ZONA', rechercher:'BUSCAR UN SERVICIO', tousPays:'Todos los países', villePh:'Ej: Calavi, Cotonou...', searchPh:'Ej: Fontanero, Catering, Limpieza...',
      tous:'Todos', tousSous:'Todos los servicios reales', manger:'Comida', mangerSous:'Catering, Restaurante, Entrega', domicile:'Hogar', domicileSous:'Limpieza, Fontanería, Electricidad', pro:'Servicios profesionales', proSous:'Diseño, Desarrollo, Marketing', sejour:'Estancia', sejourSous:'Hotel, Alquiler, Guía, Transporte', immo:'Inmobiliario', immoSous:'Alquiler, Venta, Habitación, Visita', livreursTitre:'Repartidores', livreursSous:'Precio a discutir', proposerTitre:'Ofrecer un servicio', proposerSous:'Gana dinero - Si tu categoría no existe, escríbela',
      voirImmo:'🏠 Ver todo Inmobiliario', chercherLivreur:'🛵 Buscar repartidor', abonnementBtn:'⭐ Suscripción - 1er mes gratis*', commentBtn:'❓ ¿Cómo funciona?', escrowBtn:'🔒 Mi Escrow', favorisBtn:'❤️ Mis Favoritos',
      annoncesTitre:'Anuncios reales cerca de ti', aucuneTitre:'Sin anuncios por ahora', aucuneSous:'Sé el primero en ofrecer un servicio en tu zona.', discuter:'Chatear', voirProfil:'Ver perfil', prixFixe:'Precio fijo', aPartir:'Desde', prixDiscuter:'Precio a discutir en el chat'
    },
    pt: {
      accueil:'Início', connexion:'Entrar', devenir:'Ser Prestador', espace:'Meu espaço', bonjour:'Olá', visiteur:'Bem-vindo, visitante', compte:'MINHA CONTA', seConnecter:'🔑 Entrar', creerCompte:'📝 Criar conta', favoris:'❤️ Meus Favoritos', panier:'🛒 Meu Carrinho', notif:'🔔 Notificações', deconnexion:'🚪 Sair', services:'SERVIÇOS', immobilier:'🏘️ Imobiliário', livreurs:'🛵 Entregadores', escrow:'🔒 Meu Escrow', abonnement:'⭐ Assinatura', aide:'AJUDA', comment:'❓ Como funciona?', faq:'💬 Ajuda / FAQ', contact:'📞 Contato', tarifs:'💰 Preços', cgu:'📄 Termos', conf:'🔐 Privacidade', fermer:'✕ Fechar', proposer:'➕ Criar anúncio',
      heroTitre1:'Encontre um serviço real', heroTitre2:'perto de você', heroSous:'Sem produtos falsos. Apenas prestadores reais validados, perto de você, com pagamento seguro.',
      pays:'PAÍS', ville:'CIDADE / LOCAL', rechercher:'PESQUISAR UM SERVIÇO', tousPays:'Todos os países', villePh:'Ex: Calavi, Cotonou...', searchPh:'Ex: Encanador, Buffet, Limpeza...',
      tous:'Todos', tousSous:'Todos os serviços reais', manger:'Comida', mangerSous:'Buffet, Restaurante, Entrega', domicile:'Casa', domicileSous:'Limpeza, Encanamento, Eletricidade', pro:'Serviços profissionais', proSous:'Design, Dev, Marketing', sejour:'Estadia', sejourSous:'Hotel, Aluguel, Guia, Transporte', immo:'Imobiliário', immoSous:'Aluguel, Venda, Quarto, Visita', livreursTitre:'Entregadores', livreursSous:'Preço a discutir', proposerTitre:'Oferecer um serviço', proposerSous:'Ganhe dinheiro - Se sua categoria não existe, escreva',
      voirImmo:'🏠 Ver todo Imobiliário', chercherLivreur:'🛵 Buscar entregador', abonnementBtn:'⭐ Assinatura - 1º mês grátis*', commentBtn:'❓ Como funciona?', escrowBtn:'🔒 Meu Escrow', favorisBtn:'❤️ Meus Favoritos',
      annoncesTitre:'Anúncios reais perto de você', aucuneTitre:'Nenhum anúncio por enquanto', aucuneSous:'Seja o primeiro a oferecer um serviço na sua região.', discuter:'Conversar', voirProfil:'Ver perfil', prixFixe:'Preço fixo', aPartir:'A partir de', prixDiscuter:'Preço a discutir no chat'
    },
    ar: {
      accueil:'الرئيسية', connexion:'تسجيل الدخول', devenir:'كن مقدم خدمة', espace:'مساحتي', bonjour:'مرحبا', visiteur:'أهلا بك، زائر', compte:'حسابي', seConnecter:'🔑 تسجيل الدخول', creerCompte:'📝 إنشاء حساب', favoris:'❤️ مفضلاتي', panier:'🛒 سلة التسوق', notif:'🔔 الإشعارات', deconnexion:'🚪 تسجيل الخروج', services:'الخدمات', immobilier:'🏘️ العقارات', livreurs:'🛵 السعاة', escrow:'🔒 الضمان', abonnement:'⭐ الاشتراك', aide:'مساعدة', comment:'❓ كيف يعمل؟', faq:'💬 مساعدة', contact:'📞 اتصل بنا', tarifs:'💰 الأسعار', cgu:'📄 الشروط', conf:'🔐 الخصوصية', fermer:'✕ إغلاق', proposer:'➕ إنشاء إعلان',
      heroTitre1:'اعثر على خدمة حقيقية', heroTitre2:'بالقرب منك', heroSous:'بدون منتجات مزيفة. مقدمون حقيقيون فقط، بالقرب منك، مع دفع آمن.',
      pays:'الدولة', ville:'المدينة / المنطقة', rechercher:'البحث عن خدمة', tousPays:'جميع الدول', villePh:'مثال: كالافي، كوتونو...', searchPh:'مثال: سباك، طعام...',
      tous:'الكل', tousSous:'جميع الخدمات الحقيقية', manger:'طعام', mangerSous:'طعام، مطعم، توصيل', domicile:'المنزل', domicileSous:'تنظيف، سباكة، كهرباء', pro:'خدمات احترافية', proSous:'تصميم، تطوير، تسويق', sejour:'إقامة', sejourSous:'فندق، إيجار، مرشد، نقل', immo:'عقارات', immoSous:'إيجار، بيع، غرفة، زيارة', livreursTitre:'السعاة', livreursSous:'السعر قابل للنقاش', proposerTitre:'قدم خدمة', proposerSous:'اكسب المال - إذا لم تكن فئتك موجودة، اكتبها',
      voirImmo:'🏠 كل العقارات', chercherLivreur:'🛵 ابحث عن ساعي', abonnementBtn:'⭐ اشتراك - الشهر الأول مجاني*', commentBtn:'❓ كيف يعمل؟', escrowBtn:'🔒 الضمان', favorisBtn:'❤️ مفضلاتي',
      annoncesTitre:'إعلانات حقيقية بالقرب منك', aucuneTitre:'لا توجد إعلانات حاليا', aucuneSous:'كن أول من يقدم خدمة في منطقتك.', discuter:'دردشة', voirProfil:'عرض الملف', prixFixe:'سعر ثابت', aPartir:'ابتداء من', prixDiscuter:'السعر قابل للنقاش في الدردشة'
    },
    de: {
      accueil:'Start', connexion:'Anmelden', devenir:'Anbieter werden', espace:'Mein Bereich', bonjour:'Hallo', visiteur:'Willkommen, Besucher', compte:'MEIN KONTO', seConnecter:'🔑 Anmelden', creerCompte:'📝 Konto erstellen', favoris:'❤️ Favoriten', panier:'🛒 Warenkorb', notif:'🔔 Benachrichtigungen', deconnexion:'🚪 Abmelden', services:'DIENSTLEISTUNGEN', immobilier:'🏘️ Immobilien', livreurs:'🛵 Kuriere', escrow:'🔒 Mein Escrow', abonnement:'⭐ Abo', aide:'HILFE', comment:'❓ Wie funktioniert es?', faq:'💬 Hilfe / FAQ', contact:'📞 Kontakt', tarifs:'💰 Preise', cgu:'📄 AGB', conf:'🔐 Datenschutz', fermer:'✕ Schließen', proposer:'➕ Anzeige erstellen',
      heroTitre1:'Finde einen echten Service', heroTitre2:'in deiner Nähe', heroSous:'Keine Fake-Produkte. Nur echte geprüfte Anbieter, in deiner Nähe, mit sicherer Zahlung.',
      pays:'LAND', ville:'STADT / ORT', rechercher:'SERVICE SUCHEN', tousPays:'Alle Länder', villePh:'Z.B. Calavi, Cotonou...', searchPh:'Z.B. Klempner, Catering...',
      tous:'Alle', tousSous:'Alle echten Services', manger:'Essen', mangerSous:'Catering, Restaurant, Lieferung', domicile:'Zuhause', domicileSous:'Reinigung, Klempner, Elektrik', pro:'Professionelle Dienstleistungen', proSous:'Design, Dev, Marketing', sejour:'Aufenthalt', sejourSous:'Hotel, Miete, Guide, Transport', immo:'Immobilien', immoSous:'Miete, Verkauf, Zimmer, Besuch', livreursTitre:'Kuriere', livreursSous:'Preis zu besprechen', proposerTitre:'Service anbieten', proposerSous:'Geld verdienen - Wenn deine Kategorie nicht existiert, schreibe sie',
      voirImmo:'🏠 Alle Immobilien', chercherLivreur:'🛵 Kurier finden', abonnementBtn:'⭐ Abo - 1. Monat gratis*', commentBtn:'❓ Wie funktioniert es?', escrowBtn:'🔒 Mein Escrow', favorisBtn:'❤️ Favoriten',
      annoncesTitre:'Echte Anzeigen in deiner Nähe', aucuneTitre:'Noch keine Anzeigen', aucuneSous:'Sei der Erste, der einen Service anbietet.', discuter:'Chatten', voirProfil:'Profil ansehen', prixFixe:'Festpreis', aPartir:'Ab', prixDiscuter:'Preis im Chat zu besprechen'
    }
  };
  window.rocyT = function(key){ return (TRAD[langue]||TRAD.fr)[key] || (TRAD.fr)[key] || key; };
  window.rocySetLangue = function(l){ localStorage.setItem('rocy_langue', l); location.reload(); };
  window.rocyAppliquerTraduction = function(){
    document.querySelectorAll('[data-i18n]').forEach(el=>{ const k=el.getAttribute('data-i18n'); if(window.rocyT(k)!==k) el.textContent = window.rocyT(k); });
    document.querySelectorAll('[data-i18n-ph]').forEach(el=>{ const k=el.getAttribute('data-i18n-ph'); if(window.rocyT(k)!==k) el.placeholder = window.rocyT(k); });
  };
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
  window.rocyProposerService = function(){ if(isConnecte) location.href='creer-annonce.html'; else location.href='inscription.html'; };
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
      <select class="rocy-top-select" onchange="rocySetLangue(this.value)">${optsLangue}</select>
      <select class="rocy-top-select" onchange="rocySetDevise(this.value)">${optsDevise}</select>
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
