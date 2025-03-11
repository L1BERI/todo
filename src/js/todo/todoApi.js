import { fetchWrapper } from "../service/Fetch-wrapper";

class TodoApi {
  baseUrl = "/tasks";
  addToDo(data) {
    return fetchWrapper.post(this.baseUrl, data);
  }
}

export const todoApi = new TodoApi();
