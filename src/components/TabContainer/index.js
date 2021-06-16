import React, { useState, useEffect } from "react";
import { makeStyles, AppBar, Tabs, Tab } from "@material-ui/core";
import axios from "axios";

import TabPanel from "./TabPanel";
import DailyTable from "./DailyTable";
import WeeklyTable from "./WeeklyTable";
import { getFormattedLogs } from "./helperFunctions";

const TabContainer = () => {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [formattedHOSData, setFormattedHOSData] = useState({
    daily: [],
    weekly: {},
  });

  useEffect(() => {
    getLogs();
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const getLogs = async () => {
    const { data } = await axios.get(
      "https://api.jsonbin.io/b/60ca10805ed58625fd11d8f9"
    );
    const logArray = data.data;
    const sortedLogs = logArray.sort(
      (a, b) => new Date(a.startTime) - new Date(b.startTime)
    );
    const formattedLogs = getFormattedLogs(sortedLogs);
    setFormattedHOSData(formattedLogs);
  };

  return (
    <div className={classes.container}>
      <div className={classes.root}>
        <AppBar position="static" className={classes.appBar}>
          <Tabs
            value={value}
            onChange={handleChange}
            TabIndicatorProps={{ style: { backgroundColor: "#ffa442" } }}
          >
            <Tab label="Daily View" />
            <Tab label="Weekly View" />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          <DailyTable rowData={formattedHOSData.daily} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <WeeklyTable rowDataObj={formattedHOSData.weekly} />
        </TabPanel>
      </div>
    </div>
  );
};

const useStyles = makeStyles({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    minHeight: "900px",
    backgroundColor: "#dbdbdb",
  },
  root: {
    backgroundColor: "white",
    width: "90%",
    height: "800px",
    boxShadow: "0 2px 5px 1px rgb(64 60 67 / 16%)",
  },
  appBar: {
    backgroundColor: "#d86e41",
    boxShadow: "none",
  },
});

export default TabContainer;
