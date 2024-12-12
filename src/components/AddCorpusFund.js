// components/ExpenseTable.js
import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

const AddCorpusFund = () => {

    const fundsArr = [
        { "id": 1, "name": "", "amount": 0, "type": "CREDIT", "description": "", }
    ];

    const [funds, setFunds] = useState(fundsArr);
    const [totalFundAmount, setTotalFundAmount] = useState(0);

    const updateFundName = (fundObj, newName) => {
        let updatedFunds = funds.map(fund => (
            fund.id === fundObj.id ? { ...fund, name: newName } : fund
        ))
        setFunds(updatedFunds);
    }

    const updateFundAmount = (fundObj, newAmount) => {
        let updatedFunds = funds.map(fund => (
            fund.id === fundObj.id ? { ...fund, amount: newAmount } : fund
        ))
        setFunds(updatedFunds);

        const totalAmount = updatedFunds.reduce((sum, funds) => {
            return sum + (Number(funds.amount) || 0);
        }, 0);
        setTotalFundAmount(totalAmount);
    }

    const updateDescription = (fundObj, newDescription) => {
        let updatedFunds = funds.map(fund => (
            fund.id === fundObj.id ? { ...fund, description: newDescription } : fund
        ))
        setFunds(updatedFunds);
    }

    const handleDelete = (fundObj) => {
        let updatedFunds = funds.filter((fund) => fund.id !== fundObj.id);
        setFunds(updatedFunds);
        const totalAmount = updatedFunds.reduce((sum, funds) => {
            return sum + (Number(funds.amount) || 0);
        }, 0);
        setTotalFundAmount(totalAmount);
    }

    function addNewFunds() {
        let funds2 = [...funds];
        funds2.push({ id: funds2.length + 1, name: "", amount: 0 })
        setFunds(funds2);
    }

    function saveFunds() {


    }


    return (
        <div className="container mt-4 table-container">
            <h2 className="mb-4">Add Funds</h2>
            <table className="table table-bordered table-striped text-center">
                <thead className="thead-dark">
                    <tr>
                        <th>Name</th>
                        <th>Amount</th>
                        <th>Description</th>
                        <th>Action</th>
                    </tr>
                    {funds.map(fund => (
                        <tr key={fund.id}>
                            <td>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={fund.name}
                                    onChange={(e) => updateFundName(fund, e.target.value)}
                                    placeholder="FundName">
                                </input>
                            </td>
                            <td>
                                <input
                                    type="number"
                                    className="form-control"
                                    value={fund.amount}
                                    onChange={(e) => updateFundAmount(fund, e.target.value)}
                                    placeholder="Amount">
                                </input>
                            </td>
                            <td>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={fund.description}
                                    onChange={(e) => updateDescription(fund, e.target.value)}
                                    placeholder="Description">
                                </input>
                            </td>
                            <td>
                                <button
                                    className="btn btn-danger"
                                    title="Delete Saving"
                                    onClick={(e) => handleDelete(fund)}
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
            <div className="mt-3" style={{ display: "flex", alignItems: "center", gap: "24rem" }}>
                <div>
                    <button className="btn btn-primary mt-3" onClick={(e) => addNewFunds()}>Add Funds</button>
                </div>
                <div>
                    <button className="btn btn-primary mt-3" onClick={(e) => saveFunds()}>Save Funds</button>
                </div>
            </div>
            <div className="mt-3">
                <h5>Total Amount: {totalFundAmount}</h5>
            </div>
        </div >
    );
};

export default AddCorpusFund;
