import React, {Fragment, useState} from 'react'

import styled from "styled-components"

import GalleryItem from "./GalleryItem"

interface IProps {
    hostHeight: number;
}

const FileGallery = ({hostHeight}:IProps) => {

    const [showDelete, setShowDelete] = useState(false)

    const data = [
        {filename: "thing1", filesize: 25},
        {filename: "thing2", filesize: 27},
        {filename: "thing3", filesize: 12},
        {filename: "thing4", filesize: 167},
        {filename: "thing1", filesize: 25},
        {filename: "thingashdjashdkasdhkasdhks2", filesize: 27},
        {filename: "thing3", filesize: 12},
        {filename: "thing1", filesize: 25},
        {filename: "thing2", filesize: 27},
        {filename: "thing3", filesize: 12},
        {filename: "thing1", filesize: 25},
        {filename: "thing2", filesize: 27},
        {filename: "thing3", filesize: 12}
        
    ]

    return (
        <HostContainer style={{height: hostHeight + "px"}} >
            <h5 style={{margin: "0px", marginBottom: ".3em", padding: "0px", textAlign: "center", boxSizing: "border-box", flex: "0 0 1.2em"}} > {`${ data.length } files selected`} </h5>
            <ListContainer>
            { data.map(file => <GalleryItem filename={file.filename} filesize={file.filesize} /> ) }
            </ListContainer>
        </HostContainer>
    )
}

export default FileGallery

const HostContainer = styled.div`
    width: 100%;
    height: 100%;
    margin: 0px;
    padding: .3em;
    color: white;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
`

const ListContainer = styled.div`
    margin: 0px;
    padding: .2px .5px;
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
`

