let posicao = 1;

document.addEventListener("DOMContentLoaded", () => {


  const tabelaJogadores = document.getElementById("tabela-ranking-geral");

  if (tabelaJogadores) {

    // Busca a lista de ranking geral
    fetch('php/listar_ranking.php?top=0')
      .then(response => {
        return response.json();
      })
      .then(data => {
        tabelaJogadores.querySelector('tbody').innerHTML = '';

        data.forEach(jogador => {
          const linha = document.createElement('tr');
          linha.innerHTML = `
           <td>${posicao++}</td>
           <td>${jogador.nome}</td>
           <td>${jogador.pontos}</td>
         `;
          tabelaJogadores.querySelector('tbody').appendChild(linha);
        });

      })
      .catch(error => {
        console.error('Erro ao buscar lista de jogadores:', error);
      });
  }
});

// fetch para enviar o nome é pontos do jogador
export async function enviarNomeParaAPI(nomeJogador, pontos) {
  try {
    const response = await fetch(
      `php/receber_parametros.php?nome=${nomeJogador}&pontos=${pontos}&senha= uma senha para evitar inserir na url`
    );

    if (!response.ok) {
      throw new Error("Erro ao enviar nome do jogador para a API");
    }

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Erro:", error);
  }
}

export async function buscarRankingTop10() {
  // Busca a lista de jogadores na API e atualiza a tabela
  try {
    const response = await fetch("php/listar_ranking.php?top=1");
    if (!response.ok) {
      throw new Error("Erro ao buscar lista de jogadores");
    }
    const data = await response.json();
    const tabelaJogadores = document.getElementById(
      "tabela-jogadores-top-10"
    );
    tabelaJogadores.querySelector("tbody").innerHTML = "";
    posicao = 1;
    
    data.forEach((jogador) => {
      const linha = document.createElement("tr");
      linha.innerHTML = `
        <td>${posicao++}</td>
        <td>${jogador.nome}</td>
        <td>${jogador.pontos}</td>
      `;
      tabelaJogadores.querySelector("tbody").appendChild(linha);
    });
  } catch (error) {
    console.error("Erro ao buscar lista de jogadores:", error);
  }

}

export function atualizarRecorde(pontos, recorde) {
  // Atualiza o recorde no localStorage se necessário
  if (pontos > recorde) {
    recorde = pontos;
    localStorage.setItem("recorde", recorde);
    document.getElementById("recorde").innerHTML = recorde;
  }
}

