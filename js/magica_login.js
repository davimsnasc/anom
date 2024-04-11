var clientes = [];
var tentativas = 3;

function criarClientes() {
    clientes.push({
        key: 'chavealeatoria1',
        nome: 'Ronaldo',
        senha: '1234',
        valor: 2962448.00
    });
    clientes.push({
        key: 'chavealeatoria2',
        nome: 'Vicente',
        senha: '4321',
        valor: 32680666.00
    });
}

function login() {
    var x = document.getElementById('cliente').value;
    var y = document.getElementById('senha').value;

    var clienteEncontrado = clientes.find(function(cliente) {
        return cliente.key === x && cliente.senha === y && cliente.nome;
    });

    if (!clienteEncontrado) {
        alert('Dados inválidos! Tente novamente');
        tentativas--;
        if (tentativas === 0) {
            document.getElementById('btn').disabled = true;
        }
    } else {
        sessionStorage.setItem('usuarioLogado', JSON.stringify(clienteEncontrado));
        window.location.href = 'dados.html';
    }
}

criarClientes();