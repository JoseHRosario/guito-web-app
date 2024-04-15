"use client";
import { useEffect, useState } from 'react';
import { UseIdToken } from '@/app/hooks/use-id-token';
import { ContentWrapper } from '@/app/components/content-wrapper';
import { listExpenseMatches } from '../../services/expenseService';
import { ExpenseMatchList, ExpenseMatch, TransactionMatchDetail } from '../../model/expense-match-list';
import { toast, Toaster } from 'react-hot-toast';
import { SiGooglesheets } from "react-icons/si";
import { BsCreditCardFill } from "react-icons/bs";
import { CreateExpenseForm } from '@/app/components/create-expense-form';
import { ProblemDetails } from '@/app/services/problemDetails';

export default function Match() {
    const [matches, setMatches] = useState<ExpenseMatchList>({ matches: [] });
    const [areMatchesLoading, setAreMatchesLoading] = useState(false);
    const [amount, setAmount] = useState(-1);
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('Eating out');
    const [date, setDate] = useState(new Date());

    const idToken = UseIdToken();

    const handleCategoryError = (message: string) => {
        toast.error(message);
    };

    const handleCreateSuccess = (message: string) => {
        toast.success(message);
        (document.getElementById('modalCreate') as HTMLDialogElement)?.close()
    };

    const handleCreateError = (message: string) => {
        toast.error(message);
    };

    useEffect(() => {
        if (idToken) {
            const fetchMatches = async () => {
                try {
                    setAreMatchesLoading(true);
                    const data = await listExpenseMatches(idToken);
                    data.matches = data.matches.sort((a, b) => a.date > b.date ? -1 : 1); // sort in descending order
                    setMatches(data);
                } catch (error) { 
                    toast.error(`An error occurred while listing the categories: ${(error as ProblemDetails).detail}`);
                }
                finally {
                    setAreMatchesLoading(false);
                }
            };

            fetchMatches();
        }

    }, [idToken]);

    const openModal = (transaction: TransactionMatchDetail, date: Date) => {
        setAmount(transaction.amount);
        setCategory(category);
        setDate(new Date(date));
        setDescription(transaction.description);
        (document.getElementById('modalCreate') as HTMLDialogElement)?.showModal()
    };

    return (
        <>
            <dialog id="modalCreate" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h2 className="font-bold text-lg">Create Expense</h2>
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
                </div>
            </dialog>
            <Toaster />
            <ContentWrapper title="Match Expenses" isLoading={areMatchesLoading}>
                {matches.matches.map((match: ExpenseMatch, index) => (
                    <div key={index} >
                        <div className="overflow-x-auto">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th colSpan={2}>{new Date(match.date).toLocaleDateString()}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {match.expense ? (
                                        <tr>
                                            <td className="w-7"><SiGooglesheets className='fill-green-800' /></td>
                                            <td colSpan={2}>
                                                {match.expense?.description}
                                                <br /><span className='font-bold text-xs'>€ {match.expense?.amount}</span>
                                            </td>
                                        </tr>
                                    ) : null}
                                    {match.transaction ? (
                                        <tr>
                                            <td><BsCreditCardFill className='fill-sky-600' /></td>
                                            <td>
                                                {match.transaction?.description}
                                                <br /><span className='font-bold text-xs'>€ {match.transaction?.amount}</span>
                                            </td>
                                            <td className="w-10">
                                                <button className="btn btn-primary btn-sm" onClick={() => openModal(match.transaction, match.date)}>Add</button>
                                            </td>
                                        </tr>
                                    ) : null}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ))}
            </ContentWrapper>
        </>);
};