"use client";
import React, { useState, useEffect } from 'react';
import { UseIdToken } from "../hooks/use-id-token";
import { CategoryList, CategoryListDetail } from '../model/category-list';
import { ExpenseCreate } from '../model/expense-create';
import { listCategories } from '../services/categoryService';
import { createExpense } from '../services/expenseService';

interface CreateExpenseFormProps {
    onCategoryError: (message: string) => void;
    onCreateSuccess: (message: string) => void;
    onCreateError: (message: string) => void;
    onCategoryChange: (category: string) => void;
    onDescriptionChange: (description: string) => void;
    onAmountChange: (amount: number) => void;
    onDateChange: (date: Date) => void;
    amount: number;
    description: string;
    category: string;
    date: Date | null;
}

export const CreateExpenseForm = ({
    onCategoryError,
    onCreateSuccess,
    onCreateError,
    onCategoryChange,
    onDescriptionChange,
    onAmountChange,
    onDateChange,
    amount,
    description,
    category,
    date
}: CreateExpenseFormProps) => {

    const dateToString = (date: Date) => {
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    };
    const [categories, setCategories] = useState<CategoryList>({ categories: [] });
    const [isExpenseCreating, setIsExpenseCreating] = useState(false);
    const [areCategoriesLoading, setAreCategoriesLoading] = useState(false);
  
    const idToken = UseIdToken();

    const parseDate = (date: Date | null) => {
        if (!date) {
            date = new Date();
        }
        return dateToString(date);
    };

    const ensureDate = (date: Date | null) => {
        if (!date) {
            date = new Date();
        }
        return date;
    };

    const handleCategoryError = (message: string) => {
        onCategoryError(message);
    };

    const handleCreateSuccess = (message: string) => {
        onCreateSuccess(message);
    };

    const handleCreateError = (message: string) => {
        onCreateError(message);
    };

    useEffect(() => {
        if (idToken) {
            const fetchData = async () => {
                try {
                    setAreCategoriesLoading(true);
                    const categories = await listCategories(idToken);
                    setCategories(categories);
                } catch (error) {
                    handleCategoryError('An error occurred while listing the categories.');
                }
                finally {
                    setAreCategoriesLoading(false);
                }
            };
            fetchData();
        }
    }, [idToken]);

    const handleSubmit = async () => {

        if (idToken) {
            setIsExpenseCreating(true);
            const expense: ExpenseCreate = {
                date: ensureDate(date),
                amount: amount,
                description: description,
                category: category
            };
            try {
                await createExpense(expense, idToken);
                setIsExpenseCreating(false);
                handleCreateSuccess('Expense created successfully!');
            } catch (error) {
                setIsExpenseCreating(false);
                handleCreateError('An error occurred while creating the expense.');
            }
        }
    };

    return (
        <>
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Date</span>
                </label>
                <input type="date" className={`input input-bordered w-full`} value={parseDate(date)} required onChange={e => onDateChange(new Date(e.target.value))} />
                <label className="label">
                    <span className="label-text">Amount</span>
                </label>
                <input type="number" step="0.5" className={`input input-bordered`} value={amount} required onClick={e => e.currentTarget.select()} onChange={e => onAmountChange(parseFloat(e.target.value))} />
                <label className="label">
                    <span className="label-text">Description</span>
                </label>
                <input type="text" className={`input input-bordered`} value={description} required onClick={e => e.currentTarget.select()} onChange={e => onDescriptionChange(e.target.value)} />
                <label className="label">
                    <span className="label-text">Category</span>
                    {areCategoriesLoading && <span className="loading loading-ring loading-xs"></span>}
                </label>
                <select value={category} onChange={e => onCategoryChange(e.target.value)} required className={`select select-bordered w-full`}>
                    <option className='font-sans' key={0} value={''} disabled >Select a category</option>
                    {categories.categories.map((category: CategoryListDetail) => (
                        <option className='font-sans' key={category.name} value={category.name}>{category.name}</option>
                    ))}
                </select>
            </div>
            <div className="form-control mt-6">
                <button className="btn btn-primary" onClick={handleSubmit} disabled={isExpenseCreating}>Add</button>
            </div>
        </>
    );
}