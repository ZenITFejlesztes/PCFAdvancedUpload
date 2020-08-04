import React, { Dispatch, SetStateAction} from 'react'

import styled from "styled-components"

import Button from "./Button"

import { AiOutlineCloud, AiOutlineUpload } from "react-icons/ai"

interface IProps {
    selectionEmpty: boolean;
    setSelectionEmpty: Dispatch<SetStateAction<boolean>>;
}



const Buttons = ( { selectionEmpty, setSelectionEmpty }:IProps ) => {
    const options = [
        { displayText: "Local", icon: AiOutlineUpload },
        { displayText: "Sharepoint", icon: AiOutlineCloud }
    ]
    return (
        <ButtonContainer style={{width: selectionEmpty ? "300%" : "100%"}} onClick={e => setSelectionEmpty(!selectionEmpty)} >
            { options.map( row => <Button displayText={row.displayText} icon={row.icon} /> ) }
        </ButtonContainer>            
    )
}

export default Buttons

const ButtonContainer = styled.div`
    box-sizing: border-box;
    width: 300%;
    height: 100%;
    margin: 0px;
    padding: .3em;
    background: #3d3d3d;
    transition: width .25s ease-out;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
`