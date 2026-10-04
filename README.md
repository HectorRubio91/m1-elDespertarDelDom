# Buscaminas

Misión M1 * El Despertar del DOM - Web Development I

## Cómo probarlo

Abre index.html en el navegador (o con Live Server el en VSCode). Cuando abres la página web ya puedes empezar a jugar. 
Actualmente están las dificultades principiante, intermedio y experto, cuanta mayor la dificultad mas grande y con mas minas el tablero, si cambias de dificultad se reinicia la partida. 
También hay un botón de reinicio por si quieres reiniciar pero no cambiar de dificultad. Funciona como un buscaminas normal, cuando revelas todas las celdas seguras ganas y si tocas una mina explotas y pierdes. 
Con click izq del ratón revelas una celda y con click der la marcas o desmarcas. Tiene un cronometro para ver cuanto tardas pero no define nada de la partida.
La tecla secreta para activar el tema claro es la T.
Se puede escanear una zona 3x3 dandole a la E aunque solo tiene 3 usos.

## Uso de IA

No he usado nada de IA para el html ni el css. He usado ChatGPT y Claude para el JavaScript, comparando las opciones de código que me daban entre los dos y que opinaban sobre el código que me había dado el otro.
Solo he usado prompts tipicos en las primeras conversaciones cuando les pedia codigo para ver como lo harian ellos, pero al preguntar detalles o opinion sobre el codigo del otro lo he hecho como conversacion normal.

Ejemplo de prompt real: 
Quiero que me ayudes a desarrollar la parte de JavaScript de una página web interactiva de Buscaminas para una práctica de desarrollo web.

1. Contexto de la práctica
La práctica tiene el siguiente lema:

«Sin frameworks. Sin librerías. Tú contra el navegador.»

El objetivo es construir una página interactiva utilizando HTML, CSS y JavaScript puro, manipulando el DOM directamente y sin utilizar frameworks ni librerías externas.
La rúbrica de evaluación es:

Manipulación del DOM — 20 puntos: Selección, creación y modificación de nodos del DOM de forma correcta y eficiente.
Eventos — 15 puntos: Manejo de eventos bien estructurado, sin handlers inline en el HTML.
Fundamentos de JavaScript — 15 puntos: Uso correcto de tipos, ámbitos, funciones y template literals.
Calidad y organización — 10 puntos: Código legible, nombres claros y sin duplicación evidente.
Originalidad — 10 puntos: La idea y la ejecución deben ir más allá del mínimo.
Checks automáticos — 30 puntos: README, declaración de IA, repositorio limpio, commits, tecnología y estructura.

2. Estado actual del proyecto
IMPORTANTE: HTML y CSS YA ESTÁN HECHOS.
No quiero que vuelvas a diseñar ni modificar el HTML o el CSS salvo que sea absolutamente imprescindible.
Actualmente tengo estos archivos:

webi-m1/
│
├── index.html
├── styles.css
├── app.js
├── README.md

El archivo index.html y el archivo styles.css que te proporcionaré ya contienen la estructura visual y el diseño de la página.
Tu trabajo ahora es desarrollar app.js para convertir esa interfaz en un Buscaminas funcional.
Debes trabajar a partir del HTML y CSS existentes, no inventar una estructura diferente.

3. Restricciones tecnológicas
Debes respetar estrictamente estas condiciones:

HTML5 existente.
CSS3 existente.
JavaScript puro.
Sin frameworks.
Sin librerías.
Sin React.
Sin Vue.
Sin Angular.
Sin jQuery.
Sin Bootstrap.
Sin Tailwind CSS.
Sin bibliotecas externas de JavaScript.
Sin dependencias externas.
Sin handlers inline como onclick="".
Los eventos deben registrarse desde JavaScript mediante addEventListener.
Manipulación directa del DOM mediante APIs nativas.
Separación entre HTML, CSS y JavaScript.
El código debe funcionar en un navegador moderno basado en Chromium.
No utilizar soluciones innecesariamente complejas.

Quiero que el JavaScript sea apropiado para el nivel de una práctica universitaria de desarrollo web.
No quiero una arquitectura empresarial ni patrones innecesarios.

4. HTML y CSS existentes
El HTML actual es este:

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>BUSCAMINAS</title>

    <link rel="stylesheet" href="styles.css">
