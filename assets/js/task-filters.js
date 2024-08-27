document.addEventListener('DOMContentLoaded', function () {
    const userId = localStorage.getItem('userId');

    if (!userId) {
        console.error('ID do usuário não encontrado.');
        return;
    }

    document.getElementById('hoje').addEventListener('click', function () {
        //console.log('Filtro "hoje" acionado');
        carregarTarefasFiltradas('hoje');
    });

    document.getElementById('todos').addEventListener('click', function () {
        //console.log('Filtro "todos" acionado');
        carregarTarefasFiltradas('todos');
    });

    document.getElementById('concluido').addEventListener('click', function () {
        //console.log('Filtro "concluido" acionado');
        carregarTarefasFiltradas('concluido');
    });

    function carregarTarefasFiltradas(filtro) {
        fetch(`http://localhost/Teste_Qualidade_Software/assets/server/carregar-tarefas.php?userId=${userId}&filtro=${filtro}`)
            .then(response => {
                //console.log('Resposta recebida:', response);
                if (!response.ok) {
                    throw new Error('Erro na resposta da rede');
                }
                return response.json();
            })
            .then(tarefas => {
                //console.log('Tarefas carregadas:', tarefas);
                atualizarListaDeTarefas(tarefas); // Aqui chama a função existente no task-display.js
            })
            .catch(error => {
                console.error('Erro ao carregar tarefas:', error);
            });
    }
});
