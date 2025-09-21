const pbtInput = document.getElementById("pbt");
const pbInput = document.getElementById("pb");
const plInput = document.getElementById("pl");
const tCxInput = document.getElementById("tCx");
const ttInput = document.getElementById("tt");
const ppInput = document.getElementById("pp");
const cxInput = document.getElementById("cx");
const btn = document.getElementById("btnCalc");
const valInput = document.getElementById("val"); // Usando apenas esta variável para a validade

function calcularPesos() {
    // 1. Pega os VALORES dos inputs e converte para número
    const pbt = parseFloat(pbtInput.value) || 0;
    let pb = parseFloat(pbInput.value) || 0;
    const tCx = parseFloat(tCxInput.value) || 0;
    const pp = parseFloat(ppInput.value) || 0;
    const cx = parseFloat(cxInput.value) || 0;
    
    // Declara as variáveis para os resultados
    let tt = 0; // Tara Total
    let pl = 0; // Peso Líquido

    // 2. Lógica de cálculo do Peso Bruto
    if (pbt > 0 && pb === 0) {
        pb = pbt - pp;
        pbInput.value = pb.toFixed(3);
    } else if (pb <= 0 && pbt === 0) {
        alert("Por favor, preencha o Peso Bruto ou o Peso Bruto Total.");
        return; // Sai da função se os valores essenciais não existirem
    }

    // 3. Cálculos principais, feitos sempre após a lógica inicial
    tt = tCx * cx;
    ttInput.value = tt.toFixed(3);

    pl = pb - tt;
    plInput.value = pl.toFixed(3);

   // Chama a função de cálculo da validade e armazena a data no formato YYYY-MM-DD
const novaValidade = calcularNovaValidade();

// CRIA UMA NOVA VARIÁVEL PARA FORMATAR A DATA
let novaValidadeFormatada = '';
if (novaValidade) {
    // Converte a string YYYY-MM-DD em um objeto Date
    const dataObjeto = new Date(novaValidade + 'T00:00:00');
    // Formata o objeto para o formato DD/MM/YYYY
    novaValidadeFormatada = dataObjeto.toLocaleDateString('pt-BR');
}

// Atualiza o input de validade no HTML com a data formatada
valInput.value = novaValidadeFormatada;

const resultados = {
        pbt: pbt.toFixed(3),
        pb: pb.toFixed(3),
        tCx: tCx.toFixed(3),
        pp: pp.toFixed(3),
        cx: cx,
        tt: tt.toFixed(3),
        pl: pl.toFixed(3),
    // Salva a data formatada para a página de resultados
        validade: novaValidadeFormatada
};
    
    // 6. Salva o objeto no localStorage
    localStorage.setItem('resultadosPesagem', JSON.stringify(resultados));
    
    // 7. Redireciona para a página de resultados
    window.location.href = 'result.html';
}

function calcularNovaValidade() {
    const dataString = valInput.value;
    
    if (dataString) {
        const dataObjeto = new Date(dataString + 'T00:00:00'); // Adiciona T00:00:00 para evitar problemas de fuso horário
        dataObjeto.setDate(dataObjeto.getDate() - 10);
        
        // Retorna a nova data no formato YYYY-MM-DD
        return dataObjeto.toISOString().substring(0, 10);
    }
    return 'Data não informada'; // Retorna uma string caso a data não seja válida
}

btn.addEventListener('click', calcularPesos);