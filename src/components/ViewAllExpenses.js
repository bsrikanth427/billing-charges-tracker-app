import { useState } from "react";
import ViewExpenses from "./ViewExpenses";

function ViewAllExpenses() {
    let months = ["January", "Febuary", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "Decemeber"];
    let years = ["2024", "2025"];

    const [selectedMonth, setSelectedMonth] = useState("");
    const [selectedYear, setSelectedYear] = useState("2024");
    const [viewBtnClicked, setViewBtnClicked] = useState(false);

    const handleChangeMonth = (e) => {
        setSelectedMonth(e.target.value);
        setViewBtnClicked(true);
    };

    const handleChangeYear = (e) => {
        setSelectedYear(e.target.value);
        setViewBtnClicked(true);
    };


    return (
        <div style={{ "margin": "50px" }}>
            <h4>View Expenses</h4>
            <div style={{ display: "flex", alignItems: "left", gap: "3rem", "margin-top": "20px" }}>
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
                            <option key={index} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>
                </div>

            </div>

            {
                viewBtnClicked && (
                    <ViewExpenses selectedMonth={selectedMonth} selectedYear={selectedYear} />
                )
            }
        </div >
    );
}

export default ViewAllExpenses;
