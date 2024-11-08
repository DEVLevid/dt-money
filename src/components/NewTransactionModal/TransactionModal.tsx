import * as Dialog from "@radix-ui/react-dialog";
import { CloseBtn, Content, Overlay, TransactionType, TransactionTypeBtn } from "./styles";
import { ArrowCircleDown, ArrowCircleUp, X } from "phosphor-react";

export function TransactionModal() {
  return (
    <Dialog.Portal>
      <Overlay />
      <Content>
        <CloseBtn><X size={24}/></CloseBtn>
        <Dialog.Title>Nova Transação</Dialog.Title>

        <form action="">
          <input type="text" placeholder="Descrição" required />
          <input type="number" placeholder="Preço" required />
          <input type="text" placeholder="Categoria" required />

          <TransactionType>
            <TransactionTypeBtn value="income" Variant="income"> <ArrowCircleUp size={24}/> Entrada</TransactionTypeBtn>
            <TransactionTypeBtn value="outcome" Variant="outcome"> <ArrowCircleDown size={24}/> Saída</TransactionTypeBtn>
          </TransactionType>

          <button type="submit">Cadastrar</button>
        </form>
      </Content>
    </Dialog.Portal>
  );
}
