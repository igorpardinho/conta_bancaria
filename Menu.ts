import readlinesync from "readline-sync";

import { colors } from "./src/util/Colors";
import { Conta } from "./src/model/Conta";
import { ContaCorrente } from "./src/model/ContaCorrente";
import { ContaPoupanca } from "./src/model/ContaPoupanca";
import { ContaController } from "./src/controller/ContaController";

export function main() {
  let opcao: number;

  let numero: number,
    agencia: number,
    tipo: number,
    saldo: number,
    limite: number,
    aniversario: number,
    valor: number,
    numeroDestino: number;

  let titular: string;
  const tipoContas = ["ContaCorrente", "ContaPoupanca"];

  let contas: ContaController = new ContaController();

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

        console.log("Digite o número da agência: ");
        agencia = readlinesync.questionInt("");

        console.log("Digite o nome do titular da conta: ");
        titular = readlinesync.question("");

        console.log("\nDigite o tipo da conta: ");
        tipo = readlinesync.keyInSelect(tipoContas, "", { cancel: false }) + 1;

        console.log("Digite o saldo da conta (R$): ");
        saldo = readlinesync.questionFloat("");

        switch (tipo) {
          case 1:
            console.log("digite o limite da conta (R$): ");
            limite = readlinesync.questionFloat("");
            contas.cadastrar(
              new ContaCorrente(
                contas.gerarNumero(),
                agencia,
                tipo,
                titular,
                saldo,
                limite
              )
            );
            break;
          case 2:
            console.log("digite o dia do aniversário da conta: ");
            aniversario = readlinesync.questionFloat("");
            contas.cadastrar(
              new ContaPoupanca(
                contas.gerarNumero(),
                agencia,
                tipo,
                titular,
                saldo,
                aniversario
              )
            );
            break;
        }

        break;
      case 2:
        console.log("\n\nListar todas as Contas\n\n");
        contas.listarTodas();

        break;
      case 3:
        console.log("\n\nConsultar dados da Conta - por número\n\n");

        console.log("digite o numero da conta: ");
        numero = readlinesync.questionInt("");
        contas.procurarPorNumero(numero);

        break;
      case 4:
        console.log("\n\nAtualizar dados da Conta\n\n");
        console.log("digite o número da conta: ");
        numero = readlinesync.questionInt("");

        let conta = contas.buscarNoArray(numero);

        if (conta !== null) {
          console.log("Digite o número da agência: ");
          agencia = readlinesync.questionInt("");

          console.log("Digite o nome do titular da conta: ");
          titular = readlinesync.question("");

          tipo = conta.tipo;

          console.log("Digite o saldo da conta (R$): ");
          saldo = readlinesync.questionFloat("");

          switch (tipo) {
            case 1:
              console.log("digite o limite da conta (R$): ");
              limite = readlinesync.questionFloat("");
              contas.cadastrar(
                new ContaCorrente(
                  contas.gerarNumero(),
                  agencia,
                  tipo,
                  titular,
                  saldo,
                  limite
                )
              );
              break;
            case 2:
              console.log("digite o dia do aniversário da conta: ");
              aniversario = readlinesync.questionFloat("");
              contas.cadastrar(
                new ContaPoupanca(
                  contas.gerarNumero(),
                  agencia,
                  tipo,
                  titular,
                  saldo,
                  aniversario
                )
              );
              break;
          }
        } else {
          console.log(`\n conta numero: ${numero} não foi encontrada!`);
        }

        break;
      case 5:
        console.log("\n\nApagar uma Conta\n\n");

        console.log("digite o número da conta: ");
        numero = readlinesync.questionInt("");
        contas.deletar(numero);

        break;
      case 6:
        console.log("\n\nSaque\n\n");
        console.log("digite o número da conta: ");
        numero = readlinesync.questionInt("");

        console.log("digite o valor do saque (R$): ");
        valor = readlinesync.questionInt("");

        contas.sacar(numero, valor);
        break;
      case 7:
        console.log("\n\nDepósito\n\n");
        console.log("digite o número da conta: ");
        numero = readlinesync.questionInt("");

        console.log("digite o valor do deposito (R$): ");
        valor = readlinesync.questionInt("");
        contas.depositar(numero, valor);

        break;
      case 8:
        console.log("\n\nTransferência entre Contas\n\n");
        console.log("digite o número da conta de origem: ");
        numero = readlinesync.questionInt("");

        console.log("digite o número da conta de destino: ");
        numeroDestino = readlinesync.questionInt("");

        console.log("digite o valor do deposito (R$): ");
        valor = readlinesync.questionInt("");

        contas.transferir(numero, numeroDestino, valor);

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
