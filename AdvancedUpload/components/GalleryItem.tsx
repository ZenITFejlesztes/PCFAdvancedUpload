import React, { useState } from "react";

import { AiOutlineDelete } from "react-icons/ai";

import styled from "styled-components";

interface IProps {
    filename: string;
    filesize: number;
}

const GalleryItem = ({ filename, filesize }: IProps) => {
    const [showDelete, setShowDelete] = useState(false);

    return (
        <div
            style={{
                position: "relative",
                display: "grid",
                gridTemplateColumns: `${showDelete ? "15%" : "0px"} ${showDelete ? "85%" : "100%"}`,
            }}
            onClick={(e) => setShowDelete(!showDelete)}
        >
            <div
                style={{
                    width: `${showDelete ? "2em" : "0px"}`,
                    height: "2em",
                    placeItems: "center",
                    overflow: "hidden",
                    cursor: "pointer"
                }}
            >
                <AiOutlineDelete color="#a30808" size="2em" />
            </div>
            <ListItem
                style={{
                    position: "relative",
                    height: "2em",
                }}
            >
                <span
                    style={{
                        position: "absolute",
                        height: "100%",
                        left: "0px",
                        top: "0px",
                        padding: "0px .3em",
                        lineHeight: "2em",
                        maxWidth: "70%",
                        overflowX: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis"
                    }}
                >
                    {filename}
                </span>
                <span
                    style={{
                        position: "absolute",
                        height: "100%",
                        right: "0px",
                        top: "0px",
                        padding: "0px .3em",
                        lineHeight: "2em",
                    }}
                >
                    {filesize + " Kb"}
                </span>
            </ListItem>
        </div>
    );
};

export default GalleryItem;

const ListItem = styled.div`
    transition: background 0.1s ease-out;
    :hover {
        background: #fff1;
    }
`;
