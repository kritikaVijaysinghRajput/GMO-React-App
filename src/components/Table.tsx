import React, { useEffect, useState } from "react";
import { Container, Typography, Box } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import axios from "axios";
import { post } from "../schema/data";

const Table: React.FC = () => {
  const [posts, setPosts] = useState<post[]>([]);
  const [loading, setLoading] = useState(true);
  const [pageSize, setPageSize] = useState<number>(5);
  const [page, setPage] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts"
        );
        setPosts(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "userId", headerName: "UserID", width: 90 },
    {
      field: "title",
      headerName: "Title",
      flex: 1,
      minWidth: 150,
      editable: true,
    },
    {
      field: "body",
      headerName: "Body",
      flex: 1,
      minWidth: 150,
      editable: true,
    },
  ];

  const handlePaginationModelChange = (model: any) => {
    setPage(model.page);
    setPageSize(model.pageSize);
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" marginY={"2rem"} gutterBottom>
        Second Page
      </Typography>
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={posts}
          columns={columns}
          pagination
          paginationModel={{ page, pageSize }}
          pageSizeOptions={[5, 10, 20]}
          loading={loading}
          onPaginationModelChange={handlePaginationModelChange}
        />
      </Box>
    </Container>
  );
};

export default Table;
