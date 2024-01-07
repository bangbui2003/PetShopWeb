const categories = [
  { label: "Golden Retriever", id: 1 },
  { label: "Alaska", id: 2 },
  { label: "Husky", id: 3 },
  { label: "Corgi", id: 4 },
  { label: "Doberman", id: 5 },
  { label: "Pitbull", id: 6 },
  { label: "Lạp Xưởng", id: 7 },
  { label: "Poodle", id: 8 },
  { label: "Chihuahua", id: 9 },
  { label: "Shiba", id: 10 },
  { label: "Bulldog", id: 11 },
  { label: "Beagle", id: 12 }
];

export const convertDogSpecies = (name) => {
  const dog = categories.find((category) => category.label.toLowerCase() === name.toLowerCase());
  if (dog) {
    return dog.id;
  } else {
    return null;
  }
};
export const convertDogSpeciesToName = (id) => {
  const dog = categories.find((category) => category.id === id);
  if (dog) {
    return dog.label;
  } else {
    return null;
  }
};