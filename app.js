const elementoTablero = document.querySelector("#tablero");
const seleccionDificultad = document.querySelector("#seleccion-dificultad");
const botonReinicio = document.querySelector("#boton-reiniciar");

const contadorMinas = document.querySelector("#contador-minas");
const cronometro = document.querySelector("#cronometro");
const contadorEscaneos = document.querySelector("#contador-escaneos");
const estadoPartida = document.querySelector("#estado-partida");

const mensajePartida = document.querySelector("#mensaje-partida");
const tituloResultado = document.querySelector("#titulo-resultado");
const descripcionResultado = document.querySelector("#descripcion-resultado");
const botonFinal = document.querySelector("#boton-final");

let tablero = [];
let elementosCeldas = [];

let filas;
let columnas;
let conteoMinas;

let celdasReveladas = 0;
let celdasMarcadas = 0;

let partidaEmpezada = false;
let partidaTerminada = false;

let tiempo = 0;
let intervaloCronometro = null;

let escaneosRestantes = 3;

let filaCursor = null;
let columnaCursor = null;

// Dificultades

const dificultades = {
    principiante: {
        filas: 9,
        columnas: 9,
        minas: 10
    },

    intermedio: {
        filas: 16,
        columnas: 16,
        minas: 40
    },

    experto: {
        filas: 16,
        columnas: 30,
        minas: 99
    }
};

// Iniciar partida

function iniciarPartida() {
    detenerCronometro();

    const dificultad = dificultades[seleccionDificultad.value];

    filas = dificultad.filas;
    columnas = dificultad.columnas;
    conteoMinas = dificultad.minas;

    celdasReveladas = 0;
    celdasMarcadas = 0;

    partidaEmpezada = false;
    partidaTerminada = false;

    tiempo = 0;
    escaneosRestantes = 3;

    filaCursor = null;
    columnaCursor = null;

    cronometro.textContent = "000";
    contadorEscaneos.textContent = "3";
    contadorMinas.textContent = String(conteoMinas).padStart(3, "0");
    estadoPartida.textContent = "LISTO";

    mensajePartida.hidden = true;

    crearTablero();
    colocarMinas();
    calcularNumeros();
    crearElementosTablero();
}

// Crear tablero

function crearTablero() {
    tablero = [];

    for (let fila = 0; fila < filas; fila++) {
        tablero[fila] = [];

        for (let columna = 0; columna < columnas; columna++) {
            tablero[fila][columna] = {
                mina: false,
                numero: 0,
                revelada: false,
                marcada: false
            };
        }
    }
}

// Obtener casillas vecinas

function obtenerVecinos(fila, columna) {
    const vecinos = [];

    for (let desplazamientoFila = -1; desplazamientoFila <= 1; desplazamientoFila++) {
        for (let desplazamientoColumna = -1; desplazamientoColumna <= 1; desplazamientoColumna++) {

            if (
                desplazamientoFila === 0 &&
                desplazamientoColumna === 0
            ) {
                continue;
            }

            const nuevaFila = fila + desplazamientoFila;
            const nuevaColumna = columna + desplazamientoColumna;

            if (
                nuevaFila >= 0 &&
                nuevaFila < filas &&
                nuevaColumna >= 0 &&
                nuevaColumna < columnas
            ) {
                vecinos.push({
                    fila: nuevaFila,
                    columna: nuevaColumna
                });
            }
        }
    }

    return vecinos;
}

// Colocar minas

function colocarMinas() {
    let minasColocadas = 0;

    while (minasColocadas < conteoMinas) {
        const fila = Math.floor(Math.random() * filas);
        const columna = Math.floor(Math.random() * columnas);

        if (!tablero[fila][columna].mina) {
            tablero[fila][columna].mina = true;
            minasColocadas++;
        }
    }
}

// Calcular números

