import {IInputs, IOutputs} from "./generated/ManifestTypes";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import {RInputs, RProps} from "./inputInterfaces";


export class AdvancedUpload implements ComponentFramework.StandardControl<IInputs, IOutputs> {

    private hostContainer: HTMLDivElement;
    private topLVLContainer: HTMLElement;
    private context: ComponentFramework.Context<IInputs>;
    private notifyOutputChanged: () => void;
    private iinputs: IInputs;
    private inputs: RInputs;
    public outputs: IOutputs;

    private fontSize: number;
    private maxFontsize: number = 16;


	public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container:HTMLDivElement)
	{
        this.hostContainer = container;
        this.context = context;
        this.notifyOutputChanged = notifyOutputChanged;
        // this.hostContainer.style.overflow = "hidden";
        this.topLVLContainer = this.hostContainer.parentElement?.parentElement?.parentElement?.parentElement || this.topLVLContainer;
        this.setHostSize();
        this.setFontsize();

        this.renderDOM()
    }

	public updateView(context: ComponentFramework.Context<IInputs>): void
	{
        this.context = context;
        this.setHostSize();
        this.refreshInputs();
        this.setFontsize();
        this.renderDOM()
    }

	public getOutputs(): IOutputs
	{
		return this.outputs;
	}

	public destroy(): void
	{
        ReactDOM.unmountComponentAtNode(this.hostContainer);
    }
    
    private setHostSize = (): void => {
        this.hostContainer.style.width = this.topLVLContainer.offsetWidth + "px"
        this.hostContainer.style.height = this.topLVLContainer.offsetHeight + "px"
    }

    private setFontsize = (): void => {
        this.fontSize = Math.min(
            Math.floor(this.hostContainer.offsetWidth / 10),
            Math.floor(this.hostContainer.offsetHeight * 0.9),
            this.maxFontsize
        );
        this.hostContainer.style.fontSize = this.fontSize + "px";
    }

    private refreshInputs = (): void => {
        this.iinputs = {
        }
        this.inputs = {
        }
        // this.maxFontsize = this.iinputs.maxFontSize.raw || this.maxFontsize
    }

    public setOutputs = (newOutputs: IOutputs, resetAll: boolean): void => {
        resetAll ? this.outputs = newOutputs : this.outputs = { ...this.outputs, ...newOutputs }
    }

    private renderDOM = (): void => {
        const props: RProps = {
            context: this.context,
            notifyOutputChanged: this.notifyOutputChanged,
            inputs: this.inputs,
            outputs: this.outputs,
            setOutputs: this.setOutputs,
            fontSize: this.fontSize,
            hostContainer: this.hostContainer
        }

        ReactDOM.render(
            React.createElement(App, props),
            this.hostContainer
        )
    }

}