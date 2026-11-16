// rocy-layout.js - VERSION CLICABLE
(function(){
  const uid = localStorage.getItem('rocy_user_id');
  const typeLocal = localStorage.getItem('rocy_user_type') || localStorage.getItem('rocy_role') || '';
  const nom = localStorage.getItem('rocy_user_nom') || '';
  const isConnecte = !!uid;
  const isPresta = typeLocal === 'prestataire' || typeLocal === 'livreur';

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
  window.rocySetLangue = function(l){ localStorage.setItem('rocy_langue', l); location.reload(); };

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

  // FONCTIONS GLOBALES - toujours disponibles, même si la page plante
  window.rocyOuvrirMenu = function(){
    const d = document.getElementById('rocyDrawer'); const o = document.getElementById('rocyOverlay');
    if(!d || !o) return; d.classList.add('open'); o.classList.add('show');
  };
  window.rocyFermerMenu = function(){
    const d = document.getElementById('rocyDrawer'); const o = document.getElementById('rocyOverlay');
    if(!d || !o) return; d.classList.remove('open'); o.classList.remove('show');
  };
  window.rocyAllerEspace = function(){ if(typeLocal==='prestataire'||typeLocal==='livreur') location.href='dashboard-prestataire.html'; else if(typeLocal==='admin') location.href='admin.html'; else location.href='dashboard-client.html'; };
  window.rocyDeconnexion = function(){ ['rocy_user_id','rocy_user_nom','rocy_user_type','rocy_role','rocy_user_whatsapp','rocy_user_pays','rocy_user_ville','rocy_user_localite'].forEach(k=>localStorage.removeItem(k)); location.href='index.html'; };

  async function construire(){
    const isAdmin = await verifierAdmin();
    const headerHTML = `
    <style>
      .rocy-header{background:#0f172a;color:#fff;padding:12px 14px;display:flex;align-items:center;gap:10px;position:sticky;top:0;z-index:100}
      .rocy-burger{font-size:26px;cursor:pointer;background:none;border:none;color:#fff;line-height:1;padding:6px 8px;border-radius:8px;touch-action:manipulation}
      .rocy-logo{font-size:20px;font-weight:800;cursor:pointer;flex:1} .rocy-logo span{color:#f59e0b}
      .rocy-header .btn{background:#f59e0b;color:#000;border:none;padding:8px 13px;border-radius:999px;font-weight:700;cursor:pointer;font-size:13px;touch-action:manipulation;white-space:nowrap}
      .rocy-header .btn-white{background:#fff;color:#111}
      .rocy-drawer{position:fixed;top:0;left:-300px;width:280px;max-width:85vw;height:100%;background:#fff;z-index:200;transition:left .25s;box-shadow:4px 0 20px rgba(0,0,0,.2);overflow-y:auto;padding-bottom:20px}
      .rocy-drawer.open{left:0}
      .rocy-drawer-head{background:#0f172a;color:#fff;padding:16px}
      .rocy-drawer-head b{font-size:18px} .rocy-drawer-head b span{color:#f59e0b}
      .rocy-drawer-head small{opacity:.7}
      .rocy-menu-item{display:flex;align-items:center;gap:10px;width:100%;text-align:left;background:none;border:none;border-bottom:1px solid #f1f5f9;padding:14px 16px;font-size:14px;cursor:pointer;color:#111;touch-action:manipulation}
      .rocy-menu-item:active{background:#f8fafc}
      .rocy-menu-label{font-size:11px;font-weight:800;color:#94a3b8;padding:14px 16px 4px}
      .rocy-overlay{position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:150;display:none;pointer-events:none}
      .rocy-overlay.show{display:block;pointer-events:auto}
      .rocy-footer{text-align:center;padding:20px;color:#94a3b8;font-size:12px;line-height:1.8}
      .rocy-footer a{color:#94a3b8;text-decoration:none}
      .rocy-select{width:100%;padding:10px;border:1px solid #e2e8f0;border-radius:10px;font-size:13px;background:#fff;margin:6px 0}
      .rocy-convert{margin:8px 16px;background:#fffbeb;border:1px solid #fde68a;border-radius:12px;padding:10px;font-size:13px;color:#92400e}
      button{ -webkit-tap-highlight-color:transparent; }
    </style>
    <div class="rocy-overlay" id="rocyOverlay" onclick="rocyFermerMenu()"></div>
    <header class="rocy-header">
      <button type="button" class="rocy-burger" onclick="rocyOuvrirMenu()">☰</button>
      <div class="rocy-logo" onclick="location.href='index.html'">Rocy<span>inter</span></div>
      ${!isConnecte ? `<button type="button" class="btn btn-white" onclick="location.href='connexion.html'">Connexion</button><button type="button" class="btn" onclick="location.href='inscription.html'">Devenir Prestataire</button>` : `<button type="button" class="btn btn-white" onclick="rocyAllerEspace()">Mon espace</button>`}
    </header>
    <div class="rocy-drawer" id="rocyDrawer">
      <div class="rocy-drawer-head"><b>Rocy<span>inter</span></b><br><small>${isConnecte ? '👋 Bonjour, '+nom : 'Bienvenue, visiteur'}</small><br><button type="button" style="margin-top:8px;background:#f59e0b;border:none;padding:6px 12px;border-radius:999px;font-weight:700;cursor:pointer" onclick="rocyFermerMenu()">✕ Fermer</button></div>
      <div class="rocy-menu-label">MON COMPTE</div>
      ${!isConnecte ? `<button type="button" class="rocy-menu-item" onclick="location.href='connexion.html'">🔑 Se connecter</button><button type="button" class="rocy-menu-item" onclick="location.href='inscription.html'">📝 Créer un compte</button>` : `<button type="button" class="rocy-menu-item" onclick="rocyAllerEspace()">👤 Mon espace</button><button type="button" class="rocy-menu-item" onclick="location.href='favoris.html'">❤️ Mes Favoris</button><button type="button" class="rocy-menu-item" onclick="location.href='panier.html'">🛒 Mon Panier</button><button type="button" class="rocy-menu-item" onclick="location.href='notifications.html'">🔔 Notifications</button><button type="button" class="rocy-menu-item" onclick="rocyDeconnexion()">🚪 Déconnexion</button>`}
      <div class="rocy-menu-label">SERVICES</div>
      <button type="button" class="rocy-menu-item" onclick="location.href='index.html'">🏠 Accueil</button>
      <button type="button" class="rocy-menu-item" onclick="location.href='immobilier.html'">🏘️ Immobilier</button>
      <button type="button" class="rocy-menu-item" onclick="location.href='livreurs.html'">🛵 Livreurs</button>
      <button type="button" class="rocy-menu-item" onclick="location.href='escrow.html'">🔒 Mon Escrow</button>
      <button type="button" class="rocy-menu-item" onclick="location.href='abonnement.html'">⭐ Abonnement Prestataire</button>
      <div class="rocy-menu-label">🌍 LANGUE</div>
      <div style="padding:0 16px"><select class="rocy-select" onchange="rocySetLangue(this.value)"><option value="fr" ${localStorage.getItem('rocy_langue')!=='en'?'selected':''}>🇫🇷 Français</option><option value="en" ${localStorage.getItem('rocy_langue')==='en'?'selected':''}>🇬🇧 English</option></select></div>
      <div class="rocy-menu-label">💱 MONNAIE / CONVERTISSEUR</div>
      <div style="padding:0 16px"><select class="rocy-select" onchange="rocySetDevise(this.value)"><option value="FCFA" ${devise==='FCFA'?'selected':''}>FCFA - Franc CFA</option><option value="EUR" ${devise==='EUR'?'selected':''}>EUR - Euro €</option><option value="USD" ${devise==='USD'?'selected':''}>USD - Dollar $</option><option value="NGN" ${devise==='NGN'?'selected':''}>NGN - Naira ₦</option><option value="GHS" ${devise==='GHS'?'selected':''}>GHS - Cedi ₵</option></select></div>
      <div class="rocy-convert">💱 Ex : 10 000 FCFA = <b>${window.rocyFormatPrix(10000)}</b></div>
      <div class="rocy-menu-label">AIDE</div>
      <button type="button" class="rocy-menu-item" onclick="location.href='comment-ca-marche.html'">❓ Comment ça marche ?</button>
      <button type="button" class="rocy-menu-item" onclick="location.href='aide-faq.html'">💬 Aide / FAQ</button>
      <button type="button" class="rocy-menu-item" onclick="location.href='contact.html'">📞 Contact</button>
      <button type="button" class="rocy-menu-item" onclick="location.href='tarifs.html'">💰 Tarifs</button>
      <button type="button" class="rocy-menu-item" onclick="location.href='cgu.html'">📄 CGU</button>
      <button type="button" class="rocy-menu-item" onclick="location.href='confidentialite.html'">🔐 Confidentialité</button>
      ${isAdmin ? `<div class="rocy-menu-label">ADMIN - QUE POUR TOI</div><button type="button" class="rocy-menu-item" onclick="location.href='admin.html'">🛡️ Panel Admin</button>` : ''}
      ${isPresta ? `<div class="rocy-menu-label">PRESTATAIRE</div><button type="button" class="rocy-menu-item" onclick="location.href='creer-annonce.html'">➕ Créer une annonce</button>` : ''}
    </div>`;
    const footerHTML = `<footer class="rocy-footer">Rocyinter Services © 2026 - Paiement sécurisé Escrow - Bénin<br><a href="tarifs.html">Tarifs</a> | <a href="cgu.html">CGU</a> | <a href="confidentialite.html">Confidentialité</a> | <a href="aide-faq.html">Aide / FAQ</a> | <a href="contact.html">Contact</a></footer>`;
    // CORRECTION CLIC : on SUPPRIME les vieux header/footer, pas juste les cacher
    document.querySelectorAll('header:not(.rocy-header)').forEach(h=>h.remove());
    document.querySelectorAll('footer:not(.rocy-footer)').forEach(f=>f.remove());
    document.body.insertAdjacentHTML('afterbegin', headerHTML);
    document.body.insertAdjacentHTML('beforeend', footerHTML);
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', construire);
  else construire();
})();
