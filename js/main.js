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

function reset(){
    location.reload();
}

function criaCarta(){
    const deck = document.querySelector('.deck');
    for(let i=0; i <4;i++){
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
        });
    }
}

const botaoInicio = document.getElementById('iniciar');    
botaoInicio.addEventListener('click', criaCarta);

const botaoreset = document.getElementById('reset');    
botaoreset.addEventListener('click', reset);