import axios from "axios";

// example api request for protected data (sends error i user isn't logged in)
const getProtectedExample = () => axios.get("/api/protected");

// example api request for public data
const getPublicExample = () => axios.get("/api/unprotected");
const findTasks = () => axios.get("/api/users/tasks");
const createTasks = (tasks) => {
  axios.post("/api/users/tasks", tasks);
};
const loadTasks = (id) => {
  axios.post("/api/users/tasks/" + id);
};
const deleteTasks = (id) => {
  axios.delete("/api/users/tasks"+ id);
};

const API = {
  getProtectedExample,
  getPublicExample,
  createTasks,
  findTasks,
  loadTasks,
  deleteTasks
};

export default API;
