import privateClient from "../client/private.client.js";


const bookingEnpoint = {
  create: "appointment/user/create",
  get: "appointment/user/",
  cancel: ({ id }) => `appointment/user/update/${id}`
};

const bookingApi = {
  create: async ({ user_name, dog_item_id, phone_number, service, date, hour, description }) => {
    try {
      const response = await privateClient.post(
        bookingEnpoint.create, ({ user_name, dog_item_id, phone_number, service, date, hour, description })
      );
      return { response };
    } catch (err) { return { err }; }
  },
  getAll: async () => {
    try {
      const response = await privateClient.get(
        bookingEnpoint.get
      );
      return { response };
    } catch (err) { return { err }; }
  },
  cancel:  async ({ id }) => {
    try {
      const response = await privateClient.put(
        bookingEnpoint.cancel({ id }), { result: "Hủy lịch" }
      );
      return { response };
    } catch (err) { return { err }; }
  }
};

export default bookingApi;