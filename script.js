function calculateResult() {
    const form = document.getElementById('quizForm');
    const resultDiv = document.getElementById('result');
    const progressBar = document.getElementById('progress-bar');

    let score = 0;
    const totalQuestions = 20;
    const maxScore = totalQuestions * 3;

    // Recorre q1 hasta q20
    for (let i = 1; i <= totalQuestions; i++) {
        const answer = form.querySelector(`input[name="q${i}"]:checked`);
        if (answer) {
            score += parseInt(answer.value);
        } else {
            resultDiv.innerHTML = "Por favor responde todas las preguntas.";
            return;
        }
    }

    // Calcula %
    const percent = Math.round((score / maxScore) * 100);

    // Rellena barra y pone texto dentro
    progressBar.style.width = percent + '%';
    progressBar.textContent = percent + '%';

    // Mensaje final
    let message = '';
    if (percent >= 80) {
        message = "¡Tu bienestar mental es excelente! Sigue cuidándote.";
    } else if (percent >= 50) {
        message = "Tu bienestar mental es bueno, pero podrías dedicarte más tiempo.";
    } else {
        message = "Tu bienestar mental necesita atención. Explora recursos de mindfulness y meditación.";
    }

    resultDiv.innerHTML = `<p>${message}</p>`;
}

const contactoForm = document.querySelector('#contacto form');
const mensajeDiv = document.getElementById('form-mensaje');

if (contactoForm) {
  contactoForm.addEventListener("submit", async function(e) {
    e.preventDefault();
    const data = new FormData(contactoForm);
    const action = contactoForm.action;

    const response = await fetch(action, {
      method: 'POST',
      body: data,
      headers: {
        'Accept': 'application/json'
      }
    });

    if (response.ok) {
      mensajeDiv.innerHTML = "<p style='color:green;'>¡Mensaje enviado correctamente! Te responderemos pronto.</p>";
      contactoForm.reset();
    } else {
      mensajeDiv.innerHTML = "<p style='color:red;'>Hubo un error al enviar tu mensaje. Intenta nuevamente.</p>";
    }
  });
}

// Mostrar/Ocultar recursos adicionales
document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('toggle-recursos');
  const hiddenResources = document.querySelectorAll('.hidden-resource');
  let expanded = false;

  toggleBtn.addEventListener('click', () => {
    hiddenResources.forEach(item => {
      item.style.display = expanded ? 'none' : 'block';
    });

    toggleBtn.textContent = expanded ? 'Ver más' : 'Ver menos';
    expanded = !expanded;
  });

  // Ocultar inicialmente
  hiddenResources.forEach(item => {
    item.style.display = 'none';
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('buscador');
  const recursos = document.querySelectorAll('.resource-item');
  const toggleBtn = document.getElementById('toggle-recursos');
  const contador = document.getElementById('contador-resultados');

  // 🔍 Función de búsqueda
  input.addEventListener('input', () => {
  const filtro = input.value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, '') // Elimina tildes
    .trim();

  let encontrados = 0;
  let hayFiltro = filtro.length > 0;

  recursos.forEach(item => {
    const textoVisible = item.textContent
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, '');

    const imagen = item.querySelector('img');
    const altTexto = imagen ? imagen.alt
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, '') : '';

    const texto = textoVisible + ' ' + altTexto;

    const coincide = texto.includes(filtro);

    if (coincide) {
      item.style.display = 'block';
      encontrados++;
    } else {
      item.style.display = 'none';
    }
  });
  
  if (hayFiltro) {
    contador.textContent = encontrados > 0
      ? `🔎 ${encontrados} resultado${encontrados > 1 ? 's' : ''} encontrado${encontrados > 1 ? 's' : ''}`
      : '❌ No se encontraron artículos con esa palabra';
    toggleBtn.style.display = 'none';
  } else {
    contador.textContent = '';
    toggleBtn.style.display = 'inline-block';
    resetVerMas(); // ← este es el que vuelve al estado inicial
  }

});

  // 🔁 Reiniciar al estado inicial (solo 6 visibles)
  function resetVerMas() {
    const recursosExtra = document.querySelectorAll('.resource-item:nth-child(n+7)');
    recursos.forEach(item => item.classList.remove('hidden-resource'));
    recursosExtra.forEach(item => item.classList.add('hidden-resource'));
    toggleBtn.textContent = 'Ver más';
    toggleBtn.dataset.estado = 'cerrado';
  }

  // 👁️ Función del botón Ver más / Ver menos
  toggleBtn.dataset.estado = 'cerrado';
  toggleBtn.addEventListener('click', () => {
    const recursosExtra = document.querySelectorAll('.resource-item:nth-child(n+7)');
    const expandido = toggleBtn.dataset.estado === 'abierto';

    recursosExtra.forEach(item => {
      item.classList.toggle('hidden-resource', expandido);
    });

    toggleBtn.textContent = expandido ? 'Ver más' : 'Ver menos';
    toggleBtn.dataset.estado = expandido ? 'cerrado' : 'abierto';
  });

  // Inicializar mostrando solo los primeros 6
  resetVerMas();
});

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