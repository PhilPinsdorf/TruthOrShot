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

    //Get new Question from Server
    fetch('https://truthorshot.netlify.app/.netlify/functions/api/generateQuestion')
        .then((response) => response.json())
        .then((data) => {
            html.style.setProperty('--accent-color', data.color);
            button.innerHTML = data.text;
            title.innerHTML = data.title;
        });
}