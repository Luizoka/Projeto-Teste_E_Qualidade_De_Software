document.addEventListener('DOMContentLoaded', function () {
    // Obtenha o userId do localStorage
    const userId = localStorage.getItem('userId');

    if (userId) {
        // Faça uma requisição para obter o nome do usuário
        fetch(`http://localhost/Projeto-Teste_E_Qualidade_De_Software/assets/server/get-username.php?userId=${userId}`)
            .then(response => {
                return response.text().then(text => {
                    //console.log('Resposta recebida:', text); // Loga a resposta completa antes de tentar convertê-la
                    return JSON.parse(text);
                });
            })
            .then(data => {
                if (data.success) {
                    // Atualize o título da página com o nome do usuário
                    document.querySelector('.titulo h1').textContent = `ToDo de ${data.userName}`;
                } else {
                    console.error('Erro ao obter o nome do usuário:', data.message);
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
                atualizarListaDeTarefas(tarefas); // Mantém essa chamada
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
            <h3>${tarefa.Title}</h3>
            <div>
            <button onclick="excluirTarefa(${tarefa.ID})"><img src="../imgs/trash.png" alt="lixeiro" class="tarefa__imgs"></button>
            <button onclick="prepararEdicao(${tarefa.ID}, '${tarefa.Title}', '${tarefa.Date}', '${tarefa.Description}', ${tarefa.IsFinished})"> <img src="../imgs/pencil.png" alt="imagem caneta, função editar tarefa" class="tarefa__imgs"></button>
        </div>
            </div>
        <p>${tarefa.Date}</p>
        <p>${tarefa.Description}</p>
<input type="checkbox" ${tarefa.IsFinished ? 'checked' : ''} onchange="marcarConcluida(this, ${tarefa.ID}); carregarTarefas();">

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
                // Atualiza as tarefas na tela após a mudança de status
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

    // Exibe o modal
    modal.style.display = 'flex';

    // Quando o usuário clicar em "Excluir"
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
                carregarTarefas(); // Atualiza a lista de tarefas
            } else {
                console.error(`Erro ao excluir a tarefa ${tarefaID}: ${data.message}`);
            }
        })
        .catch(error => {
            console.error('Erro na requisição:', error);
        })
        .finally(() => {
            modal.style.display = 'none'; // Fecha o modal
        });
    };

    // Quando o usuário clicar em "Cancelar"
    cancelarBtn.onclick = function() {
        modal.style.display = 'none'; // Fecha o modal
    };
}

// Fechar o modal se o usuário clicar fora do conteúdo
window.onclick = function(event) {
    const modal = document.getElementById('modal-excluir-tarefa');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
};
