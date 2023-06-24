var cartas = [
    { forca: 1, energia: 1 },
    { forca: 2, energia: 2 },
    { forca: 3, energia: 3 },
    { forca: 4, energia: 4 },
    { forca: 5, energia: 5 },
    { forca: 6, energia: 6},
    { forca: 7, energia: 7 },
    { forca: 8, energia: 8 },
    { forca: 9, energia: 9 },
    { forca: 10, energia: 10 },
    { forca: 11, energia: 11 },
    { forca: 12, energia: 12 }
];

var selectedCard = null;
var energiaPlayer = 1;

var forcaTot1 = 0;
var forcaTot2 = 0;
var forcaTot3 = 0;

var rodadas = 1;

const botaoInicio = document.getElementById('iniciar');    
botaoInicio.addEventListener('click', criaCarta);

const botaoreset = document.getElementById('reset');    
botaoreset.addEventListener('click', reset);

const proxrodada = document.getElementById('rodada');
proxrodada.addEventListener('click', proximarodada);

const localUmp = document.getElementById('um');
localUmp.addEventListener('click', moveCardToUmp);

const localDoisp = document.getElementById('dois');
localDoisp.addEventListener('click', moveCardToDoisp);

const localTresp = document.getElementById('tres');
localTresp.addEventListener('click', moveCardToTresp);

const energiaPlay = document.querySelector('.energiaPlayer');


function proximarodada(){
    rodadas++;
    energiaPlayer = rodadas;

    energiaPlay.innerHTML = energiaPlayer;

    criaCarta();

    if(energiaPlayer>5){
        proxrodada.removeEventListener('click', proximarodada);
    }
}

function reset(){
    location.reload();
}

function criaCarta(){
    energiaPlay.innerHTML = energiaPlayer;
    const deck = document.querySelector('.deck');

    var tam = rodadas;

    if(rodadas==1){
        tam = 4;
    }else{
        tam=1;
    }

    for(let i=0; i < tam; i++){
        const indice = i;
        const carta = document.createElement('div');
        carta.classList.add('card');
        carr = deck.appendChild(carta);

        const forca = document.createElement('span');
        forca.classList.add('forca');
        forca.innerHTML = cartas[indice].forca;
        carr.appendChild(forca);
        
        const energia = document.createElement('span');
        energia.classList.add('energia');
        energia.innerHTML = cartas[indice].energia;
        carr.appendChild(energia);

        carta.addEventListener('click', function() {
            carta.classList.toggle('scaled');
            selectedCard = carta;
        });
    }
}

function confere(energia){  //funcão para conferir se a carta pode ser colocada
    if(energia<=energiaPlayer){
        return true;
    }else{
        return false;
    }
}

function moveCardToUmp() {
    const energiaCarta = selectedCard.querySelector('.energia');
    const energia = parseInt(energiaCarta.innerHTML);

    if (selectedCard !== null){
        if(confere(energia)){

            energiaPlayer = energiaPlayer-energia;
            energiaPlay.innerHTML=energiaPlayer;

            const lugarUm = document.getElementById('ump');
            lugarUm.appendChild(selectedCard);
            selectedCard.classList.remove('scaled');
            selectedCard.classList.add('set');

            const forcaCarta = selectedCard.querySelector('.forca');
            const forcaTotal = document.getElementById('1');
            const forca = parseInt(forcaCarta.innerHTML);
            forcaTot1 = forcaTot1+forca;
            forcaTotal.classList.add('forca');
            forcaTotal.textContent = forcaTot1;

            energiaCarta.textContent = "";
            selectedCard = null;  
        }
    }
}

function moveCardToDoisp() {
    const energiaCarta = selectedCard.querySelector('.energia');
    const energia = parseInt(energiaCarta.innerHTML);

    if (selectedCard !== null){
        if(confere(energia)){

            energiaPlayer = energiaPlayer-energia;
            energiaPlay.innerHTML=energiaPlayer;

            const lugarDois = document.getElementById('doisp');
            lugarDois.appendChild(selectedCard);
            selectedCard.classList.remove('scaled');
            selectedCard.classList.add('set');

            const forcaCarta = selectedCard.querySelector('.forca');
            const forcaTotal = document.getElementById('2');
            const forca = parseInt(forcaCarta.innerHTML);
            forcaTot2 = forcaTot2+forca;
            forcaTotal.classList.add('forca');
            forcaTotal.textContent = forcaTot2;

            energiaCarta.textContent = "";
            selectedCard = null;  
        }
    }
}

function moveCardToTresp() {
    const energiaCarta = selectedCard.querySelector('.energia');
    const energia = parseInt(energiaCarta.innerHTML);

    if (selectedCard !== null){
        if(confere(energia)){

            energiaPlayer = energiaPlayer-energia;
            energiaPlay.innerHTML=energiaPlayer;

            const lugarTres = document.getElementById('tresp');
            lugarTres.appendChild(selectedCard);
            selectedCard.classList.remove('scaled');
            selectedCard.classList.add('set');

            const forcaCarta = selectedCard.querySelector('.forca');
            const forcaTotal = document.getElementById('3');
            const forca = parseInt(forcaCarta.innerHTML);
            forcaTot3 = forcaTot3+forca;
            forcaTotal.classList.add('forca');
            forcaTotal.textContent = forcaTot3;

            energiaCarta.textContent = "";
            selectedCard = null;  
        }
    }
}