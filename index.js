const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const connection = require('./database/database');
const perguntaModel = require('./database/Pergunta');
const respostaModel = require('./database/Resposta');

connection.authenticate().then(() => {
  console.log('Conectado com sucesso');
}).catch((error) => {
  console.log(error);
});

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', (req, res) => { 
  perguntaModel.findAll({
      raw: true, 
      order: [
        ['id', 'DESC']
      ]
    }).then(perguntas => {
    res.render('index', {
      perguntas
    }); 
  })
});


app.get('/perguntar', (req, res) => { 
  res.render('perguntar'); 
});

app.post('/perguntas', (req, res) => {
  
  const titulo = req.body.titulo;
  const descricao = req.body.descricao;
  
  perguntaModel.create({
    titulo,
    descricao
  }).then(() => {
    res.redirect('/');
  });
  
});
app.get('/pergunta/:id', (req, res) => { 

  const id = req.params.id;

  perguntaModel.findOne({
    where: {id},
  }).then(pergunta => {
    if(pergunta) {
      
      respostaModel.findAll({
        where: {perguntaID: pergunta.id}
      }).then(respostas => {
        res.render('pergunta', {pergunta, respostas}); 
      })

    }else {
      res.redirect('/');
    }
  });

});

app.post('/resposta', (req, res) => {
  
  const corpo = req.body.corpo;
  const perguntaID = req.body.perguntaID;
  
  respostaModel.create({
    corpo,
    perguntaID
  }).then(() => {
    res.redirect(`/pergunta/${perguntaID}`);
  });
  
});

app.listen(port, () => {
  console.log('Server on');
});
