import {IInputs, IOutputs} from "./generated/ManifestTypes"

export interface RInputs {
}

export interface RProps {
    context: ComponentFramework.Context<IInputs>;
    notifyOutputChanged: () => void;
    inputs: RInputs;
    outputs: IOutputs;
    setOutputs: (newOutputs: IOutputs, resetAll: boolean) => void;
    fontSize: number;
    hostContainer: HTMLDivElement;
}