import { useEffect, useContext, useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Card,
  CardContent,
  Chip,
  Grid,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import { AppContext } from "../context/AppContext";
import { Cell, Legend, PieChart, Pie, Tooltip } from "recharts";
import { BarChart } from "@mui/x-charts/BarChart";

function Dashboard() {
  const { projects, clients, fetchData } = useContext(AppContext);
  const [loading, setLoading] = useState(true);
  const [isFetched, setIsFetched] = useState(false);
  const [budgetExpensesData, setBudgetExpensesData] = useState({
    totalBudget: 0,
    totalExpenses: 0,
  });

  // State to hold recent activities
  const [recentActivities, setRecentActivities] = useState([]);

  const addRecentActivity = (type, action, name) => {
    const newActivity = {
      type,
      action,
      name,
      timestamp: new Date().toISOString(),
    };

    const activities = getRecentActivities();
    console.log("Before adding new activity:", activities); // Log current activities
    activities.unshift(newActivity);
    if (activities.length > 10) activities.pop(); // Keep only 10 activities

    localStorage.setItem("recentActivities", JSON.stringify(activities));
    console.log("After adding new activity:", activities); // Log updated activities
  };

  // Function to get recent activities from local storage
  const getRecentActivities = () => {
    const activities = localStorage.getItem("recentActivities");
    return activities ? JSON.parse(activities) : [];
  };

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
    const fetchInitialData = async () => {
      console.log("Fetching initial data..."); // Log when the function starts
      setLoading(true);
      try {
        const activities = getRecentActivities(); // Fetch activities from local storage
        console.log("Activities fetched from local storage:", activities); // Log activities

        setRecentActivities(activities); // Set activities in state
        console.log("Set recent activities in state:", activities);

        await fetchData(); // Fetch additional data
        console.log("Fetched additional data successfully");

        setIsFetched(true);
        console.log("Set isFetched to true");
      } catch (error) {
        console.error("Error fetching data:", error); // Log any errors
      } finally {
        setLoading(false);
        console.log("Set loading to false"); // Log when loading state is set
      }
    };

    if (!isFetched) {
      console.log("isFetched is false, calling fetchInitialData");
      fetchInitialData();
    }
  }, [fetchData, isFetched]);

  // Calculate budget and expenses after `projects` updates
  useEffect(() => {
    if (projects.length > 0) {
      const totalBudget = projects.reduce(
        (sum, project) => sum + (project.budget || 0),
        0
      );

      const totalExpenses = projects.reduce(
        (sum, project) =>
          sum +
          (project.expenses
            ? project.expenses.reduce(
                (expenseSum, expense) => expenseSum + (expense.amount || 0),
                0
              )
            : 0),
        0
      );

      setBudgetExpensesData({ totalBudget, totalExpenses });
    }
  }, [projects]);

  addRecentActivity("Project", "Added", projects.title); // Use the actual project title

  // After editing a client
  addRecentActivity("Client", "Edited", clients.name);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  const COLORS = ["#D40ED4", "#0E1BD4", "#2D9B6F"];

  return (
    <Box sx={{ padding: "100px 20px 20px 140px" }}>
      <Grid container spacing={3}>
        {/* Summary Cards */}
        <Grid item xs={12} sm={6} md={3}>
  <Card
    sx={{
      borderRadius: 3,
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
      padding: 2,
      backgroundColor: "#E3F2FD", // Light Blue
      color: "#1E88E5", // Blue text
    }}
  >
    <CardContent
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <Typography variant="h6">Total Projects</Typography>
      <Typography variant="h4">{projects.length}</Typography>
    </CardContent>
  </Card>
</Grid>

<Grid item xs={12} sm={6} md={3}>
  <Card
    sx={{
      borderRadius: 3,
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
      padding: 2,
      backgroundColor: "#FFEBEE", // Light Red
      color: "#D32F2F", // Red text
    }}
  >
    <CardContent
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <Typography variant="h6">Total Clients</Typography>
      <Typography variant="h4">{clients.length}</Typography>
    </CardContent>
  </Card>
</Grid>

<Grid item xs={12} sm={6} md={3}>
  <Card
    sx={{
      borderRadius: 3,
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
      padding: 2,
      backgroundColor: "#E8F5E9", // Light Green
      color: "#388E3C", // Green text
    }}
  >
    <CardContent
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <Typography variant="h6">Completed Projects</Typography>
      <Typography variant="h4">
        {projects.filter((p) => p.status === "Completed").length}
      </Typography>
    </CardContent>
  </Card>
</Grid>

<Grid item xs={12} sm={6} md={3}>
  <Card
    sx={{
      borderRadius: 3,
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
      padding: 2,
      backgroundColor: "#FFF8E1", // Light Yellow
      color: "#FBC02D", // Yellow text
    }}
  >
    <CardContent
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <Typography variant="h6">Most Recent Client</Typography>
      <Typography variant="h4">
        {clients.length > 0 ? clients[clients.length - 1].name : "N/A"}
      </Typography>
    </CardContent>
  </Card>
</Grid>


        {/* Pie Chart - Projects by Status */}
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              borderRadius: 3,
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
              padding: 2,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              height: "100%",
              borderRadius: 3,
            }}
          >
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

        {/* Budget vs. Expenses */}
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              height: "100%",
              borderRadius: 3,
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
              padding: 2,
            }}
          >
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
                Budget and Expenses comparison
              </Typography>
              <BarChart
                xAxis={[{ scaleType: "band", data: ["Finance"] }]}
                series={[
                  {
                    data: [budgetExpensesData.totalBudget],
                    label: "Total Budget",
                    color: "#6A4FF2",
                  },
                  {
                    data: [budgetExpensesData.totalExpenses],
                    label: "Total Expenses",
                    color: "#1EA6CC",
                  },
                ]}
                width={400}
                height={285}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Dashboard;
