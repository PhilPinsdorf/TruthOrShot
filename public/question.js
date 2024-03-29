//Select tags from Document
var html = document.querySelector('html');
var title = document.querySelector('.question-type');
var button = document.querySelector('.btn-question');
var audio = document.querySelector('.card-audio');

//Loading-Ring Snippet
var loader = '<div class="loading-ring"></div>';

//Generate new Question on first load
generate();

//Generate Question with requst to the Api
function generate() {
    //Play new Card Audio
    audio.play();

    //Replace text with Loading Ring until the Server sends back a result
    button.innerHTML = loader;
    title.innerHTML = '';
    html.style.setProperty('--accent-color', '#fafafa');

    //Get new Question from Server
    fetch('http://localhost:3000/api/newquestion')
        .then((response) => response.json())
        .then((data) => {
            html.style.setProperty('--accent-color', data.color);
            button.innerHTML = data.text;
            title.innerHTML = data.title;
        });
}

// Space Listener
document.addEventListener('keyup', event => {
  if (event.code === 'Space') {
    generate();
  }
})
