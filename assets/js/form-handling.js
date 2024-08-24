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
    fetch('http://localhost/Teste_Qualidade_Software/assets/server/salvar-tarefas.php', {
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
        console.log('Tarefa adicionada:', result);
        if (result.success) {
            carregarTarefas(); // Chama a função para atualizar a lista de tarefas
        }
    })
    .catch(error => {
        console.error('Erro:', error);
    });
}



function limparCampos() {
    document.getElementById('titulo').value = '';
    document.getElementById('data').value = '';
    document.getElementById('descricao').value = '';
}
