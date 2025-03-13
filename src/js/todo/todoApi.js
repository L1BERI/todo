import { fetchWrapper } from "../service/Fetch-wrapper";

class TodoApi {
  endPoint = "tasks";
  addToDo(data) {
    return fetchWrapper.post(this.endPoint, data);
  }

  removeToDo(id){
    return fetchWrapper.delete(this.endPoint, id)
  }
}

export const todoApi = new TodoApi();
