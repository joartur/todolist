const inputTarefa = document.querySelector('.input-tarefa');
const inputHora = document.querySelector('.input-hora');
const btnTarefa = document.querySelector('.btn-tarefa');
const tarefas = document.querySelector('.tarefas');

btnTarefa.addEventListener('click', function(e){
    if(inputHora.value === '' || inputTarefa.value === '') return;
    criaTarefa(inputHora.value, inputTarefa.value);  
});

inputTarefa.addEventListener('keypress', function(e){
    if(e.keyCode === 13){ 
        if(inputHora.value === '' || inputTarefa.value === '') return;
        criaTarefa(inputHora.value, inputTarefa.value);   
    }
});

function criaTarefa(horaInput, textoInput){
    const li = criaLi();
    li.innerHTML = `<span><strong>${horaInput}</strong> - ${textoInput}</span>`;
    criaBotoes(li);
    tarefas.appendChild(li);
    limpaInput();
    salvarTarefas();
}

function criaLi(){
    const li = document.createElement('li');
    return li;
}

function limpaInput(){
    inputTarefa.value = '';  
    inputHora.value = '';
    inputTarefa.focus();    
}

function criaBotoes(li){
    const actions = document.createElement('div');
    actions.classList.add('actions');

    const botaoEditar = document.createElement('button');
    botaoEditar.innerHTML = '<i class="fa fa-pencil editar"></i>';
    botaoEditar.classList.add('editar');
    actions.appendChild(botaoEditar);

    const botaoApagar = document.createElement('button');
    botaoApagar.innerHTML = '<i class="fa fa-trash-o apagar"></i>';
    botaoApagar.classList.add('apagar');
    actions.appendChild(botaoApagar);

    const botaoSalvar = document.createElement('button');
    botaoSalvar.innerHTML = '<i class="fa fa-save salvar"></i>';
    botaoSalvar.classList.add('salvar');
    botaoSalvar.style.display = 'none';
    actions.appendChild(botaoSalvar);

    const botaoConfirmar = document.createElement('button');
    botaoConfirmar.innerHTML = '<i class="fa fa-check confirmar"></i>';
    botaoConfirmar.classList.add('confirmar');
    botaoConfirmar.style.display = 'none';
    actions.appendChild(botaoConfirmar);

    const botaoCancelar = document.createElement('button');
    botaoCancelar.innerHTML = '<i class="fa fa-times cancelar"></i>';
    botaoCancelar.classList.add('cancelar');
    botaoCancelar.style.display = 'none';
    actions.appendChild(botaoCancelar);

    li.appendChild(actions);
}

function salvarTarefas(){
    const liTarefas = tarefas.querySelectorAll('li');
    const listaDeTarefas = [];
    for(let tarefa of liTarefas){
        let tarefaTexto = tarefa.querySelector('span').innerText;
        listaDeTarefas.push(tarefaTexto);
    }
    const tarefasJSON = JSON.stringify(listaDeTarefas);
    localStorage.setItem('tarefas', tarefasJSON);
}

function adicionarTarefasSalvas(){
    const tarefasSalvas = localStorage.getItem('tarefas');
    if (tarefasSalvas) {
        const listaDeTarefas = JSON.parse(tarefasSalvas);
        for(let tarefa of listaDeTarefas){
            const [hora, texto] = tarefa.split(' - ');
            criaTarefa(hora, texto);
        }
    }
}

document.addEventListener('click', function(e){
    const el = e.target;
    if(el.classList.contains('apagar') || el.parentElement.classList.contains('apagar')){
        const li = el.closest('li');
        li.querySelector('.editar').style.display = 'none';
        li.querySelector('.apagar').style.display = 'none';
        li.querySelector('.salvar').style.display = 'none';
        li.querySelector('.confirmar').style.display = 'inline';
        li.querySelector('.cancelar').style.display = 'inline';
    }
    if(el.classList.contains('confirmar') || el.parentElement.classList.contains('confirmar')){
        el.closest('li').remove();
        salvarTarefas();
    }
    if(el.classList.contains('cancelar') || el.parentElement.classList.contains('cancelar')){
        const li = el.closest('li');
        li.querySelector('.editar').style.display = 'inline';
        li.querySelector('.apagar').style.display = 'inline';
        li.querySelector('.salvar').style.display = 'none';
        li.querySelector('.confirmar').style.display = 'none';
        li.querySelector('.cancelar').style.display = 'none';
    }
    if(el.classList.contains('editar') || el.parentElement.classList.contains('editar')){
        const li = el.closest('li');
        const span = li.querySelector('span');
        const [hora, texto] = span.innerText.split(' - ');

        span.innerHTML = `              
            <input type="time" value="${hora}" class="edit-hora">
            <input type="text" value="${texto}" class="edit-tarefa">
        `;
        li.querySelector('.editar').style.display = 'none';
        li.querySelector('.apagar').style.display = 'none';
        li.querySelector('.salvar').style.display = 'inline';
    }
    if(el.classList.contains('salvar') || el.parentElement.classList.contains('salvar')){
        const li = el.closest('li');            
        const editHora = li.querySelector('.edit-hora').value;
        const editTarefa = li.querySelector('.edit-tarefa').value;

        li.querySelector('span').innerHTML = `${editHora} - ${editTarefa}`;
        li.querySelector('.editar').style.display = 'inline';
        li.querySelector('.apagar').style.display = 'inline';
        li.querySelector('.salvar').style.display = 'none';
        salvarTarefas();
    }
});

adicionarTarefasSalvas();