var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

// define grammar we want to recognize
//var words = ['pop', "click", "boo"];
//var grammar = '#JSGF V1.0; grammar colors; public <color> = ' + words.join(' | ') + ' ;'
var grammar = '#JSGF V1.0;'
var message = document.querySelector('#message');
var diagnostic = document.querySelector('.output');

// create a speech recognition instance
var recognition = new SpeechRecognition();

// create a new speech grammar list
var speechRecognitionList = new SpeechGrammarList();

// add grammar to list 
speechRecognitionList.addFromString(grammar, 1);

recognition.grammars = speechRecognitionList;
recognition.continuous = false;
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

recognition.onresult = function(event) {
  //ar last = event.results.length - 1;
  //var command = event.results[last][0].transcript;
  var input = event.results[0][0].transcript;
  diagnostic.textContent = 'Result received: ' + input + '.';

  if (input.toLowerCase() == 'pop') {
    document.querySelector('#pop').remove();
    document.querySelector('#btnGiveCommand').remove();
  }
}

recognition.onspeechend = function() {
  recognition.stop();
}

recognition.onnomatch = function(event) {
  diagnostic.textContent = 'I didnt recognise that word.';
}

recognition.onerror = function(event) {
  diagnostic.textContent = 'Error occurred in recognition: ' + event.error;
}

document.querySelector('#btnGiveCommand').addEventListener('click', function() {
  recognition.start();
});
/*
var bg = document.querySelector('html');
var hints = document.querySelector('.hints');

var wordHTML= '';
words.forEach(function(v, i, a){
  console.log(v, i);
  wordHTML += '<span style="background-color:' + v + ';"> ' + v + ' </span>';
});
hints.innerHTML = 'Tap/click then say pop to change the background color of the app. Try ' + wordHTML + '.';

document.body.onclick = function() {
  recognition.start();
  console.log('Ready to receive a color command.');
}

recognition.onresult = function(event) {
    var word = event.results[0][0].transcript;
    diagnostic.textContent = 'Result received: ' + word + '.';
    //bg.style.backgroundColor = word;
    console.log('Confidence: ' + event.results[0][0].confidence);
  }

  */