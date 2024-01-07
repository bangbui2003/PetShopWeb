import publicClient from "../client/public.client.js";

const emailEnpoint = {
  checkout: `email/send`
};

const emailApi = {
  checkoutEmail: async ({
    address, total, email, phone, name
  }) => {
    try {
      const response = await publicClient.post(
        emailEnpoint.checkout, {
          address, total, email, phone, name
        });
      return { response };
    } catch (err) { return { err }; }
  }
};

export default emailApi;