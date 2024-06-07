"use client";
import CardItem from "./cardItem";
import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useState } from "react";
import LoadDataFeature from "./loadDataFeatured";
import Loading from "./loading";
export default function Featured() {
  const [value, setValue] = useState("1");
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return (
    <div className="container pb-16">
      <h2 className="text-2xl font-medium text-gray-800 uppercase mb-6">
       featured
      </h2>
      <TabContext value={value}>
        <TabList centered sx={{ justifyContent: 'center' }} onChange={handleChange} aria-label="lab API tabs example">
          <Tab
            label="Recommend" value="1" />
          <Tab label="Popular" value="2" />
        </TabList>
        <TabPanel value="1">
          <div className="grid grid-cols-4 md:grid-cols-4 gap-10">
            <React.Suspense fallback={<Loading />}>

              <LoadDataFeature condition={1} />
            </React.Suspense>

          </div>
        </TabPanel>
        <TabPanel value="2">
          <div className="grid grid-cols-4 md:grid-cols-4 gap-10">
            <React.Suspense fallback={<Loading />}>
              <LoadDataFeature condition={2} />
            </React.Suspense>
          </div>
        </TabPanel>
      </TabContext>
    </div>
  );
}
