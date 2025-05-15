const micBtn = document.getElementById('mic-btn');
const transcript = document.getElementById('transcript');
const response = document.getElementById('response');

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (!SpeechRecognition) {
  transcript.textContent = "Sorry, your browser doesn't support Speech Recognition.";
  micBtn.disabled = true;
} else {
  const recognition = new SpeechRecognition();
  recognition.lang = 'en-US';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  micBtn.addEventListener('click', () => {
    response.textContent = '';
    transcript.textContent = '🎤 Kibo is listening...';
    recognition.start();
  });

  recognition.addEventListener('result', (event) => {
    const speechToText = event.results[0][0].transcript;
    transcript.textContent = speechToText;

    let reply = "Sorry, I didn’t catch that. I’m still learning.";
    const text = speechToText.toLowerCase();

    if (text.includes('hello') || text.includes('hi')) {
      reply = "Hello! I'm Kibo. How can I assist you today?";
    } else if (text.includes('your name')) {
      reply = "I'm Kibo, your voice assistant and virtual buddy!";
    } else if (text.includes('time')) {
      reply = `The current time is ${new Date().toLocaleTimeString()}.`;
    } else if (text.includes('date')) {
      reply = `Today is ${new Date().toLocaleDateString()}.`;
    } else if (text.includes('how are you')) {
      reply = "I'm doing great! Thanks for asking. How about you?";
    } else if (text.includes('who made you')) {
      reply = "I was created by a smart developer just like you!";
    } else if (text.includes('thank you')) {
      reply = "You're welcome! I'm always here to help.";
    }

    response.textContent = reply;

    // ✅ Speak the reply
    const utterance = new SpeechSynthesisUtterance(reply);
    utterance.lang = 'en-US';
    window.speechSynthesis.speak(utterance);
  });

  recognition.addEventListener('speechend', () => {
    recognition.stop();
  });

  recognition.addEventListener('error', (event) => {
    transcript.textContent = `Error occurred: ${event.error}`;
  });
}
