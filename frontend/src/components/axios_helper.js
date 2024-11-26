// import axios from "axios";
// import Cookies from "js-cookie";

// axios.defaults.baseURL = "http://localhost:8090/";
// axios.defaults.headers.post["Content-Type"] = "application/json";
// axios.defaults.headers.put["Content-Type"] = "application/json";
// axios.defaults.headers.patch["Content-Type"] = "application/json";
// axios.defaults.headers.get["Content-Type"] = "application/json";
// axios.defaults.withCredentials = true;

// export const getRequest = async (url) => {
//   try {
//     const response = await axios({
//       method: "GET",
//       url: url,
//       // headers: {
//       //   Authorization: `Bearer ${Cookies.get("accessToken")}`,
//       // },
//       withCredentials: true,
//     });
//     return response;
//   } catch (error) {
//     throw new Error(`Error fetching data from ${url}: ${error.message}`);
//   }
// };

// export const putRequest = (url, data) => {
//   return axios({
//     method: "PUT",
//     url: url,
//     data: data,
//     //credentials: "include",
//   });
// };

// export const postRequest = (url, data) => {
//   return axios({
//     method: "POST",
//     url: url,
//     data: data,
//     // credentials: "include",
//   });
// };

// export const patchRequest = (url, data) => {
//   return axios({
//     method: "PATCH",
//     url: url,
//     data: data,
//     // credentials: "include",
//   });
// };
import axios from "axios";
import Cookies from "js-cookie";
import { useHistory, useNavigate } from "react-router-dom"; // jeśli używasz React Router

axios.defaults.baseURL = "http://localhost:8090/";
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.put["Content-Type"] = "application/json";
axios.defaults.headers.patch["Content-Type"] = "application/json";
axios.defaults.headers.get["Content-Type"] = "application/json";
axios.defaults.withCredentials = true;

// Interceptor do obsługi odpowiedzi
axios.interceptors.response.use(
  (response) => response, // Jeśli odpowiedź jest poprawna, po prostu ją zwróć
  (error) => {
    // Sprawdzamy, czy odpowiedź ma status 401
    if (error.response && error.response.status === 401) {
      // Wylogowanie użytkownika (np. usunięcie tokena z cookies)
      Cookies.remove("accessToken"); // Usuwamy token
      console.log("xddddd");
      // Można dodać przekierowanie na stronę logowania
      // useNavigate("/");
      window.location.href = "/"; // Zmieniamy na stronę logowania lub inny sposób nawigacji

      // Możesz też wyświetlić powiadomienie o błędzie
      // alert("Session expired, please log in again.");

      return Promise.reject(error); // Przerywamy dalsze przetwarzanie błędu
    }

    return Promise.reject(error); // Inne błędy
  }
);

// Funkcja GET
export const getRequest = async (url) => {
  try {
    const response = await axios({
      method: "GET",
      url: url,
      withCredentials: true, // Ważne, jeśli używasz cookies
    });
    return response;
  } catch (error) {
    throw new Error(`Error fetching data from ${url}: ${error.message}`);
  }
};

// Funkcja GET
export const getRequestWithParams = async (url, { params }) => {
  try {
    const response = await axios({
      method: "GET",
      url: url,
      withCredentials: true, // Ważne, jeśli używasz cookies
      params: params,
    });
    return response;
  } catch (error) {
    throw new Error(`Error fetching data from ${url}: ${error.message}`);
  }
};

// Funkcja PUT
export const putRequest = (url, data) => {
  return axios({
    method: "PUT",
    url: url,
    data: data,
  });
};

// Funkcja POST
export const postRequest = (url, data) => {
  return axios({
    method: "POST",
    url: url,
    data: data,
  });
};

// Funkcja PATCH
export const patchRequest = (url, data) => {
  return axios({
    method: "PATCH",
    url: url,
    data: data,
  });
};
