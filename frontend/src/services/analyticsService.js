import API from "./api";

export const getSummary =
  async () => {

    const response =
      await API.get(
        "/analytics/summary"
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