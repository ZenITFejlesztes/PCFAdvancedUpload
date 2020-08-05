import React, { useState, useCallback } from "react";

import { AiOutlineDelete } from "react-icons/ai";

import styled from "styled-components";

interface IProps {
    filename: string;
    filesize: number;
    fileId: string;
    removeFile: (id: string) => any;
}

const GalleryItem = ({ filename, filesize, fileId, removeFile }: IProps) => {
    const [showDelete, setShowDelete] = useState(false);
    const [delayHandler, setDelayHandler] = useState<number>()

    const doOnMouseEnter = () => {
        setDelayHandler(setTimeout(() => {
            setShowDelete(true)
        }, 500))
    }

    const doOnMouseLeave = () => {
        setShowDelete(false)
        clearTimeout(delayHandler)
    }

    return (
        <FileRow
        onMouseEnter={doOnMouseEnter}
        onMouseLeave={doOnMouseLeave}
        >
            <IconHolder
            onClick={ e => removeFile(fileId) }
            style={{
                width: `${ showDelete ? "2em" : "0px" }`
            }} 
            >
                <AiOutlineDelete 
                style={{ transform: "translateY(.1em)" }}
                />
            </IconHolder>
            <DataHolder
            style={{
                width: `${ showDelete ? "calc(100% - 2em)" : "100%" }`
            }}
            >
                <p style={{
                    overflowX: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    textAlign: "left",
                    margin: "0px"
                }} > {filename} </p>
                <p style={{
                    margin: "0px"
                }} > {filesize + "kB"} </p>
            </DataHolder>
        </FileRow>
    );
};

export default GalleryItem;


const FileRow = styled.div`
    width: 100%;
    height: 2em;
    box-sizing: border-box;
    margin: 0px;
    padding: 0px;
`

const IconHolder = styled.div`
    box-sizing: border-box;
    margin: 0px;
    padding: 0px;
    display: inline-grid;
    place-items: center;
    height: 100%;
    width: 2em;
    cursor: pointer;
    overflow: hidden;
    transition: width .2s ease-out,
                color .2s ease-out,
                transform .2s ease-out;
    color: white;
    :hover {
        color: #ab3430;
        transform: scale(1.3);
    }
    
`

const DataHolder = styled.div`
    box-sizing: border-box;
    margin: 0px;
    padding: 0px;
    height: 100%;
    display: inline-flex;
    justify-content: space-between;
    align-items: center;
    transition: width .2s ease-out;
    cursor: default;
`