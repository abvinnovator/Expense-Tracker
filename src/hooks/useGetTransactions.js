import React,{useEffect, useState} from "react";
import {query,collection, where, orderBy, onSnapshot} from "firebase/firestore"
import { db } from "../config/firebase-config";
import { useGetUserInfo } from "./useGetUserInfo";
export const useGetTransactions = ()=>{

    const transactionCollectionRef = collection(db, "transactions");

    const {userID}=useGetUserInfo()

    const[transactions,setTransactions]=useState([]);
    const[transactionTotal,setTransactionTotal]=useState({
        balance:0.00,
        expense:0.00,
        income:0.00,
    })

    const getTransactions=async()=>{

        let unSubscribe;

try{
    const queryTransactions=query(transactionCollectionRef,

        where("userID","==",userID),
        orderBy("createdAt"))

     unSubscribe =  onSnapshot(queryTransactions,(snapshot)=>{
            let docs=[];
            let totalIncome = 0;
            let totalExpenses = 0;
            snapshot.forEach((doc)=>{
                const data =doc.data();
                
                const id=doc.id
                 docs.push({...data,id});
                 if(data.transactionType==="expense"){
                    totalExpenses +=Number(data.transactionAmount);

                 }
                 else{
                    totalIncome +=Number(data.transactionAmount);
                 }
            })
            let balance  =  totalIncome - totalExpenses;
            setTransactions(docs);
            setTransactionTotal({
                balance,
                expense:totalExpenses,
                income:totalIncome
            })
        })
} 

catch(err){
    console.log(err)
}
return ()=>unSubscribe
    }
    useEffect(()=>{
        getTransactions()
    },[])


    return(
        {transactions,transactionTotal}
    )
}