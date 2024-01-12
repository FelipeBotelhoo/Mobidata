import './searchUsers.style.css';
import { RiUserSearchLine } from "react-icons/ri";

export const SearchUsers = ({ searchValue, handleChange }) => {
  return (
    <div className='input-container'>
          <div className='icon-container'>
        <RiUserSearchLine className='search-icon' />
      </div>
      <input
        className='input-text'
        onChange={handleChange}
        value={searchValue}
        type="search"
        placeholder="Digite o nome ou CPF para buscar o usuário."
      />
  
    </div>
  );
};
