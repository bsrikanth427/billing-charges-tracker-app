import { useState, useEffect } from "react";
import AddExpenses from "./AddExpenses";
import axios from "axios";


function EditExpenses() {

    const [owners, setOwners] = useState([]);
    const monthMaintainanceAmount = 1000;

    useEffect(() => {
        fetchOwners();
    }, []);

    const fetchOwners = async () => {
        console.log("fetching owners");
        try {
            const apiUrl = `${process.env.REACT_APP_API_URL}` + "/owners";
            const response = await axios.get(apiUrl);
            console.log('fetch-owner-response:', JSON.stringify(response.data));
            setOwners(response.data.data);
        } catch (error) {
            console.error("fetch-owner-error:", error);
        }
    }

    return (
        <div>
            <h1>Edit Expenses</h1>
            <AddExpenses addOrEdit="edit" />


        </div>
    )
}

export default EditExpenses;