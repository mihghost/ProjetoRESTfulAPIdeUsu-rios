

//função que será exportada como um módulo
//1 abrimos um objetos para exportarmos
//2 criamos a função send

module.exports = {
    send: (err, req, res, code = 400)=>{

        console.log(`error: ${err}`);
        res.status(code).json({
            error: err
        });

    } 
};