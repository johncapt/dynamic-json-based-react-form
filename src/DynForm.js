import React, { Component } from 'react';
import './DynForm.css';
import Input from './components/Input/Input';
import { JSON_F1, JSON_F2, JSON_F3 } from './constants';

class DynForm extends Component {
    state = {
        JsonForm: JSON_F1,
        loading: false
    }

    changeJSON = (e) => {
        this.setState({ JsonForm: JSON.parse(e.target.value) });
    }

    loadForm = (e) => {
        let formToLoad = null;
        switch (e) {
            case 1:
                formToLoad = JSON_F1;
                break;
            case 2:
                formToLoad = JSON_F2;
                break;
            default:
                formToLoad = JSON_F3;
        };
        this.setState({ JsonForm: formToLoad });
    }
    submitForm = (event) => {
        event.preventDefault();
        this.setState({ loading: true });
        const formData = {};
        for (let formElementIdentifier in this.state.JsonForm) {
            formData[formElementIdentifier] = this.state.JsonForm[formElementIdentifier].value;
        };
        console.log(formData);
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedJsonForm = {
            ...this.state.JsonForm
        };
        const updatedFormElement = {
            ...updatedJsonForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedJsonForm[inputIdentifier] = updatedFormElement;
        this.setState({ JsonForm: updatedJsonForm });
    }

    render() {
        const formElementsArray = [];
        for (let key in this.state.JsonForm) {
            formElementsArray.push({
                id: key,
                config: this.state.JsonForm[key]
            });
        }
        var buttonsPaddingStyle = {
            padding: '10px',
            display: 'flex',
            justifyContent: 'space-between'
        };
        let form = (
            <form onSubmit={this.submitForm}>
                {formElementsArray.map(formElement => (
                    <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        label={formElement.config.label}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                ))}
                <div style={buttonsPaddingStyle}>
                    <input type="button" value="form 1" onClick={() => this.loadForm(1)} />
                    <input type="button" value="form 2" onClick={() => this.loadForm(2)} />
                    <input type="button" value="form 3" onClick={() => this.loadForm(3)} />
                </div>
                <textarea rows="12" cols="42" onChange={this.changeJSON} value={JSON.stringify(this.state.JsonForm)} />
            </form>
        );

        return (
            <div className="DynForm">
                <h3>JSON-based React Form</h3>
                <div>(Check it out by modifying JSON...)</div>
                {form}
            </div>
        );
    }
}

export default DynForm;