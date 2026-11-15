// ============================================
// ROCYINTER SERVICES - app.js
// 1 SEUL FICHIER QUI GERE :
// - En-tete + Pied de page pour toutes les pages
// - Traductions (Langues)
// - Monnaies (Conversion)
// - Connexion Supabase
// - Escrow
// ============================================

// --- 1. CONFIG SUPABASE ---
const SUPABASE_URL = "https://gdwgjsloivrpxxvggxyz.supabase.co";
const SUPABASE_KEY = "sb_publishable_toAIjzrpbo2mNqPqPqLKlI9Q_sqzcR6dF";
let supabaseClient = null;
if (window.supabase) {
  supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
}

// --- 2. LANGUE + MONNAIE - SAUVEGARDE GLOBALE ---
let LANG = localStorage.getItem('rocy_lang') || 'fr';
let DEVISE = localStorage.getItem('rocy_devise') || 'FCFA';

// --- 3. TAUX DE CONVERSION - BASE : 1 FCFA ---
const TAUX = {
  FCFA: 1,
  EUR: 0.00152,
  USD: 0.00165,
  NGN: 2.45,
  GHS: 0.025,
  XOF: 1,
  GBP: 0.0013,
  CAD: 0.0022
};
const SYMBOLE = { FCFA: 'FCFA', EUR: '€', USD: '$', NGN: '₦', GHS: '₵', XOF: 'FCFA', GBP: '£', CAD: 'C$' };

function convertirPrix(prixFCFA) {
  const taux = TAUX[DEVISE] || 1;
  const val = prixFCFA * taux;
  if (DEVISE === 'FCFA' || DEVISE === 'XOF' || DEVISE === 'NGN') return Math.round(val).toLocaleString('fr-FR') + ' ' + (SYMBOLE[DEVISE] || DEVISE);
  return val.toFixed(2) + ' ' + (SYMBOLE[DEVISE] || DEVISE);
}

// Formate tous les prix qui ont data-prix="5000" dans la page
function appliquerMonnaies() {
  document.querySelectorAll('[data-prix]').forEach(el => {
    const base = parseFloat(el.getAttribute('data-prix')) || 0;
    el.textContent = convertirPrix(base);
  });
  const label = document.getElementById('deviseLabel');
  if (label) label.textContent = DEVISE;
}

