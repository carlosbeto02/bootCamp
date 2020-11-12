const { request, response } = require('express');
const express = require ('express'); //importar biblioteca express
const { uuid, isUuid } = require ('uuidv4'); //yarn add uuidv4

const app = express(); // varival app = a express 

app.use(express.json());// para entender arquivos e informacoes json

/**
 * Metodo HTTP:
 * 
 * GET: Buscar informacao do back-end
 * POST: Criar uma informao no back-end
 * PUT/PATCH: Alterar uma inforamcao back-end / Put todas a informacoes / Patch uma unica informacao
 * DELETE: deletar uma informcao no back end
 */

 /** 
  * Tipos de parametros
  * 
  * Query Params: filtros e paginacao
  * Route Params: atualizar ou deletar =/:id
  * Request Body: conteudo na hr de criar ou alterar (JSON)
 */

 /**
  * Middware:
  * 
  * Interceptador de requisicoes que interrompe totalmente a requisicao ou alterar dado da requisicao
  *  
  */ 
const projects = [];
/* Middware */
function logRequests ( request, response, next){
    const {method, url } = request;

    const logLabel = `[${method.toUpperCase()}] ${url}`;

    console.log(logLabel);

    return next();
}
/* Middware */
function validateProjectId(request, response, next) {
    const { id } = request.params;

    if (!isUuid(id)){
        return response.status(400).json({ error: 'Error Id porject'});
    }

    return next();
}

app.use(logRequests);

app.use('/projects/:id', validateProjectId);

app.get ('/projects', (request,response) => { // app.get ("rota para observar", (request(requisisao),response(resposta))
//condicao pra buscar algo especifico
/*const { title, owner} = request.query; 
 const results = {title, owner}
    ? projects.filter(project => project.owner.includes(owner) || project.title.includes(title))
    :projects */

return response.json(projects);//trocar a variavel projects caso usar a condicao 

/* const { title, owner } = request.query;
    console.log(title);
    console.log(owner);  */   
    //ou
    /*const query = request.query;
    console.log(query);*/

    //return response.send("hellou world"); //ela precisa retornar algo, no caso o response. return response.(escolha o q retornar) send retorna um texto 
    /* return response.json([
        'Projeto 1',
        'Projeto 2'
    ]); */ //sempre usaremos json, json retorna vetor = [] ou objeto = {}
});
// cirar 
app.post('/projects', (request,response) =>{ 
    const { title, owner} = request.body;
    //const body = request.body;

    const project = { id: uuid(), title, owner};

    projects.push(project);

    return response.json(project);

    /* console.log(title);
    console.log(owner);

    return response.json([
        'Projeto 1',
        'Projeto 2',
        'Projeto 3' */

});
// alterar 
app.put('/projects/:id', (request,response) =>{
    const { id } = request.params;
    //ou
    //const params = request.params;
    const {title, owner} = request.body;
    //console.log(id);

    const projectIndex = projects.findIndex(project => project.id === id);

    if (projectIndex < 0){
        return response.status(400).json({ error: 'Project not found !'});
    }
    const project = {
        id,
        title,
        owner,
    };

    projects[projectIndex] = project;

    return response.json(project);
    /* return response.json([
        'Projeto 1',
        'Projeto 2'
    ]); */
});
// deletar 
app.delete ('/projects/:id', (request,response) =>{
const {id} = request.params
//const {title, owner} = request.body;

const projectIndex = projects.findIndex(project => project.id === id);
if (projectIndex < 0){
    return response.status(400).json({ error: 'Project not found !'});
} 

projects.splice(projectIndex, 1);

return response.status(204).send('REMOVIDO'); //remove a funca ostatus para aparecer a mensagem 

/*     return response.json([
        'Porjeto 1',
        'Projeto 5'
    ]); */
});

app.listen(3333, () =>{ //porta que rodara o Node apos a virgula funcao para mostar uma mensagem que o node foi estartado
    console.log('🚀 Back-end started!')
}); 