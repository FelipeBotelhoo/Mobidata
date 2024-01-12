import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Forms } from '../Form';
import { Dialog } from '../Dialog';
import { Toasts } from '../Toasts';


import { changeStatus } from '../../action/change-status';
import Logo from '../../img/logopngwhite.png';
import './modal.style.css';

export const ModalOpen = ({ userClicked, closeModal }) => {
  // Estados para controle da modal e feedbacks visuais
  const [isEditing, setIsEditing] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  // Habilita o modo de edição ao clicar no botão "Editar"
  const handleEdit = () => {
    if (!isEditing) {
      setIsEditing(true);
    }
  };

  // Solicita confirmação antes de mudar o status do usuário
  const handleChangeStatus = async () => {
    setShowConfirmation(true);
  };

  // Confirma a ação de mudança de status e exibe feedback ao usuário
  const handleConfirmAction = async () => {
    try {
      await changeStatus(userClicked.id, userClicked.situacao);
      setShowConfirmation(false);

      let actionMessage = '';
      if (userClicked.situacao === 'Ativo') {
        actionMessage = 'Desativado';
      } else if (userClicked.situacao === 'Inativo') {
        actionMessage = 'ativado';
      }

      setToastMessage(`Usuário ${actionMessage} com sucesso!`);
      setShowToast(true);

      // Fecha a modal após um curto intervalo e reseta o estado de edição
      setTimeout(() => {
        setShowToast(false);
        closeModal();
        setIsEditing(false);
      }, 2000);
    } catch (error) {
      console.error('Erro ao alterar o status do usuário:', error);
    }
  };

  return (
    <>
      {/* Componente Modal do Bootstrap */}
      <Modal
        show={true}
        onHide={closeModal}
        container={document.getElementById('modal-container')}
      >
        <Modal.Header closeButton onClick={closeModal}>
        <img src={Logo} alt="logo" className='logo' />
          <Modal.Title className='titulo-infomodal'>Informações</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {/* Componente de formulário, passando propriedades de usuário e controle de edição */}
          <Forms userClicked={userClicked} isDisabled={!!userClicked && !isEditing} disableEditing={() => setIsEditing(false)} />
        </Modal.Body>

        {userClicked && !isEditing && (
          <Modal.Footer>
            {/* Botão de edição */}
            <Button variant="secondary" onClick={handleEdit}>
              Editar
            </Button>

            {/* Botão para ativar/desativar usuário */}
            {userClicked.situacao === 'Ativo' ? (
              <Button variant="warning" onClick={handleChangeStatus}>
                Desativar Usuário
              </Button>
            ) : (
              <Button variant="primary" onClick={handleChangeStatus}>
                Ativar Usuário
              </Button>
            )}
          </Modal.Footer>
        )}
      </Modal>

      {/* Componente de confirmação, exibido ao tentar ativar/desativar usuário */}
      {userClicked && (
        <Dialog
          show={showConfirmation}
          onHide={() => setShowConfirmation(false)}
          onConfirm={handleConfirmAction}
          message={`Deseja confirmar a ação para ${userClicked.situacao === 'Ativo' ? 'desativar' : 'ativar'
            } o usuário?`}
        />
      )}

      {/* Componente de feedback (Toasts) para exibir mensagens ao usuário */}
      <Toasts
        show={showToast}
        onClose={() => setShowToast(false)}
        message={toastMessage}
      />
    </>
  );
};

export default ModalOpen;
