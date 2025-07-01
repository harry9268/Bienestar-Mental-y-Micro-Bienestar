function calculateResult() {
    const form = document.getElementById('quizForm');
    const resultDiv = document.getElementById('result');
    const progressBar = document.getElementById('progress-bar');

    let score = 0;
    let totalQuestions = 5;
    let answered = 0;

    const questions = ['stress', 'sleep', 'peace', 'relaxation', 'connection'];

    questions.forEach(q => {
        const answer = form.querySelector(`input[name="${q}"]:checked`);
        if (answer) {
            score += parseInt(answer.value);
            answered++;
        }
    });

    // Actualiza barra de progreso
    let progress = (answered / totalQuestions) * 100;
    progressBar.style.width = progress + '%';

    // Muestra resultado
    if (answered < totalQuestions) {
        resultDiv.innerHTML = "Por favor responde todas las preguntas.";
        return;
    }

    if (score >= 8) {
        resultDiv.innerHTML = "¡Tu bienestar mental es excelente! Sigue cuidándote.";
    } else if (score >= 4) {
        resultDiv.innerHTML = "Tu bienestar mental es bueno, pero podrías practicar más técnicas de relajación.";
    } else {
        resultDiv.innerHTML = "Tu bienestar mental necesita atención. Explora recursos de mindfulness y meditación.";
    }
}
