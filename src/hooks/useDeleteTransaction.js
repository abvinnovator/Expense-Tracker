
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../config/firebase-config';
import  React  from 'react';

export const useDeleteTransaction = () => {
    const deleteTransaction = async (transactionId) => {
        try {
            const transactionRef = doc(db, 'transactions', transactionId);
            await deleteDoc(transactionRef);
            console.log('Transaction deleted successfully.');
        } catch (error) {
            console.error('Error deleting transaction:', error);
        }
    };

    return { deleteTransaction };
};
