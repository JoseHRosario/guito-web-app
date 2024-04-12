"use client";
import { useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { CreateExpenseForm } from '@/app/components/create-expense-form';
import { ContentWrapper } from "@/app/components/content-wrapper";

export default function CreateExpense() {

  const router = useRouter();
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Eating out');
  const [date, setDate] = useState<Date | null>(null);

  const handleCategoryError = (message: string) => {
    toast.error(message);
  };

  const handleCreateSuccess = (message: string) => {
    toast.success(message);
    router.push('/expenses/latest');
  };

  const handleCreateError = (message: string) => {
    toast.error(message);
  };

  return (
    <>
      <Toaster />
      <ContentWrapper title="Create Expense" isLoading={false}>
        <CreateExpenseForm
          onCategoryError={handleCategoryError}
          onCreateSuccess={handleCreateSuccess}
          onCreateError={handleCreateError}
          onAmountChange={setAmount}
          onDescriptionChange={setDescription}
          onCategoryChange={setCategory}
          onDateChange={setDate}
          amount={amount}
          description={description}
          category={category}
          date={date} />
      </ContentWrapper>
    </>
  );
}