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

var selectedCard = null;
var energiaPlayer = 1;

var forcaTot1 = 0;
var forcaTot2 = 0;
var forcaTot3 = 0;

var rodadas = 1;

var cartaPlayer;
var restantePlayer;

const energiaPlay = document.querySelector('.energiaPlayer');
const placarRodada = document.querySelector('.rodadas');

const botaoInicio = document.getElementById('iniciar');    
botaoInicio.addEventListener('click', setup);

const botaoreset = document.getElementById('reset');    
botaoreset.addEventListener('click', reset);

const proxrodada = document.getElementById('rodada');
proxrodada.addEventListener('click', proximarodada);


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

function setup(){
    player();
    criaCarta();
    botaoInicio.removeEventListener('click', setup);
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
    placarRodada.innerHTML = rodadas;
    
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
        if(confere(energia) && maxDois<4 && selectedCard.classList.contains('scaled')){
            maxDois++;
            cartaPlayer.pop();

            energiaPlayer = energiaPlayer-energia;
            energiaPlay.innerHTML=`ENERGIA: ${energiaPlayer}`;

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
        if(confere(energia) && maxTres<4 && selectedCard.classList.contains('scaled')){
            maxTres++;
            cartaPlayer.pop();

            energiaPlayer = energiaPlayer-energia;
            energiaPlay.innerHTML=`ENERGIA: ${energiaPlayer}`;

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