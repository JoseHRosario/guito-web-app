"use client";
import React, { useState, useEffect } from 'react';
import { UseIdToken } from '@/app/hooks/use-id-token';
import { AuthGate } from '@/app/components/auth-gate';
import { PageContent } from '@/app/components/page-content';
import { createExpense } from '../../services/expenseService';
import { listCategories } from '../../services/categoryService';
import { CategoryList, CategoryListDetail } from '../../model/category-list';
import { ExpenseCreate } from '../../model/expense-create';
import { toast, Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function CreateExpense() {
  const [categories, setCategories] = useState<CategoryList>({ categories: [] });
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [isExpenseCreating, setIsExpenseCreating] = useState(false);
  const [isCategoriesLoading, setIsCategoriesLoading] = useState(false);
  
  const router = useRouter();
  const idToken = UseIdToken();

  useEffect(() => {
    if (idToken) {
      const fetchData = async () => {
        try {
          setIsCategoriesLoading(true);
          const categories = await listCategories(idToken);
          setCategories(categories);
          setCategory('Eating out');
        } catch (error) {
          toast.error('An error occurred while listing the categories.');
        }
        finally {
          setIsCategoriesLoading(false);
        }
      };

      fetchData();
    }
  }, [idToken]);

  const [date, setDate] = useState(() => {
    const today = new Date();
    return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  });


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (idToken) {
      setIsExpenseCreating(true);
      const expense: ExpenseCreate = {
        date: new Date(date),
        amount: parseFloat(amount),
        description,
        category
      };

      try {
        await createExpense(expense, idToken);
        toast.success('Expense created successfully!');
      } catch (error) {
        toast.error('An error occurred while creating the expense.');
      } finally {
        setIsExpenseCreating(false);
        router.push('/expenses/latest')
      }
    }
  };

  return (
    <AuthGate>
      <Toaster />
      <PageContent title="Create Expense" isLoading={false}>
            <form onSubmit={handleSubmit}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Date</span>
                </label>
                <input type="date" className={`input input-bordered w-full`} defaultValue={date} required onChange={e => setDate(e.target.value)} />
                <label className="label">
                  <span className="label-text">Amount</span>
                </label>
                <input type="number" step="0.5" className={`input input-bordered`} defaultValue={amount} required onChange={e => setAmount(e.target.value)} />
                <label className="label">
                  <span className="label-text">Description</span>
                </label>
                <input type="text" className={`input input-bordered`} defaultValue={description} required onChange={e => setDescription(e.target.value)} />
                <label className="label">
                  <span className="label-text">Category</span>
                  {isCategoriesLoading && <span className="loading loading-ring loading-xs"></span>}
                </label>
                <select value={category} onChange={e => setCategory(e.target.value)} required className={`select select-bordered w-full`}>
                  <option className='font-sans' key={0} value={''} disabled >Select a category</option>
                  {/* {categories.categories.map((category: CategoryListDetail) => (
                    <option className='font-sans' key={category.name} value={category.name}>{category.name}</option>
                  ))} */}
                </select>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary" disabled={isExpenseCreating}>Add</button>
              </div>
            </form>
      </PageContent>
    </AuthGate>
  );
}