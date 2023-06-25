/* var cartas = [
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
]; */
 var cartas = [
    { nome: "Um", forca: 1, energia: 1 },
    { nome: "Dois", forca: 2, energia: 1 },
    { nome: "Tres", forca: 3, energia: 1 },
    { nome: "Quatro", forca: 4, energia: 1 },
    { nome: "Cinco", forca: 5, energia: 1 },
    { nome: "Seis", forca: 6, energia: 1 },
    { nome: "Sete", forca: 7, energia: 1},
    { nome: "Oito", forca: 8, energia: 1 },
    { nome: "Nove", forca: 9, energia: 1},
    { nome: "Dez", forca: 10, energia: 1 },
    { nome: "Onze", forca: 11, energia:1 },
    { nome: "Doze", forca: 12, energia: 1 }
]; 
var selectedCard = null;
var energiaPlayer = 1;

var forcaTot1 = 0;
var forcaTot2 = 0;
var forcaTot3 = 0;

var forcaTotB1 = 0;
var forcaTotB2 = 0;
var forcaTotB3 = 0;

var rodadas = 1;

var cartaPlayer;
var restantePlayer;

var cartasBot;
var energiaBot;
var restanteBot;

const energiaPlay = document.querySelector('.energiaPlayer');
const placarRodada = document.querySelector('.rodadas');

const botaoInicio = document.getElementById('iniciar');    
botaoInicio.addEventListener('click', setup);

const botaoreset = document.getElementById('reset');    
botaoreset.addEventListener('click', reset);


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

function cartasplayer(cartas){ //funcao que retorna o restante das cartas do player

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
    var restantesplayer = cartasplayer(cartas);
    cartaPlayer = cartas;
    restantePlayer = restantesplayer;
    return restantesplayer;
}

function bot(){ //funcao para inicializar o bot
    var cartas = DistribuiCartas();
    cartas = ordena(cartas);
    var restantebot = cartasplayer(cartas);
    cartasBot = cartas;
    restanteBot = restantebot;
    console.log (cartasBot);
    console.log (restanteBot);
    return restantebot;
}

var maxUmB = 0;
var maxDoisB = 0;
var maxTresB = 0;
function jogadaBot (){
    const jogadaUm = document.getElementById ('ump')
    const jogadaDois = document.getElementById ('doisp')
    const jogadaTres = document.getElementById ('tresp')

    if (maxUmB < 4 && jogadaUm.classList.contains('contem')){
        const forcaTotal = document.getElementById('1b');
        var indice = cartasBot[cartasBot.length - 1];
        const lugarUmB = document.getElementById('umb');
        const cartaB = document.createElement('div');
        cartaB.classList.add ('card');
        cartaB.style.backgroundColor = corCard();
        const forcaBot = document.createElement('span');
        forcaBot.classList.add ('forca');
        forcaBot.innerHTML = cartas[indice].forca;
        const forca = parseInt (forcaBot.innerHTML);
        forcaTotB1 = forcaTotB1 + forca;
    
        const energiaBot = document.createElement('span');
        energiaBot.classList.add ('energia');
        energiaBot.innerHTML = cartas[indice].energia;
        const cartaFeita = lugarUmB.appendChild (cartaB);
        cartaFeita.classList.add ('set');
        cartaFeita.appendChild (forcaBot);
        cartaFeita.appendChild (energiaBot);
        
        forcaTotal.classList.add ('forca');
        forcaTotal.textContent = forcaTotB1;
        maxUmB++;
        cartasBot.pop ();
        var restB = restanteBot.pop();
        cartasBot.push (restB);
    }
    if (maxDoisB < 4 && jogadaDois.classList.contains('contem2')){
        const forcaTotal = document.getElementById('2b');
        var indice = cartasBot[cartasBot.length - 1];
        const lugarDoisB = document.getElementById('doisb');
        const cartaB = document.createElement('div');
        cartaB.classList.add ('card');
        cartaB.style.backgroundColor = corCard();
        const forcaBot = document.createElement('span');
        forcaBot.classList.add ('forca');
        forcaBot.innerHTML = cartas[indice].forca;
        const forca = parseInt (forcaBot.innerHTML);
        forcaTotB2 = forcaTotB2 + forca;
        
        const energiaBot = document.createElement('span');
        energiaBot.classList.add ('energia');
        energiaBot.innerHTML = cartas[indice].energia;
        const cartaFeita = lugarDoisB.appendChild (cartaB);
        cartaFeita.classList.add ('set');
        cartaFeita.appendChild (forcaBot);
        cartaFeita.appendChild (energiaBot);
        forcaTotal.classList.add ('forca');
        forcaTotal.textContent = forcaTotB2;
        maxDoisB++;
        cartasBot.pop ();
        var restB = restanteBot.pop();
        cartasBot.push (restB);
    }
    if (maxTresB < 4 && jogadaTres.classList.contains('contem3')){
        const forcaTotal = document.getElementById('3b');
        var indice = cartasBot[cartasBot.length - 1];
        const lugarTresB = document.getElementById('tresb');
        const cartaB = document.createElement('div');
        cartaB.classList.add ('card');
        cartaB.style.backgroundColor = corCard();
        const forcaBot = document.createElement('span');
        forcaBot.classList.add ('forca');
        forcaBot.innerHTML = cartas[indice].forca;
        const forca = parseInt (forcaBot.innerHTML);
        forcaTotB3 = forcaTotB3 + forca;
    
        
        const energiaBot = document.createElement('span');
        energiaBot.classList.add ('energia');
        energiaBot.innerHTML = cartas[indice].energia;
        const cartaFeita = lugarTresB.appendChild (cartaB);
        cartaFeita.classList.add ('set');
        cartaFeita.appendChild (forcaBot);
        cartaFeita.appendChild (energiaBot);
        forcaTotal.classList.add ('forca');
        forcaTotal.textContent = forcaTotB3;
        maxTresB++;
        cartasBot.pop ();
        var restB = restanteBot.pop();
        cartasBot.push (restB);
    }
}

