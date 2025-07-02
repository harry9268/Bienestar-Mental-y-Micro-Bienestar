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
