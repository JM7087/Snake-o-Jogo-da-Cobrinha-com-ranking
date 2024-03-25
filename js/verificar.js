  // Função para validar o nome do jogador
 export function validarNome(nomeJogador) {
    // Remover espaços em branco do início e do final
    nomeJogador = nomeJogador.trim();

    // Verificar se o nome tem pelo menos 2 caracteres e pelo menos uma letra
    if (nomeJogador.length < 2 || !/[a-zA-Z]/.test(nomeJogador)) {
      alert("Por favor, insira um nome válido com pelo menos 2 caracteres e pelo menos uma letra!");
      return false;
    }

    return true;
  }