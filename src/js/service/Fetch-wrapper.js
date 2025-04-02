class FetchWrapper {
    constructor(baseUrl) {
      this.baseUrl = baseUrl;
    }
    
    async get(endpoint) {
      const url = `${this.baseUrl}/${endpoint}`
      const response = await fetch(url);
      if(!response.ok){
        throw new Error()
      }
      return response.json();
    }
  
    async put(endpoint, id,data) {
      const url = `${this.baseUrl}/${endpoint}/${id}`
   
      const response = await fetch(url, {
        method: 'PATCH',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if(!response.ok){
        throw new Error()
      }
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


