const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database")
const Asks = require("./database/Asks");
const Resposta = require("./database/Resposta")
//Database
connection
    .authenticate()
    .then(() => {
        console.log("Conexão feita com o banco de dados!")
    })
    .catch((msgerr) => {
        console.log(msgerr);
    })
//Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.set('view engine', 'ejs');
app.use(express.static('public'))

app.get("/", (req, res) => {
    Asks.findAll({
        raw: true, order: [
            ['id', 'DESC']
        ]
    }).then(asks => {
        res.render("index", {
            asks: asks
        });
    });
});
app.get("/perguntar", (req, res) => {
    res.render("perguntar");
});
app.post("/salvar", (req, res) => {
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    Asks.create({
        titulo: titulo,
        descricao: descricao
    }).then(() => {
        res.redirect("/");
        console.log("Done!");
    });
});
app.get("/pergunta/:id", (req, res) => {
    var id = req.params.id;
    Asks.findOne({
        where: { id: id }
    }).then(pergunta => {
        if (pergunta != undefined) {
            Resposta.findAll({
                where: {perguntaid: pergunta.id},
                order: [
                     ['id','DESC']
                ]   
            }).then(resposta => {
                res.render("pergunta", {
                    pergunta: pergunta,
                    resposta: resposta
                });
            });

        }
        else {
            res.redirect("/");
        }
    });
});
app.post("/resposta", (req, res) => {
    var body = req.body.body;
    var perguntaid = req.body.pergunta;
    Resposta.create({
        body: body,
        perguntaid: perguntaid
    }).then(() => {
        res.redirect(`/pergunta/+${perguntaid}`);
    })
})
app.listen(8080, () => { console.log("App rodando"); });
