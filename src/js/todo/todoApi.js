import { fetchWrapper } from "../service/Fetch-wrapper";

class TodoApi {
  endPoint = "tasks";

  getTasks(){
    return fetchWrapper.get(this.endPoint)
  }
  addToDo(data) {
    return fetchWrapper.post(this.endPoint, data);
  }

  removeToDo(id){
    return fetchWrapper.delete(this.endPoint, id)
  }

  updateTaskStatusToDo(id, data){
    return fetchWrapper.put(this.endPoint, id, data)
  }
}

export const todoApi = new TodoApi();
