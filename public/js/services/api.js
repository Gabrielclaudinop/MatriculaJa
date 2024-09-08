// Arquivo api.js
const API = {
  baseUrl: 'http://localhost:3000',

  // Método para fazer uma requisição GET e obter dados (escolas)
  async read(endpoint) {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Erro ao carregar dados: ${response.statusText}`);
      }

      //console.log(await response.json())
      return await response.json();
    } catch (error) {
      console.error('Erro na requisição GET:', error);
      throw error;
    }
  },

  // Método para fazer uma requisição POST para criar novos dados (escolas)
  async create(endpoint, data) {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Erro ao criar dados: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Erro na requisição POST:', error);
      throw error;
    }
  },

  // Método para fazer uma requisição PUT para atualizar dados existentes
  async update(endpoint, data) {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Erro ao atualizar dados: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Erro na requisição PUT:', error);
      throw error;
    }
  },

  // Método para fazer uma requisição DELETE para remover dados
  async remove(endpoint) {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Erro ao remover dados: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Erro na requisição DELETE:', error);
      throw error;
    }
  },
};

export default API;
