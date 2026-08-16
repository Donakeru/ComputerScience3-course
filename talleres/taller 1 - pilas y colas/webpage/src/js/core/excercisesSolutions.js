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
 */

class Task {
    constructor(id, name, time) {
        this.id = id;
        this.name = name;
        this.time = time;
    }
}

class Processor {
    constructor(id) {
        this.id = id;
        this.load = 0;
        this.sequence = new Queue();
    }
}

// Recorre una Queue sin vaciarla: saca cada elemento, ejecuta fn(item) y lo
// vuelve a encolar en el mismo orden.
const queueForEach = (queue, fn) => {

    const temp = new Queue();

    while (!queue.isEmpty()) {
        const item = queue.dequeue();
        fn(item);
        temp.enqueue(item);
    }

    while (!temp.isEmpty()) {
        queue.enqueue(temp.dequeue());
    }
}

// Copia el contenido de una Queue en una Queue nueva, sin alterar la original
const cloneQueue = (queue) => {
    const clone = new Queue();
    queueForEach(queue, item => clone.enqueue(item));
    return clone;
}

// Selection sort sobre una Queue: en cada vuelta busca el mínimo según keyFn
// sacando y reencolando elementos, y lo va llevando a una Queue "sorted"
const sortQueue = (queue, keyFn) => {

    let pending = queue;
    const sorted = new Queue();

    while (!pending.isEmpty()) {

        const temp = new Queue();
        let min = pending.dequeue();

        while (!pending.isEmpty()) {
            const current = pending.dequeue();
            if (keyFn(current) < keyFn(min)) {
                temp.enqueue(min);
                min = current;
            } else {
                temp.enqueue(current);
            }
        }

        sorted.enqueue(min);
        pending = temp;
    }

    return sorted;
}

// Reparte una Queue de tareas entre n procesadores: SPT (sortQueue por tiempo)
// + round-robin (rotando una Queue de procesadores)
const assignTasks = (tasksQueue, numProcessors) => {

    const sortedTasks = sortQueue(cloneQueue(tasksQueue), t => t.time);

    let processorsQueue = new Queue();
    for (let i = 1; i <= numProcessors; i++) {
        processorsQueue.enqueue(new Processor(i));
    }

    while (!sortedTasks.isEmpty()) {
        const task = sortedTasks.dequeue();
        const proc = processorsQueue.dequeue();

        proc.load += task.time;
        proc.sequence.enqueue({ ...task, finish: proc.load });

        processorsQueue.enqueue(proc);
    }

    // Reordenar los procesadores por id para mostrarlos siempre 1..n
    const orderedProcessors = sortQueue(processorsQueue, p => p.id);

    let totalFinish = 0;
    let totalTasks = 0;

    queueForEach(orderedProcessors, proc => {
        queueForEach(proc.sequence, t => {
            totalFinish += t.finish;
            totalTasks++;
        });
    });

    const avgCompletion = totalTasks ? totalFinish / totalTasks : 0;

    return { processors: orderedProcessors, avgCompletion };

}

export { checkBalance, Task, assignTasks, queueForEach };