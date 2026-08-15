import { validarEquilibrio } from "./core/excercisesSolutions.js";


// ejercicio 1 interacción GUI
const input = document.getElementById('entryInput');
const chkbtn = document.getElementById('chkbtn');
const cardList = document.getElementById('cardList');
const emptyState = document.getElementById('emptyState');

// añadir el listener al boton de comprobar y al de input
chkbtn.addEventListener('click', () => addCard(input.value));
input.addEventListener('keydown', e => {
    if (e.key === 'Enter') addCard(input.value);
});

let count = 0;

function addCard(text, status = 'success') {
    if (!text.trim()) return;

    count++;
    emptyState.style.display = 'none';

    const card = document.createElement('div');
    card.className = `card ${status}`;
    card.innerHTML = `
      <div class="card-text">
        <span class="label">
          <span class="status-dot"></span>
          <span class="status-text">${status === 'success' ? 'éxito' : 'error'}</span>
          · procedimiento #${String(count).padStart(2, '0')}
        </span>
        ${text.trim()}
      </div>
      <button class="card-remove" title="Eliminar">✕</button>
    `;

    card.querySelector('.card-remove').addEventListener('click', () => {
        card.remove();
        if (!cardList.querySelector('.card')) emptyState.style.display = 'block';
    });

    cardList.appendChild(card);
    input.value = '';
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
