import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import { AlertHeading } from "react-bootstrap";
import ConfirmationModal from './ConfirmationModal';
import { useNavigate } from 'react-router-dom';

const AddExpenses = () => {
    let inputExpenses = [
        { id: 1, name: "WatchmanSalary", amount: 0 },
        { id: 2, name: "DieselBill", amount: 0 },
        { id: 3, name: "WaterBill", amount: 0 },
        { id: 4, name: "PowerBill", amount: 0 },
    ];

    let months = ["January", "Febuary", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "Decemeber"];

    let years = ["2024", "2025"]

    const [expenses, setExpenses] = useState(inputExpenses);
    const [totalExpenses, setTotalExpenses] = useState(0);
    const [previousMonthCorpusFund, setPreviousMonthCorpusFund] = useState(0);
    const [currentMonthCorpusFund, setCurrentMonthCorpusFund] = useState(0);
    const [selectedMonth, setSelectedMonth] = useState("");
    const [selectedYear, setSelectedYear] = useState("2024");
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate(); // React Router hook for navigation
    const isFromSaveExpensePage = true;

    const handleChangeMonth = (e) => {
        setSelectedMonth(e.target.value);
    };

    const handleChangeYear = (e) => {
        setSelectedYear(e.target.value);
    };

    const handleConfirm = () => {
        saveExpenses();
        setShowModal(false);
        navigate('/viewExpenses', { state: { selectedMonth, selectedYear, isFromSaveExpensePage } });
    }

    const handleCancel = () => {
        setShowModal(false);
    }

    const handleSaveExpense = () => {
        if (!selectedMonth) {
            alert(`Please select the month`);
            return;
        }
        setShowModal(true);
    }

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
    }


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

    async function saveExpenses() {
        try {
            let requestObj = {
                monthlyExpenses: expenses,
                totalMonthExpenses: totalExpenses,
                previousMonthCorpusFund: previousMonthCorpusFund,
                currentMonthCorpusFund: currentMonthCorpusFund,
                monthYear: selectedMonth + "-" + selectedYear
            };
            const requestBody = JSON.stringify(requestObj);
            console.log("expenses requestBody:", requestBody);

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
            <div style={{ display: "flex", alignItems: "left", gap: "3rem" }}>
                <div>
                    <h2 className="mb-4">Add Expenses</h2>
                </div>
                <div>
                    <select
                        className="form-control"
                        value={selectedMonth}
                        onChange={handleChangeMonth}
                        required
                    >
                        <option value="" disabled>
                            Month
                        </option>
                        {months.map((month, index) => (
                            <option key={index + 1} value={index + 1}>
                                {month}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <select
                        className="form-control"
                        value={selectedYear}
                        onChange={handleChangeYear}
                        required
                    >
                        <option value="" disabled>
                            Year
                        </option>
                        {years.map((year, index) => (
                            <option key={index} value={index}>
                                {year}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

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

            <div className="mt-3" style={{ display: "flex", alignItems: "left", gap: "6rem" }}>
                <div>
                    <button className="btn btn-primary mt-3" onClick={handleAddExpense}>
                        Add New Expense
                    </button>
                </div>
                <div>
                    <button className="btn btn-primary saveBtn mt-3" onClick={handleSaveExpense}>
                        Save Expenses
                    </button>
                </div>
            </div>
            <div className="mt-3">
                <h5>Total Cost: {totalExpenses}</h5>
            </div>
            {showModal && (
                <ConfirmationModal
                    title="Save Confirmation"
                    message={`Expenses for ${months[selectedMonth - 1]} will be saved.`}
                    onConfirm={handleConfirm}
                    onCancel={handleCancel}
                />
            )}
        </div >
    );
};

export default AddExpenses;
