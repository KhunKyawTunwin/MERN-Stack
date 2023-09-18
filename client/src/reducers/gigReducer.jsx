export const INITIAL_STATE = {
  userId: JSON.parse(localStorage.getItem("currentUser"))?.userId,
  title: "",
  cat: "",
  cover: "",
  images: "",
  desc: "",
  shortTitle: "",
  shortDesc: "",
  endDate: 0,
  revisionNumber: 0,
  features: [],
  price: 0,
};

export const gigReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case "CHANGE_INPUT":
      return { ...state, [payload.name]: payload.value };
    case "ADD_IMAGES":
      return {
        ...state,
        cover: payload.cover,
        images: payload.images,
      };
    case "ADD_FEATURES":
      return { ...state, features: [...state.features, payload] };
    case "REMOVE_FEATURE":
      return {
        ...state,
        features: state.features.filter((feature) => feature !== payload),
      };

    default:
      return state;
  }
};
