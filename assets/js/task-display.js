document.addEventListener('DOMContentLoaded', function () {
    const userId = localStorage.getItem('userId');

    if (userId) {
        fetch(`http://localhost/Projeto-Teste_E_Qualidade_De_Software/assets/server/get-username.php?userId=${userId}`)
            .then(response => response.text())
            .then(text => {
                try {
                    const data = JSON.parse(text);
                    if (data.success) {
                        document.querySelector('.titulo h1').textContent = `ToDo de ${data.userName}`;
                    } else {
                        console.error('Erro ao obter o nome do usuário:', data.message);
                    }
                } catch (error) {
                    console.error('Erro ao processar a resposta JSON:', error);
                }
            })
            .catch(error => {
                console.error('Erro na requisição:', error);
            });
    } else {
        console.error('User ID não encontrado no localStorage.');
    }

    carregarTarefas();
});

function carregarTarefas() {
    const userId = localStorage.getItem('userId');
    if (!userId) {
        console.error('User ID not found.');
        return;
    }

    fetch(`http://localhost/Projeto-Teste_E_Qualidade_De_Software/assets/server/carregar-tarefas.php?userId=${userId}`)
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
        <div class="tarefa-header">
            <h3>${tarefa.title}</h3>
            <div>
                <button onclick="excluirTarefa(${tarefa.id})"><img src="../imgs/trash.png" alt="Excluir" class="tarefa__imgs"></button>
                <button onclick="prepararEdicao(${tarefa.id}, '${tarefa.title}', '${tarefa.date}', '${tarefa.description}', ${tarefa.isfinished})"><img src="../imgs/pencil.png" alt="Editar" class="tarefa__imgs"></button>
            </div>
        </div>
        <p>${tarefa.date}</p>
        <p>${tarefa.description}</p>
        <input type="checkbox" ${tarefa.isfinished ? 'checked' : ''} onchange="marcarConcluida(this, ${tarefa.id});">
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

function marcarConcluida(checkbox, taskId) {
    const isFinished = checkbox.checked ? 1 : 0;
    fetch('http://localhost/Projeto-Teste_E_Qualidade_De_Software/assets/server/update-status.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            ID: taskId,
            IsFinished: isFinished
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            carregarTarefas();
        } else {
            console.error(`Erro ao atualizar o status da tarefa ${taskId}: ${data.message}`);
        }
    })
    .catch(error => {
        console.error('Erro na requisição:', error);
    });
}

function excluirTarefa(tarefaID) {
    const modal = document.getElementById('modal-excluir-tarefa');
    const confirmarBtn = document.getElementById('confirmar-exclusao');
    const cancelarBtn = document.getElementById('cancelar-exclusao');

    modal.style.display = 'flex';

    confirmarBtn.onclick = function() {
        fetch('http://localhost/Projeto-Teste_E_Qualidade_De_Software/assets/server/delete-task.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: tarefaID
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                carregarTarefas();
            } else {
                console.error(`Erro ao excluir a tarefa ${tarefaID}: ${data.message}`);
            }
        })
        .catch(error => {
            console.error('Erro na requisição:', error);
        })
        .finally(() => {
            modal.style.display = 'none';
        });
    };

    cancelarBtn.onclick = function() {
        modal.style.display = 'none';
    };
}

window.onclick = function(event) {
    const modal = document.getElementById('modal-excluir-tarefa');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
};
