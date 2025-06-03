import readlinesync from "readline-sync";

import { colors } from "./src/util/Colors";
import { Conta } from "./src/model/Conta";

export function main() {
  let opcao: number;

  const conta: Conta = new Conta(1, 123, 2, "igor", 0);
  conta.visualizar();
  conta.sacar(10500);
  conta.visualizar();
  conta.depositar(5000);
  conta.visualizar();

  while (true) {
    console.log(
      colors.fg.bluestrong,
      `
*****************************************************
                                                     
                BANCO DO BRAZIL COM Z                
                                                     
*****************************************************
                                                     
            1 - Criar Conta                          
            2 - Listar todas as Contas               
            3 - Buscar Conta por Numero              
            4 - Atualizar Dados da Conta             
            5 - Apagar Conta                         
            6 - Sacar                                
            7 - Depositar                            
            8 - Transferir valores entre Contas      
            9 - Sair                                 
                                                     
*****************************************************
                                                     
`,
      colors.reset
    );

    console.log("Entre com a opção desejada: ");
    opcao = readlinesync.questionInt("");

    if (opcao == 9) {
      console.log(
        colors.fg.greenstrong,
        "\nBanco do Brazil com Z - O seu Futuro começa aqui!",
        colors.reset
      );
      sobre();
      process.exit(0);
    }

    switch (opcao) {
      case 1:
        console.log("\n\nCriar Conta\n\n");

        break;
      case 2:
        console.log("\n\nListar todas as Contas\n\n");

        break;
      case 3:
        console.log("\n\nConsultar dados da Conta - por número\n\n");

        break;
      case 4:
        console.log("\n\nAtualizar dados da Conta\n\n");

        break;
      case 5:
        console.log("\n\nApagar uma Conta\n\n");

        break;
      case 6:
        console.log("\n\nSaque\n\n");

        break;
      case 7:
        console.log("\n\nDepósito\n\n");

        break;
      case 8:
        console.log("\n\nTransferência entre Contas\n\n");

        break;
      default:
        console.log("\nOpção Inválida!\n");

        break;
    }
  }
}

export function sobre(): void {
  console.log(
    colors.fg.greenstrong,
    `
*****************************************************
Projeto Desenvolvido por: 
Generation Brasil - generation@generation.org
github.com/conteudoGeneration
*****************************************************
`
  );
}

main();
