import React from "react";
import { DataGrid } from "@material-ui/data-grid";

const columns = [
  { field: "date", headerName: "Date", sortable: false, width: 170 },
  {
    field: "hoursWorked",
    headerName: "Hours Worked",
    width: 200,
  },
  {
    field: "dailyGross",
    headerName: "Daily Gross",
    width: 200,
  },
  {
    field: "logStartTime",
    headerName: "Log Start Time",
    sortable: false,
    width: 220,
  },
  {
    field: "logEndTime",
    headerName: "Log End Time",
    sortable: false,
    width: 220,
  },
  {
    field: "complianceHours",
    headerName: "Compliance - 70hrs MAX ( Date + 6 previous days )",
    width: 430,
  },
];

const DailyTable = ({ rowData }) => {
  return (
    <div style={{ height: 700, width: "95%" }}>
      <DataGrid
        rows={rowData}
        columns={columns}
        pageSize={10}
        hideFooterSelectedRowCount
        disableColumnMenu
        loading={!rowData[0] ? true : false}
      />
    </div>
  );
};

export default DailyTable;
