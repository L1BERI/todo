class FetchWrapper {
    constructor(baseUrl) {
      this.baseUrl = baseUrl;
    }
  
    async get(url) {
      const response = await fetch(`${this.baseUrl}${url}`);
      return response.json();
    }
  
    async put(url, data) {
      const response = await fetch(`${this.baseUrl}${url}`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.json();
    }
  
    async post(url, data) {
      const response = await fetch(`${this.baseUrl}${url}`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if(!response.ok){
        throw new Error('Что-то пошло не так')
      }
      return response.json();
    }
  
    async delete(url) {
      const response = await fetch(`${this.baseUrl}${url}`, {
        method: 'DELETE',
      });
      return response.json();
    }
  }


  
 export const fetchWrapper = new FetchWrapper(import.meta.env.VITE_URL_LINK);


