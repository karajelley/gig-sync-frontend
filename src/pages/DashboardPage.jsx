import { useEffect, useContext, useState } from "react";
import { Box, Grid, Card, CardContent, Typography, Button } from "@mui/material";
import { AppContext } from "../context/AppContext";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";
import Slider from "react-slick";


function Dashboard() {
  const { projects, clients, fetchData } = useContext(AppContext);
  const [loading, setLoading] = useState(true);
  const projectStatusData = [
    { name: "To Do", value: projects.filter((p) => p.status === "To Do").length },
    { name: "In Progress", value: projects.filter((p) => p.status === "In Progress").length },
    { name: "Completed", value: projects.filter((p) => p.status === "Completed").length },
  ];

  useEffect(() => {
    const loadData = async () => {
        try {
            await fetchData(); 
            setLoading(false);
        } catch (error) {
            console.error("Error loading data:", error);
        }
    };

    loadData();
}, [fetchData]);

if (loading) {
    return <Typography>Loading...</Typography>;
}

  const COLORS = ["#FF8042", "#0088FE", "#00C49F"];

  return (
    <Box sx={{ padding: '100px 20px 20px 140px' }}>
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
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
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
</Box>  );
}

export default Dashboard;
