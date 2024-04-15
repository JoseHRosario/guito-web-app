"use client";
import { useEffect, useState } from 'react';
import { UseIdToken } from '@/app/hooks/use-id-token';
import { ContentWrapper } from '@/app/components/content-wrapper';
import { toast, Toaster } from 'react-hot-toast';
import { Transaction, TransactionList } from '../model/transaction-list';
import { listTransactions } from '../services/accountService';
import { ProblemDetails } from '@/app/services/problemDetails';

export default function Transactions() {
    const [transactions, setTransactions] = useState<TransactionList>({ transactions: [] });
    const [areTransactionsLoading, setAreTransactionsLoading] = useState(false);
    const idToken = UseIdToken();

    useEffect(() => {
        if (idToken) {
            const fetchData = async () => {
                try {
                    setAreTransactionsLoading(true);
                    const data = await listTransactions(idToken);
                    data.transactions = data.transactions.sort((a, b) => a.date > b.date ? -1 : 1); // sort in descending order
                    setTransactions(data);
                } catch (error) {
                    toast.error(`An error occurred while listing the transactions: ${(error as ProblemDetails).detail}`);
                }
                finally {
                    setAreTransactionsLoading(false);
                }
            };

            fetchData();
        }

    }, [idToken]);

    return (
        <>
            <Toaster />
            <ContentWrapper title="Latest Transactions" isLoading={areTransactionsLoading}>
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
                            {transactions.transactions.map((transaction: Transaction, index) => (
                                <tr key={index}>
                                    <td className='align-top'>{new Date(transaction.date).toLocaleDateString()}</td>
                                    <td className='align-top'>{transaction.description}</td>
                                    <td className='align-top'>€ {transaction.amount}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </ContentWrapper>
        </>
    );
}