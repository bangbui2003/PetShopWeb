import publicClient from "../client/public.client";
import privateClient from "../client/private.client";

const endpoints = {
  getAll: "item/all",
  getAllAdmin: "item/get-admin",
  add: "item/create",
  getItem: ({ id }) => `item/getdetail-admin/${id}`,
  editItem: ({ id }) => `item/update/${id}`,
  deleteItem: ({ id }) => `item/delete/${id}`
};

const itemApi = {
  getAllItem: async () => {
    try {
      const response = await privateClient.get(endpoints.getAllAdmin);
      return { response };
    } catch (err) {
      return { err };
    }
  },
  // getAllAdmin: async () => {
  //   try {
  //     const response = await privateClient.get(endpoints.getAllAdmin);
  //     return { response };
  //   } catch (err) {
  //     return { err };
  //   }
  // },
  addItem: async ({ ItemName, Price, Category, Quantity, Description, Images
  }) => {
    try {
      const response = await privateClient.post(
        endpoints.add,
        {
          ItemName, Price, Category, Quantity, Description, Images
        }
      );
      return { response };
    } catch (err) {
      return { err };}
  },
  getItem: async ({ id }) => {
    try {
      const response = await publicClient.get(
        endpoints.getItem({ id })
      );
      return { response };
    } catch (err) {
      return { err };}
  },
  editItem: async ({ id, ItemName, Price, Category, Quantity, Description, Images
  }) => {
    try {
      const response = await privateClient.put(
        endpoints.editItem({ id }),
        {
          ItemName, Price, Category, Quantity, Description, Images
        }
      );
      return { response };
    } catch (err) {
      return { err };}
  },
  deleteItem: async ({ id }) => {
    try {
      const response = await privateClient.delete(
        endpoints.deleteItem({ id })
      );
      return { response };
    } catch (err) {
      return { err };}
  }
};

export default itemApi;