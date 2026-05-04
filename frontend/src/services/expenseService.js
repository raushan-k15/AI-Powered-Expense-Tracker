import API from "./api";

export const getExpenses =
  async (
    search = "",
    page = 0
  ) => {

    const response =
      await API.get(

        `/expenses?search=${search}&page=${page}&size=10`

      );

    return response.data;

};

export const addExpense =
  async (data) => {

    const response =
      await API.post(
        "/expenses",
        data
      );

    return response.data;

};

export const deleteExpense =
  async (id) => {

    const response =
      await API.delete(
        `/expenses/${id}`
      );

    return response.data;

};
export const updateExpense =
  async (
    id,
    data
  ) => {

    const response =
      await API.put(

        `/expenses/${id}`,
        data

      );

    return response.data;

};