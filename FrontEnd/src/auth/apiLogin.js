const BASE_URL = 'http://localhost:5000/api/auth'; 

// Função para login
export async function loginAPI({ email, senha }) {
  const response = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password: senha }) 
  });

  if (!response.ok) {
    const { error } = await response.json();
    throw new Error(error || 'Erro ao fazer login');
  }

  const data = await response.json();
  
  console.log("Login realizado com sucesso:", data.token); 

  return {
    token: data.token,
  };
}

export async function registerAPI({ nome, nomeUsuario, email, senha }) {
  const response = await fetch(`${BASE_URL}/cadastro`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      nome: nome,
      username: nomeUsuario,
      email: email,
      password: senha
    })
  });

  if (!response.ok) {
    const { error } = await response.json();
    throw new Error(error || 'Erro ao fazer login');
  }

  const data = await response.json();
  
  console.log("Registro realizado com sucesso:", data.token); 

  return {
    token: data.token,
  };
}


export const decodeJWT = (token) => {
  try {
    const payloadBase64 = token.split('.')[1];
    const decodedPayload = JSON.parse(atob(payloadBase64));
    return decodedPayload;
  } catch (e) {
    console.error("Erro ao decodificar token:", e);
    return null;
  }
};
