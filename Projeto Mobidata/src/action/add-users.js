import axios from "axios";
export const addUsers = async(userData) =>{
    try {
      console.log(userData)
        await axios.post('http://localhost:5000/users', userData); // Envia os dados para o backend
        // Após a inserção bem-sucedida, você pode fazer algo, como limpar o formulário ou exibir uma mensagem de sucesso
      return true;
      } catch (error) {
        console.error('Erro ao inserir usuário:', error);
        return false;
      }
}