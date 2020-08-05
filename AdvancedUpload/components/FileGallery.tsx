import React, { Fragment, useState, MutableRefObject } from "react";

import styled from "styled-components";

import shortid from "shortid";

import GalleryItem from "./GalleryItem";

interface FileWithID extends ComponentFramework.FileObject {
    id: string;
}

interface IProps {
    hostHeight: number;
    fileSelection: FileWithID[];
    removeFile: (id: string) => any;
    resetSelection: () => any;
}

const FileGallery = ({ hostHeight, fileSelection, removeFile, resetSelection }: IProps) => {
    const [showDetails, setShowDetails] = useState(false);
    const [delayHandler, setDelayHandler] = useState<number>();

    const doOnMouseEnter = () => {
        setDelayHandler(
            setTimeout(() => {
                setShowDetails(true);
            }, 1000)
        );
    };

    const doOnMouseLeave = () => {
        setShowDetails(false);
        clearTimeout(delayHandler);
    };

    return (
        <HostContainer style={{ height: hostHeight + "px" }}>
            <HeaderContainer
                onMouseEnter={doOnMouseEnter}
                onMouseLeave={doOnMouseLeave}
                style={{
                    flex: `0 0 ${showDetails ? "2.4em" : "1.2em"}`,
                }}
            >
                <h5
                    style={{
                        fontSize: "1.05em",
                        margin: "0px",
                        padding: "0px",
                        lineHeight: "1.2em",
                        textAlign: "center",
                        boxSizing: "border-box",
                    }}
                >
                    {`${fileSelection.length} files selected`}
                </h5>
                <DetailsHolder>
                    <ResetButton onClick={resetSelection}>RESET</ResetButton>
                    <p style={{ margin: "0px", padding: "0px" }}>
                        {" "}
                        {"Total: " +
                            Math.floor(fileSelection.reduce((sum, file) => sum + file.fileSize, 0) / 1000) +
                            "kB"}{" "}
                    </p>
                </DetailsHolder>
            </HeaderContainer>
            <ListContainer>
                {fileSelection.map((file) => (
                    <GalleryItem
                        key={shortid.generate()}
                        filename={file.fileName}
                        filesize={Math.floor(file.fileSize / 1000)}
                        fileId={file.id}
                        removeFile={removeFile}
                    />
                ))}
            </ListContainer>
        </HostContainer>
    );
};

export default FileGallery;

const HostContainer = styled.div`
    width: 100%;
    margin: 0px;
    padding: 0.3em;
    color: white;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
`;

const HeaderContainer = styled.div`
    box-sizing: border-box;
    margin: 0px;
    margin-bottom: 0.3em;
    padding: 0px;
    overflow: hidden;
    transition: flex 0.2s ease;
    cursor: default;
`;

const DetailsHolder = styled.div`
    font-size: 0.8em;
    box-sizing: border-box;
    margin: 0px;
    padding: 0px 0.2em;
    height: 1.5em;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const ResetButton = styled.p`
    margin: 0px;
    padding: 0.1em 0.2em;
    transition: all 0.1s ease;
    cursor: pointer;
    :hover {
        color: #ab3430;
        background: #0001;
        font-weight: bold;
    }
`;

const ListContainer = styled.div`
    margin: 0px;
    padding: 0.2px 0.5px;
    box-sizing: border-box;
    width: 100%;
    flex: 1 1 auto;
    overflow-y: auto;
    overflow-x: hidden;
    ::-webkit-scrollbar {
        width: 0.5rem;
    }
    ::-webkit-scrollbar-thumb {
        background-color: gray;
        box-shadow: inset 0px 0px 3px white;
    }
    ::-webkit-scrollbar-track {
        background-color: #f8f8f8;
        box-shadow: inset 0px 0px 3px black;
    }
`;
