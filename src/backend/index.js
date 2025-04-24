const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

// Buscar todos os membros
app.get('/members', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM members');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao buscar membros');
  }
});

// Buscar membro por ID
app.get('/members/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('SELECT * FROM members WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).send('Membro não encontrado');
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Erro ao buscar membro por ID:', err);
    res.status(500).send('Erro ao buscar membro');
  }
});

// Criar novo membro
app.post('/members', async (req, res) => {
  const { name, cpfcnpj, email, research, proficiencies, education, awards, category, bio, image_url, linkedin_url } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO members (name, cpfcnpj, email, research, proficiencies, education, awards, category, bio, image_url, linkedin_url) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *',
      [name, cpfcnpj, email, research, proficiencies, education, awards, category, bio, image_url, linkedin_url]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Erro ao criar membro:', err);
    res.status(500).send('Erro ao criar membro');
  }
});

// Atualizar membro
app.put('/members/:id', async (req, res) => {
  const { id } = req.params;
  const { name, cpfcnpj, email, research, proficiencies, education, awards, category, bio, image_url, linkedin_url } = req.body;

  try {
    const result = await pool.query(
      'UPDATE members SET name = $1, cpfcnpj = $2, email = $3, research = $4, proficiencies = $5, education = $6, awards = $7, category = $8, bio = $9, image_url = $10, linkedin_url = $11 WHERE id = $12 RETURNING *',
      [name, cpfcnpj, email, research, proficiencies, education, awards, category, bio, image_url, linkedin_url, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).send('Membro não encontrado');
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Erro ao atualizar membro:', err);
    res.status(500).send('Erro ao atualizar membro');
  }
});

// Deletar membro
app.delete('/members/:id', async (req, res) => {
  const { id } = req.params;

  if (isNaN(id)) {
    return res.status(400).send('ID inválido');
  }

  try {
    const result = await pool.query('DELETE FROM members WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).send('Membro não encontrado');
    }

    res.sendStatus(204); // sucesso, sem corpo
  } catch (err) {
    console.error('Erro ao deletar membro:', err);
    res.status(500).send('Erro ao deletar membro');
  }
});

//Projects

app.get('/projects', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM projects');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao buscar projetos');
  }
});


app.get('/projects/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('SELECT * FROM projects WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).send('Projeto não encontrado');
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Erro ao buscar membro por ID:', err);
    res.status(500).send('Erro ao buscar membro');
  }
});

app.delete('/projects/:id', async (req, res) => {
  const { id } = req.params;

  if (isNaN(id)) {
    return res.status(400).send('ID inválido');
  }

  try {
    const result = await pool.query('DELETE FROM projects WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).send('Projeto não encontrado');
    }

    res.sendStatus(204); // sucesso, sem corpo
  } catch (err) {
    console.error('Erro ao deletar projeto:', err);
    res.status(500).send('Erro ao deletar projeto');
  }
});

app.post('/projects', async (req, res) => {
  const { nome_project, descri, image_url, key_features } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO projects (nome_project, descri, image_url, key_features) VALUES ($1, $2, $3, $4) RETURNING *',
      [nome_project, descri, image_url, key_features]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Erro ao criar projeto:', err);
    res.status(500).send('Erro ao criar Projeto');
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`API rodando em http://localhost:${PORT}`);
});
