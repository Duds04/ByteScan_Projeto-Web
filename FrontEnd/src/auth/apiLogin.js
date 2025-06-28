// src/auth/api.js

let fakeUsersDB = [
  {
    email: 'admin@admin.com',
    senha: '123',
    nome: 'Administrador',
    nomeUsuario: 'admin'
  }
];

// Função mock para simular delay de rede
const delay = (ms) => new Promise(res => setTimeout(res, ms));

// Simula login
export async function loginAPI({ email, senha }) {
  await delay(500);
  const user = fakeUsersDB.find(u => u.email === email && u.senha === senha);
  if (!user) throw new Error('Credenciais inválidas');

  // Simula token
  return {
    token: 'fake-jwt-token',
    user: {
      nome: user.nome,
      email: user.email,
      nomeUsuario: user.nomeUsuario
    }
  };
}

// Simula cadastro
export async function registerAPI({ nome, nomeUsuario, email, senha }) {
  await delay(500);
  const userExists = fakeUsersDB.some(u => u.email === email || u.nomeUsuario === nomeUsuario);
  if (userExists) throw new Error('Usuário já existe');

  const newUser = { nome, nomeUsuario, email, senha };
  fakeUsersDB.push(newUser);

  return {
    token: 'fake-jwt-token',
    user: {
      nome,
      email,
      nomeUsuario
    }
  };
}
