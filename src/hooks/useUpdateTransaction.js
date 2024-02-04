import React from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebase-config';

export const useUpdateTransaction = () => {
    const updateTransaction = async (transactionId, newData) => {
        try {
            const transactionRef = doc(db, 'transactions', transactionId);
            await updateDoc(transactionRef, newData);
            console.log('Transaction updated successfully.');
        } catch (error) {
            console.error('Error updating transaction:', error);
        }
    };

    return { updateTransaction };
};