</head>
<body>

    <main class="contenedor-juego">

        <h1>MINESWEEP</h1>

        <p>Encuentra todas las casillas seguras y evita las minas.</p>

        <section class="ajustes-juego">

            <label for="seleccion-dificultad">
                Dificultad:
            </label>

            <select id="seleccion-dificultad">
                <option value="principiante">Principiante</option>
                <option value="intermedio">Intermedio</option>
                <option value="experto">Experto</option>
            </select>

            <button id="boton-reiniciar">
                Reiniciar
            </button>

        </section>

        <section class="informacion-partida">

            <p>
                Minas:
                <span id="contador-minas">010</span>
            </p>

            <p>
                Tiempo:
                <span id="cronometro">000</span>
            </p>

            <p>
                Escáneres:
                <span id="contador-escaneos">3</span>
            </p>

        </section>

        <p id="estado-partida">
            LISTO
        </p>

        <section id="tablero" class="seccion-tablero"></section>

        <section id="mensaje-partida" hidden>

            <h2 id="titulo-resultado"></h2>

            <p id="descripcion-resultado"></p>

            <button id="boton-final">
                Jugar otra vez
            </button>

        </section>

        <section class="controles">

            <h2>Controles</h2>

            <p>
                Haz clic izquierdo para descubrir una casilla.
            </p>

            <p>
                Haz clic derecho para colocar una bandera.
            </p>

            <p>
                Pulsa <strong>E</strong> para utilizar un escáner.
            </p>

            <p>
                El escáner marca las minas de la zona 3x3 alrededor del cursor.
            </p>

        </section>

    </main>

    <script src="app.js"></script>

</body>
</html>

El CSS existente ya controla el diseño, el tablero, las casillas y sus diferentes estados.
No quiero que modifiques estos archivos.

5. Objetivo actual
Quiero implementar ahora el funcionamiento básico del Buscaminas mediante JavaScript.
El JavaScript debe:

Generación del tablero.
Diferentes niveles de dificultad.
Generación y distribución de minas.
Números que indiquen las minas cercanas.
Descubrimiento de casillas.
Banderas.
Contador de minas.
Temporizador.
Estado de la partida.
Victoria.
Derrota.
Reinicio de la partida.
Cambio de dificultad.
Mensajes finales de victoria y derrota. 

6. Dificultades
Quiero mantener estas tres dificultades:

Principiante
9 × 9
10 minas
Intermedio
16 × 16
40 minas
Experto
16 × 30
99 minas
El tablero debe generarse dinámicamente según la dificultad seleccionada.
No quiero crear las casillas manualmente en HTML.

7. Estados de las casillas
Cada casilla debe poder tener estados equivalentes a:

Oculta.
Revelada.
Marcada con bandera.
Mina.
Mina revelada al perder.
Número del 1 al 8.
El CSS ya tiene clases preparadas para estos estados:

.celda
.celda-revelada
.celda-seleccionada
.celda-mina
.celda-numero-1
.celda-numero-2
.celda-numero-3
.celda-numero-4
.celda-numero-5
No inventes otro sistema de clases.

8. Estructura de datos
Quiero que el estado del tablero se mantenga en JavaScript mediante una estructura sencilla, por ejemplo un array bidimensional.
Cada casilla puede almacenar información como:
{
    mina: false,
    numero: 0,
    revelada: false,
    marcada: false
}
Puedes modificar ligeramente esta estructura si existe una razón clara para hacerlo, pero evita estructuras innecesariamente complejas.

9. Sistema de escáner

MUY IMPORTANTE: TODAVÍA NO QUIERO IMPLEMENTAR EL ESCÁNER.
El HTML y CSS ya tienen preparado visualmente el espacio para una futura mecánica de escáner:

Escáneres: 3
y: Pulsa E para utilizar un escáner.
El escáner marca las minas de la zona 3x3 alrededor del cursor.

Pero esa funcionalidad todavía NO debe existir en JavaScript. El objetivo es que el HTML/CSS estén preparados, pero que la mecánica todavía no exista.

10. Manipulación del DOM y rúbrica
Quiero que el JavaScript permita demostrar claramente los conocimientos exigidos en la rúbrica.
Debe utilizar de forma natural:

Selección del DOM
document.querySelector(...)
Creación de elementos
document.createElement(...)
Modificación del contenido
element.textContent = ...
Clases
element.classList.add(...)
element.classList.remove(...)

o métodos equivalentes cuando sean necesarios.

