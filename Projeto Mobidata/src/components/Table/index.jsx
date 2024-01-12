import React, { useState } from 'react';
import { FaEye, FaTrashAlt } from 'react-icons/fa';
import ReactPaginate from 'react-paginate';
import './table.style.css';
import { Dialog } from '../Dialog';
import { Toasts } from '../Toasts';

export const Table = ({ users, openModal, handleDelete }) => {
  const itemsPerPage = 5; // Definir a quantidade de itens por página
  const [currentPage, setCurrentPage] = useState(0);
  const [userToDelete, setUserToDelete] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const pageCount = Math.ceil(users.length / itemsPerPage);

  const handlePageChange = ({ selected }) => {
    // Atualiza a página atual quando a paginação muda
    setCurrentPage(selected);
  };

  const handleDialog = async (confirm) => {
    if (confirm) {
      // Executa a exclusão do usuário quando a ação é confirmada
      await handleDelete(userToDelete);
      setShowToast(true);
      setUserToDelete(null);
    }
    // Fecha o Dialog após a execução da ação
    setShowDialog(false);
  };

  const handleDeleteClick = (userId) => {
    // Configura o usuário a ser excluído e exibe o Dialog de confirmação
    setUserToDelete(userId);
    setShowDialog(true);
  };

  const displayedUsers = users.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  return (
    <div className="table-container">
      <table className="custom-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th className='campo-email'>Email</th>
            <th>CPF</th>
            <th className='campo-uf'>UF</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          {displayedUsers.map((user) => (
            <tr key={user.id}>
              <td className="nome-usuario">{user.nome}</td>
              <td className='campo-email'>{user.email}</td>
              <td>{user.cpf}</td>
              <td className='campo-uf'>{user.uf}</td>
              <td>{user.situacao}</td>
              <td>
                {/* Ícones para visualizar e deletar usuário */}
                <FaEye className="icon-tabela-visualizar" onClick={() => openModal(user)} />
                <FaTrashAlt className="icon-tabela-deletar" onClick={() => handleDeleteClick(user.id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Paginação */}
      <ReactPaginate
        pageCount={pageCount}
        pageRangeDisplayed={2}
        marginPagesDisplayed={1}
        onPageChange={handlePageChange}
        containerClassName="pagination-container"
        activeClassName="active"
      />

      {/* Componente Dialog para confirmação de exclusão */}
      <Dialog
        show={showDialog}
        onHide={() => setShowDialog(false)}
        onConfirm={() => handleDialog(true)}
        message="Tem certeza de que deseja remover este usuário?"
      />

      {/* Componente Toasts para exibir mensagens de sucesso */}
      <Toasts
        show={showToast}
        onClose={() => setShowToast(false)}
        message="Usuário removido com sucesso!"
      />
    </div>
  );
};
