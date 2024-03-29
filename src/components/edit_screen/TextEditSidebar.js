import React, { Component } from 'react'
import { Modal, Button } from 'react-materialize';


class TextEditSidebar extends Component {
    constructor() {
        super();
        // WE'LL MANAGE THE UI CONTROL
        // VALUES HERE
        this.state = {
            text: "GoLogoLo Logo",
            textColor : "#FF0000",
            fontSize : 24,
            backgroundColor : "#0000FF",
            borderColor : "#00FF00",
            borderRadius : 24,
            borderThickness : 24,
            padding : 24,
            margin : 24,
            temptext : "GoLogoLo Logo"
        }

    }

    updateLogo(){
        if(this.props != null){
        this.setState({
            text : this.props.logo.text,
            textColor : this.props.logo.textColor,
            fontSize : this.props.logo.fontSize,
            backgroundColor : this.props.logo.backgroundColor,
            borderColor : this.props.logo.borderColor,
            borderRadius : this.props.logo.borderRadius,
            borderThickness : this.props.logo.borderThickness,
            padding : this.props.logo.padding,
            margin : this.props.logo.margin,
            temptext: this.props.logo.text
         });
    }}

    keydownHandler =(e) => {
        if(e.keyCode===90 && e.ctrlKey) this.handleUndo();
        if(e.keyCode===89 && e.ctrlKey) this.handleRedo();
      }
      componentDidMount(){
        document.addEventListener('keydown',this.keydownHandler);
        this.updateLogo();
        }
      componentWillUnmount(){
        document.removeEventListener('keydown',this.keydownHandler);
      }
    
    handleTextChange = (e) =>{
        this.setState({temptext: e.target.value})
    }  

    handleEditText = () => {
        if(this.state.temptext.trim().length != 0){
            this.setState({text: this.state.temptext}, this.completeUserEditing);
        }
    }

    handleCancel = () =>{
        this.updateLogo();
    }

    handleUndo = () => {
        this.props.undoCallback();
        this.updateLogo();
    }

    handleRedo = () => {
        this.props.redoCallback();
        this.updateLogo();
    }

    handleTextColorChange = (event) => {
        console.log("handleTextColorChange to " + event.target.value);
        this.setState({ textColor: event.target.value }, this.completeUserEditing);
    }

    handleFontSizeChange = (event) => {
        console.log("handleFontSizeChange to " + event.target.value);
        this.setState({ fontSize: event.target.value }, this.completeUserEditing);
    }

    handleBackgroundColorChange = (event) => {
        console.log("handleBackgroundColorChange to " + event.target.value);
        this.setState({ backgroundColor: event.target.value }, this.completeUserEditing);
    }

    handleBorderColorChange = (event) => {
        console.log("handleBorderColorChange to " + event.target.value);
        this.setState({ borderColor: event.target.value }, this.completeUserEditing);
    }

    handleBorderRadiusChange = (event) => {
        console.log("handleBorderRadiusChange to " + event.target.value);
        this.setState({ borderRadius: event.target.value }, this.completeUserEditing);
    }

    handleBorderThicknessChange = (event) => {
        console.log("handleBorderThicknessChange to " + event.target.value);
        this.setState({ borderThickness: event.target.value }, this.completeUserEditing);
    }

    handlePaddingChange = (event) => {
        console.log("handlePaddingChange to " + event.target.value);
        this.setState({ padding: event.target.value }, this.completeUserEditing);
    }

    handleMarginChange = (event) => {
        console.log("handleMarginChange to " + event.target.value);
        this.setState({ margin: event.target.value }, this.completeUserEditing);
    }

    completeUserEditing = () => {
        console.log("completeUserEditing");
        console.log("this.state.textColor: " + this.state.textColor);
        this.props.changeLogoCallback(this.props.logo, this.props.logo.key, this.state.text, this.state.textColor, this.state.fontSize, 
            this.state.backgroundColor,this.state.borderColor, this.state.borderRadius, this.state.borderThickness, this.state.padding, this.state.margin);
    }

    render() {
        let undoDisabled = !this.props.canUndo();
        let undoClass = "waves-effect waves-light btn-small";
        if (undoDisabled)
            undoClass += " disabled";
        let redoDisabled = !this.props.canRedo();
        let redoClass = "waves-effect waves-light btn-small";
        if (redoDisabled)
            redoClass += " disabled";
        return (
            <div className="card-panel col s4">
                <div className="card blue-grey darken-1">
                    <div className="card-content white-text">
                        <Modal actions="" header="Enter Logo Text" trigger={<Button className="waves-effect waves-light btn-small">&#9998;</Button>}>
                            <input onChange={this.handleTextChange} value={this.state.temptext}></input>
                            <Button className="modal-close" onClick ={this.handleEditText}>Confirm</Button>
                            <Button className="modal-close" onClick ={this.handleCancel}>Cancel</Button>
                        </Modal>    
                        <button className={undoClass} onClick={this.handleUndo}>Undo</button>
                        <button className={redoClass} onClick={this.handleRedo}>Redo</button>
                    </div>
                </div>
                <div className="card blue-grey darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Edit Logo</span>
                        <div className="row">
                            <div className="col s4">Color:</div>
                            <div className="col s8">
                                <input type="color"
                                        onChange={this.handleTextColorChange}
                                        value={this.props.logo.textColor}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col s4">Font Size:</div>
                            <div className="col s8">
                            <div className="col s4">{this.state.fontSize}</div>
                                <input type="range" min="4" max="144" 
                                    onChange={this.handleFontSizeChange}
                                    value={this.props.logo.fontSize} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col s4">Background Color:</div>
                            <div className="col s8">
                                <input type="color"
                                        onChange={this.handleBackgroundColorChange}
                                        value={this.props.logo.backgroundColor}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col s4">Border Color:</div>
                            <div className="col s8">
                                <input type="color"
                                        onChange={this.handleBorderColorChange}
                                        value={this.props.logo.borderColor}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col s4">Border Radius:</div>
                            <div className="col s8">
                            <div className="col s4">{this.state.borderRadius}</div>
                                <input type="range" min="4" max="144" 
                                    onChange={this.handleBorderRadiusChange}
                                    value={this.props.logo.borderRadius} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col s4">Border Thickness:</div>
                            <div className="col s8">
                            <div className="col s4">{this.state.borderThickness}</div>
                                <input type="range" min="4" max="144" 
                                    onChange={this.handleBorderThicknessChange}
                                    value={this.props.logo.borderThickness} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col s4">Padding:</div>
                            <div className="col s8">
                            <div className="col s4">{this.state.padding}</div>
                                <input type="range" min="4" max="144" 
                                    onChange={this.handlePaddingChange}
                                    value={this.props.logo.padding} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col s4">Margin:</div>
                            <div className="col s8">
                            <div className="col s4">{this.state.margin}</div>
                                <input type="range" min="4" max="144" 
                                    onChange={this.handleMarginChange}
                                    value={this.props.logo.margin} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default TextEditSidebar