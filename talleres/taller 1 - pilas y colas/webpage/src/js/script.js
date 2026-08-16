import { checkBalance, Task, assignTasks, queueForEach } from "./core/excercisesSolutions.js";
import { Queue } from "./core/dataStructures.js";


// ejercicio 1 interacción GUI
const input = document.getElementById('entryInput');
const chkbtn = document.getElementById('chkbtn');
const cardList = document.getElementById('cardList');
const emptyState = document.getElementById('emptyState');

// añadir el listener al boton de comprobar y al de input
chkbtn.addEventListener('click', () => checkBalanceInput(input.value));
input.addEventListener('keydown', e => {
    if (e.key === 'Enter') checkBalanceInput(input.value);
});

function checkBalanceInput(text) {

    if (!text.trim()) return;

    emptyState.style.display = 'none';
    // Esto es para limpiar en cada ejecución y no se acumulen
    cardList.innerHTML = '';

    let summaryCheckBalance = checkBalance(text);
    
    // .entties() devuelve justamente el indice y el dato
    console.log(summaryCheckBalance);

    for (const [index, step] of summaryCheckBalance.entries()) {

        const card = document.createElement('div');
        card.className = `card ${step.status}`;
        card.innerHTML = `
            <div class="card-text">
                <span class="label">
                <span class="status-dot"></span>
                <span class="status-text">${step.status === 'success' ? 'éxito' : 'error'}</span>
                · procedimiento #${String(index).padStart(2, '0')}
                </span>
                ${step.msg.trim()}
            </div>
        `;

        cardList.appendChild(card);
    }
    input.focus();
}

// ejercicio 2 interacción GUI
const taskNameInput = document.getElementById('taskNameInput');
const taskTimeInput = document.getElementById('taskTimeInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const taskEmptyState = document.getElementById('taskEmptyState');
const numProcessorsInput = document.getElementById('numProcessorsInput');
const processBtn = document.getElementById('processBtn');
const clearTasksBtn = document.getElementById('clearTasksBtn');
const resultArea = document.getElementById('resultArea');

// estado de las tareas dadas de alta (Queue, no array)
let tasks = new Queue();
let taskIdCounter = 1;

addTaskBtn.addEventListener('click', addTask);
taskNameInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') addTask();
});
taskTimeInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') addTask();
});
processBtn.addEventListener('click', processTasks);
clearTasksBtn.addEventListener('click', clearTasks);

// dar de alta una tarea
function addTask() {

    const name = taskNameInput.value.trim();
    const time = Number(taskTimeInput.value);

    if (!name || !time || time <= 0) return;

    tasks.enqueue(new Task(taskIdCounter++, name, time));
    renderTasks();

    taskNameInput.value = '';
    taskTimeInput.value = '';
    taskNameInput.focus();
}

// eliminar una tarea por id: se vacía la Queue y se reencola todo menos el id buscado
function removeTask(id) {

    const temp = new Queue();

    while (!tasks.isEmpty()) {
        const task = tasks.dequeue();
        if (task.id !== id) temp.enqueue(task);
    }

    while (!temp.isEmpty()) {
        tasks.enqueue(temp.dequeue());
    }

    renderTasks();
}

// mostrar las tareas dadas de alta, recorriendo la Queue sin vaciarla
function renderTasks() {

    taskList.innerHTML = '';

    if (tasks.isEmpty()) {
        taskList.appendChild(taskEmptyState);
        taskEmptyState.style.display = 'block';
        return;
    }

    queueForEach(tasks, task => {

        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <div class="card-text">
                <span class="label">
                <span class="status-dot"></span>
                tarea · id #${String(task.id).padStart(2, '0')}
                </span>
                ${task.name} — tiempo de ejecución: ${task.time}
            </div>
            <button class="card-remove" data-id="${task.id}" title="Eliminar tarea">✕</button>
        `;

        taskList.appendChild(card);
    });

    taskList.querySelectorAll('.card-remove').forEach(btn => {
        btn.addEventListener('click', () => removeTask(Number(btn.dataset.id)));
    });
}

// procesar (planificar) todas las tareas dadas de alta
function processTasks() {

    const numProcessors = Number(numProcessorsInput.value);

    resultArea.innerHTML = '';

    if (tasks.isEmpty()) {
        resultArea.innerHTML = `<div class="empty-state">Agrega al menos una tarea antes de procesar</div>`;
        return;
    }

    if (!numProcessors || numProcessors <= 0) {
        resultArea.innerHTML = `<div class="empty-state">Define un número válido de procesadores</div>`;
        return;
    }

    // assignTasks trabaja sobre una copia interna, así que "tasks" no se vacía aquí
    const { processors, avgCompletion } = assignTasks(tasks, numProcessors);

    resultArea.innerHTML = `<div class="result-summary">Tiempo medio de finalización: ${avgCompletion.toFixed(2)}</div>`;

    queueForEach(processors, proc => {

        const block = document.createElement('div');
        block.className = 'proc-block';

        let tasksHtml = '';

        if (proc.sequence.isEmpty()) {
            tasksHtml = `<div class="proc-task"><span class="t-name">Sin tareas asignadas</span></div>`;
        } else {
            queueForEach(proc.sequence, t => {
                tasksHtml += `
                    <div class="proc-task">
                        <span class="t-name">${t.name} (t=${t.time})</span>
                        <span class="t-finish">termina en ${t.finish}</span>
                    </div>
                `;
            });
        }

        block.innerHTML = `<div class="proc-header">Procesador ${proc.id}</div>${tasksHtml}`;
        resultArea.appendChild(block);
    });
}

// salir / limpiar todas las tareas y resultados
function clearTasks() {
    tasks = new Queue();
    resultArea.innerHTML = '';
    renderTasks();
}

// Interacción en la GUI (pestañas)
const tabs = document.querySelectorAll('.tab');
const views = document.querySelectorAll('.view');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        if (tab.disabled) return;
        tabs.forEach(t => t.classList.remove('active'));
        views.forEach(v => v.classList.remove('active'));
        tab.classList.add('active');
        document.getElementById(tab.dataset.target).classList.add('active');
    });
});