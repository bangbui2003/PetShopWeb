import privateClient from "../client/private.client";
import { convertDogSpecies } from "~/utils/convertType";

const endpoints = {
  getAll: "dogitem/",
  getAllAdmin: "dogitem/all-admin",
  add: "dogitem/create",
  getDogByIdAdmin: ({ id }) => `dogitem/detail-admin/${id}`,
  editDogById: ({ id }) => `dogitem/update/${id}`,
  deleteDog: ({ id }) => `dogitem/delete/${id}`
};

const dogApi = {
  // getAll: async () => {
  //   try {
  //     const response = await publicClient.get(
  //       endpoints.getAll
  //     );
  //     return { response };
  //   } catch (err) {
  //     return { err };}
  // },
  getAllDog: async () => {
    try {
      const response = await privateClient.get(
        endpoints.getAllAdmin
      );
      // console.log(response);
      return { response };
    } catch (err) {
      return { err };}
  },
  getDogByIdAdmin: async ({ id }) => {
    try {
      const response = await privateClient.get(
        endpoints.getDogByIdAdmin({ id })
      );
      return { response };
    } catch (err) {
      return { err };}
  },
  editDogById: async ({ DogName, Images, DogSpecies, Price,
    HealthStatus, Origin, Sex, Description, Color, Age, id, IsInStock
  }) => {
    try {
      const newDogSpecies = convertDogSpecies(DogSpecies);
      const response = await privateClient.put(
        endpoints.editDogById({ id }),
        {
          DogName, Images, DogSpecies: newDogSpecies, Price,
          HealthStatus, Origin, Sex, Description, Color, Age, IsInStock
        }
      );
      return { response };
    } catch (err) {
      return { err };}
  },
  addDog: async ({ DogName, Images, DogSpecies, Price,
    HealthStatus, Origin, Sex, Description, Color, Age
  }) => {
    try {
      const newDogSpecies = convertDogSpecies(DogSpecies);
      const response = await privateClient.post(
        endpoints.add,
        {
          DogName, Images, DogSpecies: newDogSpecies, Price,
          HealthStatus, Origin, Sex, Description, Color, Age
        }
      );
      return { response };
    } catch (err) {
      return { err };}
  },
  deleteDog: async ({ id }) => {
    try {
      const response = await privateClient.delete(
        endpoints.deleteDog({ id })
      );
      return { response };
    } catch (err) {
      return { err };}
  }
};

export default dogApi;