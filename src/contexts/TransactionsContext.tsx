import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../lib/axios";

export interface Transaction {
  id: number;
  description: string;
  type: "income" | "outcome";
  category: string;
  price: number;
  createdAt: string;
} 
interface CreateTransactionInput {
  price: number,
  category: string,
  type: 'income' | 'outcome',
  description: string,
}

interface TransactionsContextType {
  transactions: Transaction[];
  fetchTransactions: (query?: string) => Promise<void>
  createTransactions: (data: CreateTransactionInput) => Promise<void>
}


export const TransactionsContext = createContext({} as TransactionsContextType);

interface TransactionsProviderProps {
  children: ReactNode;
}

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  async function fetchTransactions(query?: string) {
    const response = await api.get('/transactions', {
      params: {
        _sort: 'createdAt',
        _order: 'desc',
        q: query
      }
    })
    setTransactions(response.data);
  }

  async function createTransactions(data: CreateTransactionInput ){
    const { description, category, price, type} = data;
    const response = await api.post('transactions', {
      description,
      type, 
      category,
      price,
      createdAt: new Date(),
    })

    setTransactions(state => [...state, response.data])
  }

  useEffect(() => {
    fetchTransactions();
  }, []);
  
  return (
    <TransactionsContext.Provider value={{ transactions, fetchTransactions, createTransactions}}>
      {children}
    </TransactionsContext.Provider>
  );
}
