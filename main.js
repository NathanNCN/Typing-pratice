let bttnEasy = document.getElementById('easy')
let bttnMedium = document.getElementById('medium')
let bttnHard = document.getElementById('hard')

let answerInput = document.getElementById('Input')
let howMany = document.getElementById('value');
let givenWord = document.getElementById('words');
let currentWord = null;

let firstloop = true;
let lastLetter = null


let currentMode = 'null'


let Stop = null;
let tries = 0;
let correct = 0

let grid = document.getElementById('wordGrid')

let easyList = ['dog','cat', 'mail', 'code', 'ink', 'aid', 'pet', 'sit', 'urn', 'van', 'app', 'data', 'line', 'lime', 'deer', 'deep', 'seen', ]
let mediumList = ['bread', 'head', 'would', 'these', 'other' , 'great', 'every', 'those', 'world', 'going', 'midst', 'civil', 'limit', 'swift' ]
let hardList = ['absence','address', 'acadmeny', 'accused', 'absence', 'alleged', 'ancient']


function keyPressed(e){
    if (e.key.toLowerCase() != e.key.toUpperCase() && e.key.length == 1){
        if (firstloop == true){
            lastLetter = e.key
        }
        document.getElementById(e.key).style.cssText = ' background: green; transition: 0.1s;';
        if (firstloop == false){
            document.getElementById(lastLetter).style.cssText = ' background: white; transition: 0.5s;';
            lastLetter = e.key
        }
        firstloop = false
    }

    

}


function wordchoice(){
    word = currentMode[Math.floor(Math.random() * currentMode.length)];
    currentWord =  word;
    console.log(word)
    return word
}

function changeWord(){
    wordchoice();
    grid.style.gridTemplateColumns = 'repeat(' + word.length + ', 1fr)'
    for (i=0; i<word.length; i++){
        let cell = document.createElement('div');
        cell.textContent = word[i];
        cell.setAttribute('id', i)
        console.log(cell.id);
        grid.appendChild(cell);
    }
}

function setUpMode(){
    Stop = howMany.value
    answerInput.disabled = false;
    howMany.disabled = true;
    bttnHard.disabled = true;
    bttnMedium.disabled = true;
    bttnEasy.disabled = true;

}

function restGrid(){
    while (grid.firstChild){
        grid.removeChild(grid.lastChild);
    }
}
function easy(){
    setUpMode()
    currentMode = easyList;
    restGrid()
    changeWord();
}

function medium(){
    setUpMode()
    currentMode = mediumList
    restGrid()
    changeWord()

}

function hard(){
    setUpMode()
    currentMode = hardList
    restGrid()
    changeWord()

}

function rest(){
    bttnEasy.disabled = false;
    bttnMedium.disabled = false;
    bttnHard.disabled = false;
    answerInput.disabled = true;
    howMany.disabled = false
    correct = 0
    tries = 0
    Stop = null
}

function getAnswerInput(){
    if (tries == Stop){
        restGrid()
        let bread = document.createElement('h2')
        bread.textContent = 'Thank You for playing you got ' + correct + ' out of ' + Stop + '. That is a ' + (100 * correct)/Stop + '% Great job' 
        grid.appendChild(bread)
        console.log('hi')
        rest()
    }else if (answerInput.value == word){
        changeWord();
        correct +=1
        tries +=1
    } else {
        tries +=1
        changeWord();
    }
}

function checkletter(e){
    if (answerInput.value[answerInput.value.length-1] === currentWord[answerInput.value.length-1]){
        document.getElementById(answerInput.value.length-1).classList.add('correctLetter')
    } else{
        document.getElementById(answerInput.value.length-1).classList.add('incorrectLetter')
    }

}

answerInput.disabled = true;

document.addEventListener('keydown', keyPressed);
document.addEventListener('input', checkletter)

document.addEventListener('keyup', function(KeyboardEvent){
    if (KeyboardEvent.code == 'Enter'){
        if (Stop != null){
            getAnswerInput()
            answerInput.value = '';
        }

    }
});

document.addEventListener('keydown', function(KeyboardEvent){
    if (KeyboardEvent.code === 'Enter'){
        while (grid.firstChild)
            grid.removeChild(grid.lastChild);
    }
})

bttnEasy.addEventListener('click', () => easy())
bttnMedium.addEventListener('click', () => medium())
bttnHard.addEventListener('click', () => hard())
