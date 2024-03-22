"use client";
import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { listCategories, createExpense } from './services/expenseService';
import { Category } from './model/category';
import { Expense } from './model/expense';
import { toast, Toaster } from 'react-hot-toast';

export default function Home() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [isExpenseCreating, setIsExpenseCreating] = useState(false);
  const [isCategoriesLoading, setIsCategoriesLoading] = useState(false);
  const { data: session } = useSession();
  const idToken = session?.user?.name;

  useEffect(() => {
    if (idToken) {
      const fetchData = async () => {
        try {
          setIsCategoriesLoading(true);
          const categories = await listCategories(idToken);
          setCategories(categories);
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
      const expense: Expense = {
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
      }
    }
  };

  return (

    <div className="flex items-center justify-center pt-5">
      <Toaster />
      <div className="card w-11/12 max-w-md bg-base-100 shadow-2xl">
        <div className="card-body">
          <h2 className="card-title">Expense</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Date</span>
              </label>
              <input type="date" className={`input input-bordered`} defaultValue={date} required onChange={e => setDate(e.target.value)} />
              <label className="label">
                <span className="label-text">Amount</span>
              </label>
              <input type="number" step="0.01" className={`input input-bordered`} defaultValue={amount} required onChange={e => setAmount(e.target.value)} />
              <label className="label">
                <span className="label-text">Description</span>
              </label>
              <input type="text" className={`input input-bordered`} defaultValue={description} required onChange={e => setDescription(e.target.value)} />
              <label className="label">
                <span className="label-text">Category</span>
                {isCategoriesLoading && <span className="loading loading-ring loading-xs"></span>}
              </label>
              <select defaultValue={''} onChange={e => setCategory(e.target.value)} required className={`select select-bordered w-full`}>
                <option key={0} value={''} disabled >Select a category</option>
                {categories.map((category: Category) => (
                  <option key={category.name} value={category.name}>{category.name}</option>
                ))}
              </select>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary" disabled={isExpenseCreating}>Add</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}