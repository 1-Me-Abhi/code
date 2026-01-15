// Calculator State
let currentValue = '0';
let previousValue = '';
let operation = null;
let shouldResetDisplay = false;
let history = [];

// DOM Elements
const displayExpression = document.querySelector('.text-slate-500.dark\\:text-slate-400.text-sm');
const displayResult = document.querySelector('.text-slate-900.dark\\:text-white.text-5xl');
const historyContainer = document.querySelector('.overflow-y-auto.p-4.space-y-2');
const clearHistoryBtn = document.querySelector('button[title="Clear History"]');
const buttons = document.querySelectorAll('.grid.grid-cols-4 button');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    displayResult.textContent = '0';
    displayExpression.textContent = '';
    loadHistory();
    attachButtonListeners();
});

// Attach button click listeners
function attachButtonListeners() {
    buttons.forEach((button, index) => {
        button.addEventListener('click', () => handleButtonClick(button.textContent.trim()));
    });
}

// Handle button clicks
function handleButtonClick(value) {
    // Remove any extra whitespace or special characters
    value = value.trim();
    
    // Check for icon-based buttons
    if (value.includes('backspace') || value === 'backspace') {
        handleBackspace();
    } else if (value.includes('percent') || value === 'percent') {
        handlePercent();
    } else if (value === 'AC') {
        handleClear();
    } else if (value === '=') {
        handleEquals();
    } else if (['+', '-', '×', '÷'].includes(value)) {
        handleOperation(value);
    } else if (!isNaN(value) || value === '.') {
        handleNumber(value);
    }
    
    updateDisplay();
}

// Handle number and decimal input
function handleNumber(num) {
    if (shouldResetDisplay) {
        currentValue = num === '.' ? '0.' : num;
        shouldResetDisplay = false;
    } else {
        if (num === '.' && currentValue.includes('.')) return;
        if (currentValue === '0' && num !== '.') {
            currentValue = num;
        } else {
            currentValue += num;
        }
    }
}

// Handle operation buttons
function handleOperation(op) {
    if (previousValue !== '' && operation !== null && !shouldResetDisplay) {
        calculate();
    }
    
    operation = op;
    previousValue = currentValue;
    shouldResetDisplay = true;
}

// Handle equals button
function handleEquals() {
    if (operation === null || previousValue === '') return;
    
    calculate();
    addToHistory();
    operation = null;
    previousValue = '';
    shouldResetDisplay = true;
}

// Perform calculation
function calculate() {
    const prev = parseFloat(previousValue);
    const current = parseFloat(currentValue);
    
    if (isNaN(prev) || isNaN(current)) return;
    
    let result;
    switch (operation) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '×':
            result = prev * current;
            break;
        case '÷':
            result = current !== 0 ? prev / current : 'Error';
            break;
        default:
            return;
    }
    
    currentValue = result.toString();
}

// Handle backspace
function handleBackspace() {
    if (currentValue.length > 1) {
        currentValue = currentValue.slice(0, -1);
    } else {
        currentValue = '0';
    }
}

// Handle percent
function handlePercent() {
    const value = parseFloat(currentValue);
    if (!isNaN(value)) {
        currentValue = (value / 100).toString();
    }
}

// Handle clear
function handleClear() {
    currentValue = '0';
    previousValue = '';
    operation = null;
    shouldResetDisplay = false;
}

// Update display
function updateDisplay() {
    // Format the current result
    const numValue = parseFloat(currentValue);
    if (!isNaN(numValue) && currentValue !== 'Error') {
        displayResult.textContent = formatNumber(numValue);
    } else {
        displayResult.textContent = currentValue;
    }
    
    // Update expression
    if (previousValue !== '' && operation !== null) {
        displayExpression.textContent = `${formatNumber(parseFloat(previousValue))} ${operation}${shouldResetDisplay ? '' : ' ' + formatNumber(parseFloat(currentValue))}`;
    } else {
        displayExpression.textContent = '';
    }
}

// Format number with commas
function formatNumber(num) {
    if (isNaN(num)) return '0';
    
    // Handle decimal numbers
    const parts = num.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    
    return parts.join('.');
}

// Add to history
function addToHistory() {
    if (previousValue === '' || operation === null) return;
    
    const expression = `${formatNumber(parseFloat(previousValue))} ${operation} ${formatNumber(parseFloat(currentValue))}`;
    const result = currentValue;
    
    history.unshift({ expression, result });
    
    // Limit history to 20 items
    if (history.length > 20) {
        history = history.slice(0, 20);
    }
    
    saveHistory();
    renderHistory();
}

// Render history
function renderHistory() {
    historyContainer.innerHTML = '';
    
    if (history.length === 0) {
        historyContainer.innerHTML = `
            <div class="text-center text-slate-400 dark:text-slate-500 text-sm py-8">
                No history yet
            </div>
        `;
        return;
    }
    
    history.forEach((item, index) => {
        const historyItem = document.createElement('div');
        historyItem.className = 'group p-3 rounded-lg hover:bg-white dark:hover:bg-[#1c2427] cursor-pointer transition-colors border border-transparent hover:border-slate-200 dark:hover:border-[#283539]';
        historyItem.innerHTML = `
            <div class="text-right text-slate-500 dark:text-slate-400 text-xs mb-1 font-medium tracking-wide">${item.expression}</div>
            <div class="text-right text-slate-800 dark:text-white text-lg font-semibold">${formatNumber(parseFloat(item.result))}</div>
        `;
        
        // Click to load result
        historyItem.addEventListener('click', () => {
            currentValue = item.result;
            previousValue = '';
            operation = null;
            shouldResetDisplay = true;
            updateDisplay();
        });
        
        historyContainer.appendChild(historyItem);
    });
}

// Clear history
clearHistoryBtn.addEventListener('click', () => {
    history = [];
    saveHistory();
    renderHistory();
});

// Save history to localStorage
function saveHistory() {
    localStorage.setItem('calculatorHistory', JSON.stringify(history));
}

// Load history from localStorage
function loadHistory() {
    const saved = localStorage.getItem('calculatorHistory');
    if (saved) {
        history = JSON.parse(saved);
        renderHistory();
    }
}

// Keyboard support
document.addEventListener('keydown', (e) => {
    e.preventDefault();
    
    if (e.key >= '0' && e.key <= '9' || e.key === '.') {
        handleNumber(e.key);
    } else if (e.key === '+' || e.key === '-') {
        handleOperation(e.key);
    } else if (e.key === '*') {
        handleOperation('×');
    } else if (e.key === '/') {
        handleOperation('÷');
    } else if (e.key === 'Enter' || e.key === '=') {
        handleEquals();
    } else if (e.key === 'Backspace') {
        handleBackspace();
    } else if (e.key === 'Escape') {
        handleClear();
    } else if (e.key === '%') {
        handlePercent();
    }
    
    updateDisplay();
});
