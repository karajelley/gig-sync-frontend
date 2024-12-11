import { useState } from "react";
import { TextField, Button, MenuItem, Box } from "@mui/material";

function ExpenseForm({ onAddExpense }) {
    const [expenseData, setExpenseData] = useState({
        description: "",
        amount: "",
        category: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setExpenseData((prev) => ({ ...prev, [name]: value }));
    };

    const handleExpenseSubmit = (e) => {
        e.preventDefault();
        onAddExpense(expenseData);
        setExpenseData({ description: "", amount: "", category: "" });
    };

    return (
        <Box component="form" onSubmit={handleExpenseSubmit} sx={{ mt: 2 }}>
            <TextField
                label="Description"
                name="description"
                value={expenseData.description}
                onChange={handleChange}
                fullWidth
                required
                sx={{ mb: 2 }}
            />
            <TextField
                label="Amount"
                name="amount"
                type="number"
                value={expenseData.amount}
                onChange={handleChange}
                fullWidth
                required
                sx={{ mb: 2 }}
            />
            <TextField
                label="Category"
                name="category"
                select
                value={expenseData.category}
                onChange={handleChange}
                fullWidth
                required
                sx={{ mb: 2 }}
            >
                <MenuItem value="Travel">Travel</MenuItem>
                <MenuItem value="Food">Food</MenuItem>
                <MenuItem value="Office Supplies">Office Supplies</MenuItem>
                <MenuItem value="Miscellaneous">Miscellaneous</MenuItem>
            </TextField>
            <Button variant="contained" type="submit">
                Add Expense
            </Button>
        </Box>
    );
}

export default ExpenseForm;