// --- 4. TRADUCTIONS - GENERALISTE, MONDIAL ---
const TRADUCTIONS = {
  fr: { accueil: "Accueil", manger: "Manger", domicile: "Services à domicile", pro: "Services Professionnels", sejour: "Séjourner & Immobilier", connexion: "Connexion", inscription: "Inscription", escrow: "Portefeuille Escrow", langue: "Langue", monnaie: "Monnaie", heroTitre: "Manger, Se faire servir, Séjourner.", heroSous: "Partout, depuis chez vous.", heroDesc: "Commandez un plat, trouvez un artisan de confiance, un professionnel qualifié ou un lieu pour séjourner. Paiement 100% sécurisé en escrow.", commentCaMarche: "Comment ça marche ?", ccmDesc: "Vous choisissez, vous payez en escrow, le prestataire travaille, vous validez, nous libérons l'argent. Simple, transparent et sécurisé pour tous.", escrowTitre: "Paiement 100% Escrow", escrowDesc: "Vous payez à Rocyinter. Nous bloquons l'argent. Le prestataire fait le travail. Vous validez. Nous libérons l'argent.", voirPortefeuille: "Voir mon portefeuille Escrow", aPropos: "À propos", aide: "Aide & FAQ", conditions: "Conditions Générales", confidentialite: "Confidentialité", droits: "Rocyinter Services - Rocyinter Commerce Général. Tous droits réservés.", descriptionFooter: "La plateforme mondiale qui connecte clients, prestataires et livreurs. Paiement sécurisé en escrow pour chaque mission." },
  en: { accueil: "Home", manger: "Food", domicile: "Home Services", pro: "Professional Services", sejour: "Stay & Real Estate", connexion: "Login", inscription: "Sign Up", escrow: "Escrow Wallet", langue: "Language", monnaie: "Currency", heroTitre: "Eat, Get Served, Stay.", heroSous: "Everywhere, from home.", heroDesc: "Order a meal, find a trusted artisan, a qualified professional or a place to stay. 100% secure escrow payment.", commentCaMarche: "How it works ?", ccmDesc: "You choose, you pay in escrow, the provider works, you validate, we release the money. Simple, transparent and secure for everyone.", escrowTitre: "100% Escrow Payment", escrowDesc: "You pay Rocyinter. We hold the money. The provider does the work. You validate. We release the money.", voirPortefeuille: "View my Escrow Wallet", aPropos: "About", aide: "Help & FAQ", conditions: "Terms", confidentialite: "Privacy", droits: "Rocyinter Services - Rocyinter General Trade. All rights reserved.", descriptionFooter: "The global platform connecting clients, providers and couriers. Secure escrow payment for every mission." },
  es: { accueil: "Inicio", manger: "Comer", domicile: "Servicios a domicilio", pro: "Servicios Profesionales", sejour: "Estancia & Inmobiliaria", connexion: "Iniciar sesión", inscription: "Registrarse", escrow: "Cartera Escrow", langue: "Idioma", monnaie: "Moneda", heroTitre: "Comer, Servirse, Hospedarse.", heroSous: "En todas partes, desde casa.", heroDesc: "Pide un plato, encuentra un artesano de confianza, un profesional cualificado o un lugar para quedarte. Pago 100% seguro en escrow.", commentCaMarche: "¿Cómo funciona?", ccmDesc: "Eliges, pagas en escrow, el proveedor trabaja, validas, liberamos el dinero. Simple, transparente y seguro para todos.", escrowTitre: "Pago 100% Escrow", escrowDesc: "Pagas a Rocyinter. Bloqueamos el dinero. El proveedor hace el trabajo. Validas. Liberamos el dinero.", voirPortefeuille: "Ver mi cartera Escrow", aPropos: "Acerca de", aide: "Ayuda & FAQ", conditions: "Términos", confidentialite: "Privacidad", droits: "Rocyinter Services - Rocyinter Comercio General. Todos los derechos reservados.", descriptionFooter: "La plataforma mundial que conecta clientes, proveedores y repartidores. Pago seguro en escrow para cada misión." },
  pt: { accueil: "Início", manger: "Comer", domicile: "Serviços ao domicílio", pro: "Serviços Profissionais", sejour: "Hospedagem & Imobiliário", connexion: "Entrar", inscription: "Cadastrar", escrow: "Carteira Escrow", langue: "Idioma", monnaie: "Moeda", heroTitre: "Comer, Ser servido, Hospedar-se.", heroSous: "Em todo lugar, de casa.", heroDesc: "Peça um prato, encontre um artesão de confiança, um profissional qualificado ou um lugar para ficar. Pagamento 100% seguro em escrow.", commentCaMarche: "Como funciona?", ccmDesc: "Você escolhe, paga em escrow, o prestador trabalha, você valida, liberamos o dinheiro. Simples, transparente e seguro para todos.", escrowTitre: "Pagamento 100% Escrow", escrowDesc: "Você paga à Rocyinter. Bloqueamos o dinheiro. O prestador faz o trabalho. Você valida. Liberamos o dinheiro.", voirPortefeuille: "Ver minha carteira Escrow", aPropos: "Sobre", aide: "Ajuda & FAQ", conditions: "Termos", confidentialite: "Privacidade", droits: "Rocyinter Services - Rocyinter Comércio Geral. Todos os direitos reservados.", descriptionFooter: "A plataforma mundial que conecta clientes, prestadores e entregadores. Pagamento seguro em escrow para cada missão." },
  ar: { accueil: "الرئيسية", manger: "أكل", domicile: "خدمات منزلية", pro: "خدمات مهنية", sejour: "إقامة وعقارات", connexion: "تسجيل الدخول", inscription: "إنشاء حساب", escrow: "محفظة الضمان", langue: "اللغة", monnaie: "العملة", heroTitre: "كل، استفد من الخدمات، أقم.", heroSous: "في كل مكان، من منزلك.", heroDesc: "اطلب طبقا، اعثر على حرفي موثوق، محترف مؤهل أو مكان للإقامة. دفع آمن 100% بنظام الضمان.", commentCaMarche: "كيف يعمل؟", ccmDesc: "تختار، تدفع بالضمان، يعمل مقدم الخدمة، توافق، نحرر المال. بسيط وشفاف وآمن للجميع.", escrowTitre: "دفع 100% بالضمان", escrowDesc: "تدفع لـ Rocyinter. نحتجز المال. يقوم مقدم الخدمة بالعمل. توافق. نحرر المال.", voirPortefeuille: "عرض محفظة الضمان", aPropos: "حول", aide: "مساعدة", conditions: "الشروط", confidentialite: "الخصوصية", droits: "Rocyinter Services - Rocyinter التجارة العامة. جميع الحقوق محفوظة.", descriptionFooter: "المنصة العالمية التي تربط العملاء ومقدمي الخدمات والسعاة. دفع آمن بالضمان لكل مهمة." }
};

