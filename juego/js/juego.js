"use strict";

let tablero = [];
let memory = []; // arreglo para llevar los intentos

let acierto = document.querySelector('.acierto');
let error = document.querySelector('.error');
let aciertos = 0;
let errores = 0;
let ganadora = 0;
let partida = 1;
let resultado = document.querySelector('.resultado');
let resetButton = document.querySelector('.reset');;
let columns ='';

function contarMarcas() {
  let cont = 0;
  for (var i = 0; i < tablero.length; i++) {
    if (tablero[i] == 'o') {
      cont += 1;
    }
  }
  return cont;
}

function iniciarTablero(size) {

  let lastPos = Math.random();
  let lastIndex = size - 1;
  for (var i = 0; i < lastIndex; i++) {
    let pos = Math.random();
    if (pos < 0.5) {
      tablero[i] = 'o';
    }
    else {
      tablero[i] = 'x';
    }
  }
  if (lastPos < 0.2) {
    tablero[lastIndex] = 'x'; //marca error
  }
  else {
    tablero[lastIndex] = 'o'; //marca acierto
  }
  verificarTriunfo();
}

function verificarTriunfo() {
  ganadora = contarMarcas();
  if (ganadora == aciertos) {
    resultado.textContent = 'Felicitaciones, has ganado!!!'
    resultado.className = 'win';
    guardarPartida();
    partida++;
    setGameOver();
  }
}

function mostrarTablero() {
  for (var i = 0; i < tablero.length; i++) {
    console.log(`tablero[${i}]= `,tablero[i]);
  }
}

function show(){
  let columns = '';
  document.querySelector('tbody').innerHTML = '';
  for (var i = 0; i < tablero.length; i++) {
    columns += `<td class="casillero">
                <p id="box${i+1}" class="casilla">${tablero[i]}</p>
                </td>`;
  }
  document.querySelector('tbody').innerHTML = columns;
  document.querySelector('div').className = 'show';
  hideMarks();
}

function hideMarks() {
  setTimeout(function(){
    let casillas = document.getElementsByClassName('casilla');
    var list = document.querySelectorAll( '.casilla' );
    for (var item of list) {
      item.className = 'hide';
    }
  }, 1000);
}

function seleccionarCasillero() {
  let opcion = document.querySelector('select').value;
  let casilla = document.getElementById(`${opcion}`)
  casilla.className = 'show';

  if (!estaIncluido(opcion)) {
    memory.push(opcion);
    actualizarResultados(String(casilla.innerHTML));
    verificarTriunfo();
  }

}

function estaIncluido(opcion) {
  let encontre = false;
  for (var i = 0; i < memory.length ; i++) {
    if (memory[i] == opcion) {
        encontre = true;
    }
  }
  console.log('esta incluido encontre: ',encontre);
  return encontre;
}

function guardarPartida() {

  document.querySelector('.resultados').innerHTML = '';
  columns += `<tr>
                <td>
                  <p>${partida}</p>
                </td>
                <td>
                  <p>${aciertos}/${errores}</p>
                </td>
              </tr>`;
  document.querySelector('.resultados').innerHTML = columns;
}

function actualizarResultados(casilla) {
  let marca = 'o';
  if (casilla === marca) {
    aciertos += 1;
    acierto.textContent = `Aciertos: ${aciertos}`;
  } else {
    errores += 1;
    error.textContent = `Errores: ${errores}`;
  }
}

function setGameOver() {
  resetButton.className = 'show';
}

function resetGame() {
  resetButton.className = 'hide';
  resultado.className = 'inicial';
  acierto.textContent = `Aciertos:`;
  error.textContent = `Errorres:`;
  aciertos = 0;
  errores= 0;
  memory = [];
  iniciarTablero(5); //ingreso el tamaña como parametro
  mostrarTablero();
  show();
}


iniciarTablero(5); //ingreso el tamaña como parametro
mostrarTablero();
document.querySelector('button').onclick = show;
