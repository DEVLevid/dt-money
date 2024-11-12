import * as Dialog from "@radix-ui/react-dialog";
import {
  CloseBtn,
  Content,
  Overlay,
  TransactionType,
  TransactionTypeBtn,
} from "./styles";
import { ArrowCircleDown, ArrowCircleUp, X } from "phosphor-react";
import * as z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "../../lib/axios";

const newTransactionFormSchema = z.object({
  description: z.string(),
  price: z.number(),
  category: z.string(),
  type: z.enum(["income", "outcome"]),
});

type newTransactionInput = z.infer<typeof newTransactionFormSchema>;

export function TransactionModal() {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<newTransactionInput>({
    resolver: zodResolver(newTransactionFormSchema),
  });

  async function handleCreateNewTransaction(data: newTransactionInput) {
    const { description, category, price, type} = data;
    await api.post('transactions', {
      description,
      type, 
      category,
      price,
      createdAt: new Date(),
    })

    reset();
  }
  return (
    <Dialog.Portal>
      <Overlay />
      <Content>
        <CloseBtn>
          <X size={24} />
        </CloseBtn>
        <Dialog.Title>Nova Transação</Dialog.Title>

        <form onSubmit={handleSubmit(handleCreateNewTransaction)}>
          <input
            type="text"
            placeholder="Descrição"
            required
            {...register("description")}
          />
          <input
            type="number"
            placeholder="Preço"
            required
            {...register("price", { valueAsNumber: true })}
          />
          <input
            type="text"
            placeholder="Categoria"
            required
            {...register("category")}
          />

          <Controller
            control={control}
            name="type"
            render={({ field }) => {
              return (
                <TransactionType
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <TransactionTypeBtn value="income" Variant="income">
                    <ArrowCircleUp size={24} /> Entrada
                  </TransactionTypeBtn>
                  <TransactionTypeBtn value="outcome" Variant="outcome">
                    <ArrowCircleDown size={24} /> Saída
                  </TransactionTypeBtn>
                </TransactionType>
              );
            }}
          />

          <button type="submit" disabled={isSubmitting}>
            Cadastrar
          </button>
        </form>
      </Content>
    </Dialog.Portal>
  );
}
