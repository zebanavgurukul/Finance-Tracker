function showSignup() {
    document.getElementById('signupContainer').style.display = 'block';
    document.getElementById('loginContainer').style.display = 'none';
}

function showLogin() {  
    document.getElementById('signupContainer').style.display = 'none';
    document.getElementById('loginContainer').style.display = 'block';
}

async function signup() {
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const res = await fetch('http://localhost:5000/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
    });
    alert((await res.json()).message);
}

async function login() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const res = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (data.token) {
        localStorage.setItem('token', data.token);
        document.getElementById('authContainer').style.display = 'none';
        document.getElementById('transactionContainer').style.display = 'block';
    } else {
        alert('Login failed!');
    }
}

function showTransactionsPage() {
    document.getElementById('authContainer').style.display = 'none';
    document.getElementById('transactionContainer').style.display = 'block';
    document.getElementById('reportsContainer').style.display = 'block';
    getTransactions();
}

async function addTransaction() {
    const token = localStorage.getItem('token');
    if (!token) return alert('Please login first');
    const type = document.getElementById('transactionType').value;
    const amount = document.getElementById('transactionAmount').value;
    const category = document.getElementById('transactionCategory').value;
    await fetch('http://localhost:5000/transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': token },
        body: JSON.stringify({ type, amount, category })
    });
    alert('Transaction added');
    getTransactions();
}

async function getTransactions() {
    const token = localStorage.getItem('token');
    if (!token) return;
    const res = await fetch('http://localhost:5000/transactions', {
        headers: { 'Authorization': token }
    });
    const transactions = await res.json();
    document.getElementById('transactionsList').innerHTML = transactions.map(t => `<p>${t.type}: $${t.amount} (${t.category})</p>`).join('');
}

async function fetchReport(period) {
    const token = localStorage.getItem('token');
    if (!token) return alert('Please login first');

    const res = await fetch(`http://localhost:5000/reports?period=${period}`, {
        headers: { 'Authorization': token }
    });

    const data = await res.json();
    if (data.error) {
        alert(data.error);
    } else {
        document.getElementById('reportResults').innerHTML = `
            <h4>${period.charAt(0).toUpperCase() + period.slice(1)} Report</h4>
            <p><strong>Total Income:</strong> $${data.totalIncome}</p>
            <p><strong>Total Expenses:</strong> $${data.totalExpense}</p>
            <p><strong>Savings:</strong> $${data.savings}</p>
        `;
    }
}

// function showTransactionsPage() {
//     document.getElementById('authContainer').style.display = 'none';
//     document.getElementById('transactionContainer').style.display = 'block';
//     document.getElementById('reportsContainer').style.display = 'block';  // SHOW REPORTS
// }

function logout() {
    localStorage.removeItem('token');
    document.getElementById('transactionContainer').style.display = 'none';
    document.getElementById('reportsContainer').style.display = 'none';  // HIDE REPORTS
    document.getElementById('authContainer').style.display = 'block';
}

async function login() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const res = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (data.token) {
        localStorage.setItem('token', data.token);
        showTransactionsPage();
    } else {
        alert('Login failed!');
    }
}

function showReport(type) {
    const reportContent = document.getElementById('reportContent');
    reportContent.innerHTML = `<b>Showing ${type} report...</b>`;
}

async function showReport(type) {
    const token = localStorage.getItem('token');
    if (!token) return alert('Please login first');

    const res = await fetch(`http://localhost:5000/reports?type=${type}`, {
        headers: { 'Authorization': token }
    });

    const data = await res.json();

    if (res.ok) {
        document.getElementById('reportContent').innerHTML = `
            <h4>${type.charAt(0).toUpperCase() + type.slice(1)} Report</h4>
            <p><strong>Total Income:</strong> $${data.totalIncome}</p>
            <p><strong>Total Expense:</strong> $${data.totalExpense}</p>
            <p><strong>Savings:</strong> $${data.savings}</p>
        `;
    } else {
        alert('Error fetching report: ' + data.error);
    }
}
