const editor = document.getElementById('editor');
const lineNumbers = document.getElementById('line-numbers');
const tabButtons = document.querySelectorAll('.tab-btn');

// Objeto para guardar lo que escribes en cada sección
let scripts = {
    html: '',
    css: '',
    js: ''
};

let currentTab = 'html';

// Función para cambiar de pestaña
function switchTab(lang) {
    // Guardar lo que hay actualmente antes de cambiar
    scripts[currentTab] = editor.value;
    
    // Cambiar estado visual
    currentTab = lang;
    tabButtons.forEach(btn => {
        btn.classList.remove('active');
        if(btn.innerText.toLowerCase().includes(lang)) btn.classList.add('active');
    });

    // Cargar el contenido del nuevo lenguaje
    editor.value = scripts[lang];
    updateLineNumbers();
}

// Función para actualizar números (tu lógica original mejorada)
function updateLineNumbers() {
    const lines = editor.value.split('\n');
    const count = lines.length;
    let numbersHTML = '';
    for (let i = 1; i <= count; i++) {
        numbersHTML += i + '<br>';
    }
    lineNumbers.innerHTML = numbersHTML;
    syncScroll();
}

function syncScroll() {
    lineNumbers.scrollTop = editor.scrollTop;
}

// Eventos
editor.addEventListener('input', updateLineNumbers);
editor.addEventListener('scroll', syncScroll);

// Copiar Limpio
document.getElementById('copy-raw').addEventListener('click', () => {
    navigator.clipboard.writeText(editor.value);
    alert(`Código ${currentTab.toUpperCase()} copiado`);
});

// Copiar Enumerado
document.getElementById('copy-numbered').addEventListener('click', () => {
    const lines = editor.value.split('\n');
    const numberedText = lines.map((line, index) => `${index + 1}: ${line}`).join('\n');
    navigator.clipboard.writeText(numberedText);
    alert(`Código ${currentTab.toUpperCase()} numerado copiado`);
});

// Inicializar la primera vez
updateLineNumbers();

