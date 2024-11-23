import axios from "axios";
import Cookies from "js-cookie";

axios.defaults.baseURL = "http://localhost:8090/";
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.put["Content-Type"] = "application/json";
axios.defaults.headers.patch["Content-Type"] = "application/json";
axios.defaults.headers.get["Content-Type"] = "application/json";
axios.defaults.withCredentials = true;

export const getRequest = async (url) => {
  try {
    const response = await axios({
      method: "GET",
      url: url,
      // headers: {
      //   Authorization: `Bearer ${Cookies.get("accessToken")}`,
      // },
      withCredentials: true,
    });
    return response;
  } catch (error) {
    throw new Error(`Error fetching data from ${url}: ${error.message}`);
  }
};

export const putRequest = (url, data) => {
  return axios({
    method: "PUT",
    url: url,
    data: data,
    //credentials: "include",
  });
};

export const postRequest = (url, data) => {
  return axios({
    method: "POST",
    url: url,
    data: data,
    // credentials: "include",
  });
};

export const patchRequest = (url, data) => {
  return axios({
    method: "PATCH",
    url: url,
    data: data,
    // credentials: "include",
  });
};
