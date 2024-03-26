"use client";
import { useEffect, useState } from 'react';
import { UseIdToken } from '@/app/hooks/use-id-token';
import { AuthGate } from '@/app/components/auth-gate';
import { PageContent } from '@/app/components/page-content';
import { listLatestExpenses } from '../../services/expenseService'; // adjust the import path as needed
import { ExpenseListLatest, ExpenseLatest } from '../../model/expense-list-latest';
import { toast, Toaster } from 'react-hot-toast';

export default function Latest() {
    const [expenses, setExpenses] = useState<ExpenseListLatest>({ expenses: [] });
    const [areExpensesLoading, setAreExpensesLoading] = useState(false);

    const idToken = UseIdToken();

    useEffect(() => {
        if (idToken) {
            const fetchData = async () => {
                try {
                    setAreExpensesLoading(true);
                    const data = await listLatestExpenses(idToken, 5);
                    setExpenses(data);
                } catch (error) {
                    toast.error('An error occurred while listing the latest expenses.');
                }
                finally {
                    setAreExpensesLoading(false);
                }
            };

            fetchData();
        }

    }, [idToken]);

    return (
        <AuthGate>
            <Toaster />
            <PageContent title="Latest Expenses" isLoading={areExpensesLoading}>
                <div className="overflow-x-auto">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Description</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {expenses.expenses.map((expense: ExpenseLatest) => (
                                <tr>
                                    <td>{expense.date}</td>
                                    <td>{expense.description}</td>
                                    <td>{expense.amount}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </PageContent>
        </AuthGate>);
};