function setup(){
    const proxrodada = document.getElementById('rodada');
    proxrodada.addEventListener('click', proximarodada);
    player();
    bot ();
    criaCarta();
    botaoInicio.removeEventListener('click', setup);
    jogadaBot ();
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
    placarRodada.innerHTML = `RODADAS: ${rodadas}`;
    
    energiaPlayer = rodadas;
    energiaPlay.innerHTML = `ENERGIA: ${energiaPlayer}`;

    var restantesplayer = restantePlayer;
    restantesplayer = embaralhar(restantesplayer);
    
    if(cartaPlayer.length<4){
        var restp = restantePlayer.pop();
        cartaPlayer.push(restp);
        criaCarta();
    }else{

    }

    if(energiaPlayer>5){
        proxrodada.removeEventListener('click', proximarodada);
    }
    jogadaBot ();
}

function criaCarta(){
    placarRodada.innerHTML = `RODADAS: ${rodadas}`;
    energiaPlay.innerHTML = `ENERGIA: ${energiaPlayer}`;
    const deck = document.querySelector('.deck');

    let  tamanho = cartaPlayer.length;
    
    for(let i = 0; i < tamanho; i++) {
        if(rodadas==1){
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
            if(selectedCard==carta){
                carta.classList.remove('scaled');
                selectedCard=null;

            }else if(selectedCard != null){
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

var maxUm = 0;
var maxDois = 0;
var maxTres = 0;

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

            energiaPlay.innerHTML=`ENERGIA: ${energiaPlayer}`;

            const lugarUm = document.getElementById('ump');
            lugarUm.appendChild(selectedCard);
            lugarUm.classList.add ('contem');
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
            energiaPlay.innerHTML=`ENERGIA: ${energiaPlayer}`;

            const lugarDois = document.getElementById('doisp');
            lugarDois.appendChild(selectedCard);
            lugarDois.classList.add ('contem2');
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
            energiaPlay.innerHTML=`ENERGIA: ${energiaPlayer}`;

            const lugarTres = document.getElementById('tresp');
            lugarTres.appendChild(selectedCard);
            lugarTres.classList.add ('contem3');
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