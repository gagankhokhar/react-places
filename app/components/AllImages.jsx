import React, {Component} from 'react'
import {connect} from 'react-redux'
import * as API from 'API'
import {show} from 'actions'
import * as actions from 'actions'
import {firebaseRef} from '../firebase/index'
import FileUpload from '../gallery/FileUpload'
import Modal from 'react-modal'

import addImage from '../img/add-image.png'
import removeImage from '../img/remove-image.png'

const customStyles = {
    content : {
        position    : 'absolute',
        top         : '50%',
        right       : 'auto',
        bottom      : 'auto',
        left        : '50%',
        transform   : 'translate(-50%, -50%)',
        background  : 'none',
        border      : 'none',
        overflow    : 'visible'
    }
}

class AllImages extends Component {
    constructor (props) {
        super(props);
        this.state = {
            images: [],
            id: 0,
            openImage: null,
            hidden: true
        };

        this.openModalImage = this.openModalImage.bind(this);
        this.openImage = this.openImage.bind(this);
        this.closeImage = this.closeImage.bind(this);
     }

    // componentDidMount () {
    //     const {tickets} = this.props;
    //     const {id} = this.props.params;
    //     const current = tickets.find((item) => {
    //         if(item.id == id){
    //             return item
    //         }
    //     });
    //     this.setState({
    //         images: current.images
    //     })
    // }

    componentDidMount () {
      const {tickets} = this.props;
      const {id} = this.props.params;
      let current;
      const promise = new Promise((resolve, reject) => {
        current = tickets.find((item) => {
        if(item.id == id){
          return item
        }
        }) || this.props.dispatch(show(id)).then((res) => {
          //console.log(res.val());
          return res.val() || {};
        });
        resolve(current)
      });
      
      promise.then((res) => {
          let imagesAll = res.images;
          let showAllmagesLink = true;
      this.setState({
        name: res.name,
        images: imagesAll,
      }
      );
      })
    }


    openModalImage() {
        return (
            <Modal 
            isOpen={ this.state.openImage!==null }
            onRequestClose={ this.closeImage }
            style={ customStyles }
            contentLabel="Image Modal">
                <img className='imageZoom' src={ this.state.openImage } alt="" />
                <img className='closeButton' src={ addImage } alt="Close" onClick={ this.closeImage } />
            </Modal>
        );
    }

    openImage(event) {
        this.setState({ openImage: event.target.src });
    }

    closeImage() {
        this.setState({ openImage: null });
    }

  render () {

    const {images} = this.state;
    const {id} = this.props.params;
    
    return (

        <div className='place__images AllImages'> 
            <a className='more mb-2 d-inline-block' href={`#/place/${id}`}>Back</a>
            <ul>
                { this.state.images.map(image => ( 
                    <li className='store__images--item'>
                        <img className='img-fluid' src={ image.image } key={ image.id } alt="" onClick={ this.openImage }/>
                        <input type='hidden' ref='images' value={ image.image } />
                    </li>
                )).reverse() }
                { this.openModalImage() }
            </ul>
        </div>

        )
    }
}



export default connect(({tickets}) => {
  return {
    tickets
  }
})(AllImages);
