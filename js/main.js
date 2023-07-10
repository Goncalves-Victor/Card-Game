 var cartas = [
    { nome: "Um", forca: 1, energia: 1 },
    { nome: "Dois", forca: 2, energia: 1 },
    { nome: "Tres", forca: 2, energia: 1 },
    { nome: "Quatro", forca: 2, energia: 2 },
    { nome: "Cinco", forca: 2, energia: 2 },
    { nome: "Seis", forca: 3, energia: 2 },
    { nome: "Sete", forca: 3, energia: 2 },
    { nome: "Oito", forca: 4, energia: 3 },
    { nome: "Nove", forca: 4, energia: 4 },
    { nome: "Dez", forca: 6, energia: 4 },
    { nome: "Onze", forca: 9, energia: 5 },
    { nome: "Doze", forca: 12, energia: 6 }
];

var rodadas = 1;

var selectedCard = null;

var energiaPlayer = 1;
var cartaPlayer;
var restantePlayer;
var forcaTot1 = 0; //Forca lugar 1 player
var forcaTot2 = 0; //Forca lugar 2 player
var forcaTot3 = 0; //Forca lugar 3 player
var maxUm = 0; //Quantidade maxima de cartas local player 1
var maxDois = 0; //Quantidade maxima de cartas local player 2
var maxTres = 0; //Quantidade maxima de cartas local player 2

var energiaBot = 1;
var cartasBot;
var restanteBot;
var forcaTotB3 = 0; //Forca lugar 1 bot
var forcaTotB1 = 0; //Forca lugar 2 bot 
var forcaTotB2 = 0; //Forca lugar 3 bot
var maxUmB = 0; //Quantidade maxima de cartas local bot 1
var maxDoisB = 0; //Quantidade maxima de cartas local bot 1
var maxTresB = 0; //Quantidade maxima de cartas local bot 1

const energiaPlay = document.querySelector('.energiaPlayer');
const placarRodada = document.querySelector('.rodadas');

const botaoreset = document.getElementById('reset');    
botaoreset.addEventListener('click', reset);

const turno = document.getElementById('turno');  
turno.addEventListener('click', jogadaBot);


player();
bot ();
criaCarta();


function reset(){ //funcao para dar reload na pagina
    location.reload();
}

function DistribuiCartas(){ //funcao que cria o vetor aleatorio para as 4 cartas aleatorias
    var v=[]
    while(v.length!=4){
        let numero=Math.floor(Math.random() *12)
        if(v.indexOf(numero)==-1){
            v.push(numero)
        }
    }
    return v
}

function ordena(vet){ //funcao para que ordene o vetor em ordem 
    let aux=[]
    while(vet.length>0){
        let menor = Math.min(...vet)
        aux.push(menor)
        vet.splice(vet.indexOf(menor),1)
    }
    return aux;
}

function cartasRestantes(cartas){ //funcao que retorna o restante das cartas do player
    var cartasRestantes = [];

    for (let i = 0; i < 12; i++) {
      if (!cartas.includes(i)) {
        cartasRestantes.push(i);
      }
    }
    return cartasRestantes;
}

function player(){ //funcao para inicializar o jogador
    var cartas = DistribuiCartas();
    cartas = ordena(cartas);
    var restantesplayer = cartasRestantes(cartas);
    cartaPlayer = cartas;
    restantePlayer = restantesplayer;
}

function bot(){ //funcao para inicializar o bot
    var cartas = DistribuiCartas();
    cartas = ordena(cartas);
    var restantebot = cartasRestantes(cartas);
    cartasBot = cartas;
    restanteBot = restantebot;
}

function aleatorio (){
    let valor = Math.floor(Math.random()*3) + 1;
    return valor;
}