Eventos
element.addEventListener(...)
Variables:
Utiliza correctamente const y let y evita var.
Funciones: Divide la lógica en funciones pequeñas y con nombres claros.

11. Calidad del código
Quiero que el código:

Sea fácil de leer.
Tenga nombres de variables y funciones descriptivos.
Esté dividido en funciones lógicas.
No tenga funciones gigantes.
No tenga duplicación evidente.
No utilice abstracciones innecesarias.
No utilice clases de JavaScript si no son necesarias.
No utilice módulos si no aportan una ventaja clara.
No utilice librerías.
No utilice código innecesariamente avanzado.
Tenga comentarios solamente donde aporten valor.

Quiero poder entender y explicar el código en una defensa de la práctica.

12. Forma de trabajar
Quiero que actúes como un desarrollador que me ayuda a construir el proyecto paso a paso.
En esta fase:

Analiza brevemente qué elementos del HTML necesita controlar JavaScript.
Explica brevemente la estructura que vas a utilizar para representar el tablero.
Proporciona el archivo completo app.js.
No vuelvas a escribir el HTML.
No vuelvas a escribir el CSS.
No implementes todavía el escáner.
No implementes todavía el modo de minas nuevas por tiempo.
No añadas funcionalidades que no haya solicitado.
Explica después las partes importantes del JavaScript y cómo cumplen la rúbrica.

Si detectas algún problema en el HTML o CSS que impida que el JavaScript funcione, indícalo antes de modificar nada. No cambies silenciosamente la estructura existente.

13. Importante: no reinventar el proyecto
Quiero que trabajes sobre la página que ya tengo, no que generes otro Buscaminas diferente.
La apariencia actual, los identificadores del HTML y las clases del CSS deben considerarse parte del proyecto.
Por tanto:

No cambies los IDs.
No cambies las clases existentes.
No cambies el diseño.
No cambies la estructura HTML.
No sustituyas el proyecto por otra implementación.
No añadas frameworks.
No añadas librerías.
No añadas funcionalidades que todavía no corresponden a esta fase.

El objetivo es hacer que el HTML y CSS que ya tengo cobren vida mediante JavaScript puro.
Empieza analizando brevemente el HTML existente y después proporciona el app.js completo.
=============================
Este prompt se lo mandé tanto a ChatGPT como a Claude y con los códigos que me dieron fui entendiendo y escogiendo que quería en mi proyecto. Yo fui escribiendo a mano seleccionado lo que quería y lo que no, 
además de ir aprendiendo y entendiendo lo que hacia.

Ya he añadido el tema claro y el poder escanear con la E a la página web actual

## Autopsia

1. Una de las decisiones más discutibles de mi código es la forma de colocar las minas en el tablero antes de comenzar la partida. Mis dos opciones finales eran: colocar las minas de forma aleatoria sobre el tablero,
comprobando que una misma posición no pueda contener 2 minas; o generar previamente todas las posiciones posibles del tablero, seleccionar aleatoriamente las posiciones que van a contener minas y después colocarlas. 
Finalmente termine eligiendo la primera opción porque me parecía una solución más sencilla y adecuada teniendo en cuenta el tamaño del tablero del buscaminas. La segunda opción permitía controlar las posiciones de forma
más estructurada pero para el tamaño del tablero no necesitaba algo tan complejo.

2. La otra decisión más discutible de mi código es la forma de revelar zonas vacías. Esta mecánica se basa en que cuando el jugador pulsa una celda y no hay una mina cerca de donde se ha pulsado, se revelan todas las celdas
adyacentes a la seleccionada que no tengan una mina cerca. En este caso primero pensé en tener una lista de casillas que todavia deben comprobarse e ir procesando una a una hasta terminar la expansión; pero ChatGPT me
recomendó utilizar una función recursiva que revisase las 8 celdas que rodean la vacia seleccionada, si encuentran otra celda vacia entonces llaman recursivamente a la funcion hasta que encuentra una celda con mina adyacente.
Escogi la segunda opcion, la de ChatGPT, porque considero que representa de forma más natural el comportamiento que sigue un Buscaminas, al descubrir una celda vacia esta se extiende a las zonas conectadas con ella; la primera
opción también es válida y es más apropiada en situaciones con estructuras mucho más grandes, pero para un juego tan simple como el Buscaminas me pareció innecesario añadir una gestión adicional a las celdas. 
