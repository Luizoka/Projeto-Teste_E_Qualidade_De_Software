document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('adicionar-tarefa')?.addEventListener('click', function () {
        let titulo = document.getElementById('titulo').value.trim();
        let data = document.getElementById('data').value.trim();
        let descricao = document.getElementById('descricao').value.trim();

        if (titulo && descricao) {
            if (!data) {
                data = obterDataDeHoje();
            }

            let userId = localStorage.getItem('userId'); 
            if (!userId) {
                alert('ID do usuário não encontrado.');
                return;
            }

            let novaTarefa = {
                titulo: titulo,
                data: data,
                descricao: descricao,
                concluido: false,
                userId: userId  
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
    fetch('http://localhost/Projeto-Teste_E_Qualidade_De_Software/assets/server/salvar-tarefas.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
            titulo: tarefa.titulo,
            data: tarefa.data,
            descricao: tarefa.descricao,
            concluido: tarefa.concluido ? 1 : 0,
            userId: tarefa.userId 
        })
    })
    .then(response => response.json())
    .then(result => {
        if (result.success) {
            carregarTarefas(); // Chama a função para atualizar a lista de tarefas
        } else {
            console.error('Falha ao adicionar tarefa:', result);
        }
    })
    .catch(error => {
        console.error('Erro ao adicionar tarefa:', error);
    });
}

function atualizarTarefa(tarefa) {
    fetch('http://localhost/Projeto-Teste_E_Qualidade_De_Software/assets/server/update-task.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
            tarefaId: tarefa.id,
            titulo: tarefa.titulo,
            data: tarefa.data,
            descricao: tarefa.descricao,
            concluido: tarefa.concluido ? 1 : 0
        })
    })
    .then(response => response.json())
    .then(result => {
        if (result.success) {
            carregarTarefas(); // Atualiza a lista de tarefas
        } else {
            console.error('Falha ao atualizar tarefa:', result);
        }
    })
    .catch(error => {
        console.error('Erro ao atualizar tarefa:', error);
    });
}

function prepararEdicao(id, titulo, data, descricao, concluido) {
    // Preenche os campos do modal com os dados da tarefa
    const modalTitulo = document.getElementById('modal-titulo');
    const modalData = document.getElementById('modal-data');
    const modalDescricao = document.getElementById('modal-descricao');
    const modalConcluido = document.getElementById('modal-concluido');

    if (modalTitulo && modalData && modalDescricao && modalConcluido) {
        modalTitulo.value = titulo;
        modalData.value = data;
        modalDescricao.value = descricao;
        modalConcluido.checked = concluido;

        // Armazena o ID da tarefa no botão de atualização
        document.getElementById('modal-salvar').dataset.id = id;

        // Exibe o modal
        document.getElementById('modal-editar-tarefa').style.display = 'flex';
    } else {
        console.error('Alguns elementos do modal não foram encontrados.');
    }
}

document.getElementById('modal-salvar')?.addEventListener('click', function() {
    const id = this.dataset.id; // ID da tarefa a ser atualizada
    const tarefaAtualizada = {
        id: id,
        titulo: document.getElementById('modal-titulo').value.trim(),
        data: document.getElementById('modal-data').value.trim(),
        descricao: document.getElementById('modal-descricao').value.trim(),
        concluido: document.getElementById('modal-concluido')?.checked || false
    };

    atualizarTarefa(tarefaAtualizada);
    fecharModal();
});

document.querySelector('.modal-close')?.addEventListener('click', fecharModal);

function fecharModal() {
    document.getElementById('modal-editar-tarefa').style.display = 'none';
}

function limparCampos() {
    document.getElementById('titulo').value = '';
    document.getElementById('data').value = '';
    document.getElementById('descricao').value = '';
    document.querySelector('input[type="checkbox"]').checked = false;
}
