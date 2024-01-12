

const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');  // Middleware para lidar com CORS
const app = express();

app.use(cors());  // Usar CORS para permitir solicitações de diferentes origens
app.use(express.json());  // Habilitar o uso de JSON no corpo das solicitações

// Configuração do banco de dados MySQL
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'mobidata'
};

// Rota para obter todos os usuários
app.get('/users', async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);

    // Query para buscar usuários ordenados por ordem alfabética e ativos primeiro
    const [rows] = await connection.query('SELECT * FROM usuarios ORDER BY situacao ASC, nome ASC');

    await connection.end();

    res.json({ users: rows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Rota para criar um novo usuário
app.post('/users', async (req, res) => {
  try {
    const { nome, email, cpf, cep, rua, numero, complemento, bairro, cidade, uf } = req.body;
    const connection = await mysql.createConnection(dbConfig);
    const query = 'INSERT INTO usuarios (nome, email, cpf, cep, rua, numero, complemento, bairro, cidade, uf) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    const values = [nome, email, cpf, cep, rua, numero, complemento, bairro, cidade, uf];
    const [result] = await connection.query(query, values);
    await connection.end();
    res.status(201).json({ message: 'Usuário inserido com sucesso!', insertedId: result.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Rota para atualizar um usuário existente
app.put('/users/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const { nome, email, cpf, cep, rua, numero, complemento, bairro, cidade, uf, situacao } = req.body;
    const connection = await mysql.createConnection(dbConfig);
    const query = `
      UPDATE usuarios
      SET nome = ?, email = ?, cpf = ?, cep = ?, rua = ?, numero = ?, complemento = ?,
      bairro = ?, cidade = ?, uf = ?, situacao = ?
      WHERE id = ?
    `;
    const values = [nome, email, cpf, cep, rua, numero, complemento, bairro, cidade, uf, situacao, userId];
    const [result] = await connection.query(query, values);
    await connection.end();
    if (result.affectedRows > 0) {
      res.json({ message: 'Usuário atualizado com sucesso!' });
    } else {
      res.status(404).json({ message: 'Usuário não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Rota para atualizar o status de um usuário (Ativar/Desativar)
app.put('/users/:id/changeStatus/:newStatus', async (req, res) => {
  try {
    const userId = req.params.id;
    const newStatus = req.params.newStatus;
    const connection = await mysql.createConnection(dbConfig);
    const query = 'UPDATE usuarios SET situacao = ? WHERE id = ?';
    const [result] = await connection.query(query, [newStatus, userId]);
    await connection.end();
    if (result.affectedRows > 0) {
      res.json({ message: `Status do usuário atualizado para ${newStatus} com sucesso!` });
    } else {
      res.status(404).json({ message: 'Usuário não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Rota para excluir um usuário
app.delete('/users/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const connection = await mysql.createConnection(dbConfig);
    const query = 'DELETE FROM usuarios WHERE id = ?';
    const [result] = await connection.query(query, [userId]);
    await connection.end();
    if (result.affectedRows > 0) {
      res.json({ message: 'Usuário removido com sucesso!' });
    } else {
      res.status(404).json({ message: 'Usuário não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Iniciar o servidor na porta 5000
app.listen(5000, () => {
  console.log('Servidor rodando na porta 5000');
});
