document.getElementById('calcular').addEventListener('click', function() {
    // Obter valores
    const nome = document.getElementById('nome').value;
    const altura = parseFloat(document.getElementById('altura').value);
    const peso = parseFloat(document.getElementById('peso').value);
    
    // Validar
    if (!nome || isNaN(altura) || isNaN(peso) || altura <= 0 || peso <= 0) {
        alert("Por favor, preencha todos os campos corretamente!");
        return;
    }
    
    // Calcular
    const imc = peso / (altura * altura);
    
    // Classificar
    let classificacao = "";
    let classe = "";
    
    if (imc < 18.5) {
        classificacao = "Abaixo do peso";
        classe = "abaixo-peso";
    } else if (imc < 25) {
        classificacao = "Peso normal";
        classe = "normal";
    } else if (imc < 30) {
        classificacao = "Sobrepeso";
        classe = "sobrepeso";
    } else if (imc < 35) {
        classificacao = "Obesidade Grau I";
        classe = "obesidade-1";
    } else if (imc < 40) {
        classificacao = "Obesidade Grau II";
        classe = "obesidade-2";
    } else {
        classificacao = "Obesidade Grau III";
        classe = "obesidade-3";
    }
    
    // Exibir
    document.getElementById('mensagem').textContent = `Olá ${nome}, seu IMC é:`;
    
    const valorImc = document.getElementById('valor-imc');
    valorImc.textContent = imc.toFixed(1);
    valorImc.className = classe; // Aplica a cor
    
    document.getElementById('classificacao').textContent = `Classificação: ${classificacao}`;
    document.getElementById('resultado').style.display = 'block';
});


console.log("Script carregado com sucesso!");