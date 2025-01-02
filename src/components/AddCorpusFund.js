// components/ExpenseTable.js
import React, { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from 'react-router-dom';


const AddCorpusFund = () => {

    const fundsArr = { "id": 1, "name": "", "amount": 0, "type": "CREDIT", "description": "" }


    let months = ["January", "Febuary", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "Decemeber"];

    let years = ["2024", "2025"]

    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const [type, setType] = useState('CREDIT');
    const [description, setDescription] = useState('');
    const [message, setMessage] = useState('');
    const [totalFundAmount, setTotalFundAmount] = useState(0);
    const [fundBalanceAmount, setFundBalanceAmount] = useState(0);
    const [selectedMonth, setSelectedMonth] = useState("");
    const [selectedYear, setSelectedYear] = useState("2024");

    const navigate = useNavigate(); // React Router hook for navigation

    useEffect(() => {
        outstandingBalance();
    }, [])

    const handleChangeMonth = (e) => {
        setSelectedMonth(e.target.value);
    };

    const handleChangeYear = (e) => {
        setSelectedYear(e.target.value);
    };

    const outstandingBalance = async () => {
        try {
            console.log("fetching outstandingBalance");
            const response = await fetch('http://localhost:9090/api/funds/balance', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });
            const result = await response.json();
            if (result) {
                setFundBalanceAmount(result.data);
            }
        } catch (error) {
            setMessage('An error occurred while fetching  the funds balance amount');
            console.error('Error:', error);
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        console.log("handleSubmit: ");
        const corpusFund = {
            name: name,
            amount: amount,
            description: description,
            type: type,
            month: selectedMonth,
            year: selectedYear,
            outstandingBalance: fundBalanceAmount
        }
        console.log("request-paylaod for save funds", JSON.stringify(corpusFund));
        try {
            const response = await fetch('http://localhost:9090/api/funds', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(corpusFund),
            });
            const result = await response.json();
            if (response.ok) {
                setMessage(result.message);
                console.log('Funds added:', result.data);
                setName('');
                setAmount('');
                setDescription('');

                outstandingBalance();

                // Redirect to the ViewOwners page after success
                navigate('/viewfunds');

            } else {
                setMessage(result.data || 'Failed to add funds.');
            }
        } catch (error) {
            setMessage('An error occurred while adding the funds.');
            console.error('Error:', error);
            alert('Error:', error);
        }
    }


    return (
        <div>
            <div className="container mt-4 table-container">
                <div style={{ display: "flex", alignItems: "left", gap: "3rem" }}>
                    <div>
                        <h4 className="mb-4">Add Funds</h4>
                    </div>
                    <div>
                        <h4 className="mb-4">CurrentBalance: {fundBalanceAmount}</h4>
                    </div>

                </div>
            </div >
            <div style={{ width: "50%" }}>
                <div>
                    <div>
                        {message && <p className="alert alert-info">{message}</p>}
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    placeholder="Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group mt-4">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="amount"
                                    placeholder="Amount"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group mt-4">
                                <input
                                    type="tel"
                                    className="form-control"
                                    id="description"
                                    placeholder="Description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    maxLength="100"
                                    required
                                />
                            </div>
                            <div className="form-group mt-4">
                                <select
                                    className="form-control"
                                    value={type}
                                    onChange={(e) => setType(e.target.value)}
                                    required
                                >
                                    <option value="CREDIT">CREDIT</option>
                                    <option value="DEBIT">DEBIT</option>
                                </select>
                            </div>
                            <div>
                                <button type="submit" className="btn btn-primary btn-block mt-4">
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>




    );
};

export default AddCorpusFund;
