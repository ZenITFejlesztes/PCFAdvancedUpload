import React, { useState } from "react";

import styled from "styled-components";

import shortid from "shortid";

import { RProps } from "./inputInterfaces";

import Buttons from "./components/Buttons";
import FileGallery from "./components/FileGallery";

interface FileWithID extends ComponentFramework.FileObject {
    id: string;
}

const App = (props: RProps) => {
    const { hostContainer, context } = props;
    const pickFile = context.device.pickFile;

    const [selectionEmpty, setSelectionEmpty] = useState(true);
    const [selection, setSelection] = useState<FileWithID[]>([]);

    const addToSelectionFromLocal = async () => {
        const files = await pickFile({
            accept: "",
            allowMultipleFiles: true,
            maximumAllowedFileSize: 21000000
        });
        setSelection((sel) => [
            ...sel,
            ...files
                .filter((file) => file)
                .map<FileWithID>((file) => ({ ...file, id: shortid.generate() })),
        ]);
        setSelectionEmpty(false);
    };

    const removeItemFromSelection = (id: string) => {
        setSelection((sel) => sel.filter((file) => file.id !== id));
        if (selection.length == 0) setSelectionEmpty(true);
    };

    const resetSelection = () => {
        setSelection((sel) => sel.filter((f) => false));
        setSelectionEmpty(true);
    };

    return (
        <ContainerBox>
            <ListHolder>
                <FileGallery
                    hostHeight={hostContainer.getBoundingClientRect().height}
                    fileSelection={selection}
                    removeFile={removeItemFromSelection}
                    resetSelection={resetSelection}
                />
            </ListHolder>

            <ButtonsHolder>
                <Buttons
                    selectionEmpty={selectionEmpty}
                    setSelectionEmpty={setSelectionEmpty}
                    addToSelectionLocal={addToSelectionFromLocal}
                />
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
