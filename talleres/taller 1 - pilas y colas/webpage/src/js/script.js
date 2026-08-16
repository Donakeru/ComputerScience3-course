import { checkBalance } from "./core/excercisesSolutions.js";


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

// Interacción en la GUI
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
