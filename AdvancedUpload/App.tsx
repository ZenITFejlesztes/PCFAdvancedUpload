import React, { useState } from "react";

import styled from "styled-components";

import { RProps } from "./inputInterfaces";

import Buttons from "./components/Buttons";
import FileGallery from "./components/FileGallery";

const App = (props: RProps) => {
    const { hostContainer } = props;
    

    const [selectionEmpty, setSelectionEmpty] = useState(true);
    const [selection, setSelection] = useState<ComponentFramework.FileObject[]>([]);

    return (
        <ContainerBox>
            <ListHolder>
                <FileGallery hostHeight={ hostContainer.getBoundingClientRect().height } />
            </ListHolder>

            <ButtonsHolder>
                <Buttons selectionEmpty={selectionEmpty} setSelectionEmpty={setSelectionEmpty} />
            </ButtonsHolder>
        </ContainerBox>
    );
};

export default App;

const ContainerBox = styled.div`
    margin: 0px;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    border: 1.2px solid black;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
`;

const ButtonsHolder = styled.div`
    box-sizing: border-box;
    margin: 0px;
    padding: 0px;
    height: 100%;
    width: 100%;
    z-index: 2;
    grid-area: 1 / 1 / 2 / 2;
`;

const ListHolder = styled.div`
    box-sizing: border-box;
    margin: 0px;
    padding: 0px;
    height: 100%;
    width: 100%;
    grid-area: 1 / 2 / 2 / 4;

    background: #4f4f4f;
`;
