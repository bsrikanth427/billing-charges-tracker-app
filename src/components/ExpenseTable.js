// components/ExpenseTable.js
import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

const ExpenseTable = () => {
    let inputExpenses = [
        { id: 1, name: "WatchmanSalary", amount: 0 },
        { id: 2, name: "DieselBill", amount: 0 },
        { id: 3, name: "WaterBill", amount: 0 },
        { id: 4, name: "PowerBill", amount: 0 },
    ];

    const [expenses, setExpenses] = useState(inputExpenses);
    const [totalExpenses, setTotalExpenses] = useState(0);
    const [totalSavingsAmount, setTotalSavingsAmount] = useState(0);
    const [netBalanceAmount, setNetBalanceAmount] = useState(0);

    const handleInputAmountChange = (inputExpense, changedAmount) => {
        const changedExpenses = expenses.map((expense) =>
            inputExpense.id === expense.id
                ? { ...expense, amount: changedAmount }
                : expense
        );
        setExpenses(changedExpenses);

        const totalCost = changedExpenses.reduce((sum, expense) => {
            return sum + (Number(expense.amount) || 0);
        }, 0);

        setTotalExpenses(totalCost);
    };

    const handleInputExpenseNameChange = (inputExpense, changedExpenseName) => {
        const updatedExpenses = expenses.map((expense) =>
            expense.id === inputExpense.id
                ? { ...expense, name: changedExpenseName }
                : expense
        );

        setExpenses(updatedExpenses);
    };

    const handleAddExpense = () => {
        setExpenses([...expenses, { id: expenses.length + 1, name: "", amount: 0 }]);
    };

    const handleDeleteExpense = (id) => {
        const updatedExpenses = expenses.filter((expense) => expense.id !== id);
        setExpenses(updatedExpenses);

        const totalCost = updatedExpenses.reduce((sum, expense) => {
            return sum + (Number(expense.amount) || 0);
        }, 0);

        setTotalExpenses(totalCost);
    };

    const handleSaveExpense = async () => {
        try {
            let requestObj = {
                monthlyExpenses: expenses,
                totalMonthExpenses: totalExpenses,
                totalSavingsAmount,
                netBalanceAmount,
            };
            const requestBody = JSON.stringify(requestObj);

            const response = await fetch("http://localhost:9090/api/expenses", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: requestBody,
            });

            if (response.ok) {
                const data = await response.json();
                console.log("Expenses saved successfully:", data);
                alert("Expenses saved successfully!");
            } else {
                console.error("Failed to save expenses");
                alert("Failed to save expenses.");
            }
        } catch (error) {
            console.error("Error saving expenses:", error);
            alert("An error occurred while saving expenses.");
        }
    };

    return (
        <div className="container mt-4 table-container">
            <h2 className="mb-4">Expense Table</h2>
            <table className="table table-bordered table-striped text-center">
                <thead className="thead-dark">
                    <tr>
                        <th>Expense</th>
                        <th>Amount</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {expenses.map((expense) => (
                        <tr key={expense.id}>
                            <td>
                                <input
                                    type="text"
                                    value={expense.name}
                                    className="form-control"
                                    placeholder="Enter expense"
                                    onChange={(e) =>
                                        handleInputExpenseNameChange(expense, e.target.value)
                                    }
                                />
                            </td>
                            <td>
                                <input
                                    type="number"
                                    value={expense.amount}
                                    className="form-control"
                                    placeholder="Enter cost"
                                    onChange={(e) =>
                                        handleInputAmountChange(expense, e.target.value)
                                    }
                                />
                            </td>
                            <td>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => handleDeleteExpense(expense.id)}
                                    title="Delete Expense"
                                >
                                    <FaTrash />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="mt-3">
                <button className="btn btn-primary mt-3" onClick={handleAddExpense}>
                    Add Expense
                </button>

                <button
                    className="btn btn-primary saveBtn mt-3"
                    onClick={handleSaveExpense}
                >
                    Save Expense
                </button>
            </div>
            <div className="mt-3">
                <h5>Total Cost: {totalExpenses}</h5>
            </div>
        </div>
    );
};

export default ExpenseTable;
