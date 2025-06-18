// app.js

const users = [
  { id: 'admin', pw: 'admin', balance: 9999, isAdmin: true },
];

let currentUser = null;

function show(id) {
  document.querySelectorAll('body > div').forEach(div => div.classList.add('hidden'));
  document.getElementById(id).classList.remove('hidden');
}

function login() {
  const id = document.getElementById('login-id').value;
  const pw = document.getElementById('login-pw').value;
  const user = users.find(u => u.id === id && u.pw === pw);

  if (user) {
    currentUser = user;
    document.getElementById('username-display').textContent = user.id;
    document.getElementById('wallet-balance').textContent = user.balance;
    show('wallet-container');

    if (user.isAdmin) {
      updateAdminPanel();
      document.getElementById('admin-panel').classList.remove('hidden');
    }
  } else {
    alert('Invalid credentials');
  }
}

function logout() {
  currentUser = null;
  show('auth-container');
}

function showRegister() {
  show('register-container');
}

function backToLogin() {
  show('auth-container');
}

function showRecovery() {
  show('recovery-container');
}

function register() {
  const id = document.getElementById('reg-id').value;
  const pw = document.getElementById('reg-pw').value;
  if (!id || !pw) return alert('Please enter username and password');
  if (users.find(u => u.id === id)) return alert('User already exists');

  users.push({ id, pw, balance: 0, isAdmin: false });
  alert('Registration complete. Please login.');
  show('auth-container');
}

function updateAdminPanel() {
  const tbody = document.querySelector('#user-table tbody');
  tbody.innerHTML = '';

  users.forEach((u, i) => {
    if (u.id === 'admin') return; // skip admin row

    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${u.id}</td>
      <td><input type="number" value="${u.balance}" onchange="updateBalance(${i}, this.value)"></td>
      <td><button onclick="deleteUser(${i})">Delete</button></td>
    `;
    tbody.appendChild(row);
  });
}

function updateBalance(index, newVal) {
  users[index].balance = parseInt(newVal);
  alert('Balance updated.');
}

function deleteUser(index) {
  if (confirm('Are you sure you want to delete this user?')) {
    users.splice(index, 1);
    updateAdminPanel();
  }
}

// Start on login
show('auth-container');
