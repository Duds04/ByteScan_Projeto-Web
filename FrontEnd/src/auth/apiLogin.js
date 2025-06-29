export const loginAPI = async ({ email, senha }) => {
  const response = await fetch("http://localhost:5000/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: senha,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Erro ao fazer login");
  }

  return await response.json();
};

export async function registerAPI({ nome, nomeUsuario, email, senha }) {
  const response = await fetch("http://localhost:5000/api/auth/cadastro", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: nomeUsuario,
      email: email,
      nome: nome,
      password: senha,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Erro ao fazer cadastro");
  }

  return await response.json();
}


const decodeJWT = (token) => {
  try {
    const payloadBase64 = token.split('.')[1];
    const decodedPayload = JSON.parse(atob(payloadBase64));
    return decodedPayload;
  } catch (e) {
    console.error("Erro ao decodificar token:", e);
    return null;
  }
};
