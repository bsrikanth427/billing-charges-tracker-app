import { useEffect, useState } from "react";
import axios from "axios";

const ViewFunds = () => {
    const [fundsData, setFundsData] = useState([]);
    const [finalBalance, setFinalBalance] = useState(0);

    useEffect(() => {
        fetchAllFunds();
    }, []);

    const fetchAllFunds = async () => {
        try {
            console.log("fetch-all-funds request");
            const response = await axios.get("http://localhost:9090/api/funds");
            if (response) {
                console.log("funds Response: ", JSON.stringify(response));
                const fundsResponse = response.data.data[0];
                setFinalBalance(fundsResponse.outstandingBalance);
                setFundsData(response.data.data);
            } else {
                console.error("Funds not found");
                throw new Error("funds not found");
            }
        } catch (error) {
            console.error("fetch-funds-error: ", error);
        }
    };

    return (
        <div className="container mt-4">
            <h1 className="mb-4">Outstanding Balance: {finalBalance}</h1>
            <table className="table table-bordered table-hover table-striped">
                <thead className="table-dark">
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Amount</th>
                        <th>Created Date</th>
                        <th>Description</th>
                        <th>outstandingBalance</th>
                    </tr>
                </thead>
                <tbody>
                    {fundsData.map((fund, index) =>
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{fund.name}</td>
                            <td>{fund.type}</td>
                            <td
                                style={{
                                    color: fund.type === "CREDIT" ? "green" : "red",
                                    fontWeight: "bold",
                                }}
                            >
                                {fund.type === "CREDIT" ? `+${fund.amount}` : `-${fund.amount}`}
                            </td>
                            <td>{new Date(fund.createdDate).toLocaleString()}</td>
                            <td>{fund.description}</td>
                            <td>{fund.outstandingBalance}</td>
                        </tr>

                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ViewFunds;