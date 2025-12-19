const API_BASE_URL = 'https://tdid-c22-164-be.vercel.app';

// API Service for handling all backend requests
class ApiService {
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers: {
        'accept': '*/*',
        'content-type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Todo List APIs
  async getAllTodos(filter = 'All') {
    return this.request(`/list?filter=${filter}`, { cache: 'no-store' });
  }

  async getTodayTodos() {
    return this.request('/today');
  }

  async getTodoById(id) {
    return this.request(`/list/${id}`);
  }

  async createTodo(title, date) {
    return this.request('/list', {
      method: 'POST',
      body: JSON.stringify({ title, date }),
    });
  }

  async updateTodo(id, title, date) {
    return this.request(`/list/${id}`, {
      method: 'POST',
      body: JSON.stringify({ id, title, date }),
    });
  }

  async completeTodo(id) {
    return this.request(`/list/${id}`, {
      method: 'PUT',
    });
  }

  async deleteTodo(id) {
    return this.request(`/list/${id}`, {
      method: 'DELETE',
    });
  }

  async setTodos(localTodo) {
    return this.request('/set-todo', {
      method: 'POST',
      body: JSON.stringify({ localTodo }),
    });
  }

  async updateNotification(id) {
    return this.request(`/notif/${id}`, {
      method: 'PUT',
    });
  }

  // Recap APIs
  async getThisWeekRecap() {
    return this.request('/this-week-recap');
  }
}

export default new ApiService();
