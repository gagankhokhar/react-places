import React from 'react';
import addImage from '../img/add-image.png';

export default class FileUpload extends React.Component {
    constructor() {
        super();

        this.renderProgressBar = this.renderProgressBar.bind(this);
    }

    renderProgressBar() {
        if (this.props.uploadValue > 0 && this.props.uploadValue < 100 ) {
            return(
                <progress className='progressBar' value={this.props.uploadValue} max="100"></progress>
            );
        }
    }

    readImage(event) {
        this.props.onUpload(event);
    }

    render() {
        return(
            <li className='place__images--selector'>
                <label htmlFor="file-input">
                <input id="file-input" multiple type="file" onChange={ this.props.onUpload } onClick={(event)=> { event.target.value = null }}/>
                { this.renderProgressBar() }
                    <span>+</span>
                </label>
            </li>
        );
    }
}