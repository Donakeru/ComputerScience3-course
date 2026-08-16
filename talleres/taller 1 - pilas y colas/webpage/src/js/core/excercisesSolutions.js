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

class BalanceStep {
    constructor(status, msg) {
        this.status = status;
        this.msg = msg;
    }
}

const checkBalance = (cadenaCaracteres) => {
    
    let stack = new Stack();
    let summary = [];

    // Recorrer caracter por caracter
    for (const char of cadenaCaracteres){
        
        if (APERTURAS.includes(char)) {
            summary.push(new BalanceStep('success', `detectado elemento de apertura: ${char}`));
            stack.push(char);
            continue;
        }

        if (CIERRES.includes(char)) {
            // primera condicion
            if (stack.isEmpty()) {
                summary.push(new BalanceStep('error', `error: simbolo de cierre con stack vacío`));
                break;
            }

            // segunda condicion
            let topStack = stack.top()
            if (topStack == PARES_CIERRE[char]) {
                stack.pop()
                summary.push(new BalanceStep('success', `caracter de cierre detectado coincide con el último de apretura: ${char}`));
                continue;
            } else {
                summary.push(new BalanceStep('error', `No coincide el simbolo de cierre con el último de aperetura`));
                break;
            }
        }

    }

    if (!stack.isEmpty()) {
        summary.push(new BalanceStep('error', `no todos los simbolos de apertura han sido cerrados`));
    }
 
    return summary;

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

export { checkBalance };