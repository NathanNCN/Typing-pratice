let bttnEasy = document.getElementById('easy')
let bttnMedium = document.getElementById('medium')
let bttnHard = document.getElementById('hard')

let answerInput = document.getElementById('Input')
let howMany = document.getElementById('value');
let givenWord = document.getElementById('words');


let firstloop = true;
let lastLetter = null


let currentMode = 'null'


let Stop = null;
let tries = 0;
let correct = 0;

let easyList = ['dog','cat', 'mail', 'code', 'ink', 'aid', 'pet', 'sit', 'urn', 'van', 'app', 'data', 'line', 'lime', 'deer', 'deep', 'seen' ]
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


function easy(){
    words.textContent = easyList[Math.floor(Math.random() * easyList.length)]
    Stop = howMany.value
    answerInput.disabled = false;
    howMany.disabled = true;
    bttnHard.disabled = true;
    bttnMedium.disabled = true;
    currentMode = easyList;
}

function medium(){
    words.textContent = mediumList[Math.floor(Math.random() * mediumList.length)]
    Stop = howMany.value
    answerInput.disabled = false;
    howMany.disabled = true;
    bttnEasy.disabled = true;
    bttnHard.disabled = true;
    currentMode = mediumList

}

function hard(){
    words.textContent = hardList[Math.floor(Math.random() * hardlist.length)]
    Stop = howMany.value
    answerInput.disabled = false;
    howMany.disabled = true;
    bttnEasy.disabled = true;
    bttnMedium.disabled = true;
    currentMode = hardList

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
    console.log(answerInput.value)
    console.log(givenWord.textContent)
    console.log(Stop);
    if (tries == Stop){
        words.textContent = 'Thank You for playing you got ' + correct + ' out of ' + Stop + '. That is a ' + (100 * correct)/Stop + '% Great job'
        rest()
    }else if (answerInput.value == givenWord.textContent){
        words.textContent = currentMode[Math.floor(Math.random() * currentMode.length)]
        correct +=1
        tries +=1
    } else {
        tries +=1
        words.textContent = currentMode[Math.floor(Math.random() * currentMode.length)]
    }
}

answerInput.disabled = true;
document.addEventListener('keydown', keyPressed);
document.addEventListener('keydown', function(KeyboardEvent){
    if (KeyboardEvent.code == 'Enter'){
        if (Stop != null){
            getAnswerInput()
            answerInput.value = '';
        }

    }
});

bttnEasy.addEventListener('click', () => easy())
bttnMedium.addEventListener('click', () => medium())
bttnHard.addEventListener('click', () => hard())

