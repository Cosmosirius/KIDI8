const form = document.getElementById('transaction-form');
const transactionList = document.getElementById('transaction-list');
const incomeTotalEl = document.getElementById('income-total');
const expenseTotalEl = document.getElementById('expense-total');
const balanceTotalEl = document.getElementById('balance-total');

let transactions = [];

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const title = formData.get('title');
  const amount = parseFloat(formData.get('amount'));
  const type = formData.get('type');

  const newTransaction = {
    id: Date.now(),
    title,
    amount,
    type,
    date: new Date().toLocaleDateString()
  };

  // ✅ Spread digunakan untuk menambahkan transaksi baru
  transactions = [...transactions, newTransaction];

  form.reset();
  render();
});

function render() {
  // Kosongkan list dulu
  transactionList.innerHTML = '';

  let income = 0;
  let expense = 0;

  transactions.forEach(({ id, title, amount, type, date }) => {
    const li = document.createElement('li');
    li.textContent = `${title} - Rp${amount.toLocaleString()} (${type}) [${date}]`;
    transactionList.appendChild(li);

    if (type === 'income') {
      income += amount;
    } else {
      expense += amount;
    }
  });

  // ✅ Destructuring hasil total
  updateSummary({ income, expense });
}

function updateSummary({ income, expense }) {
  const balance = income - expense;

  incomeTotalEl.textContent = `Rp${income.toLocaleString()}`;
  expenseTotalEl.textContent = `Rp${expense.toLocaleString()}`;
  balanceTotalEl.textContent = `Rp${balance.toLocaleString()}`;
}

transactions.forEach((tx) => {
  const { amount, ...otherDetails } = tx;
  console.log("Amount:", amount);
  console.log("Others:", otherDetails); // 👈 Ini penggunaan Rest Operator
});

