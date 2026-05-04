import API from "./api";

export const setBudget =
  async (data) => {

    const response =

      await API.post(
        "/budget",
        data
      );

    return response.data;

};

export const getBudget =
  async () => {

    const response =

      await API.get(
        "/budget"
      );

    return response.data;

};