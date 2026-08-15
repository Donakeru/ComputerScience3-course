class Node {

    constructor(data) {
        this.data = data;
        this.nextNode = null;
    }

}

class LinkedList {

    constructor() {
        this.head = null;
        this.size = 0;
    }

    // Añadir elemento al final de la lista
    _append(data) {
        
        let newNode = new Node(data);

        if (this.head == null) {
            this.head = newNode;
        } else {
            let current = this.head;
            while(current.nextNode !== null) {
                current = current.nextNode;
            }
            current.nextNode = newNode;
        }

        this.size++;

    }

    // Añaidr elemento al inicio de la lista
    _prepend(data) {

        let newNode = new Node(data);

        newNode.nextNode = this.head;
        this.head = newNode;

        this.size++;

    }


    /**
     * Ubicar, remover y retornar un elemento de la lista
     * una vez definido la posicion del elemento a retitrar
     * 
     * valores esperados:
     *  - begin
     *  - end
     */
    _removeAndReturn(position) {

        if (this.head == null) {
            console.error("No se puede remover un elemento de una lista vacía");
            return null;
        }

        let value = null;
        // Caso especifico: lista de un solo elemento
        if (this.head.nextNode == null) {
            value = this.head.data;
            this.head = null;
        } else if (position == 'end') {
            let current = this.head;
            while (current.nextNode && current.nextNode.nextNode) {
                current = current.nextNode;
            }
            value = current.nextNode.data;
            current.nextNode = null;
        } else if (position == 'begin') {
            value = this.head.data;
            this.head = this.head.nextNode;
        } else {
            console.log("Posición invalida");
            return null;
        }

        this.size--;
        return value;
    }

    isEmpty() {
        return (this.head == null)? true : false;
    }

    length() {
        return this.size;
    }

    toList() {
        
        let result = [];
        let current = this.head;

        while(current !== null) {
            result.push(current.data);
            current = current.nextNode;
        }

        return result;
    }

}

class Stack extends LinkedList {

    push(data) {
        this._prepend(data);
    }

    pop() {
        return this._removeAndReturn('begin');
    }

}

class Queue extends LinkedList {

    enqueue(data) {
        this._append(data);
    }

    dequeue() {
        return this._removeAndReturn('begin')
    }

}

// Main
(() => {

    const stack = new Stack();
    stack.push(1);
    stack.push(2);
    stack.push(3);
    console.log('Stack:', stack.toList()); // [3, 2, 1]
    console.log('pop ->', stack.pop());     // 3 (LIFO)
    console.log('Stack tras pop:', stack.toList()); // [2, 1]

    const queue = new Queue();
    queue.enqueue('a');
    queue.enqueue('b');
    queue.enqueue('c');
    console.log('Queue:', queue.toList()); // ['a', 'b', 'c']
    console.log('dequeue ->', queue.dequeue()); // 'a' (FIFO)
    console.log('Queue tras dequeue:', queue.toList()); // ['b', 'c']

})();

