import React from "react";
import { DataGrid } from "@material-ui/data-grid";

const columns = [
  { field: "weekStart", headerName: "Week Start", sortable: false, width: 180 },
  { field: "weekEnd", headerName: "Week End", sortable: false, width: 180 },
  { field: "hoursWorked", headerName: "Hours Worked", width: 200 },
  { field: "regularPay", headerName: "Regular Pay", width: 200 },
  { field: "overtimePay", headerName: "Overtime Pay", width: 200 },
  { field: "weeklyGrossPay", headerName: "Weekly Gross", width: 200 },
];

const WeeklyTable = ({ rowDataObj }) => {
  let rowDataArray = [];
  for (const weekNumber in rowDataObj) {
    rowDataArray.push(rowDataObj[weekNumber]);
  }
  return (
    <div style={{ height: 700, width: "95%" }}>
      <DataGrid
        rows={rowDataArray.sort((a, b) => a.id - b.id)}
        columns={columns}
        pageSize={10}
        hideFooterSelectedRowCount
        disableColumnMenu
        loading={!rowDataArray[0] ? true : false}
      />
    </div>
  );
};

export default WeeklyTable;
