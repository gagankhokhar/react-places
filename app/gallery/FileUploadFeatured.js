import React, { Component } from 'react';
import {firebaseRef} from '../firebase/index'



export default class ImageGallery extends React.Component {
    constructor() {
        super();
        this.state = {
            uploadValue: 0,
            featuredimages: [],
        };
        this.renderProgressBar = this.renderProgressBar.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
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



    handleUpload(event) {
        if (event && event.target && event.target.files.length) {
            const that = this;
            for (let i = 0; i < event.target.files.length; i = i + 1 ) {
                ( (item) => {
                    //Get the file from the event.
                    const file = item;
                    //Receive the reference.
                    const storageRef = firebaseRef.storage().ref(`/place/${file.name}`);
                    //Task to upload the file to Firebase.
                    const task = storageRef.put(file);
                    //Firebase utility to receive the file status.
                    task.on('state_changed', snapshot => {
                        let percentage = (snapshot.bytesTransferred /snapshot.totalBytes) * 100;
                        that.setState({
                            uploadValue: percentage
                        });
                    }, error => {
                        console.log(error.message);
                    }, () => { //Image already uploaded.
                        const record = {
                            featuredid: task.snapshot.metadata.generation,
                            featuredname: task.snapshot.metadata.name,
                            featuredimage: task.snapshot.downloadURL
                        };
          
                        const dbRef = firebaseRef.database().ref('place').push();
                        const newImage = dbRef.push();
                        newImage.set(record);

                        that.setState({
                            featuredimages: that.state.featuredimages.concat(record)
                        });
                    });    
                }) (event.target.files[i]);
            }
            
            
        }
    }




    render() {
        return(
            <div>
                <div className='store__images--item store__images--selector'>
                    <label htmlFor="file-input">
                        <input id="file-input" type="file" onChange={ this.props.onUpload } onClick={(event)=> { event.target.value = null }}/>
                        <span>+</span>
                    </label>
                </div>
                <div>
                    
                    { this.renderProgressBar() }
                    { this.state.featuredimages.map(image => ( 
                        <div className='store__images--item'>
                             <img className='image' src={ image.featuredimage } key={ image.featuredid } alt="" />
                             <input type='hidden' ref='featuredimages' value={ image.featuredimage } />
                        </div>
                    )).reverse() }
                </div>
            </div>
        );
    }
}
