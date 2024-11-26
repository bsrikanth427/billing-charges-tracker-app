// components/ExpenseTable.js
import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

const SavingsTable = () => {

    const savingsArr = [
        { "id": 1, "name": "Deposits", "amount": 0 },
        { "id": 2, "name": "auctionMoney", "amount": 0 }
    ];

    const [savings, setSavings] = useState(savingsArr);
    const [totalSavings, setTotalSavings] = useState(0);

    const updateSavingName = (savingObj, newName) => {
        let updatedSavings = savings.map(saving => (
            saving.id === savingObj.id ? { ...saving, name: newName } : saving
        ))
        setSavings(updatedSavings);
    }

    const updateSavingAmount = (savingObj, newAmount) => {
        let updatedSavings = savings.map(saving => (
            saving.id === savingObj.id ? { ...saving, amount: newAmount } : saving
        ))
        setSavings(updatedSavings);

        const totalSavings = updatedSavings.reduce((sum, savings) => {
            return sum + (Number(savings.amount) || 0);
        }, 0);
        setTotalSavings(totalSavings);
    }

    const handleDelete = (savingObj) => {
        let updatedSavings = savings.filter((saving) => saving.id !== savingObj.id);
        setSavings(updatedSavings);
        const totalSavings = updatedSavings.reduce((sum, savings) => {
            return sum + (Number(savings.amount) || 0);
        }, 0);
        setTotalSavings(totalSavings);
    }

    function addNewSavings() {
        let savings2 = [...savings];
        savings2.push({ id: savings2.length + 1, name: "", amount: 0 })
        setSavings(savings2);

        //setSavings([...savings, { id: savings2.length + 1, name: "", amount: 0 }])
    }

    return (
        <div className="container mt-4 table-container">
            <h2 className="mb-4">Savings Table</h2>
            <table className="table table-bordered table-striped text-center">
                <thead className="thead-dark">
                    <tr>
                        <th>Savings</th>
                        <th>Amount</th>
                        <th>Action</th>
                    </tr>
                    {savings.map(saving => (
                        <tr key={saving.id}>
                            <td>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={saving.name}
                                    onChange={(e) => updateSavingName(saving, e.target.value)}
                                    placeholder="Enter Savings">
                                </input>
                            </td>
                            <td>
                                <input
                                    type="number"
                                    className="form-control"
                                    value={saving.amount}
                                    onChange={(e) => updateSavingAmount(saving, e.target.value)}
                                    placeholder="Enter Savings">
                                </input>
                            </td>
                            <td>
                                <button
                                    className="btn btn-danger"
                                    title="Delete Saving"
                                    onClick={(e) => handleDelete(saving)}
                                >
                                    <FaTrash />
                                </button>
                            </td>
                        </tr>
                    ))}

                </thead>
                <tbody>
                </tbody>
            </table>
            <div>
                <button className="btn btn-primary mt-3" onClick={(e) => addNewSavings()}>Add Savings</button>
            </div>
            <div className="mt-3">
                <h5>Total Savings: {totalSavings}</h5>
            </div>
        </div>
    );
};

export default SavingsTable;
