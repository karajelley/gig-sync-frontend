import React, { useState } from "react";
import { Box, Button, MenuItem, TextField, Typography, } from "@mui/material";

function ExpenseForm({ onAddExpense, onCancel }) {
  const [expenseData, setExpenseData] = useState({
    description: "",
    amount: "",
    category: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setExpenseData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddExpense(expenseData);
    setExpenseData({ description: "", amount: "", category: "" });
  };

  return (
    <Box
      sx={{
        border: "1px solid #ccc",
        borderRadius: 2,
        padding: 2,
        marginBottom: 2,
      }}
    >
      <Typography variant="h6">Add Expense</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Description"
          name="description"
          value={expenseData.description}
          onChange={handleInputChange}
          sx={{ mb: 2 }}
          required
        />
        <TextField
          fullWidth
          type="number"
          label="Amount"
          name="amount"
          value={expenseData.amount}
          onChange={handleInputChange}
          sx={{ mb: 2 }}
          required
        />
        <TextField
          fullWidth
          select
          label="Category"
          name="category"
          value={expenseData.category}
          onChange={handleInputChange}
          sx={{ mb: 2 }}
          required
        >
          <MenuItem value="Travel">Travel</MenuItem>
          <MenuItem value="Food">Food</MenuItem>
          <MenuItem value="Leisure">Leisure</MenuItem>
          <MenuItem value="Transport">Transport</MenuItem>
          <MenuItem value="Miscellaneous">Miscellaneous</MenuItem>
        </TextField>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button type="submit" variant="contained" color="primary">
            Add Expense
          </Button>
          <Button onClick={onCancel} variant="outlined" color="secondary">
            Cancel
          </Button>
        </Box>
      </form>
    </Box>
  );
}

export default ExpenseForm;
