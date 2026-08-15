import { Stack, Queue } from "./dataStructures.js";

/**
 * Ejercicio 1 - Equilibrador de símbolos
 *
 * Se recorre la cadena carácter a carácter:
 *  - apertura  -> se apila
 *  - cierre    -> si la pila está vacía es error;
 *                 si no, se saca el tope y debe coincidir con el cierre
 * Si al terminar de recorrer la cadena la pila no quedó vacía, es error.
 *
 */
 
const APERTURAS = ['(', '[', '{'];
const CIERRES = [')', ']', '}'];
const PARES_CIERRE = {
    ')' : '(',
    ']' : '[',
    '}' : '{',
}

const validarEquilibrio = (cadenaCaracteres) => {
    
    let stack = new Stack();
    let summary = [];

    // Recorrer caracter por caracter
    for (const char of cadenaCaracteres){
        
        if (APERTURAS.includes(char)) {
            console.log(`elemento de apertura: ${char}`);
            stack.push(char);
            continue;
        }

        if (CIERRES.includes(char)) {
            // primera condicion
            if (stack.isEmpty()) {
                console.log(`error: simbolo de cierre con stack vacío`)
                break;
            }

            // segunda condicion
            let topStack = stack.top()
            if (topStack == PARES_CIERRE[char]) {
                stack.pop()
                console.log('caracter de cierre coincide con el de apretura');
            } else {
                console.log('error: No coincide el simbolo de cierre con el último de aperetura');
                break;
            }
        }

    }

    if (!stack.isEmpty()) {
        console.log("no todos los simbolos de apertura han sido cerrados")
    }

}

/**
 * Ejercicio 2 - Asignación de tareas
 *
 * n tareas con un tiempo de ejecución cada una, y varios procesadores.
 * Se busca el orden de ejecución que minimiza el tiempo MEDIO de finalización.
 *
 * Estrategia: ordenar las tareas de menor a mayor tiempo (así las tareas
 * cortas terminan antes y no "arrastran" a las demás) y repartirlas metiéndolas
 * en una Queue propia; cada tarea se asigna al procesador que en ese momento
 * lleve menos carga acumulada.
 */

export { validarEquilibrio };