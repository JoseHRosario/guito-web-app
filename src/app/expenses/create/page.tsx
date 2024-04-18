"use client";
import { useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { CreateExpenseForm } from '@/app/components/create-expense-form';
import { ContentWrapper } from "@/app/components/content-wrapper";
import { ExpenseCreate } from '@/app/model/expense-create';
import { ExpenseExtract } from '@/app/model/expense-extract';
import { extractExpense } from '../../services/aiService';
import { UseIdToken } from '@/app/hooks/use-id-token';
import { BiSolidMicrophone } from "react-icons/bi";
import { MdRecordVoiceOver } from "react-icons/md";
import { ProblemDetails } from '@/app/services/problemDetails';


export default function CreateExpense() {

  const router = useRouter();
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Eating out');
  const [date, setDate] = useState<Date | null>(null);
  const [isExtractingExpense, setIsExtractingExpense] = useState<boolean>(false);
  const [isListening, setIsListening] = useState<boolean>(false);

  const idToken = UseIdToken();

  let favorites: ExpenseCreate[] = [
    { amount: 2.05, description: 'Coco Verde', category: 'Eating out', date: new Date() },
    { amount: 0, description: 'Continente', category: 'Groceries', date: new Date() }
  ];

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

  const fetchExtractExpense = async (prompt: string) => {
    if (idToken) {
      try {
        setIsExtractingExpense(true);
        const extract: ExpenseExtract = {
          language: "pt-PT", // en-US
          prompt: prompt
        }
        console.log(extract);
        const data = await extractExpense(extract, idToken);
        setAmount(data.amount);
        setDescription(data.description);
        setCategory(data.category);
        setDate(new Date(data.date));
      } catch (error) {
        toast.error(`An error occurred while listing the latest expenses: ${(error as ProblemDetails).detail}`);
      }
      finally {
        setIsExtractingExpense(false);
      }
    }
  }

  const handleOnRecord = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = "pt-PT"; // en-US

    recognition.onresult = async (event) => {
      const transcription = event.results[0][0].transcript;
      toast.success(transcription);
      await fetchExtractExpense(transcription);
    };
    recognition.onstart = () => {
      setIsListening(true);
    }
    recognition.onend = () => {
      setIsListening(false);
    }

    recognition.start();
  }

  return (
    <>
      <Toaster />
      <ContentWrapper title="Create Expense" isLoading={false}>
        <div className="card-actions">
          {favorites.map((favorite, index) => (
            <button className="btn btn-secondary btn-sm" key={index} onClick={() => {
              setAmount(favorite.amount);
              setDescription(favorite.description);
              setCategory(favorite.category);
            }}>
              {favorite.description}
            </button>
          ))}
          <button className="btn btn-secondary btn-sm w-32" key={99999} onClick={handleOnRecord}>
            Listen
            {!isListening && !isExtractingExpense && <BiSolidMicrophone />}
            {isListening && <MdRecordVoiceOver />}
            {isExtractingExpense && <span className="loading loading-spinner loading-xs" />}
          </button>
        </div>
        {/* <textarea className="textarea textarea-bordered h-36" value={transcript} defaultValue={transcript} onChange={(e) => setTranscript(e.target.value)} /> */}
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