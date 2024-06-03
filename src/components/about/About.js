import React, { useState } from "react";
import { Box } from "@mui/material";
import { Document, pdfjs, Page } from "react-pdf";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = "./pdf.worker.js";

export default function About() {
  const [numPagesEn, setNumPagesEn] = useState(1);
  const [numPagesFr, setNumPagesFr] = useState(1);
  const [pageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    if (documentName === "main_en.pdf") {
      setNumPagesEn(numPages);
    } else if (documentName === "main_fr.pdf") {
      setNumPagesFr(numPages);
    }
  }

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      mt={"3rem"}
    >
      <Document file="main_en.pdf" onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} />
      </Document>
      <p>
        Page {pageNumber} of {numPagesEn}
      </p>
      <Document file="main_fr.pdf" onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} />
      </Document>
      <p>
        Page {pageNumber} of {numPagesFr}
      </p>
    </Box>
  );
}