function calcularNumeros() {
    for (let fila = 0; fila < filas; fila++) {
        for (let columna = 0; columna < columnas; columna++) {

            if (!tablero[fila][columna].mina) {
                tablero[fila][columna].numero =
                    contarMinasAdyacentes(fila, columna);
            }
        }
    }
}

function contarMinasAdyacentes(fila, columna) {
    let conteo = 0;

    const vecinos = obtenerVecinos(fila, columna);

    for (const vecino of vecinos) {
        if (tablero[vecino.fila][vecino.columna].mina) {
            conteo++;
        }
    }

    return conteo;
}

// Crear elementos del tablero

function crearElementosTablero() {
    elementoTablero.replaceChildren();

    elementosCeldas = [];

    elementoTablero.style.gridTemplateColumns =
        `repeat(${columnas}, 1fr)`;

    for (let fila = 0; fila < filas; fila++) {
        elementosCeldas[fila] = [];

        for (let columna = 0; columna < columnas; columna++) {

            const celda = document.createElement("button");

            celda.classList.add("celda");

            celda.dataset.fila = fila;
            celda.dataset.columna = columna;

            celda.addEventListener("click", hacerClickCelda);
            celda.addEventListener("contextmenu", hacerClickDerechoCelda);

            celda.addEventListener("mouseenter", () => {
                filaCursor = fila;
                columnaCursor = columna;
            });

            elementosCeldas[fila][columna] = celda;

            elementoTablero.appendChild(celda);

            actualizarCelda(celda, fila, columna);
        }
    }
}

// Actualizar una casilla

function actualizarCelda(celda, fila, columna) {
    const celdaActual = tablero[fila][columna];

    celda.className = "celda";
    celda.textContent = "";

    if (celdaActual.marcada) {
        celda.classList.add("celda-seleccionada");
        celda.textContent = "⚑";
        return;
    }

    if (!celdaActual.revelada) {
        return;
    }

    celda.classList.add("celda-revelada");

    if (celdaActual.mina) {
        celda.classList.add("celda-mina");
        celda.textContent = "✹";
        return;
    }

    if (celdaActual.numero > 0) {
        celda.classList.add(`celda-numero-${celdaActual.numero}`);
        celda.textContent = celdaActual.numero;
    }
}

// Comenzar partida si es necesario

function comenzarPartidaSiEsNecesario() {
    if (!partidaEmpezada) {
        partidaEmpezada = true;
        estadoPartida.textContent = "EN CURSO";
        empezarCronometro();
    }
}

// Click izquierdo

function hacerClickCelda(evento) {
    if (partidaTerminada) {
        return;
    }

    const fila = Number(evento.currentTarget.dataset.fila);
    const columna = Number(evento.currentTarget.dataset.columna);

    const celdaActual = tablero[fila][columna];

    if (celdaActual.revelada || celdaActual.marcada) {
        return;
    }

    comenzarPartidaSiEsNecesario();

    if (celdaActual.mina) {
        perderPartida();
        return;
    }

    revelarCelda(fila, columna);

    actualizarContadorMinas();

    comprobarVictoria();
}

// Revelar casillas

function revelarCelda(fila, columna) {
    const celdaActual = tablero[fila][columna];

    if (
        celdaActual.revelada ||
        celdaActual.marcada ||
        celdaActual.mina
    ) {
        return;
    }

    celdaActual.revelada = true;
    celdasReveladas++;

    actualizarCelda(elementosCeldas[fila][columna], fila, columna);

    if (celdaActual.numero === 0) {
        const vecinos = obtenerVecinos(fila, columna);

        for (const vecino of vecinos) {
            revelarCelda(vecino.fila, vecino.columna);
        }
    }
}

// Click derecho

