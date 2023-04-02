import React, {useState} from "react";
import TlaDrawer from "./pop-ups/tla-drawer";
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import {Button, Space} from "antd";
import {useParams} from "react-router";

export default function PreviewFile() {
    const { fileName } = useParams()
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    };

    const goToPrevPage = () =>
        setPageNumber(pageNumber - 1 <= 1 ? 1 : pageNumber - 1);

    const goToNextPage = () =>
        setPageNumber(
            pageNumber + 1 >= numPages ? numPages : pageNumber + 1,
        );

    const Extra = () => (
        <div style={{ gap: 8, display: 'flex' }}>
            <Button type={'primary'} disabled={pageNumber === 1} onClick={goToPrevPage}>Prev</Button>
            <Button type={'primary'} disabled={pageNumber === numPages} onClick={goToNextPage}>Next</Button>
        </div>
    )
    const PreviewDocument = () => (
        <div style={{ minHeight: '100%', minWidth: '100%'}}>
            <Document
                file={`/storage/docs/job_contract/${fileName}`}
                onLoadSuccess={onDocumentLoadSuccess}
            >
                <Page pageNumber={pageNumber} />
            </Document>

            <div align={'center'}>
                <p>
                    Page {pageNumber} of {numPages}
                </p>
            </div>
        </div>
    )
    return (
        <TlaDrawer extra={<Extra/>}>
            <Space>
                <PreviewDocument/>
            </Space>
        </TlaDrawer>
    )
}
