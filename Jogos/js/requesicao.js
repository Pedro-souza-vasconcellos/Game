const seletor = document.getElementById('jogos');
function placar() {
    var arryJogadores = [];
    const url = `https://pedro-souza-vasconcellos.github.io/Game/banco/armazenamento.json`;
    fetch(url)
        .then(res => res.json())
        .then(resJson => {
            arryJogadores = resJson;
            arryJogadores = arryJogadores.filter(jogador => (jogador.jogo == seletor.value))
            return constroiTabela(arryJogadores);
        })
        .catch(erro => console.log({ 'erro ': erro }));
}
function constroiTabela(objs) {
    const tbody = document.getElementById('tbody');
    tbody.textContent = '';
    for (var i = 0; i < objs.length; i++) {
        var objAtual = objs[i];
        objAtual.pontos = parseInt(objAtual.pontos)
    }
    objs = objs.sort((a, b) => b.pontos - a.pontos);
    for (var i = 0; i < objs.length; i++) {
        const objAtual = objs[i];
        const linha = document.createElement('tr');
        const celulaJogador = document.createElement('td');
        const celulaPontos = document.createElement('td');
        celulaJogador.textContent = objAtual.jogador;
        celulaPontos.textContent = objAtual.pontos;
        linha.append(celulaJogador, celulaPontos);
        tbody.append(linha);
    }
}
window.addEventListener('DOMContentLoaded', () => {
    placar();

    const nome = localStorage.getItem('nome');
    document.getElementById('nome').textContent = nome
})
