import React, {Component} from 'react'
import {connect} from 'react-redux'
import {showImages} from 'actions'
import * as API from 'API'
import * as actions from 'actions'
import {Link} from 'react-router'

class AllImages extends Component {
  constructor (props) {
    super(props);
    this.state = {
      images: ''
    };
  }


  componentDidMount () {
    const {tickets} = this.props;
    const {id} = this.props.params;
    let current;
    const promise = new Promise((resolve, reject) => {
      current = tickets.find((item) => {
      if(item.id == id){
        return item
      }
      }) || this.props.dispatch(showImages(id)).then((res) => {
        //console.log(res.val());
        return res.val() || {};
      });
      resolve(current)
    });
    
    promise.then((res) => {
        let imagesAll = res.images;
        let showAllmagesLink = true;

    this.setState({
      images: imagesAll,
    },
    );
    })
  }

  render () {


    const {
      images
    } = this.state;

    const {id} = this.props.params;
    return (


<div className='place__images'> 
    <Link className='more' to={`place/${id}`}>Back</Link>                   
    <ul className='p-0 inner'>
    {
        images ? (
            images.map(function(item) {
                return <li><img className='img-fluid' src={item.image}/></li>;
            })    
        ) : ''
    }
      
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
