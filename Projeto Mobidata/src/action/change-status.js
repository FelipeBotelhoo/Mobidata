import axios from "axios";

export const changeStatus = async (userId, currentStatus) => {
  const newStatus = currentStatus === 'Ativo' ? 'Inativo' : 'Ativo';

  try {
    const response = await axios.put(`http://localhost:5000/users/${userId}/changeStatus/${newStatus}`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};