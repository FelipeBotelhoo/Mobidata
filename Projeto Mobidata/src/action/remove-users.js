import axios from "axios";

export const removeUsers = async (userId) => {
    try {
      const response = await axios.delete(`http://localhost:5000/users/${userId}`);
      if (response.status === 200) {
        return { success: true, message: 'Usuário removido com sucesso!' };
      }
    } catch (error) {
      console.error('Erro ao remover usuário:', error);
      return { success: false, message: 'Erro ao tentar remover o usuário!' };
    }
  };