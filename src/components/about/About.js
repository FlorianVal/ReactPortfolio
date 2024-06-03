import React, { useState } from "react";
import { Box, Tabs, Tab } from "@mui/material";
import { Document, pdfjs, Page } from "react-pdf";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import Typography from '@mui/material/Typography';


pdfjs.GlobalWorkerOptions.workerSrc = "./pdf.worker.js";

export default function About() {
  const [value, setValue] = React.useState(0);
  const [pageNumber] = useState(1);
  

  const handleChange = (event, newValue) => {
    setValue(newValue);
  }

  function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      mt={"3rem"}
    >
      <Tabs value={value} onChange={handleChange}>
        <Tab label="English" />
        <Tab label="French" />
      </Tabs>
      <CustomTabPanel value={value} index={0}>
        <Document file="main_en.pdf" >
          <Page pageNumber={pageNumber} />
        </Document>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <Document file="main_fr.pdf" >
          <Page pageNumber={pageNumber} />
        </Document>
      </CustomTabPanel>
    </Box>
  );
}
