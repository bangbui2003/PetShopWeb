import publicClient from "../client/public.client";

const endpoints = {
  getAll: "item/all",
  getDetail: ({ id }) => `item/get/${id}`
};

const itemApi = {
  getAllItems: async () => {
    try {
      const response = await publicClient.get(endpoints.getAll);
      return { response };
    } catch (err) {
      return { err };
    }
  },
  getItemDetail: async ({ id }) => {
    try {
      const response = await publicClient.get(endpoints.getDetail({ id }));
      return { response };
    } catch (err) {
      return { err };
    }
  }
};

export default itemApi;