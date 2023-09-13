let resultElement = document.querySelector('.result');
let mainContainer = document.querySelector('.main-container');
let rowId = 1;
const diccionario = [
    'texto', 'banco', 'Árbol', 'Casa', 'Perro', 'Gato', 'Lago', 'Río',
    'Sollo', 'Tren', 'Lucha', 'Vino', 'Huevo', 'Llave', 'Carro', 'Ducha',
    'Raton', 'Fruta', 'Reloj', 'Taza', 'Llana', 'Mente', 'Llora', 'Rayas',
    'Fuego', 'Lugar', 'Manga', 'Nubes', 'Oliva', 'Pared', 'Quema', 'Truco'
];

let word = diccionario[Math.floor(Math.random() * diccionario.length)];
let wordArray = word.toUpperCase().split('');
let actualRow = document.querySelector('.row');

drawSquares(actualRow);
listenInput(actualRow);
addFocus(actualRow);

// FUNCIONES
function listenInput(actualRow) {
    let squares = actualRow.querySelectorAll('.square');
    squares = [...squares];
    let userInput = [];

    squares.forEach(element => {
        element.addEventListener('input', event => {
            if (event.inputType !== 'deleteContentBackward') {
            // capturar letras
            userInput.push(event.target.value.toUpperCase());
                if (event.target.nextElementSibling) {
                    event.target.nextElementSibling.focus();
                } else {
            //borrado y cambiado de letras
                    let squaresFilled = document.querySelectorAll('.square')
                    squaresFilled = [...squaresFilled]
                    let lastFiveSquaresFilled = squaresFilled.slice(-5);
                    let finalUserInput = [];
                    lastFiveSquaresFilled.forEach(element => {
                        finalUserInput.push(element.value.toUpperCase())
                    })
            // si las letras correctas no están en la posición correcta
                    let existIndexArray = existLetter(wordArray, finalUserInput);
                    existIndexArray.forEach(element => {
                    squares[element].classList.add('gold');
                    });
            // comparar letras para cambiar colores
                    let rightIndex = compareArrays(wordArray, finalUserInput);
                    rightIndex.forEach(element => {
                    squares[element].classList.add('green');
                    });
            // si las letras son correctas
                    if (rightIndex.length === wordArray.length) {
                        showResult('FELICITACIONES GANASTE!!🎊');
                        return;
                    }
            // generar una nueva línea
                    let actualRow = createRow();
                    if (!actualRow) {
                        return;
                    }
                    drawSquares(actualRow);
                    listenInput(actualRow);
                    addFocus(actualRow);
                }
            } else {
            userInput.pop();
            }
        });
    });
}

function compareArrays(array1, array2) {
  let equalsIndex = [];
  array1.forEach((element, index) => {
    if (element === array2[index]) {
      equalsIndex.push(index);
    }
  });
  return equalsIndex;
}

function existLetter(array1, array2) {
  let existIndexArray = [];
  array2.forEach((element, index) => {
    if (array1.includes(element)) {
      existIndexArray.push(index);
    }
  });
  return existIndexArray;
}

function createRow() {
  rowId++;
  if (rowId <= 5) {
    let newRow = document.createElement('div');
    newRow.classList.add('row');
    newRow.setAttribute('id', rowId);
    mainContainer.appendChild(newRow);
    return newRow;
  } else {
    showResult(`Inténtalo de nuevo, la respuesta correcta era '${word.toUpperCase()}'`);
  }
}

function drawSquares(actualRow) {
  wordArray.forEach((item, index) => {
    if (index === 0) {
      actualRow.innerHTML += `<input type='text' maxlength='1' class='square focus'>`;
    } else {
      actualRow.innerHTML += `<input type='text' maxlength='1' class='square'>`;
    }
  });
}

function addFocus(actualRow) {
  let focusElement = actualRow.querySelector('.focus');
  focusElement.focus();
}

function showResult(textMsg) {
  resultElement.innerHTML = `
    <p>${textMsg}</p>
    <button class='button'>Reiniciar</button>`;
  let resetBtn = document.querySelector('.button');
  resetBtn.addEventListener('click', () => {
    location.reload();
  });
}