document.addEventListener("DOMContentLoaded", () => {

     // Busca a lista de ranking geral
     fetch('php/listar_ranking.php?top=0')
     .then(response => {
       return response.json();
     })
     .then(data => {
       const tabelaJogadores = document.getElementById("tabela-ranking-geral");
       tabelaJogadores.querySelector('tbody').innerHTML = '';
   
       data.forEach(jogador => {
         const linha = document.createElement('tr');
         linha.innerHTML = `
           <td>${jogador.nome}</td>
           <td>${jogador.pontos}</td>
         `;
         tabelaJogadores.querySelector('tbody').appendChild(linha);
       });
     })
     .catch(error => {
       console.error('Erro ao buscar lista de jogadores:', error);
     });
 
});