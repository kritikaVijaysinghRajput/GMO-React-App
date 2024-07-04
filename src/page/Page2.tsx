import React from "react";
import Table from "../components/Table";
import Departments from "../components/Departments";

type Props = {};

const Page2: React.FC = (props: Props) => {
  return (
    <div>
      <Table />
      <Departments />
    </div>
  );
};

export default Page2;
