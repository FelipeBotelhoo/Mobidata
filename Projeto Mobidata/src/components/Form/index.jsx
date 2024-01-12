import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Toasts } from '../Toasts';
import { Options } from '../Options';
import { Dialog } from '../Dialog';
import InputMask from 'react-input-mask';
import { addUsers } from '../../action/add-users';
import { updateUser } from '../../action/update-users';
import axios from 'axios';
import './form.style.css';

export const Forms = ({ userClicked, isDisabled, disableEditing }) => {
  // Estado para armazenar os dados do usuário em edição
  const [editedUser, setEditedUser] = useState({ ...userClicked });
  // Estados para exibir o Toast e a mensagem de confirmação
  const [showToast, setShowToast] = useState(false);
  const [message, setMessage] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Função para buscar endereço por CEP utilizando a API ViaCep
  const fetchAddressByCEP = async (cep) => {
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      const { logradouro, complemento, bairro, localidade, uf } = response.data;

      // Atualiza os campos de endereço no estado
      setEditedUser({
        ...editedUser,
        rua: logradouro,
        complemento,
        bairro,
        cidade: localidade,
        uf,
      });
    } catch (error) {
      console.error('Erro ao buscar endereço:', error);
      handleErrorMessage('Erro ao buscar endereço');
    }
  };

  // Função para lidar com a alteração de valores nos campos do formulário
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Atualiza o estado com os dados inseridos
    setEditedUser({
      ...editedUser,
      [name]: value,
    });

    // Se o campo alterado for o CEP e atingir o tamanho esperado, busca o endereço
    if (name === 'cep' && value.length === 9) {
      fetchAddressByCEP(value.replace('-', ''));
    }
  };

  // Função para lidar com o blur do campo CEP
  const handleCepBlur = async (e) => {
    const { value } = e.target;
    const cepWithoutMask = value.replace(/\D/g, '');
    const cepWithMask = cepWithoutMask.replace(/^(\d{5})(\d{3})/, '$1-$2');

    // Atualiza o estado com o valor formatado do CEP
    setEditedUser({
      ...editedUser,
      cep: cepWithMask,
    });

    // Se o CEP sem máscara atingir o tamanho esperado, busca o endereço
    if (cepWithoutMask.length === 8) {
      await fetchAddressByCEP(cepWithoutMask);
    }
  };

  // Função para lidar com o envio do formulário
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Cria um objeto FormData a partir do evento do formulário
    const formData = new FormData(e.target);
    // Converte o FormData para um objeto de dados
    const userData = Object.fromEntries(formData.entries());

    // Verifica se é uma adição ou uma atualização
    if (!userData.id || userData.id === '') {
      try {
        // Tenta adicionar um novo usuário
        const response = await addUsers(userData);

        if (response) {
          // Exibe mensagem de sucesso e limpa os campos do formulário
          handleErrorMessage('Usuário cadastrado com sucesso!');

          setEditedUser({
            id: '',
            nome: '',
            email: '',
            cpf: '',
            cep: '',
            rua: '',
            numero: '',
            complemento: '',
            bairro: '',
            cidade: '',
            uf: '',
          });
        } else {
          handleErrorMessage('Erro ao tentar cadastrar usuário!');
          setShowToast(true);
        }
      } catch (error) {
        console.error('Erro ao inserir usuário:', error);
      }
    } else {
      // Se for uma atualização, exibe a confirmação
      const isEmpty = Object.values(userData).some((value) => value === '');
      if (isEmpty) {
        console.log('Por favor, preencha todos os campos!');
        return;
      }
      setShowConfirmation(true);
    }
  };

  // Função para lidar com a confirmação da ação de atualização
  const handleConfirmAction = async () => {
    try {
      // Tenta realizar a atualização do usuário
      const response = await updateUser({
        ...editedUser,
        id: editedUser.id,
      });

      if (response) {
        // Exibe mensagem de sucesso e desabilita a edição
        handleErrorMessage('Usuário atualizado com sucesso!');
        disableEditing();
      } else {
        handleErrorMessage('Erro ao tentar atualizar o usuário!');
      }

      setShowConfirmation(false);
    } catch (error) {
      console.error('Erro ao realizar a ação:', error);
    }
  };

  // Função para exibir mensagens de erro
  const handleErrorMessage = (errorMessage) => {
    setMessage(errorMessage);
    setShowToast(true);
  };

  return (
    <>
      {/* Formulário de Usuário */}
      <Form onSubmit={handleSubmit} className="form-container">
        {/* Campo para o ID do usuário (oculto) */}
        <Form.Group className="mb-3" controlId="nome">
          <Form.Control
            type="text"
            name="id"
            placeholder="Insira o nome"
            value={isDisabled ? userClicked?.id || '' : editedUser?.id || ''}
            hidden
            onChange={handleInputChange}
          />
        </Form.Group>
        {/* Campo para o Nome do usuário */}
        <Form.Group className="mb-3" controlId="nome">
          <Form.Label>Nome</Form.Label>
          <Form.Control
            type="text"
            name="nome"
            placeholder="Insira o nome"
            value={isDisabled ? userClicked?.nome || '' : editedUser?.nome || ''}
            disabled={isDisabled}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        {/* Campo para o Email do usuário */}
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Insira o email"
            value={isDisabled ? userClicked?.email || '' : editedUser?.email || ''}
            disabled={isDisabled}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        {/* Campo para o CPF do usuário */}
        <Form.Group className="mb-3" controlId="cpf">
          <Form.Label>CPF</Form.Label>
          <div className="input-group">
            <InputMask
              mask="999.999.999-99"
              maskChar=""
              type="text"
              name="cpf"
              placeholder="000.000.000-00"
              value={isDisabled ? userClicked?.cpf || '' : editedUser?.cpf || ''}
              disabled={userClicked?.cpf ? !isDisabled : isDisabled}
              onChange={handleInputChange}
              className="form-control"
              required
            />
          </div>
        </Form.Group>
        {/* Campo para o CEP do usuário */}
        <Form.Group className="mb-3" controlId="cep">
          <Form.Label>CEP</Form.Label>
          <Form.Control
            type="text"
            name="cep"
            placeholder="00000-000"
            value={isDisabled ? userClicked?.cep || '' : editedUser?.cep || ''}
            disabled={isDisabled}
            onChange={handleInputChange}
            onBlur={handleCepBlur}
            required
          />
        </Form.Group>
        {/* Campos para o endereço do usuário */}
        <Form.Group className="mb-3" controlId="rua">
          <Form.Label>Rua</Form.Label>
          <Form.Control
            type="text"
            name="rua"
            placeholder="Insira o rua"
            value={isDisabled ? userClicked?.rua || '' : editedUser?.rua || ''}
            disabled={isDisabled}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="numero">
          <Form.Label>Numero</Form.Label>
          <Form.Control
            type="text"
            name="numero"
            placeholder="Insira o numero"
            value={isDisabled ? userClicked?.numero || '' : editedUser?.numero || ''}
            disabled={isDisabled}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="complemento">
          <Form.Label>Complemento</Form.Label>
          <Form.Control
            type="text"
            name="complemento"
            placeholder="Insira o complemento"
            value={isDisabled ? userClicked?.complemento || '' : editedUser?.complemento || ''}
            disabled={isDisabled}
            onChange={handleInputChange}
            
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="bairro">
          <Form.Label>Bairro</Form.Label>
          <Form.Control
            type="text"
            name="bairro"
            placeholder="Insira o bairro"
            value={isDisabled ? userClicked?.bairro || '' : editedUser?.bairro || ''}
            disabled={isDisabled}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="cidade">
          <Form.Label>Cidade</Form.Label>
          <Form.Control
            type="text"
            name="cidade"
            placeholder="Insira o cidade"
            value={isDisabled ? userClicked?.cidade || '' : editedUser?.cidade || ''}
            disabled={isDisabled}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="uf">
          <Form.Label>UF</Form.Label>
          {/* Dropdown para selecionar o UF */}
          <Form.Control
            as="select"
            name="uf"
            value={isDisabled ? userClicked?.uf || '' : editedUser?.uf || ''}
            disabled={isDisabled}
            onChange={handleInputChange}
            required
          >
            {/* Componente Options contendo as opções de UF */}
            <Options />
          </Form.Control>
        </Form.Group>
        {/* Campo para a Situação do usuário (apenas leitura) */}
        <Form.Group className="mb-3" controlId="situacao">
          {userClicked && userClicked.id >= 1 && (
            <>
              <Form.Label>Situação</Form.Label>
              <Form.Control
                type="text"
                name="situacao"
                placeholder="Insira o situacao"
                value={isDisabled ? userClicked?.situacao || '' : editedUser?.situacao || ''}
                disabled
                onChange={handleInputChange}
                required
              />
            </>
          )}
        </Form.Group>
        {/* Botão para atualizar o usuário (apenas se estiver editando) */}
        {userClicked && userClicked.id >= 1 && !isDisabled && (
          <Button variant="success" className='btn-atualizar' type="submit">
            Atualizar
          </Button>
        )}
        {/* Botão para adicionar o usuário (apenas se não estiver editando) */}
        {!userClicked && (
          <Button variant="primary" type="submit">
            Adicionar
          </Button>
        )}
      </Form>

      {/* Componente Toasts para exibir mensagens de sucesso/erro */}
      <Toasts show={showToast} onClose={() => setShowToast(false)} message={message} />

      {/* Componente Dialog para confirmação de ação */}
      <Dialog
        show={showConfirmation}
        onHide={() => setShowConfirmation(false)}
        onConfirm={handleConfirmAction}
        message={`Deseja confirmar a ${userClicked ? 'atualização' : 'adição'} do usuário?`}
      />
    </>
  );
};
