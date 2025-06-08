document.addEventListener('DOMContentLoaded', function() {
    // Elementos do DOM
    const formContato = document.getElementById('formContato');
    const inputConsulta = document.getElementById('inputConsulta');
    const btnConsultar = document.getElementById('btnConsultar');
    const btnMostrarTodos = document.getElementById('btnMostrarTodos');
    const listaContatos = document.getElementById('listaContatos');
    
    // Array para armazenar os contatos (carrega do localStorage se existir)
    let contatos = JSON.parse(localStorage.getItem('contatos')) || [];
    
    // Função para salvar contatos no localStorage
    function salvarContatos() {
        localStorage.setItem('contatos', JSON.stringify(contatos));
    }
    
    // Função para renderizar a lista de contatos
    function renderizarContatos(contatosParaRenderizar = contatos) {
        listaContatos.innerHTML = '';
        
        if (contatosParaRenderizar.length === 0) {
            listaContatos.innerHTML = '<p>Nenhum contato cadastrado.</p>';
            return;
        }
        
        contatosParaRenderizar.forEach(contato => {
            const contatoEl = document.createElement('div');
            contatoEl.className = 'contato-card';
            contatoEl.innerHTML = `
                <div class="contato-info"><strong>Nome:</strong> ${contato.nome}</div>
                <div class="contato-info"><strong>Telefone:</strong> ${contato.numero}</div>
                <div class="contato-info"><strong>Email:</strong> ${contato.email}</div>
                <div class="acoes-contato">
                    <button class="btn-editar" data-id="${contato.id}">Editar</button>
                    <button class="btn-excluir" data-id="${contato.id}">Excluir</button>
                </div>
            `;
            listaContatos.appendChild(contatoEl);
        });
        
        // Adiciona eventos aos botões de editar e excluir
        document.querySelectorAll('.btn-excluir').forEach(btn => {
            btn.addEventListener('click', function() {
                const id = parseInt(this.getAttribute('data-id'));
                contatos = contatos.filter(c => c.id !== id);
                salvarContatos();
                renderizarContatos();
            });
        });
        
        // Você pode implementar a edição depois
        document.querySelectorAll('.btn-editar').forEach(btn => {
            btn.addEventListener('click', function() {
                const id = parseInt(this.getAttribute('data-id'));
                // Implemente a edição aqui depois
                alert('Edição será implementada depois!');
            });
        });
    }
    
    // Evento para adicionar novo contato
    formContato.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const novoContato = {
            id: Date.now(), // Usamos o timestamp como ID único
            nome: document.getElementById('nome').value,
            numero: document.getElementById('numero').value,
            email: document.getElementById('email').value
        };
        
        contatos.push(novoContato);
        salvarContatos();
        renderizarContatos();
        
        // Limpa o formulário
        formContato.reset();
    });
    
    // Evento para buscar contatos
    btnConsultar.addEventListener('click', function() {
    const termo = inputConsulta.value.toLowerCase().trim(); // trim() para remover espaços
    
    if (!termo) {
        renderizarContatos();
        return;
    }
    
    const resultados = contatos.filter(contato => {
        // Verifica se o contato e seus campos existem antes de acessá-los
        if (!contato || !contato.nome || !contato.telefone) return false;
        
        return (
            contato.nome.toLowerCase().includes(termo) || 
            contato.telefone.toString().includes(termo)
        );
    });
    
    renderizarContatos(resultados);
});
    
    // Evento para mostrar todos os contatos
    btnMostrarTodos.addEventListener('click', function() {
        inputConsulta.value = '';
        renderizarContatos();
    });
    
    // Renderiza os contatos ao carregar a página
    renderizarContatos();
});


contatos = [
    {id: 1, nome: "Teste", telefone: "12345678", email: "teste@exemplo.com"},
    {id: 2, nome: "Exemplo", telefone: "87654321", email: "exemplo@teste.com"}
];
salvarContatos();