import axios from "axios";
export const getCurrUser = async () => {
  const currUser = await axios.get(
    "https://ticketing.dev/api/users/currentuser"
  );
  return currUser.data.currentUser;
};
