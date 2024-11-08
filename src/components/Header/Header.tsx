import {
  HeaderContainer,
  HeaderContent,
  LogoContainer,
  NewTransactionBtn,
} from "./styles";
import logo from "../../Assets/Logo.svg";
import * as Dialog from "@radix-ui/react-dialog";
import { TransactionModal } from "../NewTransactionModal/TransactionModal";

export function Header() {
  return (
    <HeaderContainer>
      <HeaderContent>
        <LogoContainer>
          <img src={logo} alt="" />
          <h3>DT Money</h3>
        </LogoContainer>
        <Dialog.Root>
          <Dialog.DialogTrigger asChild>
            <NewTransactionBtn>Nova transação</NewTransactionBtn>
          </Dialog.DialogTrigger>
          <TransactionModal />
        </Dialog.Root>
      </HeaderContent>
    </HeaderContainer>
  );
}
