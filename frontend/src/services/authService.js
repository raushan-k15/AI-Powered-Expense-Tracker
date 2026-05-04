import API from "./api";

export const registerUser =
  async (data) => {

    const response =
      await API.post(

        "/auth/register",

        data

      );

    return response.data;

};

export const loginUser =
  async (data) => {

    const response =
      await API.post(

        "/auth/login",

        data

      );

    // backend direct token string bhej raha hai
    return response.data;

};