function mostrarDados() {
    var usuarioLogado = JSON.parse(sessionStorage.getItem('usuarioLogado'));
    if (usuarioLogado) {
        document.getElementById('saldo').innerHTML = 'Saldo: SAT$' + usuarioLogado.valor;
        document.getElementById('cliente').innerHTML = 'Cliente: ' + usuarioLogado.nome;
    } else {
        
        alert('Nenhum usuário logado.');
        window.location.href = 'login.html';
    }
}

function saque() {
    var usuarioLogado = JSON.parse(sessionStorage.getItem('usuarioLogado'));
    if (usuarioLogado) {
        var valor = parseFloat(document.getElementById('valor_saque').value);
        if (isNaN(valor) || valor <= 0) {
            alert('Insira um valor válido para saque!');
        } else if (valor > usuarioLogado.valor) {
            alert('Saldo insuficiente para saque!');
        } else {
            usuarioLogado.valor -= valor;
            sessionStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado));
            document.getElementById('saldo').innerHTML = 'Saldo: R$' + usuarioLogado.valor;
            document.getElementById('valor_saque').value = '';
        }
    } else {
        alert('Nenhum usuário logado.');
    }
}

function deposito() {
    var usuarioLogado = JSON.parse(sessionStorage.getItem('usuarioLogado'));
    if (usuarioLogado) {
        var valor = parseFloat(document.getElementById('valor_deposito').value);
        if (isNaN(valor) || valor <= 0) {
            alert('Insira um valor válido para depósito!');
        } else {
            usuarioLogado.valor += valor;
            sessionStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado));
            document.getElementById('saldo').innerHTML = 'Saldo: R$' + usuarioLogado.valor;
            document.getElementById('valor_deposito').value = '';
        }
    } else {
        alert('Nenhum usuário logado.');
    }
}

function transfere() {
    var usuarioLogado = JSON.parse(sessionStorage.getItem('usuarioLogado'));
    if (usuarioLogado) {
        var destino = document.getElementById('destino').value;
        var valor = parseFloat(document.getElementById('valor_trans').value);
        if (destino === usuarioLogado.key) {
            alert('Você não pode transferir para você mesmo!');
        } else if (isNaN(valor) || valor <= 0) {
            alert('Insira um valor válido para transferência!');
        } else if (valor > usuarioLogado.valor) {
            alert('Saldo insuficiente para transferência!');
        } else {
            var clienteDestino = clientes.find(function(cliente) {
                return cliente.key === destino;
            });
            if (clienteDestino) {
                usuarioLogado.valor -= valor;
                clienteDestino.valor += valor;
                sessionStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado));
                document.getElementById('saldo').innerHTML = 'Saldo: R$' + usuarioLogado.valor;
                document.getElementById('valor_trans').value = '';
                alert('Transferência realizada com Sucesso!!!');
            } else {
                alert('Cliente destino não encontrado!');
            }
        }
    } else {
        alert('Nenhum usuário logado.');
    }
}


mostrarDados();