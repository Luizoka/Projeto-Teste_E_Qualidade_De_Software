document.addEventListener('DOMContentLoaded', function () {
    const userId = localStorage.getItem('userId');

    if (!userId) {
        console.error('ID do usuário não encontrado.');
        return;
    }

    document.getElementById('hoje').addEventListener('click', function () {
        carregarTarefasFiltradas('hoje');
    });

    document.getElementById('todos').addEventListener('click', function () {
        carregarTarefasFiltradas('todos');
    });

    document.getElementById('concluido').addEventListener('click', function () {
        carregarTarefasFiltradas('concluido');
    });

    function carregarTarefasFiltradas(filtro) {
        fetch(`http://localhost/Projeto-Teste_E_Qualidade_De_Software/assets/server/carregar-tarefas.php?userId=${userId}&filtro=${filtro}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro na resposta da rede');
                }
                return response.json();
            })
            .then(tarefas => {
                atualizarListaDeTarefas(tarefas); // Certifique-se de que a função está acessível
            })
            .catch(error => {
                console.error('Erro ao carregar tarefas:', error);
            });
    }
});
