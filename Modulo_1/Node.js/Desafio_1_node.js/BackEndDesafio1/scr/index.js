const { request, response } = require('express');
const express = require('express');

const app = express();
const { uuid, isUuid } = require ('uuidv4');

app.use(express.json());

const repositories = [];

function validateRoteId(request,response,next){
    const {id} = request.params;

    if (!isUuid(id)){
        return response.status(400).json({ error:"Id not fauld !!!"})
    }
    return next();
}

app.use('/desafio/:id', validateRoteId);

//buscar
app.get('/desafio', (request,response) =>{

    return response.json(repositories);
});
//criar
app.post('/desafio', (request,response) => {
    const {title, url, techs, } = request.body;

    const repository = {id:uuid(), title, url, techs, likes: 0};

    repositories.push(repository);

    return response.json(repository);
});
//att
app.put('/desafio/:id', (request,response) =>{
    const { id } = request.params;
    const {title, url, techs} = request.body;

    const repositoryIndex = repositories.findIndex(repository => repository.id ===id);

    if (repositoryIndex < 0){
        return response.status(400).json({ error: 'Repository not faund !!'});
    }

    const repository = {
        id,
        title,
        url,
        techs,
        likes: repositories[repositoryIndex].likes,
    };

    repositories[repositoryIndex] = repository;

    return response.json(repository);
});
//deletar
app.delete('/desafio/:id', (request,response) =>{
    const { id } = request.params;

    const repositoryIndex = repositories.findIndex(repository => repository.id ===id);

    if (repositoryIndex < 0){
        return response.status(400).json({ error: 'Repository not faund !!'});
    }

    repositories.splice(repositoryIndex, 1);

    return response.status(204).send();
});
//add like
app.post('/desafio/:id/like', (request,response) =>{
    const { id } = request.params;

    const repositoryIndex = repositories.findIndex(repository => repository.id ===id);

    if (repositoryIndex < 0){
        return response.status(400).json({ error: 'Repository not faund !!'});
    }
    
    repositories[repositoryIndex].likes ++; 

    return response.json(repositories[repositoryIndex]);

});

app.listen(3333, () =>{
    console.log('🎈 Desafio Noje.js started !')
});
