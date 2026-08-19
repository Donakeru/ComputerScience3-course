---
aliases:
---
### 1. Pilas y Colas: Uso en el disco duro

Existen dos tipos de datos principalmente:
- Primitivos 
- **Abstractos:**
	- **Estructuras:**
		- Estáticas
		- **Dinámicas:**
			- Pilas
			- Colas

Las pilas y colas se basan en el concepto de listas enlazadas pero con una diferencia en las políticas de cómo se inserta o eliminan elementos con el fin de usar el espacio y recursos que se requieren

#### Generalidades de las Pilas

Una pila es una lista ordenada de elementos en la que todas las inserciones y supresiones se realizan por un mismo extremo denominado tope o cima de la pila

se basa en una estructura LIFO (**L**ast **I**n **F**irst **O**ut) "Último en entrar, Primero en salir"

Las **operaciones básicas** de las pilas son:

- PUSH: apilar, meter
- POP: desapilar, sacar
- TOP: cima

**Operaciones:**

- crear_pila(P: Pila, ok: lógico)
- borrar_pila(P: Pila, ok: lógico)
- vacía?(P: Pila, resp: lógico)
- llena?(P: Pila, resp: lógico)
- push(P: Pila, X: elemento resp: lógico)
- pop(P: Pila, X: elemento resp: lógico)
- top(P: Pila, X: elemento resp: lógico)

**Implementación**

- Vectores:
	- Variables estáticas
	- Tamaño máximo fijo
		- Peligro de desbordamiento
		- Uso ineficiente de la memoria
- Listas enlazadas:
	- Variables dinámicas
	- No riesgo de overflow
	- Limitadas por memoria disponible
	- Cada elemento necesita más memoria (guardar dirección siguiente)
	- Uso eficiente de memoria

*subdesbordamiento: Valor tan pequeño o cercano a 0 que los computadores lo interpretan como vacío o nulo*

**Aplicaciones de las pilas**

- Gran uso de compiladores y SO's
- Entornos donde haya que recuperar el último valor que se almacenó
- Algunas aplicaciones
	- Equilibrado de símbolos
	- Llamadas a subprogramas
	- Eliminadas
#### Ejercicio -  Equilibrador de Símbolos

Se van leyendo los caracteres. Cuando se encuentra un elemento clave (paréntesis, corchete) se trata según su tipo:
- Si es de apertura: se mete en la pila
- Si es de cierre
	- Si la si la pila está vacía -> error
	- Su la pila no está vacía:
		- Si la cima es el correspondiente símbolo de apertura se extrae
		- Si no lo es -> error
Si al final la pila no está vacía  -> error

#### Generalidades de las Colas

una cola es una lista ordenada de elementos en la que todas las inserciones se realizan por un extremo (frente o principio) y las supresiones se realizan por el otro (final)

Se basa en una estructura FIFO (**F**irst **I**n **F**irst **O**ut): "Primero en entrar primero en salir"

**Operaciones básicas:**

- QUEUE: encolar, meter
- DEQUEUE: desencolar, sacar

**operaciones**

- crear_cola(C: cola, ok: lógico)
- borrar_cola(C: cola, ok: lógico)
- vacía?(C: cola, resp: lógico)
- llena?(C: cola, resp: lógico)
- queue(C: cola, X: elemento, resp: lógico)
- dequeue(C: cola, X: elemento, resp: lógico)
- tamaño(C: cola, N: numérico)

**Aplicaciones de las colas**

Principalmente: gestión de recursos:

- **Sistemas de tiempo compartido:** los recursos se asignan a los procesos que están en cola de espera en el orden en el que fueron introducidos
- **Colas de impresión:** al intentar imprimir varios documentos a la vez o la impresora está ocupada, los trabajos se almacenan en una cola según el orden de llegada
- **Simulación por computadora de situaciones reales:** una cola de clientes en un supermercado o el tiempo de espera para ser atendidos por un operador de una linea telefónica
#### Ejercicio - Asignación de Tareas

Tenemos un conjunto n de tareas, cada una de las cuales tarda un tiempo predefinido ti, y n procesadores donde se ejecutan las tareas. El objetivo es dar una planificación de las tareas (un orden de ejecución de las mismas) de manera que se minimice el tiempo medio de finalización. El tiempo de finalización de una tarea es el tiempo que transcurre entre el instante inicial (instante 0) y el momento en el que concluye una tarea.

Realiza funciones de dar de alta a las tareas, eliminar, mostrar, salir y procesos para realizar todas las tareas.

