document.addEventListener("DOMContentLoaded", function () {
  // Mostrar el aviso si aún no ha aceptado o rechazado cookies
  if (!localStorage.getItem("consentimientoCookies")) {
    const wall = document.getElementById("cookie-wall");
    if (wall) wall.style.display = "flex";
  }
});

function aceptarCookies() {
  localStorage.setItem("consentimientoCookies", "aceptadas");
  const wall = document.getElementById("cookie-wall");
  if (wall) wall.style.display = "none";

  // Insertar Google Tag Manager
  (function(w,d,s,l,i){
    w[l]=w[l]||[];
    w[l].push({'gtm.start': new Date().getTime(), event:'gtm.js'});
    var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s), dl=l!='dataLayer'?'&l='+l:'';
    j.async=true;
    j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
    f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer','GTM-M32D8MMF'); // Pon tu ID aquí

  // Insertar Google Analytics (GA4)
  const gaScript = document.createElement('script');
  gaScript.src = "https://www.googletagmanager.com/gtag/js?id=G-Z7FJ0FNHMC";
  gaScript.async = true;
  document.head.appendChild(gaScript);

  gaScript.onload = function () {
    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    gtag('js', new Date());
    gtag('config', 'G-Z7FJ0FNHMC'); // Pon tu ID GA4 aquí
  };

  // Insertar Google AdSense
  const ads = document.createElement('script');
  ads.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9700570899324856';
  ads.crossOrigin = 'anonymous';
  ads.async = true;
  document.head.appendChild(ads);
}

function rechazarCookies() {
  // Marcar que rechazó cookies
  localStorage.setItem("consentimientoCookies", "rechazadas");
  // Redirigir al contenido sin publicidad
  window.location.href = "/acceso-sin-cookies.html"; // Asegúrate de que exista esta página
}

function mostrarMas(opcion) {
  if (opcion === 'sin') {
    document.getElementById('leer-mas-sin').style.display = 'block';
    document.getElementById('btn-mas-sin').style.display = 'none';
  } else if (opcion === 'gratis') {
    document.getElementById('leer-mas-gratis').style.display = 'block';
    document.getElementById('btn-mas-gratis').style.display = 'none';
  }
}
