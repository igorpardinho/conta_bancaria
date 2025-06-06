import { Conta } from "../model/Conta";
import { ContaRepository } from "../repository/ContaRepository";

export class ContaController implements ContaRepository {
  private listasContas: Array<Conta> = new Array<Conta>();

  private numero: number = 0;

  procurarPorNumero(numero: number): void {
    let buscarConta = this.buscarNoArray(numero);
    if (buscarConta) {
      buscarConta.visualizar();
    }
  }

  listarTodas(): void {
    for (let conta of this.listasContas) {
      conta.visualizar();
    }
  }
  cadastrar(conta: Conta): void {
    this.listasContas.push(conta);
  }
  atualizar(conta: Conta): void {
    let buscarConta = this.buscarNoArray(conta.numero);

    if (buscarConta !== null) {
      this.listasContas[this.listasContas.indexOf(buscarConta)] = conta;
      console.log(
        `\n conta número: ${conta.numero} foi atualizada com sucesso!`
      );
    } else {
      console.log(`conta numero: ${conta.numero} não foi encontrada!`);
    }
  }
  deletar(numero: number): void {
    let buscarConta = this.buscarNoArray(numero);

    if (buscarConta !== null) {
      this.listasContas.splice(this.listasContas.indexOf(buscarConta), 1);
      console.log(`\n conta numero: ${numero} foi apagada com sucesso!`);
    } else {
      console.log(`conta numero: ${numero} não foi encontrada!`);
    }
  }
  sacar(numero: number, valor: number): void {
    let conta = this.buscarNoArray(numero);

    if (conta !== null) {
      if (conta.sacar(valor) == true)
        console.log(
          `saque na conta número: ${numero} foi efetuado com sucesso!`
        );
    } else {
      console.log(`conta numero: ${numero} não foi encontrada!`);
    }
  }
  depositar(numero: number, valor: number): void {
    let conta = this.buscarNoArray(numero);

    if (conta !== null) {
      conta.depositar(valor);
      console.log(
        `\n deposito na conta numero: ${numero} foi efetuado com sucesso!`
      );
    } else {
      console.log(`conta numero: ${numero} não foi encontrada`);
    }
  }
  transferir(numeroOrigem: number, numeroDestino: number, valor: number): void {
    let contaOrigem = this.buscarNoArray(numeroOrigem);
    let contaDestino = this.buscarNoArray(numeroDestino);

    if (contaOrigem !== null && contaDestino !== null) {
      if (contaOrigem.sacar(valor) === true) {
        contaDestino.depositar(valor);
        console.log(
          `\n a transferência da conta numero: ${numeroOrigem} para a conta numero: ${numeroDestino} foi efetuada com sucesso!`
        );
      }
    } else {
      console.log(
        `\n a conta numero: ${numeroOrigem} e/ou conta numero: ${numeroDestino} não foram encontradas!`
      );
    }
  }

  gerarNumero(): number {
    return ++this.numero;
  }
  buscarNoArray(numero: number): Conta | null {
    for (let conta of this.listasContas) {
      if (conta.numero === numero) {
        return conta;
      }
    }
    return null;
  }
}
