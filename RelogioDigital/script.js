function atualizarRelogio() {
    const agora = new Date();
    
    // Obter horas, minutos e segundos
    const horas = agora.getHours().toString().padStart(2, '0');
    const minutos = agora.getMinutes().toString().padStart(2, '0');
    const segundos = agora.getSeconds().toString().padStart(2, '0');
    
    // Atualizar o HTML do relógio
    document.getElementById('horas').textContent = horas;
    document.getElementById('minutos').textContent = minutos;
    document.getElementById('segundos').textContent = segundos;
    
    // Obter e formatar a data
    const diasSemana = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
    const mesesAno = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
    
    const diaSemana = diasSemana[agora.getDay()];
    const diaMes = agora.getDate();
    const mes = mesesAno[agora.getMonth()];
    const ano = agora.getFullYear();
    
    // Formatar a data no padrão brasileiro
    const dataFormatada = `${diaSemana}, ${diaMes} de ${mes} de ${ano}`;
    
    // Atualizar o HTML da data
    document.getElementById('data').textContent = dataFormatada;
}

// Atualizar o relógio imediatamente e a cada segundo
atualizarRelogio();
setInterval(atualizarRelogio, 1000);