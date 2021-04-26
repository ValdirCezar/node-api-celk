const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require('./models/Artigo');

const Artigo = mongoose.model('artigo');
const app = express();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  //Qual site tem permissão de realizar a conexão, no exemplo abaixo está o "*" indicando que qualquer site pode fazer a conexão
  res.header("Access-Control-Allow-Origin", "*");
  
  //Quais são os métodos que a conexão pode realizar na API
  res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
  app.use(cors());
  next();
});

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
  Artigo.find({}).then((artigos) => {
    return res.json(artigos);
  }).catch((error) => {
    return res.status(400).json({
      error: true,
      message: "Falha ao listar artigos"
    })
  })
})

app.get("/artigo/:id", (req, res) => {
  Artigo.findOne({ _id: req.params.id }).then((artigo) => {
    return res.json(artigo);
  }).catch((error) => {
    return res.json({
      error: true,
      message: "Falha ao localizar registro"
    })
  })
})

app.put("/artigo/:id", (req, res) => {
  Artigo.updateOne({ _id: req.params.id }, req.body, (error) => {
    if (error) return res.status(400).json({
      error: true,
      message: "Erro ao atualizar artigo"
    })

    return res.json({
      message: "Artigo atualizado com sucesso!"
    })
  })
})

app.post("/artigos", (req, res) => {
  Artigo.create(req.body, (err) => {
    if (err) return res.status(400).json({
      error: true,
      message: "Erro ao cadastrar artigo"
    })

    return res.status(200).json({
      error: false,
      message: "Artigo cadastado com sucesso!"
    })
  })
})

app.delete("/artigo/:id", (req, res) => {
  Artigo.deleteOne({ _id: req.params.id }, ((error) => {
    if (error) return res.status(400).json({
      error: true,
      message: "Erro ao deletar artigo"
    })

    return res.json({
      error: false,
      message: "Artigo deletado com sucesso!"
    })
  }))
})