import { useEffect, useState } from "react";
import { Header } from "../../components/Header/Header";
import { Summary } from "../../components/Summary/Summary";
import { SearchForm } from "../components/SearchForm/SearchForm";
import {
  PriceHighlight,
  TransactionsContainer,
  TransactionsTable,
} from "./styles";

interface TransactionsData {
  id: number;
  description: string;
  type: "income" | "outcome";
  category: string;
  price: number;
  createdAt: string;
}

export function Transactions() {
  const [transaction, setTransaction] = useState<TransactionsData[]>([]);

  async function loadTransactions() {
    const response = await fetch("http://localhost:3000/transactions");
    const data = await response.json();
    setTransaction(data);
  }

  useEffect(() => {
    loadTransactions();
  }, []);
  return (
    <div>
      <Header />
      <Summary />

      <TransactionsContainer>
        <SearchForm />
        <TransactionsTable>
          <tbody>
            {transaction.map((transaction) => {
              return (
                <tr key={transaction.id}>
                  <td width="50%">{transaction.description}</td>
                  <td>
                    <PriceHighlight variant={transaction.type}>
                      R${transaction.price}
                    </PriceHighlight>
                  </td>
                  <td>{transaction.category}</td>
                  <td>{transaction.createdAt}</td>
                </tr>
              );
            })}
          </tbody>
        </TransactionsTable>
      </TransactionsContainer>
    </div>
  );
}
