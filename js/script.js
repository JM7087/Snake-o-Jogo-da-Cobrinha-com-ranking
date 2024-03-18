document.addEventListener("DOMContentLoaded", () => {
  const campoJogo = document.getElementById("game-board");

  let larguraCampo = 800;
  let alturaCampo = 500;
  let tamanhoGrade = 20;
  let velocidadeInicialCobrinha = 200;

  let nomeJogador = "";
  let cobrinha = [{ x: 0, y: 0 }];
  let comida = {};
  let direcao = "direita";
  let idIntervalo;
  let velocidade = velocidadeInicialCobrinha;
  let pontos = 0;
  let recorde = localStorage.getItem("recorde") || 0;
  let teclaEspaco = false;
  let Delete = false;

  document.getElementById("recorde").innerHTML = recorde;

  // atualiza tabela top 10
  buscarRanking();

  // verifica o tamanho da tela, para ajusta o campo de jogo.
  ajusdarTamanhoDaTela();
  window.addEventListener("resize", ajusdarTamanhoDaTela);

  function criarComida() {
    comida = {
      x:
        Math.floor(Math.random() * (larguraCampo / tamanhoGrade)) *
        tamanhoGrade,
      y:
        Math.floor(Math.random() * (alturaCampo / tamanhoGrade)) * tamanhoGrade,
    };

    const elementoComida = document.createElement("div");
    elementoComida.style.left = `${comida.x}px`;
    elementoComida.style.top = `${comida.y}px`;
    elementoComida.id = "food";
    campoJogo.appendChild(elementoComida);
  }

  function iniciarJogo() {
    nomeJogador = document.getElementById("nome-jogador").value;

    if (nomeJogador.trim() === "") {
      alert("Por favor, insira seu nome antes de iniciar o jogo!");
      return;
    }

    criarComida();
    idIntervalo = setInterval(atualizarCobrinha, velocidade);
    document.getElementById("start-button").disabled = true;
    teclaEspaco = true;
    Delete = true;
  }

  function atualizarCobrinha() {
    const cabeca = { x: cobrinha[0].x, y: cobrinha[0].y };

    if (direcao === "direita") {
      cabeca.x += tamanhoGrade;
    } else if (direcao === "esquerda") {
      cabeca.x -= tamanhoGrade;
    } else if (direcao === "cima") {
      cabeca.y -= tamanhoGrade;
    } else if (direcao === "baixo") {
      cabeca.y += tamanhoGrade;
    }

    cobrinha.unshift(cabeca);

    if (cabeca.x === comida.x && cabeca.y === comida.y) {
      campoJogo.removeChild(document.getElementById("food"));
      criarComida();
      velocidade -= 5;
      pontos++;
      document.getElementById("pontos").innerHTML = pontos;

      // som comer
      som('comer');

      atualizarRecorde();

      // enviar o nome é pontos do jogador para armazenamento
      enviarNomeParaAPI(nomeJogador, pontos);

      // atualiza tabela top 10
      buscarRanking();
    } else {
      cobrinha.pop();
    }

    const colidiu = cobrinha
      .slice(1)
      .some((part) => part.x === cabeca.x && part.y === cabeca.y);

    if (
      cabeca.x < 0 ||
      cabeca.x >= larguraCampo ||
      cabeca.y < 0 ||
      cabeca.y >= alturaCampo ||
      colidiu
    ) {
      clearInterval(idIntervalo);

      // som colidiu
      som('colidiu');

      alert("Fim de jogo!");

      location.reload();


      teclaEspaco = false;
      Delete = false;
      document.getElementById("start-button").disabled = false;
    } else {
      renderizarCobrinha();
    }
  }

  function renderizarCobrinha() {
    campoJogo.innerHTML = "";

    cobrinha.forEach((part) => {
      const elementoParte = document.createElement("div");
      elementoParte.className = "snake-body";
      elementoParte.style.left = `${part.x}px`;
      elementoParte.style.top = `${part.y}px`;
      campoJogo.appendChild(elementoParte);
    });

    const elementoComida = document.createElement("div");
    elementoComida.style.left = `${comida.x}px`;
    elementoComida.style.top = `${comida.y}px`;
    elementoComida.id = "food";
    campoJogo.appendChild(elementoComida);
  }

  function lidarComPressionamentoTecla(evento) {
    const teclaPressionada = evento.key;

    if (teclaPressionada === "ArrowUp" && direcao !== "baixo") {
      direcao = "cima";
    } else if (teclaPressionada === "ArrowDown" && direcao !== "cima") {
      direcao = "baixo";
    } else if (teclaPressionada === "ArrowLeft" && direcao !== "direita") {
      direcao = "esquerda";
    } else if (teclaPressionada === "ArrowRight" && direcao !== "esquerda") {
      direcao = "direita";
    }
  }

  function lidarComCliqueMouse(evento) {
    const campoX =
      campoJogo.getBoundingClientRect().left +
      window.scrollX +
      larguraCampo / 2;
    const campoY =
      campoJogo.getBoundingClientRect().top + window.scrollY + alturaCampo / 2;

    const clickX = evento.clientX;
    const clickY = evento.clientY;

    const diffX = clickX - campoX;
    const diffY = clickY - campoY;

    if (Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX > 0 && direcao !== "esquerda") {
        direcao = "direita";
      } else if (diffX < 0 && direcao !== "direita") {
        direcao = "esquerda";
      }
    } else {
      if (diffY > 0 && direcao !== "cima") {
        direcao = "baixo";
      } else if (diffY < 0 && direcao !== "baixo") {
        direcao = "cima";
      }
    }
  }

  function atualizarRecorde() {
    // Atualiza o recorde no localStorage se necessário
    if (pontos > recorde) {
      recorde = pontos;
      localStorage.setItem("recorde", recorde);
      document.getElementById("recorde").innerHTML = recorde;
    }
  }

  // fetch para enviar o nome é pontos do jogador
  async function enviarNomeParaAPI(nomeJogador, pontos) {
    try {
      const response = await fetch(
        `php/receber_parametros.php?nome=${nomeJogador}&pontos=${pontos}`
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

  async function buscarRanking() {
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

      data.forEach((jogador) => {
        const linha = document.createElement("tr");
        linha.innerHTML = `
          <td>${jogador.nome}</td>
          <td>${jogador.pontos}</td>
        `;
        tabelaJogadores.querySelector("tbody").appendChild(linha);
      });
    } catch (error) {
      console.error("Erro ao buscar lista de jogadores:", error);
    }
  }

  function som(tipo) {
    if (tipo == 'comer') audio = new Audio("som/somComer.mp3");

    if (tipo == 'colidiu') audio = new Audio("som/somColidiu.mp3");

    const som = audio.cloneNode();
    som.currentTime = audio.currentTime;
    som.play();
  }

  // ajusta o campo de jogo.
  function ajusdarTamanhoDaTela() {
    if (window.innerWidth <= 500) {
      larguraCampo = 375;
      alturaCampo = 600;
    } else {
      larguraCampo = 800;
      alturaCampo = 500;
    }
  }

  document
    .getElementById("start-button")
    .addEventListener("click", iniciarJogo);
  document.addEventListener("keydown", lidarComPressionamentoTecla);
  campoJogo.addEventListener("click", lidarComCliqueMouse);

  document.addEventListener("keydown", (event) => {
    if (event.code === "Space" && teclaEspaco === false) {
      iniciarJogo();
    }
  });
  // zera recorde ao apertar a tecla Delete
  document.addEventListener("keydown", (event) => {
    if (event.code === "Delete" && Delete === false) {
      recorde = 0;
      localStorage.setItem("recorde", recorde);
      document.getElementById("recorde").innerHTML = recorde;
    }
  });
});
