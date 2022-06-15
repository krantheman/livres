import PersonAddAltRoundedIcon from "@mui/icons-material/PersonAddAltRounded";
import { Box } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { ChangeEvent, useEffect, useState } from "react";
import PageLayout from "../components/PageLayout";
import { Member } from "../types";

const Members = () => {
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

  useEffect(() => {
    fetch("/members").then((res) =>
      res.json().then((data) => {
        setMembers(data.members);
        setRows(data.members);
      })
    );
  }, []);

  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", flex: 1 },
    { field: "phone_no", headerName: "Phone number", flex: 1 },
    { field: "email", headerName: "Email ID", flex: 1 },
    { field: "address", headerName: "Address", flex: 1 },
  ];

  return (
    <PageLayout
      header="Library Members"
      buttonText="Add Members"
      buttonIcon={<PersonAddAltRoundedIcon />}
      searchLabel="Search for a member by name, phone number or email"
      handleSearch={handleSearch}
    >
      <Box sx={{ height: 650, mt: 1 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          disableSelectionOnClick
          disableColumnMenu
          autoHeight
        />
      </Box>
    </PageLayout>
  );
};

export default Members;
