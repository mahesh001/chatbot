const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.lang = 'en-US';
recognition.interimResults = false;

document.querySelector('button').addEventListener('click', () => {
  recognition.start();
});


const socket = io();

recognition.addEventListener('result', (e) => {
  let last = e.results.length - 1;
  let text = e.results[last][0].transcript;

  console.log('Confidence: ' + e.results[0][0].confidence);

  // We will use the Socket.IO here later…
  socket.emit('chat message', text);

  $('body').append('<div class="container"><p>You:'+text+'</p></div>');
});



/*$("#message").click(function(){
  var text = $("#message").val();
  console.log(text);

  socket.emit('chat message', text);	
});*/











function synthVoice(text) {
  $('body').append('<div class="container darker"><p>Bot:'+text+'</p></div>');
  const synth = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance();
  utterance.text = text;
  synth.speak(utterance);
}

socket.on('bot reply', function(replyText) {
  synthVoice(replyText);
});