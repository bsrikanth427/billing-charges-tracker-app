import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

function ViewExpenses(props) {
    const [expenses, setExpenses] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [owners, setOwners] = useState([]);
    const [currentCorpusFund, setCurrentCorpusFund] = useState(0);
    const [previousCorpusFund, setPreviousCorpusFund] = useState(0);
    const location = useLocation();
    // Get state from props or fallback to useLocation
    // location.state?.selectedMonth comes from AddExpenses compinent on saveBtn 
    // props.selectedMonth comes from ViewAllExpenses component
    const selectedMonth = props.selectedMonth || location.state?.selectedMonth || "";
    const selectedYear = props.selectedYear || location.state?.selectedYear || "";
    const monthYear = `${selectedMonth}-${selectedYear}`;
    const availableFundAmount = location.state?.previousMonthCorpusFund;


    useEffect(() => {
        fetchExpensesByMonth(monthYear);

    }, [monthYear]); // Only depends on monthYear

    useEffect(() => {
        fetchOwners();
    }, []);

    const fetchOwners = async () => {
        console.log("fetching owners");
        try {
            const response = await axios.get("http://localhost:9090/api/owners");
            console.log('fetch-owner-response:', JSON.stringify(response.data));
            setOwners(response.data.data);
        } catch (error) {
            console.error("fetch-owner-error:", error);
        }
    }



    async function fetchExpensesByMonth(monthYear) {
        console.log("fetching expenses for month-year: " + monthYear);
        setIsLoading(true);
        try {
            const response = await axios.get("http://localhost:9090/api/expenses/" + monthYear);
            console.log("fetch expenses response: " + JSON.stringify(response.data.data));
            const monthlyExpenses = response.data.data.monthlyExpenses || [];
            setExpenses(monthlyExpenses);
            console.log("previousMonthCorpusFund  ", response.data.data.previousCorpusFund);
            setPreviousCorpusFund(response.data.data.previousCorpusFund);
            console.log("currentMonthCorpusFund  ", response.data.data.currentMonthCorpusFund);
            setCurrentCorpusFund(response.data.data.currentCorpusFund);

        } catch (error) {
            console.error("Error fetching expenses:", error);
            setExpenses([]);
            setCurrentCorpusFund(0);
        } finally {
            setIsLoading(false);
        }
    }



    // Calculate totalExpenseAmount dynamically
    const totalExpenseAmount = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    const corpusFundAfterExpenses = currentCorpusFund;
    const monthMaintainanceAmount = totalExpenseAmount / owners.length;


    return (
        <div>
            <h4> Month: {selectedMonth + "-" + selectedYear}  & PreviousCorpusFund: {previousCorpusFund} </h4>
            <div>
                <table className="table table-bordered table-striped">
                    <thead className="table-dark">
                        <tr>
                            <th>Expense</th>
                            <th>Amount</th>
                            <th>CorpusFund</th>
                            <th>CorpusFundBalance</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(() => {
                            let tempCorpusFund = previousCorpusFund; // Initialize the corpus fund
                            return expenses.map((expense) => {
                                const previousCorpusFund = tempCorpusFund;
                                tempCorpusFund -= expense.amount; // Update the corpus fund
                                return (
                                    <tr key={expense._id}>
                                        <td>{expense.name}</td>
                                        <td>{expense.amount}</td>
                                        <td>{previousCorpusFund}</td>
                                        <td>{tempCorpusFund}</td>
                                    </tr>
                                );
                            });
                        })()}
                    </tbody>
                </table>
                <h6>Total Expense Amount: {totalExpenseAmount}</h6>
                <h6
                    style={{
                        backgroundColor: 'lightgreen',
                        padding: '10px',
                        borderRadius: '5px',
                        display: 'inline-block',
                    }}
                >
                    CurrentCorpusFund After Deducting Total Expenses: {corpusFundAfterExpenses}
                </h6>
            </div>
            <div>
                <table className="table table-bordered table-striped">
                    <thead className="table-dark">
                        <tr>
                            <th>FlatNo</th>
                            <th>Amount</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            owners.map(owner => (
                                <tr key={owner._id}>
                                    <td>{owner.flatNo}</td>
                                    <td>{monthMaintainanceAmount}</td>
                                    <td>Pending</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ViewExpenses;
