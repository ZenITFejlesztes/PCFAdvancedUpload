import React, {useMemo} from "react";

import styled from "styled-components";

import { IconType } from "react-icons";

interface IProps {
    displayText: string;
    icon: IconType;
    addLocal: () => any;
}

const Button = ({ displayText, icon: TypeIcon, addLocal }: IProps) => {
    const uploadHandler = useMemo(() => {
        if (displayText == "Local") return addLocal
        return () => null
    }, [displayText])
    
    return (
        <Holder
        onClick={uploadHandler}
        >
            <TypeIcon 
                color="white"
                size="2.3em"
                style={{ 
                    boxSizing: "border-box",
                    display: "block",
                    margin: "0px", 
                    padding: "0px",
                    height: "2.5em",
                    width: "100%",
                    textAlign: "center",
                    verticalAlign: "center"
                }} 
            />
            <div
                style={{
                    width: "100%",
                    display: "grid",
                    placeItems: "center",
                    boxSizing: "border-box",
                    margin: "0px",
                    padding: "0px",
                    color: "white",
                }}
            >
                <h4 style={{margin: "0px", padding: "0px"}} > {displayText} </h4>
            </div>
        </Holder>
    );
};

export default Button;

const Holder = styled.div`
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    margin: 0px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transition: background .15s ease-out;
    :hover {
        background: #ffffff10;
    }
`;
