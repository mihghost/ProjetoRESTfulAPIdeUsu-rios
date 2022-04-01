let NeDB = require('nedb');
let db = new NeDB({
    filename:'users.db',
    autoload:true
});

module.exports = app => {

    let route = app.route('/users');//dentro de app temos o route que é um método, aqui colocamos qual é a rota padrão

    route.get((req, res) => {


        //para mostrar os dados do banco de dados
        //primeiro passamos o objeto do que queremos buscar, neste caso irá buscar todos os usuários, por isso o objeto está vazio
        //ordena por nome de forma crescente
        //para executar o comando temos dois parâmetros no exec
        //o 1 caso de um erro
        //2 a informação propriamente dita

        db.find({}).sort({name:1}).exec((err, users)=>{

            //se der errado
            if (err) {

               //utilizando o arquivo de erro
                app.utils.error.send(err, req, res);
            } else {

                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json({
                    //users:users ou
                    users
                });

            }

        });

    });

    route.post((req, res) => {

        //salva o registro dentro do banco
        //precisamos passar o objeto json que se quer salvar, uma função caso dê erro ao inserir, e responde com os dados do usuário, ou seja o registro que ficou salvo no banco de dados

       // se retornar falso retorna falso também, daí a execução para
        
        if (!app.utils.validator.user(app, req, res)) return false;
        
        db.insert(req.body, (err, user)=>{

            //se der errado
            if (err) {
                app.utils.error.send(err, req, res);
            } else {

                res.status(200).json(user);

            }

        });

    });

    let routeId = app.route('/users/:id');

    routeId.get((req, res) => {

        //localiza apenas um registro
        db.findOne({_id:req.params.id}).exec((err, user)=>{

            if (err) {
                app.utils.error.send(err, req, res);
            } else {
                res.status(200).json(user);
            }

        });

    });

    //editar

    routeId.put((req, res) => {
        
        if (!app.utils.validator.user(app, req, res)) return false;

        //localiza apenas um registro
        db.update({ _id: req.params.id }, req.body, err => {

            if (err) {
                app.utils.error.send(err, req, res);
            } else {
                res.status(200).json(Object.assign(req.params, req.body));//junta os dois objetos para mostrar os dados e o Id juntos
            }

        });

    });
    

    //remover
    routeId.delete((req, res)=>{

        db.remove({ _id: req.params.id }, {}, err=>{

            if (err) {
                app.utils.error.send(err, req, res);
            } else {
                res.status(200).json(req.params);
            }

        });

    });

};