-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 10/01/2024 às 20:46
-- Versão do servidor: 10.4.28-MariaDB
-- Versão do PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `mobidata`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `cpf` varchar(14) NOT NULL,
  `cep` varchar(9) NOT NULL,
  `rua` varchar(100) DEFAULT NULL,
  `numero` varchar(10) DEFAULT NULL,
  `complemento` varchar(100) DEFAULT NULL,
  `bairro` varchar(50) DEFAULT NULL,
  `cidade` varchar(50) DEFAULT NULL,
  `uf` char(2) DEFAULT NULL,
  `situacao` varchar(50) DEFAULT 'Ativo'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `usuarios`
--

INSERT INTO `usuarios` (`id`, `nome`, `email`, `cpf`, `cep`, `rua`, `numero`, `complemento`, `bairro`, `cidade`, `uf`, `situacao`) VALUES
(1, 'Felipe 1', 'usuario1@email.com', '111.111.111-11', '12345-678', 'Rua A', '123', 'Apto 1', 'Bairro X', 'Cidade 1', 'UF', 'Ativo'),
(2, 'Debora 2', 'usuario2@email.com', '222.222.222-22', '23456-789', 'Rua B', '234', 'Apto 2', 'Bairro Y', 'Cidade 2', 'UF', 'Ativo'),
(3, 'Laura 3', 'usuario3@email.com', '333.333.333-33', '34567-890', 'Rua C', '345', 'Apto 3', 'Bairro Z', 'Cidade 3', 'UF', 'Ativo'),
(4, 'Isacc 4', 'usuario4@email.com', '444.444.444-44', '45678-901', 'Rua D', '456', 'Apto 4', 'Bairro W', 'Cidade 4', 'UF', 'Ativo'),
(5, 'Felipe 5', 'usuario5@email.com', '555.555.555-55', '56789-012', 'Rua E', '567', 'Apto 5', 'Bairro V', 'Cidade 5', 'UF', 'Ativo'),
(6, 'Felipe Luiz 6', 'usuario6@email.com', '666.666.666-66', '67890-123', 'Rua F', '678', 'Apto 6', 'Bairro U', 'Cidade 6', 'UF', 'Ativo'),
(7, 'Claudia 7', 'usuario7@email.com', '777.777.777-77', '78901-234', 'Rua G', '789', 'Apto 7', 'Bairro T', 'Cidade 7', 'UF', 'Ativo'),
(8, 'Maria 8', 'usuario8@email.com', '888.888.888-88', '89012-345', 'Rua H', '890', 'Apto 8', 'Bairro S', 'Cidade 8', 'UF', 'Ativo'),
(9, 'Jhonata 9', 'usuario9@email.com', '999.999.999-99', '90123-456', 'Rua I', '901', 'Apto 9', 'Bairro R', 'Cidade 9', 'UF', 'Ativo');

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `cpf` (`cpf`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
