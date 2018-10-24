var timerId = null;

function iniciaJogo(){
    var url=window.location.search;
    var nivel = url.replace("?","")
  //  alert(nivel);
    var tempo_segundos =0;

    if(nivel == 1){
        tempo_segundos = 120;
    }

    if(nivel ==2){
        tempo_segundos = 60;
    }

    if(nivel==3){
        tempo_segundos = 30;
    }

    //INSERINDO SEGUNDOS NO SPAN
    document.getElementById('cronometro').innerHTML = tempo_segundos;

    //GERANDO BALÕES
    var qtd_baloes = 80;
    criarBaloes(qtd_baloes);

    //IMPRIMIR QTD BALOES INTEIROS
    document.getElementById('baloes_inteiros').innerHTML = qtd_baloes;

    //IMPRIMIR QTD BALOES ESTOURADOS
    document.getElementById('baloes_estourados').innerHTML = 0;

    contagem_tempo(tempo_segundos+1)
}

function contagem_tempo(segundos){
    segundos=segundos-1;
    if(segundos == -1){
        clearTimeout(timerId) //PARA A EXECUÇÃO DA FUNÇÃO DO SetTimeOut
        game_over();
        return false
    }

    document.getElementById('cronometro').innerHTML = segundos;
    timerId = setTimeout("contagem_tempo("+segundos+")",1000)
}

function game_over(){
    alert('Fim de jogo. Você perdeu!')
}

function criarBaloes(qtd){
    for(var i=1; i<=qtd; i++){
        var balao = document.createElement("img");
        balao.src = 'imagens/balao_azul_pequeno.png'
        balao.style.margin='12px'
        balao.id = 'b'+i;
        balao.onclick = function(){
            estourar(this);
        }
        document.getElementById('cenario').appendChild(balao);
    }
}

function estourar(e){
    var id_balao = e.id

    document.getElementById(id_balao).setAttribute("onclick","")
    document.getElementById(id_balao).src = 'imagens/balao_azul_pequeno_estourado.png'
    pontuacao(-1)
}

function pontuacao(acao){
    var baloes_inteiros = document.getElementById('baloes_inteiros').innerHTML
    var baloes_estourados = document.getElementById('baloes_estourados').innerHTML

    baloes_inteiros = parseInt(baloes_inteiros)
    baloes_estourados = parseInt(baloes_estourados)

    baloes_inteiros = baloes_inteiros + acao
    baloes_estourados = baloes_estourados - acao

    document.getElementById('baloes_inteiros').innerHTML = baloes_inteiros
    document.getElementById('baloes_estourados').innerHTML = baloes_estourados

    situacao_jogo(baloes_estourados,baloes_inteiros);
}

function situacao_jogo(baloes_estourados,baloes_inteiros){
    if(baloes_inteiros == 0){
        alert('Parabéns. Você venceu!')
        parar_jogo();
    }
}

function parar_jogo(){
    clearTimeout(timerId)
}