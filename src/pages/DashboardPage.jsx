import { useEffect, useContext, useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import { AppContext } from "../context/AppContext";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";
import { API_URL } from "../api/config";
import { BarChart } from "@mui/x-charts/BarChart";

function Dashboard() {
  const { projects, clients, fetchData } = useContext(AppContext);
  const [loading, setLoading] = useState(true);
  const [budgetExpensesData, setBudgetExpensesData] = useState({
    totalBudget: 0,
    totalExpenses: 0,
  });

  const projectStatusData = [
    {
      name: "To Do",
      value: projects.filter((p) => p.status === "To Do").length,
    },
    {
      name: "In Progress",
      value: projects.filter((p) => p.status === "In Progress").length,
    },
    {
      name: "Completed",
      value: projects.filter((p) => p.status === "Completed").length,
    },
  ];

  useEffect(() => {
    const loadData = async () => {
      try {
        await fetchData(); // Fetch existing projects and clients

        // Calculate total budgets and expenses dynamically
        const totalBudget = projects.reduce(
          (sum, project) => sum + project.budget,
          0
        );
        const totalExpenses = projects.reduce(
          (sum, project) =>
            sum +
            project.expenses.reduce(
              (expenseSum, expense) => expenseSum + expense.amount,
              0
            ),
          0
        );

        // Update the state with calculated totals
        setBudgetExpensesData({ totalBudget, totalExpenses });

        setLoading(false);
      } catch (error) {
        console.error("Error fetching or calculating data:", error);
        setLoading(false);
      }
    };

    loadData();
  }, [fetchData]);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  const COLORS = ["#FF8042", "#0088FE", "#00C49F"];

  return (
    <Box sx={{ padding: "100px 20px 20px 140px" }}>
      <Grid container spacing={3}>
        {/* Summary Cards */}
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Projects</Typography>
              <Typography variant="h4">{projects.length}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Clients</Typography>
              <Typography variant="h4">{clients.length}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Completed Projects</Typography>
              <Typography variant="h4">
                {projects.filter((p) => p.status === "Completed").length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Most Recent Client</Typography>
              <Typography variant="h4">
                {clients.length > 0 ? clients[clients.length - 1].name : "N/A"}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Pie Chart */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Projects by Status</Typography>
              <PieChart width={400} height={300}>
                <Pie
                  data={projectStatusData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                >
                  {projectStatusData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Activity */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Recent Activity</Typography>
              <ul>
                {projects.slice(0, 5).map((project) => (
                  <li key={project._id}>
                    {project.title} - {project.status}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Box>
        <Box>
          <Typography variant="h6" gutterBottom>
            Budget vs. Expenses
          </Typography>
          <BarChart
            xAxis={[{ scaleType: "band", data: ["Finance"] }]}
            series={[
              {
                data: [budgetExpensesData.totalBudget], // Budget data
                label: "Total Budget",
                color: "#4CAF50", // Green
              },
              {
                data: [budgetExpensesData.totalExpenses], // Expenses data
                label: "Total Expenses",
                color: "#F44336", // Red
              },
            ]}
            width={500}
            height={300}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default Dashboard;
