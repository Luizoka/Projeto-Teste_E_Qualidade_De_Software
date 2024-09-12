document.addEventListener('DOMContentLoaded', function () {
    let path = window.location.pathname;

    if (path.includes('hoje.html')) {
        exibirTarefasDeHoje();
    } else if (path.includes('concluido.html')) {
        exibirTarefasConcluidas();
    } else {
        carregarTarefas();
    }

    document.getElementById('adicionar-tarefa')?.addEventListener('click', function () {
        let titulo = document.getElementById('titulo').value.trim();
        let data = document.getElementById('data').value.trim();
        let descricao = document.getElementById('descricao').value.trim();

        if (titulo && descricao) {
            if (!data) {
                data = obterDataDeHoje();
            }

            let novaTarefa = {
                titulo: titulo,
                data: data,
                descricao: descricao,
                concluido: false
            };

            adicionarTarefa(novaTarefa);
            limparCampos();
        } else {
            alert('Por favor, preencha todos os campos.');
        }
    });
});

function obterDataDeHoje() {
    const hoje = new Date();
    const dia = String(hoje.getDate()).padStart(2, '0');
    const mes = String(hoje.getMonth() + 1).padStart(2, '0');
    const ano = hoje.getFullYear();
    return `${ano}-${mes}-${dia}`;
}

function adicionarTarefa(tarefa) {
    exibirTarefa(tarefa);

    // Enviar a nova tarefa ao servidor
    fetch('salvar-tarefa.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
            titulo: tarefa.titulo,
            data: tarefa.data,
            descricao: tarefa.descricao,
            concluido: tarefa.concluido
        })
    })
    .then(response => response.text())
    .then(data => {
        console.log(data); // Opcional: exibir mensagem de sucesso
    })
    .catch(error => {
        console.error('Erro:', error);
    });
}

function exibirTarefa(tarefa) {
    const novaTarefa = document.createElement('div');
    novaTarefa.classList.add('tarefa');
    novaTarefa.innerHTML = `
        <h3>${tarefa.titulo}</h3>
        <p>${tarefa.data}</p>
        <p>${tarefa.descricao}</p>
        <input type="checkbox" ${tarefa.concluido ? 'checked' : ''} onchange="marcarConcluida(this, '${tarefa.titulo}')">
    `;
    document.getElementById('tarefas').appendChild(novaTarefa);
}

function carregarTarefas() {
    fetch('carregar-tarefas.php')
    .then(response => response.json())
    .then(tarefas => {
        tarefas.forEach(exibirTarefa);
    })
    .catch(error => {
        console.error('Erro:', error);
    });
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
    const tarefaAtualizada = tarefas.find(tarefa => tarefa.titulo === titulo);
    
    if (tarefaAtualizada) {
        tarefaAtualizada.concluido = checkbox.checked;
        localStorage.setItem('tarefas', JSON.stringify(tarefas));

        // Atualiza o status da tarefa no servidor
        fetch('update-task.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                tarefaId: tarefaAtualizada.id,
                concluido: tarefaAtualizada.concluido ? 1 : 0
            })
        })
        .then(response => response.json())
        .then(result => {
            if (!result.success) {
                console.error('Falha ao atualizar o status da tarefa:', result.message);
            }
        })
        .catch(error => {
            console.error('Erro ao atualizar o status da tarefa:', error);
        });
    }
}

function limparCampos() {
    document.getElementById('titulo').value = '';
    document.getElementById('data').value = '';
    document.getElementById('descricao').value = '';
}

function atualizarListaDeTarefas(tarefas) {
    const tarefasContainer = document.getElementById('tarefas');
    tarefasContainer.innerHTML = '';
    tarefas.forEach(exibirTarefa);
}
