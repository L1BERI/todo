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
  
    async post(endpoint, data) {
      const url = `${this.baseUrl}/${endpoint}`
      const response = await fetch(url, {
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
  
    async delete(endpoint, id) {
      const url = `${this.baseUrl}/${endpoint}/${id}`

      const response = await fetch(url, {
        method: 'DELETE',
      });

      if(!response.ok){
        throw new Error()
      }
      
      
      return response;
    }
  }


  
 export const fetchWrapper = new FetchWrapper(import.meta.env.VITE_URL_LINK);


