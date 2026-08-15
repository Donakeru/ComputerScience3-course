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
    append(data) {
        
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
    prepend(data) {

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
    removeAndReturn(position) {

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

class Stack {
    constructor(){}
}

class Queue {
    constructor(){}
}

// Main
(() => {

    let linkedList = new LinkedList();
    linkedList.append("Primero ingresado");
    linkedList.append("Segundo ingresado");
    linkedList.prepend("Tercer ingresado");
    linkedList.append("Cuarto ingresado");

    console.log(linkedList.toList())
    console.log(linkedList.removeAndReturn('end'))
    console.log("----")

    console.log(linkedList.toList())
    console.log(linkedList.removeAndReturn('begin'))
    console.log("----")

    console.log("resultado:")
    console.log(linkedList.toList())
    
})();

