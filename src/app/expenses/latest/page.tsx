"use client";
import { useEffect, useState } from 'react';
import { UseIdToken } from '@/app/hooks/use-id-token';
import { ContentWrapper } from '@/app/components/content-wrapper';
import { listLatestExpenses } from '../../services/expenseService';
import { ExpenseListLatest, ExpenseLatest } from '../../model/expense-list-latest';
import { toast, Toaster } from 'react-hot-toast';
import { ProblemDetails } from '@/app/services/problemDetails';

export default function Latest() {
    const [expenses, setExpenses] = useState<ExpenseListLatest>({ expenses: [] });
    const [areExpensesLoading, setAreExpensesLoading] = useState(false);
    const idToken = UseIdToken();

    useEffect(() => {
        if (idToken) {
            const fetchData = async () => {
                try {
                    setAreExpensesLoading(true);
                    const data = await listLatestExpenses(idToken, 15);
                    data.expenses = data.expenses.sort((a, b) => a.storedOrder > b.storedOrder ? -1 : 1); // sort in descending order
                    setExpenses(data);
                } catch (error) {
                    toast.error(`An error occurred while listing the latest expenses: ${(error as ProblemDetails).detail}`);
                }
                finally {
                    setAreExpensesLoading(false);
                }
            };

            fetchData();
        }

    });

    return (
        <>
            <Toaster />
            <ContentWrapper title="Latest Expenses" isLoading={areExpensesLoading}>
                <div className="overflow-x-auto">
                    <table className="table table-xs">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Description</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {expenses.expenses.map((expense: ExpenseLatest) => (
                                <tr key={expense.storedOrder}>
                                    <td>{new Date(expense.date).toLocaleDateString()}</td>
                                    <td>{expense.description}</td>
                                    <td>€ {expense.amount}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </ContentWrapper>
        </>);
};