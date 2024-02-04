import React, { useState } from "react";
import "./style.css"
import { useAddTransactions } from "../../../hooks/useAddTransactions";
import { useDeleteTransaction } from "../../../hooks/useDeleteTransaction";
import { useUpdateTransaction } from "../../../hooks/useUpdateTransaction";
import { useGetTransactions } from "../../../hooks/useGetTransactions";
import { useGetUserInfo } from "../../../hooks/useGetUserInfo";
import { signOut } from "firebase/auth";
import { auth } from "../../../config/firebase-config";
import { useNavigate } from 'react-router-dom';

export const ExpenseTracker = () => {
    const [description, setDescription] = useState('');
    const [transactionAmount, setTransactionAmount] = useState(0);
    const [transactionType, setTransactionType] = useState("expense");
    const navigate = useNavigate();

    // Hooks for adding, deleting, and retrieving transactions
    const { addTransactions } = useAddTransactions();
    const { deleteTransaction } = useDeleteTransaction();
    const {updateTransaction} = useUpdateTransaction();
    const { transactions, transactionTotal } = useGetTransactions();
    const { name, profilePhoto } = useGetUserInfo();
    const { balance, income, expense } = transactionTotal;

    //For updation of Transactions
const [updatedDescription, setUpdatedDescription] = useState('');
const [updatedTransactionAmount, setUpdatedTransactionAmount] = useState(0);
const [updatedTransactionType, setUpdatedTransactionType] = useState('');
const [isUpdating, setIsUpdating] = useState(false);

    // Function to add a transaction
    const onSubmit = (e) => {
        e.preventDefault();
        addTransactions({
            description,
            transactionAmount,
            transactionType
        });
        setDescription("");
        setTransactionAmount(0);
    }

    // Function to sign out user
    const signUserOut = async () => {
        try {
            await signOut(auth);
            localStorage.clear();
            navigate("/");
        } catch (err) {
            console.error(err);
        }
    }

    // Function to delete a transaction
    const onDelete = (transactionId) => {
        deleteTransaction(transactionId);
    }
//Function to Update a transaction
const onUpdate = (e, transactionId) => {
    e.preventDefault();
    updateTransaction(transactionId, {
        description: updatedDescription,
        transactionAmount: updatedTransactionAmount,
        transactionType: updatedTransactionType
    });
    // Reset the form after submission
    setUpdatedDescription('');
    setUpdatedTransactionAmount(0);
    setUpdatedTransactionType('');
}
    return (
        <>
              <div className="expense-tracker">
        <div className="container">
            <h1>{name}'s expense tracker</h1>
            <div className="balance">
<h3>YOUR BALANCE AMOUNT</h3>
<h2>{balance}/-</h2>
            </div>
            <div className="summary">
                <div className="income">
                    <h4>income</h4>
                    <p>{income}/-</p>
                </div>
                <div className="expenses">
                <h4>expense</h4>
                    <p>{expense}/-</p>
                </div>
            </div>
            <form className="add-transaction"onSubmit={onSubmit}>
                <input type="text" placeholder="Description" value={description} required onChange={(e)=>setDescription(e.target.value)}/>
                <input type="number" placeholder="Amount"value={transactionAmount} required onChange={(e)=>setTransactionAmount(e.target.value)}/>
                <input type="radio" id="expense" checked={transactionType==="expense"} value="expense"onChange={(e)=>setTransactionType(e.target.value)}/>
                <label htmlFor="expense">Expense</label>
                <input type="radio" id="income" checked={transactionType==="income"}  value="income"onChange={(e)=>setTransactionType(e.target.value)}/>
                <label htmlFor="income">Income</label><br />
                <button type="submit">Add transaction</button>
            </form>
        </div>
     </div>
     {profilePhoto && (
    <div className="profile">
        <img className="profile-photo" src={profilePhoto} alt="Profile" />
        <button className="sign-out-button" onClick={signUserOut}>Sign Out</button>
    </div>
)}

            <div className="transactions">
                <h3>Transactions</h3>
                <ul>
                    {transactions.map((transaction, index) => {
                        const { id, description, transactionAmount, transactionType } = transaction;
                        return (
                            <li key={index}>
                                <h4>{description}</h4>
                                <p>
                                    Rupees {transactionAmount} /- <label>{transactionType}</label>
                                    <span>
                                        <button onClick={() => onDelete(id)}>Delete Transaction</button>
                                        <button onClick={() => setIsUpdating(true)}>Update or Edit</button>
                                    </span>
                                </p>
                                {isUpdating && (
                                    <form onSubmit={(e) => onUpdate(e, id)}>
                                        <input type="text" placeholder="Description" value={updatedDescription} required onChange={(e) => setUpdatedDescription(e.target.value)} />
                                        <input type="number" placeholder="Amount" value={updatedTransactionAmount} required onChange={(e) => setUpdatedTransactionAmount(e.target.value)} />
                                        <input type="radio" id="updatedExpense" checked={updatedTransactionType === "expense"} value="expense" onChange={(e) => setUpdatedTransactionType(e.target.value)} />
                                        <label htmlFor="updatedExpense">Expense</label>
                                        <input type="radio" id="updatedIncome" checked={updatedTransactionType === "income"} value="income" onChange={(e) => setUpdatedTransactionType(e.target.value)} />
                                        <label htmlFor="updatedIncome">Income</label>
                                        <button type="submit">Update</button>
                                    </form>
                                )}
                            </li>
                        );
                    })}
                </ul>
            </div>
        </>
    );
}