function jogadaBot (energiaBot){
    if (energiaBot < rodadas){
    } else{
        energiaBot = rodadas;
    }
    
    let aux; //valor para determinar onde a carta vai ser colocada
    let valorAleatorio = aleatorio();
 
    if(maxUm!==maxUmB){
        aux=1;
    }else if(maxDois!==maxDoisB){
        aux=2;
    }else if(maxTres!==maxTresB){
        aux=3;
    } else {
        aux=valorAleatorio;
    }
    cartasBot = ordena(cartasBot);
    var indice = cartasBot[0];

    if (rodadas === 6){
        indice = cartasBot[cartasBot.length - 1];
    }

    const cartaB = document.createElement('div');
    cartaB.classList.add ('card');
    cartaB.style.backgroundColor = corCard();

    const forcaBot = document.createElement('span');
    forcaBot.classList.add ('forca');
    forcaBot.innerHTML = cartas[indice].forca;
    const forca = parseInt (forcaBot.innerHTML);
    
    const energiabot = document.createElement('span');
    energiabot.classList.add ('energia');
    energiabot.innerHTML = cartas[indice].energia;

    let confereEnergia;

    if(cartas[indice].energia<=energiaBot){
        energiaBot -= cartas[indice].energia;
        confereEnergia = 1;
        energiabot.innerHTML = "";
    }else{
        confereEnergia = 0;
    }

    if (maxUmB < 4 && aux === 1 && confereEnergia === 1){

        const forcaTotal = document.getElementById('1b');
        const lugarUmB = document.getElementById('umb');
        
        forcaTotB1 = forcaTotB1 + forca;
    
        const cartaFeita = lugarUmB.appendChild (cartaB);
        cartaFeita.classList.add ('set');
        cartaFeita.appendChild (forcaBot);
        cartaFeita.appendChild (energiabot);
        
        forcaTotal.classList.add ('forca');
        forcaTotal.textContent = forcaTotB1;
        maxUmB++;

        cartasBot.shift ();
        var restB = restanteBot.pop();
        cartasBot.push (restB);
    }

    if (maxDoisB < 4 && aux === 2 && confereEnergia === 1){

        const forcaTotal = document.getElementById('2b');
        const lugarDoisB = document.getElementById('doisb');

        forcaTotB2 = forcaTotB2 + forca;
        
        const cartaFeita = lugarDoisB.appendChild (cartaB);
        cartaFeita.classList.add ('set');
        cartaFeita.appendChild (forcaBot);
        cartaFeita.appendChild (energiabot);

        forcaTotal.classList.add ('forca');
        forcaTotal.textContent = forcaTotB2;
        maxDoisB++;

        cartasBot.shift ();
        var restB = restanteBot.pop();
        cartasBot.push (restB);
    }

    if (maxTresB < 4 && aux === 3 && confereEnergia === 1){
        const forcaTotal = document.getElementById('3b');
        const lugarTresB = document.getElementById('tresb');

        forcaTotB3 = forcaTotB3 + forca;
    
        
        const cartaFeita = lugarTresB.appendChild (cartaB);
        cartaFeita.classList.add ('set');
        cartaFeita.appendChild (forcaBot);
        cartaFeita.appendChild (energiabot);

        forcaTotal.classList.add ('forca');
        forcaTotal.textContent = forcaTotB3;
        maxTresB++;

        cartasBot.shift ();
        var restB = restanteBot.pop();
        cartasBot.push (restB);
    }
    if (energiaBot >= cartas[indice].energia){
        jogadaBot(energiaBot);
    } else {

         if (rodadas < 6){
            proximarodada();
        } else {
            if (selectedCard !== null){
                selectedCard.classList.remove ('scaled');
                selectedCard = null;
            }
            turno.removeEventListener('click', jogadaBot);
            localUmp.removeEventListener('click', moveCardToUmp);
            localDoisp.removeEventListener('click', moveCardToDoisp);
            localTresp.removeEventListener('click', moveCardToTresp);
            
            ganhou();
        }
        
    }
}


function embaralhar(restantes) {
    for (let i = restantes.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [restantes[i], restantes[j]] = [restantes[j], restantes[i]];
    }
    return restantes;
}

function proximarodada(){
    rodadas++;
    placarRodada.innerHTML = `${rodadas}/6`;
    
    energiaPlayer = rodadas;
    energiaPlay.innerHTML = energiaPlayer;

    var restantesplayer = restantePlayer;
    restantesplayer = embaralhar(restantesplayer);
    
    if(cartaPlayer.length<4){
        var restp = restantePlayer.pop();
        cartaPlayer.push(restp);
        criaCarta();
    }
    if (selectedCard !== null){
        selectedCard.classList.remove ('scaled');
        selectedCard = null;
    }
}

