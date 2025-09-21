document.addEventListener('DOMContentLoaded', () => {
  // 1. Pega a a string de dados do localStorage
  const resultadosString = localStorage.getItem('resultadosPesagem');

  // 2.Converte a string  de volta para um objeto JavaScript
  if (resultadosString) {
    const resultados = JSON.parse(resultadosString);

    // 3. Pega o corpo da tabela onde os dados serão inseridos
    const tabelaBody = document.querySelector('#tabela-resultados tbody');

    // 4. Cria as linhas da tabela com os resultados
    for (const [campo, valor] of Object.entries(resultados)) {
      const tr = document.createElement('tr');
      const tdCampo = document.createElement('td');
      const tdValor = document.createElement('td');

      //Formata o nome do campo para exibição
      tdCampo.textContent = formatarNomeCampo(campo);
      tdValor.textContent = valor;

      tr.appendChild(tdCampo);
      tr.appendChild(tdValor);
      tabelaBody.appendChild(tr);
    }
  } else {
    //Exibe uma mensagem se não houver dados
    document.querySelector('.container').innerHTML = `<p>Nenhum dado de pesagem encontrado.</p> <br> <a href="index.html">Voltar para a Pesagem</a>`;
  }
});

// Função auxiliar para formatar os nomes dos campos
function formatarNomeCampo(campo) {
    const nomes = {
        pbt: "Peso Bruto Total",
        pb: "Peso Bruto",
        tCx: "Tara por Caixa",
        pp: "Peso do Palete",
        cx: "Quantidade de Caixas",
        tt: "Tara Total",
        pl: "Peso Líquido",
        validade: "Validade"
    };
    return nomes[campo] || campo;
}

function voltarPagina() {
    window.history.back();
}