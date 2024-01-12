import axios from "axios";

export const updateUser = async (userData) => {
  try {
    const response = await axios.put(`http://localhost:5000/users/${userData.id}`, userData);
    if (response.status === 200) {
      return true; 
    } else {
      return false; 
    }
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    return false; 
  }
};