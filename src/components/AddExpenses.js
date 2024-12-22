import React, { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import { AlertHeading } from "react-bootstrap";
import ConfirmationModal from './ConfirmationModal';
import { useNavigate } from 'react-router-dom';
import axios from "axios";


const AddExpenses = (props) => {
    console.log("addOrEdit", props.addOrEdit);
    let inputExpenses = [
        { _id: 1, name: "WatchmanSalary", amount: 0 },
        { _id: 2, name: "DieselBill", amount: 0 },
        { _id: 3, name: "WaterBill", amount: 0 },
        { _id: 4, name: "PowerBill", amount: 0 },
    ];
    const [expenses, setExpenses] = useState(inputExpenses);
    const [totalExpenses, setTotalExpenses] = useState(0);
    const [corpusFund, setCorpusFund] = useState(0);
    const [selectedMonth, setSelectedMonth] = useState("");
    const [selectedYear, setSelectedYear] = useState("2024");
    const [heading, setHeading] = useState("");
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate(); // React Router hook for navigation
    const isFromSaveExpensePage = true;

    let months = ["January", "Febuary", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "Decemeber"];

    let years = ["2024", "2025"]



    useEffect(() => {
        if (props.addOrEdit === "add") {
            outstandingBalance();
            setExpenses(inputExpenses);
        } else if (props.addOrEdit === "edit") {
            setExpenses([]);
        }

    }, [props.addOrEdit])

    const handleChangeMonth = (e) => {
        const newMonth = e.target.value;
        setSelectedMonth(newMonth);
        if (props.addOrEdit === "edit") {
            fetchExpensesByMonth(newMonth, selectedYear);
        }
    };


    const handleChangeYear = (e) => {
        const newYear = e.target.value;
        setSelectedYear(newYear);
        if (props.addOrEdit === "edit") {
            fetchExpensesByMonth(selectedMonth, newYear);
        }
    };



    async function fetchExpensesByMonth(month = selectedMonth, year = selectedYear) {
        const monthYear = month + "-" + year;
        console.log("fetching expenses for month-year: " + monthYear);
        try {
            const response = await axios.get("http://localhost:9090/api/expenses/" + monthYear);
            console.log("fetch expenses response: " + JSON.stringify(response.data.data));
            const monthlyExpenses = response.data.data.monthlyExpenses || [];
            setExpenses(monthlyExpenses);
            const totalCost = monthlyExpenses.reduce((sum, expense) => {
                return sum + (Number(expense.amount) || 0);
            }, 0);
            setCorpusFund(response.data.data.previousCorpusFund)
            setTotalExpenses(totalCost);
        } catch (error) {
            console.error("Error fetching expenses:", error);
            setExpenses([]);
        }
    }

    const outstandingBalance = async () => {
        try {
            console.log("fetching outstandingBalance");
            const response = await fetch('http://localhost:9090/api/funds/balance', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });
            const result = await response.json();
            if (result) {
                setCorpusFund(result.data)
            }
        } catch (error) {
            console.error('An error occurred while fetching  the funds balance amount');
            console.error('Error:', error);
        }
    }

    const handleConfirm = async () => {
        const isSuccess = await saveExpenses();
        //alert(JSON.stringify(isSuccess));
        setShowModal(false);
        if (isSuccess) {
            navigate('/viewExpenses', { state: { selectedMonth, selectedYear, isFromSaveExpensePage } });
        } else {
            alert("Save Expenses Failed!!");
        }
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
            inputExpense._id === expense._id
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
            expense._id === inputExpense._id
                ? { ...expense, name: changedExpenseName }
                : expense
        );

        setExpenses(updatedExpenses);
    };

    const handleAddExpense = () => {
        setExpenses([...expenses, { _id: expenses.length + 1, name: "", amount: 0 }]);
    };

    const handleDeleteExpense = (id) => {
        const updatedExpenses = expenses.filter((expense) => expense._id !== id);
        setExpenses(updatedExpenses);

        const totalCost = updatedExpenses.reduce((sum, expense) => {
            return sum + (Number(expense.amount) || 0);
        }, 0);

        setTotalExpenses(totalCost);
    };


    async function saveExpenses() {
        let isSuccess = false;
        try {
            let requestObj = {
                monthlyExpenses: expenses,
                totalMonthExpenses: totalExpenses,
                corpusFund: corpusFund,
                monthYear: selectedMonth + "-" + selectedYear
            };
            const requestBody = JSON.stringify(requestObj);
            console.log("expenses requestBody:", requestBody);

            let httpMethod = props.addOrEdit === "edit" ? "PUT" : "POST";

            const response = await fetch("http://localhost:9090/api/expenses", {
                method: httpMethod,
                headers: {
                    "Content-Type": "application/json",
                },
                body: requestBody,
            });

            if (response.ok) {
                const data = await response.json();
                console.log("Expenses saved successfully:", data);
                isSuccess = true;
            } else {
                console.error("Failed to save expenses");
                isSuccess = false;
            }
        } catch (error) {
            console.error("Error saving expenses:", error);
            isSuccess = false;
        }
        return isSuccess;
    };



    return (
        <div className="container mt-4 table-container">
            <div style={{ display: "flex", alignItems: "left", gap: "3rem" }}>
                <div>
                    <h2 className="mb-4">{heading}</h2>
                </div>
                <div>
                    <h2 className="mb-4">CorpusFund: {corpusFund}</h2>
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
                        {years.map((year) => (
                            <option key={year} value={year}>
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
                    {expenses.map((expense, index) => (
                        <tr key={index}>
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
                                    onClick={() => handleDeleteExpense(expense._id)}
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
