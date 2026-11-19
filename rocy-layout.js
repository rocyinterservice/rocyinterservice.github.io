  // ===== DESIGN MONDIAL GLOBAL - S'applique à TOUTES les pages =====
  function injecterDesignMondial(){
    // 1. On charge style.css si la page ne l'a pas déjà - pour les 39 pages
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
      /* Formulaires, chat, panier, dashboards - pour toutes les pages */
      input,select,textarea,button{font-family:'Inter',system-ui,sans-serif}
      input,select,textarea{border-radius:12px !important}
      button{cursor:pointer}
    `;
    document.head.appendChild(style);
  }

  async function construire(){
    // On injecte le design AVANT le return, pour que même les pages avec header déjà présent soient belles
    injecterDesignMondial();
    if(document.querySelector('.rocy-header')) return;
