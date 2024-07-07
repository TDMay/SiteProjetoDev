import express from 'express';

const app = express();

app.use(express.json());

const Users = [{ id: 1, name: 'celso', age: 16, email: 'celso@gmail.com' }]; // array de teste pra inserir os usuários

//Listando usuarios
app.get('/user', (req, res) => {
  res.status(200).json(Users);
});


// Criando Usurios
app.post('/user', (req, res) => {
  const { username, age, email, password } = req.body;

  // Verificação simples para campos obrigatórios
  if (!username || !age || !email || !password) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
  }

  const user = {
    id: Users.length + 1,
    username,
    age,
    email,
    password
  };

  Users.push(user);

  return res.status(201).json(user);
});

// Atualizar dados do usuário
app.put('/user/:id', (req, res) => {
  const { id } = req.params;
  const { username, age, email, password } = req.body;

  // Encontrar o índice do usuário no array
  const userIndex = Users.findIndex(user => user.id === parseInt(id));

  // Verificar se o usuário existe
  if (userIndex === -1) {
    return res.status(404).json({ error: 'Usuário não encontrado' });
  }

  // Atualizar os campos do usuário
  Users[userIndex].username = username;
  Users[userIndex].age = age;
  Users[userIndex].email = email;
  Users[userIndex].password = password;

  // Retornar o usuário atualizado
  return res.status(200).json(Users[userIndex]);
});

app.delete('/user/:id', (req, res) => {
  const { id } = req.params;
  // Verificar o index do usuario no array
  const userIndex = Users.findIndex(user => user.id === parseInt(id));

  // Verificar se usuario existe
  if (userIndex === -1) {
    return res.status(404).json({ error: 'Usuario não encontrado' });
  }
  // Deletar usuario
  Users.splice(userIndex, 1);
  return res.status(200).json({ message: 'Usuario deletado com sucesso' });
})

// Servidor rodando em http://localhost:3333
app.listen(3333, () => {
  console.log('Servidor rodando em http://localhost:3333');
});
