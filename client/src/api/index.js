import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
});

const log = axios.create({
  baseURL: "http://localhost:3000/log",
});

export const insertItem = (payload) => api.post(`/item`, payload);
export const updateItemById = (id, payload) => api.put(`/item/${id}`, payload);
export const deleteItemById = (id) => api.delete(`/item/${id}`);
export const getItemById = (id) => api.get(`/item/${id}`);
export const getAllItems = () => api.get(`/items`);

export const signUp = (payload) => log.post(`/auth/signup`, payload);
export const signIn = (payload) =>
  log.post(`/auth/signin`, payload).then((res) => {
    if (res.data.accessToken) {
      localStorage.setItem("user", JSON.stringify(res.data));
    }
    return res;
  });

export const logout = () => {
  localStorage.removeItem("user");
};

export const getCurrentUser = () => {
  const userStr = localStorage.getItem("user");
  if (userStr) return JSON.parse(userStr);
  return null;
};

export const authHeader = () => {
  const userStr = localStorage.getItem("user");
  let user = null;
  if (userStr) user = JSON.parse(userStr);

  if (user && user.accessToken) {
    return { "x-access-token": user.accessToken };
  } else {
    return { "x-access-token": null };
  }
};

api.interceptors.request.use(
  (config) => {
    const headers = apis.authHeader();
    config.headers = headers;
    return config;
  },
  (error) => {
    console.log(error);
  }
);

const apis = {
  insertItem,
  getAllItems,
  updateItemById,
  deleteItemById,
  getItemById,
  signIn,
  signUp,
  logout,
  getCurrentUser,
  authHeader,
};

export default apis;
