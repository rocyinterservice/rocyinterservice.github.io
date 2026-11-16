// rocy-layout.js - LE SEUL HEADER / FOOTER POUR TOUT LE SITE
// Tu mets <script src="rocy-layout.js"></script> dans chaque page, et c'est fini.

(function(){
  const uid = localStorage.getItem('rocy_user_id');
  const type = localStorage.getItem('rocy_user_type') || localStorage.getItem('rocy_role') || '';
  const nom = localStorage.getItem('rocy_user_nom') || '';
  const isAdmin = type === 'admin';
  const isConnecte = !!uid;
  const isPresta = type === 'prestataire' || type === 'livreur';

  // --- DEVISE ---
  const devise = localStorage.getItem('rocy_devise') || 'FCFA';
  const TAUX = { 'FCFA':1, 'EUR':0.00152, 'USD':0.00165, 'NGN':2.45, 'GHS':0.025, 'XOF':1 };
  const SYMBOLE = { 'FCFA':'FCFA', 'EUR':'€', 'USD':'$', 'NGN':'₦', 'GHS':'₵', 'XOF':'FCFA' };
  window.rocyFormatPrix = function(prixFCFA){
    if(!prixFCFA || prixFCFA<=0) return 'Prix à discuter';
    const v = prixFCFA * (TAUX[devise]||1);
    if(devise==='FCFA') return Math.round(v).toLocaleString('fr-FR') + ' FCFA';
    if(devise==='EUR' || devise==='USD') return v.toFixed(2) + ' ' + SYMBOLE[devise];
    return Math.round(v).toLocaleString('fr-FR') + ' ' + SYMBOLE[devise];
  };
  window.rocySetDevise = function(d){ localStorage.setItem('rocy_devise', d); location.reload(); };
  window.rocySetLangue = function(l){ localStorage.setItem('rocy_langue', l); alert(l==='fr' ? 'Langue : Français' : 'Language : English'); location.reload(); };

  // --- HEADER ---
  const headerHTML = `
  <style>
    .rocy-header{background:#0f172a;color:#fff;padding:12px 14px;display:flex;align-items:center;gap:10px;position:sticky;top:0;z-index:100}
    .rocy-burger{font-size:24px;cursor:pointer;background:none;border:none;color:#fff;line-height:1;padding:4px 6px;border-radius:8px}
    .rocy-burger:active{background:#1e293b}
    .rocy-logo{font-size:20px;font-weight:800;cursor:pointer;flex:1} .rocy-logo span{color:#f59e0b}
    .rocy-header .btn{background:#f59e0b;color:#000;border:none;padding:8px 13px;border-radius:999px;font-weight:700;cursor:pointer;font-size:13px}
    .rocy-header .btn-white{background:#fff;color:#111}
    .rocy-drawer{position:fixed;top:0;left:-300px;width:280px;height:100%;background:#fff;z-index:200;transition:left .25s;box-shadow:4px 0 20px rgba(0,0,0,.2);overflow-y:auto;padding-bottom:20px}
    .rocy-drawer.open{left:0}
    .rocy-drawer-head{background:#0f172a;color:#fff;padding:16px}
    .rocy-drawer-head b{font-size:18px} .rocy-drawer-head b span{color:#f59e0b}
    .rocy-drawer-head small{opacity:.7}
    .rocy-menu-item{display:flex;align-items:center;gap:10px;width:100%;text-align:left;background:none;border:none;border-bottom:1px solid #f1f5f9;padding:14px 16px;font-size:14px;cursor:pointer;color:#111}
    .rocy-menu-item:active{background:#f8fafc}
    .rocy-menu-label{font-size:11px;font-weight:800;color:#94a3b8;padding:14px 16px 4px}
    .rocy-overlay{position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:150;display:none}
    .rocy-overlay.show{display:block}
    .rocy-footer{text-align:center;padding:20px;color:#94a3b8;font-size:12px;line-height:1.8}
    .rocy-footer a{color:#94a3b8;text-decoration:none}
    .rocy-select{width:100%;padding:10px;border:1px solid #e2e8f0;border-radius:10px;font-size:13px;background:#fff;margin:6px 0}
    .rocy-convert{margin:8px 16px;background:#fffbeb;border:1px solid #fde68a;border-radius:12px;padding:10px;font-size:13px;color:#92400e}
  </style>
  <div class="rocy-overlay" id="rocyOverlay" onclick="rocyFermerMenu()"></div>
  <header class="rocy-header">
    <button class="rocy-burger" onclick="rocyOuvrirMenu()">☰</button>
    <div class="rocy-logo" onclick="location.href='index.html'">Rocy<span>inter</span></div>
    ${!isConnecte ? `<button class="btn btn-white" onclick="location.href='connexion.html'">Connexion</button><button class="btn" onclick="location.href='inscription.html'">Devenir Prestataire</button>` : `<button class="btn btn-white" onclick="rocyAllerEspace()">Mon espace</button>`}
  </header>
  <div class="rocy-drawer" id="rocyDrawer">
    <div class="rocy-drawer-head"><b>Rocy<span>inter</span></b><br><small>${isConnecte ? '👋 Bonjour, '+nom : 'Bienvenue, visiteur'}</small></div>

    <div class="rocy-menu-label">MON COMPTE</div>
    ${!isConnecte ? `<button class="rocy-menu-item" onclick="location.href='connexion.html'">🔑 Se connecter</button><button class="rocy-menu-item" onclick="location.href='inscription.html'">📝 Créer un compte</button>` : `<button class="rocy-menu-item" onclick="rocyAllerEspace()">👤 Mon espace</button><button class="rocy-menu-item" onclick="location.href='favoris.html'">❤️ Mes Favoris</button><button class="rocy-menu-item" onclick="location.href='panier.html'">🛒 Mon Panier</button><button class="rocy-menu-item" onclick="location.href='notifications.html'">🔔 Notifications</button><button class="rocy-menu-item" onclick="rocyDeconnexion()">🚪 Déconnexion</button>`}

    <div class="rocy-menu-label">SERVICES</div>
    <button class="rocy-menu-item" onclick="location.href='index.html'">🏠 Accueil</button>
    <button class="rocy-menu-item" onclick="location.href='immobilier.html'">🏘️ Immobilier</button>
    <button class="rocy-menu-item" onclick="location.href='livreurs.html'">🛵 Livreurs</button>
    <button class="rocy-menu-item" onclick="location.href='escrow.html'">🔒 Mon Escrow</button>
    <button class="rocy-menu-item" onclick="location.href='abonnement.html'">⭐ Abonnement Prestataire</button>

    <div class="rocy-menu-label">🌍 LANGUE</div>
    <div style="padding:0 16px"><select class="rocy-select" onchange="rocySetLangue(this.value)"><option value="fr" ${localStorage.getItem('rocy_langue')!=='en'?'selected':''}>🇫🇷 Français</option><option value="en" ${localStorage.getItem('rocy_langue')==='en'?'selected':''}>🇬🇧 English</option></select></div>

    <div class="rocy-menu-label">💱 MONNAIE / CONVERTISSEUR</div>
    <div style="padding:0 16px"><select class="rocy-select" onchange="rocySetDevise(this.value)"><option value="FCFA" ${devise==='FCFA'?'selected':''}>FCFA - Franc CFA</option><option value="EUR" ${devise==='EUR'?'selected':''}>EUR - Euro €</option><option value="USD" ${devise==='USD'?'selected':''}>USD - Dollar $</option><option value="NGN" ${devise==='NGN'?'selected':''}>NGN - Naira ₦</option><option value="GHS" ${devise==='GHS'?'selected':''}>GHS - Cedi ₵</option></select></div>
    <div class="rocy-convert">💱 Ex : 10 000 FCFA = <b>${window.rocyFormatPrix(10000)}</b><br><small>Le convertisseur marche sur toutes les pages. Ton choix est mémorisé.</small></div>

    <div class="rocy-menu-label">AIDE</div>
    <button class="rocy-menu-item" onclick="location.href='comment-ca-marche.html'">❓ Comment ça marche ?</button>
    <button class="rocy-menu-item" onclick="location.href='aide-faq.html'">💬 Aide / FAQ</button>
    <button class="rocy-menu-item" onclick="location.href='contact.html'">📞 Contact</button>
    <button class="rocy-menu-item" onclick="location.href='tarifs.html'">💰 Tarifs</button>
    <button class="rocy-menu-item" onclick="location.href='cgu.html'">📄 CGU</button>
    <button class="rocy-menu-item" onclick="location.href='confidentialite.html'">🔐 Confidentialité</button>

    ${isAdmin ? `<div class="rocy-menu-label">ADMIN - VISIBLE QUE POUR TOI</div><button class="rocy-menu-item" onclick="location.href='admin.html'">🛡️ Panel Admin</button>` : ''}
    ${isPresta ? `<div class="rocy-menu-label">PRESTATAIRE</div><button class="rocy-menu-item" onclick="location.href='creer-annonce.html'">➕ Créer une annonce</button>` : ''}
  </div>`;

  const footerHTML = `<footer class="rocy-footer">Rocyinter Services © 2026 - Paiement sécurisé Escrow - Bénin<br><a href="tarifs.html">Tarifs</a> | <a href="cgu.html">CGU</a> | <a href="confidentialite.html">Confidentialité</a> | <a href="aide-faq.html">Aide / FAQ</a> | <a href="contact.html">Contact</a><br><span style="font-size:11px">* 1er mois offert = seulement l'abonnement, pour les 30 premiers prestataires validés. Commissions dues dès la 1ère mission.</span></footer>`;

  window.rocyOuvrirMenu = function(){ document.getElementById('rocyDrawer').classList.add('open'); document.getElementById('rocyOverlay').classList.add('show'); };
  window.rocyFermerMenu = function(){ document.getElementById('rocyDrawer').classList.remove('open'); document.getElementById('rocyOverlay').classList.remove('show'); };
  window.rocyAllerEspace = function(){ if(type==='prestataire'||type==='livreur') location.href='dashboard-prestataire.html'; else if(type==='admin') location.href='admin.html'; else location.href='dashboard-client.html'; };
  window.rocyDeconnexion = function(){ ['rocy_user_id','rocy_user_nom','rocy_user_type','rocy_role','rocy_user_whatsapp','rocy_user_pays','rocy_user_ville','rocy_user_localite'].forEach(k=>localStorage.removeItem(k)); location.href='index.html'; };

  document.addEventListener('DOMContentLoaded', ()=>{
    // On met le header au tout début du body, et le footer à la fin
    document.body.insertAdjacentHTML('afterbegin', headerHTML);
    document.body.insertAdjacentHTML('beforeend', footerHTML);
    // Si la page a déjà un vieux header/footer, on les cache pour ne pas avoir 2 headers
    document.querySelectorAll('header:not(.rocy-header)').forEach(h=>h.style.display='none');
    document.querySelectorAll('footer:not(.rocy-footer)').forEach(f=>f.style.display='none');
  });
})();
