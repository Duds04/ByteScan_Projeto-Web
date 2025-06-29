const BASE_URL = "http://localhost:5000/api";

export const handleRequest = async (url, options = {}) => {
  const response = await fetch(url, options);
  if (!response.ok) {
    let errorMessage = "Erro na requisição";
    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorMessage;
    } catch {
      // ignorar erro de parse
    }
    throw new Error(errorMessage);
  }
  return response.json();
};

export const getManga = async (token, id) => {
  const response = await fetch(`http://localhost:5000/api/manga/mangas/${id}`, {
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Erro ao fazer login");
  }

  return await response.json();
};

export const getCapitulos = async (obraId, token) => {

  console.log("dasdas ", obraId, token);
    return handleRequest(`${BASE_URL}/manga/mangas/${obraId}/capitulos`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  });

}

export const getObras = () => {
  return handleRequest(`${BASE_URL}/mangas`);
};

export const getObraCompleta = async (obraId, token) => {
  return handleRequest(`${BASE_URL}/mangas/${obraId}`, {
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  });
};

export const getIsFav = async (token, obraId) => {
  return handleRequest(`${BASE_URL}/favoritos/${obraId}`, {
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  });
};

export const getFavoritos = async (token) => {
  return handleRequest(`${BASE_URL}/favoritos`, {
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  });
};

export const addFavorito = async (token, obraId) => {
  return handleRequest(`${BASE_URL}/favoritos/${obraId}`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  });
};

export const removeFavorito = async (token, obraId) => {
  return handleRequest(`${BASE_URL}/favoritos/${obraId}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  });
};

export const avaliarObra = async (token, obraId, nota, comentario = "") => {
  return handleRequest(`${BASE_URL}/${obraId}/avaliar`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ nota, comentario }),
  });
};

export const getAvaliacoes = (obraId) => {
  return handleRequest(`${BASE_URL}/${obraId}/avaliacoes`);
};

export const filtrarObras = (categoria, genero) => {
  const params = new URLSearchParams();
  if (categoria) params.append("categoria", categoria);
  if (genero) params.append("genero", genero);

  return handleRequest(`${BASE_URL}/filtro?${params.toString()}`);
};

export const pesquisarObras = (termo) => {
  return handleRequest(`${BASE_URL}/pesquisa?termo=${encodeURIComponent(termo)}`);
};

export const getCategorias = () => {
  return handleRequest(`${BASE_URL}/categorias`);
};

export const getGeneros = () => {
  return handleRequest(`${BASE_URL}/generos`);
};

export const getCapitulo = (obraId, numero) => {
  return handleRequest(`${BASE_URL}/${obraId}/capitulo/${numero}`);
};

export const adicionarCapitulo = async (obraId, capituloData) => {
  return handleRequest(`${BASE_URL}/${obraId}/capitulo`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(capituloData),
  });
};
