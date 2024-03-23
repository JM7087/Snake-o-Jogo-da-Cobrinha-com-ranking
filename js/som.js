export function som(tipo) {
    let audio;
    
    if (tipo == 'comer') audio = new Audio("som/somComer.mp3");

    if (tipo == 'colidiu') audio = new Audio("som/somColidiu.mp3");

    const som = audio.cloneNode();
    som.currentTime = audio.currentTime;
    som.play();
  }