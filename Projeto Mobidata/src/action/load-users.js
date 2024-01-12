import axios from "axios";

export const loadUsers = async() =>{

 try {
    const response = await axios.get('http://localhost:5000/users'); 
    const users = response.data.users; 

    return users;
  } catch (error) {
    console.error('Erro ao carregar usuários:', error);
  }
}