function criaCarta(){
    placarRodada.innerHTML = `${rodadas}/6`;
    energiaPlay.innerHTML = energiaPlayer;
    const deck = document.querySelector('.deck');

    let  tamanho = cartaPlayer.length;
    
    for(let i = 0; i < tamanho; i++) {
        if(rodadas===1){
            var indice = cartaPlayer[i];
        }else{
            tamanho = 1;
            indice = cartaPlayer[cartaPlayer.length-1];
        }

        const carta = document.createElement('div');
        carta.classList.add('card');
        carta.classList.add('card-hover');
        carr = deck.appendChild(carta);
        carta.style.backgroundColor = corCard();

        const forca = document.createElement('span');
        forca.classList.add('forca');
        forca.innerHTML = cartas[indice].forca;
        carr.appendChild(forca);
        
        const energia = document.createElement('span');
        energia.classList.add('energia');
        energia.innerHTML = cartas[indice].energia;
        carr.appendChild(energia);

        carta.addEventListener('click', function() {
            if(selectedCard===carta){
                carta.classList.remove('scaled');
                selectedCard=null;

            }else if(selectedCard !== null){
                selectedCard.classList.remove('scaled');
                carta.classList.add('scaled');
                selectedCard = carta;

            }else{
                carta.classList.add('scaled');
                selectedCard = carta;
            }
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

function corCard(){
    const cores = [
        '#ffa446',
        '#ffa588',
        '#d62957',
        '#1693a5',
        '#572e4f',
        '#6cb6a5',
        '#51615b',
        '#191f04',
        '#7abf66',
        '#525574',
    ];

    let indiceCor = Math.floor(Math.random() * cores.length)

    return cores[indiceCor];
}

const localUmp = document.getElementById('um');
localUmp.addEventListener('click', moveCardToUmp);

const localDoisp = document.getElementById('dois');
localDoisp.addEventListener('click', moveCardToDoisp);

const localTresp = document.getElementById('tres');
localTresp.addEventListener('click', moveCardToTresp);


function moveCardToUmp() {
    const energiaCarta = selectedCard.querySelector('.energia');
    const energia = parseInt(energiaCarta.innerHTML);

    if (selectedCard !== null){
        if(confere(energia) && maxUm <4 && selectedCard.classList.contains('scaled')){
            maxUm++;
            cartaPlayer.pop();

            energiaPlayer = energiaPlayer-energia;

            energiaPlay.innerHTML= energiaPlayer;

            const lugarUm = document.getElementById('ump');
            lugarUm.appendChild(selectedCard);
            selectedCard.classList.remove('scaled');
            selectedCard.classList.add('set');
            selectedCard.classList.remove('card-hover');

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
        if(confere(energia) && maxDois<4 && selectedCard.classList.contains('scaled')){
            maxDois++;
            cartaPlayer.pop();

            energiaPlayer = energiaPlayer-energia;
            energiaPlay.innerHTML =energiaPlayer;

            const lugarDois = document.getElementById('doisp');
            lugarDois.appendChild(selectedCard);
            selectedCard.classList.remove('scaled');
            selectedCard.classList.add('set');
            selectedCard.classList.remove('card-hover');

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
        if(confere(energia) && maxTres<4 && selectedCard.classList.contains('scaled')){
            maxTres++;
            cartaPlayer.pop();

            energiaPlayer = energiaPlayer-energia;
            energiaPlay.innerHTML= energiaPlayer;

            const lugarTres = document.getElementById('tresp');
            lugarTres.appendChild(selectedCard);
            selectedCard.classList.remove('scaled');
            selectedCard.classList.add('set');
            selectedCard.classList.remove('card-hover');

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

function ganhou() {
    const forcatotal1 = document.getElementById('1');
    const forcatotal1b = document.getElementById('1b');

    if (forcaTot1 > forcaTotB1) {
        forcatotal1.classList.add('ganhou')
    } else if (forcaTotB1 > forcaTot1) {
        forcatotal1b.classList.add('ganhou');
    } else {
        forcatotal1.classList.add('empate')      
        forcatotal1b.classList.add('empate');
    }
  
    const forcatotal2 = document.getElementById('2');
    const forcatotal2b = document.getElementById('2b');

    if (forcaTot2 > forcaTotB2) {
        forcatotal2.classList.add('ganhou');
    } else if (forcaTotB2 > forcaTot2) {
        forcatotal2b.classList.add('ganhou');
    } else {
        forcatotal2.classList.add('empate');
        forcatotal2b.classList.add('empate');
    }
  
    const forcatotal3 = document.getElementById('3');
    const forcatotal3b = document.getElementById('3b');

    if (forcaTot3 > forcaTotB3) {
        forcatotal3.classList.add('ganhou');
    } else if (forcaTotB3 > forcaTot3) {
        forcatotal3b.classList.add('ganhou');
    } else {
        forcatotal3.classList.add('empate');
        forcatotal3b.classList.add('empate');
    }
}