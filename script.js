function speak() {
    const text = document.querySelector("#text-to-speech").value;
    if (text.trim() === '') {
        alert("bạn vui lòng nhập vào!");
        return;
    }

    if ("speechSynthesis" in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        
        const voices = speechSynthesis.getVoices();
        if (voices.length > 0) {
            utterance.voice = voices[0];
            speechSynthesis.speak(utterance);
        } else {
            speechSynthesis.addEventListener('voiceschanged', function setVoice() {
                utterance.voice = speechSynthesis.getVoices()[0];
                speechSynthesis.speak(utterance);
                speechSynthesis.removeEventListener('voiceschanged', setVoice); // Loại bỏ sự kiện để tránh lặp lại
            });
        }
    } else {
        alert("Trình duyệt của bạn không hỗ trợ văn bản giọng nói");
    }
}

function stopSpeech() {
    if ("speechSynthesis" in window) {
        speechSynthesis.cancel();
    } else {
        alert("Trình duyệt của bạn không hỗ trợ văn bản giọng nói");
    }
}
