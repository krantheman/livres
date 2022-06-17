import { ChangeEvent, useState } from "react";
import PageLayout from "../components/PageLayout";

const Transactions = () => {
  const [search, setSearch] = useState("");
  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.currentTarget.value);
  };

  return (
    <PageLayout
      header="Library Transactions"
      handleSearch={handleSearch}
      searchLabel="Search for a member or a book"
    >
      <div>you</div>
    </PageLayout>
  );
};

export default Transactions;
