module.exports = {


    //função com as informações que precisamos como parâmetro
    user:(app, req, res)=>{


        //valida o campo name, se não tiver válido escreva mensagem

        req.assert('name', 'O nome é obrigatório.').notEmpty();
        req.assert('email', 'O e-mail está inválido.').notEmpty().isEmail();

        //para mostrar os erros na tela
        let errors = req.validationErrors();

        //verfica se a variável está existindo, pq se tiver erros ela vai retornar um array
        if (errors) {

            app.utils.error.send(errors, req, res);
            return false;//para a execução da página

        } else {

            //se não acontecer nenhum problema
            return true;

        }

    }

};