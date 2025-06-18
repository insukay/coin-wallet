// 기본 사용자 샘플
const sampleUsers = [
  { name: "홍길동", address: "0x1234...abcd", balance: 2.5 },
  { name: "김영희", address: "0xabcd...5678", balance: 1.1 }
];

function loadUsers() {
  const users = localStorage.getItem('walletUsers');
  return users ? JSON.parse(users) : sampleUsers;
}

function saveUsers(users) {
  localStorage.setItem('walletUsers', JSON.stringify(users));
}

function renderUserPage() {
  const container = document.getElementById("userInfo");
  const users = loadUsers();
  if (users.length > 0) {
    const user = users[0]; // 첫번째 사용자만 표시
    container.innerHTML = \`
      <p>👤 이름: \${user.name}</p>
      <p>📬 주소: \${user.address}</p>
      <p>💰 잔액: \${user.balance} ETH</p>
    \`;
  }
}

function renderAdminPage() {
  const tbody = document.querySelector("#userTable tbody");
  const form = document.getElementById("addUserForm");
  const users = loadUsers();

  function refreshTable() {
    tbody.innerHTML = "";
    users.forEach((user, idx) => {
      const row = document.createElement("tr");
      row.innerHTML = \`
        <td><input value="\${user.name}" onchange="updateUser(\${idx}, 'name', this.value)" /></td>
        <td><input value="\${user.address}" onchange="updateUser(\${idx}, 'address', this.value)" /></td>
        <td><input type="number" value="\${user.balance}" onchange="updateUser(\${idx}, 'balance', this.value)" /></td>
        <td><button onclick="deleteUser(\${idx})">삭제</button></td>
      \`;
      tbody.appendChild(row);
    });
    saveUsers(users);
  }

  window.updateUser = (index, field, value) => {
    users[index][field] = field === 'balance' ? parseFloat(value) : value;
    saveUsers(users);
  };

  window.deleteUser = (index) => {
    users.splice(index, 1);
    refreshTable();
  };

  form.onsubmit = (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const address = document.getElementById("address").value;
    const balance = parseFloat(document.getElementById("balance").value);
    users.push({ name, address, balance });
    form.reset();
    refreshTable();
  };

  refreshTable();
}

// 페이지 구분 실행
if (document.getElementById("userInfo")) renderUserPage();
if (document.getElementById("userTable")) renderAdminPage();