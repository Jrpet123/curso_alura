//let titulo = document.querySelector('h1');
//titulo.innerHTML = 'Jogo do numero secreto';

//let paragrafo = document.querySelector('p');
//paragrafo.innerHTML = 'Escolha um numero entra 1 a 10';
let listaDeNumerosSorteados = []
let numeroLimite = 50;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto){
    
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function exibirMensagemInicial(){

    exibirTextoNaTela('h1', 'Jogo do numero secreto.');
    exibirTextoNaTela('p', 'Escolha um numero entre 1 e 100.');
}
exibirMensagemInicial();
function verificarChute() {
    let chute = document.querySelector('input').value;
    //console.log(numeroSecreto);
   // console.log(chute == numeroSecreto);

    if ( chute == numeroSecreto){
        exibirTextoNaTela('h1', 'Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativas';
        let mensagemTentativas = `Acertou, você descobriu o numero secreto com ${tentativas} ${palavraTentativa}! `;
        exibirTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {

        if (chute > numeroSecreto) {
            exibirTextoNaTela('p', 'O numero secreto é menor.');
        } else {
            exibirTextoNaTela('p', 'O numero secreto é maior.');
        }

        tentativas++;
        limparCampo();

    }
}
    

function gerarNumeroAleatorio(){

    let numeroEscolhido =  parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    if (quantidadeDeElementosNaLista == numeroLimite) {
        listaDeNumerosSorteados = [];
    }
    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados)
        return numeroEscolhido
    }
}


function limparCampo() {

    chute = document.querySelector('input');
    chute.value = '';    
}

function reiniciarJogo(){

    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}