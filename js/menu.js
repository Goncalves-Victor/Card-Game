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
    '#525574'
];

var corAtual=null;

function geraCor(){
    
    if(corAtual==null){
        var i = Math.floor(Math.random() * 9);
    }else{
        do{
            var i = Math.floor(Math.random() * 9);
        } while(cores[i]==corAtual);
    }
    
    corAtual=cores[i]
    return corAtual;
}


function alteraCor(){
    const elementos = document.querySelectorAll(".div-btn");
    for(let i =0;i<elementos.length;i++){
        elementos[i].style.color=geraCor();
    }
}

setInterval(alteraCor,1000);
