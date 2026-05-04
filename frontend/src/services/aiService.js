import API from "./api";

export const getAIInsights =
  async () => {

    const response =
      await API.get(
        "/ai/insights"
      );

    return response.data;

};