# Taller 1 — Pilas y Colas

Aplicación web (HTML/CSS/JS vanilla, sin frameworks) que resuelve los dos ejercicios propuestos en clase usando **estructuras de datos propias** (`Stack` y `Queue` implementadas sobre listas enlazadas), no arrays nativos de JavaScript ni `Array.push/shift`.

Abre `webpage/index.html` en el navegador para usarla — no requiere build ni servidor (aunque, por CORS de módulos ES, algunos navegadores prefieren servirlo desde un servidor local, ver [Cómo ejecutarlo](#cómo-ejecutarlo)).

## Estructura del proyecto

```
webpage/
├── index.html                          # Markup + las dos pestañas (una por ejercicio)
├── src/
│   ├── styles/styles.css               # Estilos (tema "terminal")
│   └── js/
│       ├── script.js                   # Lógica de interacción con el DOM (GUI)
│       └── core/
│           ├── dataStructures.js       # Stack y Queue (listas enlazadas)
│           └── excercisesSolutions.js  # Algoritmos de ambos ejercicios
```

- **`dataStructures.js`**: define `LinkedList` (con `_append`, `_prepend`, `_removeAndReturn`, `_getPosition`) y sobre ella, `Stack` (`push` / `pop` / `top`, LIFO) y `Queue` (`enqueue` / `dequeue`, FIFO). Todo el proyecto pasa por aquí — ningún ejercicio usa arrays para el TDA en sí.
- **`excercisesSolutions.js`**: la lógica pura de cada ejercicio (sin tocar el DOM), pensada para poder probarse de forma aislada.
- **`script.js`**: conecta esa lógica con los inputs/botones/tarjetas de la página.

## Ejercicio 1 — Equilibrador de símbolos

**Problema:** dado un texto, comprobar si sus símbolos de apertura/cierre (`()`, `[]`, `{}`) están correctamente balanceados y anidados.

**Algoritmo** (`checkBalance` en `excercisesSolutions.js`), recorriendo carácter a carácter:
- Si es un símbolo de **apertura** → se apila (`push`).
- Si es un símbolo de **cierre**:
  - Si la pila está vacía → error (cierre sin apertura previa).
  - Si no está vacía: se mira la cima (`top`) — si coincide con la apertura correspondiente, se desapila (`pop`); si no coincide → error (anidación incorrecta).
- Al terminar de recorrer el texto, si la pila **no** quedó vacía → error (quedaron aperturas sin cerrar).

La función devuelve un resumen paso a paso (`BalanceStep[]`, con `status` y `msg`), que la GUI usa para:
1. Mostrar un **veredicto final** (✅ equilibrada / ❌ no equilibrada) en un banner.
2. Listar cada paso del recorrido como tarjeta individual, para ver *por qué* dio ese resultado.

## Ejercicio 2 — Asignación de tareas

**Problema:** dadas `n` tareas (cada una con un tiempo de ejecución `tᵢ`) y varios procesadores, planificar el orden de ejecución que **minimiza el tiempo medio de finalización** (tiempo transcurrido desde el instante 0 hasta que termina cada tarea).

**Algoritmo** (`assignTasks` en `excercisesSolutions.js`):
1. **SPT (Shortest Processing Time first):** las tareas se ordenan de menor a mayor tiempo. Esto es lo que minimiza el tiempo medio de finalización — ejecutar primero las tareas cortas hace que, en promedio, cada tarea espere menos.
2. **Reparto round-robin:** con las tareas ya ordenadas, se van repartiendo una por una entre los procesadores (proc. 1, proc. 2, ..., proc. n, proc. 1, ...), acumulando en cada procesador su carga (`load`) y guardando el instante de finalización de cada tarea.
3. Se calcula el promedio de todos los tiempos de finalización.

Tanto la cola de tareas pendientes como la secuencia de cada procesador son `Queue`. El ordenamiento (`sortQueue`) es un *selection sort* implementado sobre `Queue` (sin convertir a array), recorriéndola con desencolados/encolados sucesivos.

**Funciones expuestas en la GUI** (`script.js`):

| Acción              | Función           | Qué hace                                                               |
|---------------------|--------------------|--------------------------------------------------------------------------|
| Dar de alta          | `addTask()`        | Crea una `Task` y la encola.                                          |
| Eliminar            | `removeTask(id)`   | Recorre la `Queue`, descarta la tarea con ese id y reencola el resto.  |
| Mostrar             | `renderTasks()`    | Lista las tareas actuales sin vaciar la cola (`queueForEach`).        |
| Procesar            | `processTasks()`   | Llama a `assignTasks` y pinta el resultado por procesador.            |
| Salir / Limpiar     | `clearTasks()`     | Reinicia la cola de tareas y el área de resultados.                   |

## Cómo ejecutarlo

Opción rápida: abrir `webpage/index.html` directamente con doble click en el navegador.

Si el navegador bloquea los `import` de módulos ES por política de origen (`file://`), sírvelo desde un servidor local, por ejemplo:

```bash
cd "talleres/taller 1 - pilas y colas/webpage"
npx serve .
```

o con Python:

```bash
cd "talleres/taller 1 - pilas y colas/webpage"
python -m http.server 8000
```

y abre `http://localhost:8000` (o el puerto que indique el comando).

## Autores

Samuel Antonio Sanchez y Daniel Alejandro Chavez.
