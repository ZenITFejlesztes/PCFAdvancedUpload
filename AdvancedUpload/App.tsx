import React, { useState, useRef, MutableRefObject, useEffect } from "react";

import styled from "styled-components";

import shortid from "shortid";

import { RProps } from "./inputInterfaces";

import Buttons from "./components/Buttons";
import FileGallery from "./components/FileGallery";

interface FileWithID extends ComponentFramework.FileObject {
    id: string;
}

const App = ({hostContainer, context, setOutputs, notifyOutputChanged: emmitChange}: RProps) => {
    const pickFile = context.device.pickFile;

    const sizeRef = useRef() as MutableRefObject<HTMLDivElement>
    const [selectionEmpty, setSelectionEmpty] = useState(true);
    const [selection, setSelection] = useState<FileWithID[]>([]);

    // constantly refresh outputs
    useEffect(() => {
        setOutputs({
            xFileNamesOut: selection.map(file => file.fileName).map(fN => fN.replace(/ /g, "_")).reduce((tot, fN) => tot + " " + fN, ""),
            xFileContentsOut: selection.map(file => file.fileContent).reduce((tot, fC) => tot + " " + fC, ""),
            xFileContentTypesOut: selection.map(file => file.mimeType).reduce((tot, mT) => tot + " " + mT, "")
        }, false);
        emmitChange()
    }, [selection])

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
        <ContainerBox ref={sizeRef} >
            <ListHolder>
                <FileGallery
                    hostHeight={ sizeRef?.current?.clientHeight || hostContainer.clientHeight }
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
