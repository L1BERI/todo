import { fetchWrapper } from "../service/Fetch-wrapper";

class TodoApi {
  baseUrl = "/tasks";
  addToDo(data) {
    return fetchWrapper.post(this.baseUrl, data);
  }

  removeToDo(id){
    return fetchWrapper.delete(this.baseUrl, id)
  }
}

export const todoApi = new TodoApi();