function hacerClickDerechoCelda(evento) {
    evento.preventDefault();

    if (partidaTerminada) {
        return;
    }

    const fila = Number(evento.currentTarget.dataset.fila);
    const columna = Number(evento.currentTarget.dataset.columna);

    const celdaActual = tablero[fila][columna];

    if (celdaActual.revelada) {
        return;
    }

    celdaActual.marcada = !celdaActual.marcada;

    if (celdaActual.marcada) {
        celdasMarcadas++;
    } else {
        celdasMarcadas--;
    }

    actualizarCelda(elementosCeldas[fila][columna], fila, columna);

    actualizarContadorMinas();

    comprobarVictoria();
}

// Escáner

function escanear() {
    if (partidaTerminada) {
        return;
    }

    if (escaneosRestantes <= 0) {
        return;
    }

    if (filaCursor === null || columnaCursor === null) {
        return;
    }

    comenzarPartidaSiEsNecesario();

    const filaCentro = filaCursor;
    const columnaCentro = columnaCursor;

    const celdasEscaneadas = obtenerVecinos(filaCentro, columnaCentro);

    celdasEscaneadas.push({
        fila: filaCentro,
        columna: columnaCentro
    });

    for (const celdaEscaneada of celdasEscaneadas) {
        const fila = celdaEscaneada.fila;
        const columna = celdaEscaneada.columna;

        const celda = tablero[fila][columna];

        if (celda.mina && !celda.marcada) {
            celda.marcada = true;
            celdasMarcadas++;

            actualizarCelda(
                elementosCeldas[fila][columna],
                fila,
                columna
            );
        }
    }

    escaneosRestantes--;

    contadorEscaneos.textContent = escaneosRestantes;

    actualizarContadorMinas();

    comprobarVictoria();
}

// Contador de minas

function actualizarContadorMinas() {
    const minasRestantes = conteoMinas - celdasMarcadas;

    contadorMinas.textContent =
        String(Math.max(0, minasRestantes)).padStart(3, "0");
}

// Victoria

function comprobarVictoria() {
    const celdasSeguras = filas * columnas - conteoMinas;

    if (celdasReveladas === celdasSeguras) {
        ganarPartida();
    }
}

function ganarPartida() {
    partidaTerminada = true;

    detenerCronometro();

    estadoPartida.textContent = "VICTORIA";

    tituloResultado.textContent = "¡Has ganado!";
    descripcionResultado.textContent =
        "Has encontrado todas las casillas seguras.";
    botonFinal.textContent = "Jugar otra vez";

    mensajePartida.hidden = false;
}

// Derrota

function perderPartida() {
    partidaTerminada = true;

    detenerCronometro();

    estadoPartida.textContent = "DERROTA";

    for (let fila = 0; fila < filas; fila++) {
        for (let columna = 0; columna < columnas; columna++) {

            if (tablero[fila][columna].mina) {
                tablero[fila][columna].revelada = true;

                actualizarCelda(
                    elementosCeldas[fila][columna],
                    fila,
                    columna
                );
            }
        }
    }

    tituloResultado.textContent = "¡Has perdido!";
    descripcionResultado.textContent =
        "Has activado una mina.";
    botonFinal.textContent = "Intentar de nuevo";

    mensajePartida.hidden = false;
}

// Temporizador

function empezarCronometro() {
    intervaloCronometro = setInterval(() => {
        tiempo++;

        cronometro.textContent =
            String(tiempo).padStart(3, "0");
    }, 1000);
}


function detenerCronometro() {
    clearInterval(intervaloCronometro);
    intervaloCronometro = null;
}

// Eventos

botonReinicio.addEventListener("click", iniciarPartida);

botonFinal.addEventListener("click", iniciarPartida);

seleccionDificultad.addEventListener("change", iniciarPartida);

document.addEventListener("keydown", (evento) => {
    if (evento.repeat) {
        return;
    }

    const tecla = evento.key.toLowerCase();

    if (tecla === "e") {
        escanear();
    }

    if (tecla === "t") {
        document.body.classList.toggle("tema-claro");
    }
});

// Comenzar al cargar la página

iniciarPartida();