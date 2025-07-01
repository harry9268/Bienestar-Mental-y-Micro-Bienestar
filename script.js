function calculateResult() {
    const form = document.getElementById('quizForm');
    const resultDiv = document.getElementById('result');
    
    let score = 0;

    // Sumar los valores de las respuestas
    const stress = form.querySelector('input[name="stress"]:checked');
    const sleep = form.querySelector('input[name="sleep"]:checked');
    const peace = form.querySelector('input[name="peace"]:checked');
    const relaxation = form.querySelector('input[name="relaxation"]:checked');
    const connection = form.querySelector('input[name="connection"]:checked');
    
    if (stress) score += parseInt(stress.value);
    if (sleep) score += parseInt(sleep.value);
    if (peace) score += parseInt(peace.value);
    if (relaxation) score += parseInt(relaxation.value);
    if (connection) score += parseInt(connection.value);

    // Mostrar el resultado basado en el puntaje
    if (score >= 8) {
        resultDiv.innerHTML = "¡Tu bienestar mental es excelente! Sigue cuidando de ti mismo/a.";
    } else if (score >= 4) {
        resultDiv.innerHTML = "Tu bienestar mental es bueno, pero podrías beneficiarte de practicar más técnicas de relajación.";
    } else {
        resultDiv.innerHTML = "Parece que tu bienestar mental necesita algo de atención. Te recomendamos explorar más recursos sobre mindfulness y meditación.";
    }
}

