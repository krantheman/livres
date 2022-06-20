import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import PersonAddAltRoundedIcon from "@mui/icons-material/PersonAddAltRounded";
import { Box, IconButton, Stack } from "@mui/material";
import { indigo, red } from "@mui/material/colors";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { ChangeEvent, useEffect, useState } from "react";
import { MemberDeleteDialog } from "../components/MemberDeleteDialog";
import { MemberDialog } from "../components/MemberDialog";
import PageLayout from "../components/PageLayout";
import { Member } from "../types";

const Members = () => {
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const handleAddDialogOpen = () => {
    setAddDialogOpen(!addDialogOpen);
  };

  const [loading, setLoading] = useState(true);
  const [members, setMembers] = useState<Member[]>([]);
  const [rows, setRows] = useState<Member[]>([]);

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const search = event.currentTarget.value;
    if (isNaN(+search[0]))
      setRows(
        members.filter(
          (member) =>
            member.name.toLowerCase().includes(search.toLowerCase()) ||
            member.email.toLowerCase().includes(search.toLowerCase())
        )
      );
    else
      setRows(
        members.filter((member) => member.phone_no.toString().includes(search))
      );
  };

  const [row, setRow] = useState<Member>();

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const handleEditDialogOpen = () => {
    setEditDialogOpen(!editDialogOpen);
  };

  const handleEdit = (cellValues: GridRenderCellParams<any, any, any>) => {
    setRow(cellValues.row);
    setEditDialogOpen(true);
  };

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const handleDeleteDialogOpen = () => {
    setDeleteDialogOpen(!deleteDialogOpen);
  };

  const handleDelete = (cellValues: GridRenderCellParams<any, any, any>) => {
    setRow(cellValues.row);
    setDeleteDialogOpen(true);
  };

  useEffect(() => {
    fetch("/members").then((res) =>
      res.json().then((data) => {
        setLoading(false);
        setMembers(data.members);
        setRows(data.members);
      })
    );
  }, [editDialogOpen, deleteDialogOpen, addDialogOpen]);

  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", width: 200 },
    { field: "email", headerName: "Email ID", flex: 1 },
    { field: "phone_no", headerName: "Phone number", width: 180 },
    { field: "address", headerName: "Address", flex: 1 },
    { field: "debt", headerName: "Debt (Rs.)", width: 120 },
    {
      field: "util",
      headerName: "",
      width: 130,
      renderCell: (cellValues) => (
        <Stack direction="row" spacing={4}>
          <IconButton
            sx={{ "&:hover": { color: indigo[500] } }}
            onClick={() => {
              handleEdit(cellValues);
            }}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            sx={{ "&:hover": { color: red[500] } }}
            onClick={() => {
              handleDelete(cellValues);
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Stack>
      ),
    },
  ];

  return (
    <PageLayout
      header="Library Members"
      buttonText="Add Members"
      buttonIcon={<PersonAddAltRoundedIcon />}
      searchLabel="Search for a member by name, phone number or email ID"
      handleSearch={handleSearch}
      addDialogOpen={addDialogOpen}
      handleAddDialogOpen={handleAddDialogOpen}
      page="members"
    >
      <Box sx={{ height: 650, mt: 1 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          disableSelectionOnClick
          disableColumnMenu
          autoHeight
          loading={loading}
        />
      </Box>
      {editDialogOpen && (
        <MemberDialog
          open={editDialogOpen}
          handleOpen={handleEditDialogOpen}
          member={row}
        />
      )}
      {deleteDialogOpen && row && (
        <MemberDeleteDialog
          open={deleteDialogOpen}
          handleOpen={handleDeleteDialogOpen}
          member={row}
        />
      )}
    </PageLayout>
  );
};

export default Members;
