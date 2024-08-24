document.addEventListener('DOMContentLoaded', function () {
    carregarTarefas();
});

function carregarTarefas() {
    const userId = localStorage.getItem('userId');
    if (!userId) {
        console.error('User ID not found.');
        return;
    }

    fetch(`http://localhost/Teste_Qualidade_Software/assets/server/carregar-tarefas.php?userId=${userId}`)
        .then(response => response.json())
        .then(tarefas => {
            if (tarefas.error) {
                console.error(tarefas.error);
            } else {
                atualizarListaDeTarefas(tarefas);
            }
        })
        .catch(error => {
            console.error('Erro ao carregar tarefas:', error);
        });
}

function exibirTarefa(tarefa) {
    const novaTarefa = document.createElement('div');
    novaTarefa.classList.add('tarefa');
    novaTarefa.innerHTML = `
        <h3>${tarefa.Title}</h3>
        <p>${tarefa.Date}</p>
        <p>${tarefa.Description}</p>
        <input type="checkbox" ${tarefa.IsFinished ? 'checked' : ''} onchange="marcarConcluida(this, '${tarefa.Title}')">
    `;
    document.getElementById('tarefas').appendChild(novaTarefa);
}

function atualizarListaDeTarefas(tarefas) {
    const tarefasContainer = document.getElementById('tarefas');
    tarefasContainer.innerHTML = '';
    tarefas.forEach(exibirTarefa);
}

function exibirTarefasDeHoje() {
    const hoje = obterDataDeHoje();
    const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
    const tarefasDeHoje = tarefas.filter(tarefa => tarefa.data === hoje);
    atualizarListaDeTarefas(tarefasDeHoje);
}

function exibirTarefasConcluidas() {
    const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
    const tarefasConcluidas = tarefas.filter(tarefa => tarefa.concluido);
    atualizarListaDeTarefas(tarefasConcluidas);
}

function marcarConcluida(checkbox, titulo) {
    const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
    tarefas.forEach(tarefa => {
        if (tarefa.titulo === titulo) {
            tarefa.concluido = checkbox.checked;
        }
    });
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
}
