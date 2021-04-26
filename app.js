const express = require('express');
const mongoose = require('mongoose');

require('./models/Artigo');
const Artigo = mongoose.model('artigo');

const app = express();

app.use(express.json());

mongoose.connect('mongodb://localhost/node-api', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("Conexão com MongoDB realizada")
}).catch((erro) => {
  console.log("ERROR: Falha ao realizar a conexão com banco de dados");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000...")
})

app.get("/", (req, res) => {
  return res.json({ message: "Criando APIs em Node.js" });
})

app.post("/artigos", (req, res) => {
  const artigo = Artigo.create(req.body, (err) => {
    if (err) return res.status(400).json({
      error: true,
      message: "Erro ao cadastrar artigo"
    })

    return res.status(200).json({
      error: false,
      message: "Artigo cadastado com sucesso!"
    })
  });
})