function t(cle) {
  const lang = TRADUCTIONS[LANG] || TRADUCTIONS['fr'];
  return lang[cle] || TRADUCTIONS['fr'][cle] || cle;
}

function appliquerTraductions() {
  document.querySelectorAll('[data-trad]').forEach(el => {
    el.textContent = t(el.getAttribute('data-trad'));
  });
  const label = document.getElementById('langLabel');
  if (label) label.textContent = LANG.toUpperCase();
}

// --- 5. EN-TETE + PIED DE PAGE - INJECTES AUTOMATIQUEMENT ---
function injecterHeaderFooter() {
  const header = document.getElementById('site-header');
  if (header) {
    header.className = 'site-header';
    header.innerHTML = `
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
          <a href="connexion.html" class="pill pill-jaune" data-trad="connexion">Connexion</a>
        </div>
      </div>`;
  }
  const footer = document.getElementById('site-footer');
  if (footer) {
    footer.className = 'site-footer';
    footer.innerHTML = `
      <div class="footer-inner">
        <div>
          <div class="logo" style="font-size:22px">ROCY<span>INTER</span><small>SERVICES</small></div>
          <p data-trad="descriptionFooter" style="margin-top:10px">La plateforme mondiale qui connecte clients, prestataires et livreurs. Paiement sécurisé en escrow pour chaque mission.</p>
        </div>
        <div>
          <h4 data-trad="accueil">Accueil</h4>
          <a href="manger.html" data-trad="manger">Manger</a>
          <a href="services-domicile.html" data-trad="domicile">Services à domicile</a>
          <a href="services-pro.html" data-trad="pro">Services Professionnels</a>
          <a href="sejourner.html" data-trad="sejour">Séjourner & Immobilier</a>
          <a href="escrow.html" data-trad="escrow">Portefeuille Escrow</a>
        </div>
        <div>
          <h4 data-trad="aPropos">À propos</h4>
          <a href="comment-ca-marche.html" data-trad="commentCaMarche">Comment ça marche ?</a>
          <a href="aide.html" data-trad="aide">Aide & FAQ</a>
          <a href="conditions.html" data-trad="conditions">Conditions Générales</a>
          <a href="confidentialite.html" data-trad="confidentialite">Confidentialité</a>
          <a href="connexion.html" data-trad="connexion">Connexion</a>
        </div>
      </div>
      <div class="footer-bottom">© 2026 <span data-trad="droits">Rocyinter Services - Rocyinter Commerce Général. Tous droits réservés.</span></div>`;
  }
}

// --- 6. ACTIONS LANGUE / MONNAIE ---
function changerLangue() {
  const choix = prompt("Choisis ta langue / Choose language : fr, en, es, pt, ar", LANG);
  if (choix && TRADUCTIONS[choix.toLowerCase()]) {
    LANG = choix.toLowerCase();
    localStorage.setItem('rocy_lang', LANG);
    location.reload();
  } else if (choix) { alert("Langue bientôt disponible. Langues actuelles : fr, en, es, pt, ar"); }
}
function changerMonnaie() {
  const choix = prompt("Choisis ta monnaie / Choose currency : FCFA, EUR, USD, NGN, GHS, GBP, CAD", DEVISE);
  if (choix && TAUX[choix.toUpperCase()]) {
    DEVISE = choix.toUpperCase();
    localStorage.setItem('rocy_devise', DEVISE);
    location.reload();
  }
}

// --- 7. LANCEMENT AUTOMATIQUE SUR CHAQUE PAGE ---
document.addEventListener('DOMContentLoaded', () => {
  injecterHeaderFooter();
  appliquerTraductions();
  appliquerMonnaies();
});
