const word_el = document.getElementById('word');
const popup = document.getElementById("popup-container");
const message_el = document.getElementById('success-message');
const wrongLetters_el = document.getElementById('wrong-letters')
const items = document.querySelectorAll(".item")
const btn = document.querySelector("button")
const popupFail = document.querySelector('.popup')

const correctLetters = [];
const wrongLetters = [];


//---getRandomWord Function
const getRandomWord = () => {
    const words = ["JAVASCRIPT", "JAVA", "HTML", "CSS", "GIT", "REACT"];
    return words[Math.floor(Math.random() * words.length)];
};
const selectedWord = getRandomWord();


//---displayWord Function
const displayWord = () => {
    word_el.innerHTML = selectedWord
        .split('')
        .map(letter => `
            <div class="letter">
                ${correctLetters.includes(letter) ? letter : ''}
            </div>
        `)
        .join('');
    //--
    const w = word_el.innerText.replace(/\n/g, '');
    if (w === selectedWord) {
        popup.style.display = "flex";
        message_el.innerHTML = '<h2>Congratulations <br>You Win!</h2>';
    }
};


//---updateWrongLetters Function
const updateWrongLetters = () => {
    if (wrongLetters.length == 6) {
        message_el.innerHTML = '<h2>You Lost</h2>';
        popup.style.display = "flex";
        popupFail.style.backgroundColor = "red";
    } else {
        wrongLetters_el.innerHTML = `
${wrongLetters.length > 0 ? '<h3>Wrong Letters</h3>' : ''}
${wrongLetters.map(letter => `<span>${letter}</span>`)}
`;
        //--   
        items.forEach((item, index) => {
            const errorCount = wrongLetters.length;
            if (index < errorCount) {
                item.style.display = 'block'
            } else {
                item.style.display = "none"
            }
        })
    }
}


//---Input Listener
function inputListener(e) {
    if (wrongLetters.length == 6) {
    } else {
        if (e.keyCode >= 65 && e.keyCode <= 90) {
            const letter = e.key.toUpperCase();
            if (selectedWord.includes(letter)) {
                if (!correctLetters.includes(letter)) {
                    correctLetters.push(letter);
                    displayWord();
                } else {
                    console.log(e.key);
                    console.log("Already added");
                }
            } else {
                if (!wrongLetters.includes(letter)) {
                    wrongLetters.push(letter);
                    updateWrongLetters();
                }
            }
        }
    }
}

// --
window.addEventListener("keydown", inputListener);
btn.addEventListener("click", () => window.location.reload())

//---Run Function
displayWord();

