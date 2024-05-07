let totalIncome = 0;
let totalExpense = 0;

const transactionForm = document.getElementById('transactionForm');
const transactionList = document.getElementById('transactionList');
const totalIncomeElement = document.getElementById('totalIncome');
const totalExpenseElement = document.getElementById('totalExpense');
const overallAmountElement = document.getElementById('overallAmount');
const generateReportBtn = document.getElementById('generateReportBtn');

transactionForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const date = document.getElementById('date').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const type = document.getElementById('type').value;
    const reason = document.getElementById('reason').value;
    const invoice = document.getElementById('invoice').value;
    const plate = document.getElementById('plate').value;
    const provider = document.getElementById('provider').value;

    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>${date}</td>
        <td>${amount}</td>
        <td>${type}</td>
        <td>${reason}</td>
        <td>${invoice}</td>
        <td>${plate}</td>
        <td>${provider}</td>
    `;
    transactionList.appendChild(newRow);

    if (type === 'ingreso') {
        totalIncome += amount;
    } else if (type === 'egreso') {
        totalExpense += amount;
    }

    updateSummary();
    resetForm();
});

function updateSummary() {
    overallAmountElement.textContent = (totalIncome - totalExpense).toFixed(2);
    totalIncomeElement.textContent = totalIncome.toFixed(2);
    totalExpenseElement.textContent = totalExpense.toFixed(2);
}

function resetForm() {
    transactionForm.reset();
}
     
function generateExcel() {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.table_to_sheet(document.getElementById('transactionTable'));

    // Establecer el ancho predeterminado de las columnas en 15 unidades
    ws['!cols'] = [
    { width: 20 }, 
    { width: 20 }, 
    { width: 20 },
    { width: 20 }, 
    { width: 20 }, 
    { width: 20 },
    { width: 20 }  
    ];

    const totalIncomeRow = ['Total de ingresos', totalIncome.toFixed(2)];
    const totalExpenseRow = ['Total de egresos', totalExpense.toFixed(2)];
    const overallAmountRow = ['Saldo', (totalIncome - totalExpense).toFixed(2)];

    // Agregar filas adicionales
    XLSX.utils.sheet_add_aoa(ws, [totalIncomeRow], { origin: -1 });
    XLSX.utils.sheet_add_aoa(ws, [totalExpenseRow], { origin: -1 });
    XLSX.utils.sheet_add_aoa(ws, [overallAmountRow], { origin: -1 });

    XLSX.utils.book_append_sheet(wb, ws, 'Transacciones');
    XLSX.writeFile(wb, 'reporte_transacciones.xlsx');
}

generateReportBtn.addEventListener('click', generateExcel);