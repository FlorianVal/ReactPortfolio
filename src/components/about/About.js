import React, { useState, useRef, useEffect, useCallback } from "react";
import { Box, Tabs, Tab, Button } from "@mui/material";
import { Document, pdfjs, Page } from "react-pdf";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import Typography from '@mui/material/Typography';
import { saveAs } from "file-saver";
import GetAppIcon from '@mui/icons-material/GetApp';

pdfjs.GlobalWorkerOptions.workerSrc = "./pdf.worker.js";

export default function About() {
  const [value, setValue] = useState(0);
  const [numPages, setNumPages] = useState(null);
  const [containerWidth, setContainerWidth] = useState(null);
  const containerRef = useRef(null);

  const updateWidth = useCallback(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.offsetWidth);
    }
  }, []);

  useEffect(() => {
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, [updateWidth]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setNumPages(null);
  };

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  function CustomTabPanel(props) {
    const { children, value: tabValue, index, ...other } = props;
    return (
      <div
        role="tabpanel"
        hidden={tabValue !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {tabValue === index && (
          <Box sx={{ p: { xs: 1, md: 3 } }}>
            <Typography component="div">{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  const downloadFile = () => {
    const fileUrl = value === 0 ? "main_en.pdf" : "main_fr.pdf";
    const fileName = value === 0 ? "resume_en.pdf" : "resume_fr.pdf";
    saveAs(fileUrl, fileName);
  };

  const fileUrl = value === 0 ? "main_en.pdf" : "main_fr.pdf";
  // Limit PDF width: use container width but cap at 800px
  const pdfWidth = containerWidth ? Math.min(containerWidth - 32, 800) : 700;

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      mt="3rem"
      sx={{ overflow: "hidden", width: "100%" }}
    >
      <Box display="flex" alignItems="center" flexWrap="wrap" justifyContent="center" gap={1}>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="English" />
          <Tab label="French" />
        </Tabs>
        <Button
          variant="contained"
          color="primary"
          onClick={downloadFile}
          startIcon={<GetAppIcon />}
        >
          Download
        </Button>
      </Box>

      <Box ref={containerRef} sx={{ width: "100%", maxWidth: 832, px: { xs: 1, md: 2 } }}>
        <CustomTabPanel value={value} index={0}>
          <Document file="main_en.pdf" onLoadSuccess={onDocumentLoadSuccess}>
            {numPages && Array.from({ length: numPages }, (_, i) => (
              <Box key={i} mb={2}>
                <Page pageNumber={i + 1} width={pdfWidth} />
              </Box>
            ))}
          </Document>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <Document file="main_fr.pdf" onLoadSuccess={onDocumentLoadSuccess}>
            {numPages && Array.from({ length: numPages }, (_, i) => (
              <Box key={i} mb={2}>
                <Page pageNumber={i + 1} width={pdfWidth} />
              </Box>
            ))}
          </Document>
        </CustomTabPanel>
      </Box>
    </Box>
  );
}
