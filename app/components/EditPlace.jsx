import React, {Component} from 'react'
import {connect} from 'react-redux'
import {startEditPlace} from 'actions'
import moment from 'moment'
import * as API from 'API'
import TimePicker from 'rc-time-picker'
import {firebaseRef} from '../firebase/index'
import FileUpload from '../gallery/FileUpload'
import 'rc-time-picker/assets/index.css'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.scss'
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

class EditPlace extends Component {

  constructor (props) {
    super(props);
    this.state = {
      cities: [],
      images: [],
      uploadValue: 0,
      openImage: null,
      name: '',
      location: '',
      zipcode: '',
      category: '',
      description: '',
      parentnotes: '',
      features: '',
      faq: '',
      pricing: '',
      id: 0,
      placeEmail: '',
      website: '',
      phone: '',
      city: '',
      show_week_day_1_full: true,
      show_week_day_1_time: false,
      show_week_day_1_closed: false,
      show_week_day_2_full: true,
      show_week_day_2_time: false,
      show_week_day_2_closed: false,
      show_week_day_3_full: true,
      show_week_day_3_time: false,
      show_week_day_3_closed: false,
      show_week_day_4_full: true,
      show_week_day_4_time: false,
      show_week_day_4_closed: false,
      show_week_day_5_full: true,
      show_week_day_5_time: false,
      show_week_day_5_closed: false,
      show_week_day_6_full: true,
      show_week_day_6_time: false,
      show_week_day_6_closed: false,
      show_week_day_7_full: true,
      show_week_day_7_time: false,
      show_week_day_7_closed: false,
      hidden: true
    };
    this.handleChange_1 = this.handleChange_1.bind(this);
    this.handleChange_2 = this.handleChange_2.bind(this);
    this.handleChange_3 = this.handleChange_3.bind(this);
    this.handleChange_4 = this.handleChange_4.bind(this);
    this.handleChange_5 = this.handleChange_5.bind(this);
    this.handleChange_6 = this.handleChange_6.bind(this);
    this.handleChange_7 = this.handleChange_7.bind(this);

    this.handleUpload = this.handleUpload.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.openModalImage = this.openModalImage.bind(this);
    this.openImage = this.openImage.bind(this);
    this.closeImage = this.closeImage.bind(this);
  }

  handleChange_1(event) {
      let value = event.target.value;
      
      this.setState({
          show_week_day_1_full: value == '1',
          show_week_day_1_time: value == '2',
          show_week_day_1_closed: value == '3'
      });
  }
  handleChange_2(event) {
   
      let value = event.target.value;
      this.setState({
          show_week_day_2_full: value == '1',
          show_week_day_2_time: value == '2',
          show_week_day_2_closed: value == '3'
      }); 
  }
  handleChange_3(event) {
   
      let value = event.target.value;
      this.setState({
          show_week_day_3_full: value == '1',
          show_week_day_3_time: value == '2',
          show_week_day_3_closed: value == '3'
      }); 
  }
  handleChange_4(event) {
   
      let value = event.target.value;
      this.setState({
          show_week_day_4_full: value == '1',
          show_week_day_4_time: value == '2',
          show_week_day_4_closed: value == '3'
      }); 
  }
  handleChange_5(event) {
   
      let value = event.target.value;
      this.setState({
          show_week_day_5_full: value == '1',
          show_week_day_5_time: value == '2',
          show_week_day_5_closed: value == '3'
      }); 
  }
  handleChange_6(event) {
   
      let value = event.target.value;
      this.setState({
          show_week_day_6_full: value == '1',
          show_week_day_6_time: value == '2',
          show_week_day_6_closed: value == '3'
      }); 
  }
  handleChange_7(event) {
   
      let value = event.target.value;
      this.setState({
          show_week_day_7_full: value == '1',
          show_week_day_7_time: value == '2',
          show_week_day_7_closed: value == '3'
      }); 
  }

  handleGetCities (e) {
    this.handleEdit(e)
    const city = this.refs.city.value ? this.refs.city.value : ' ';
    const service = new google.maps.places.AutocompleteService();
    const res = service.getPlacePredictions({ input: city, types: ['(cities)'] },
     (predictions, status) => {
       this.setState({cities: predictions ? predictions : []})
     });
  }

  geocode (location) {
    const geocoder = new google.maps.Geocoder();
    const promise = new Promise((resolve, reject) => {
      geocoder.geocode({'address': location}, (results, status) => {
        resolve(results)
      })
    });
    return promise
  }

  selectCategory (e) {
    console.log(e.target.innerHTML);
    if (e.target && e.target.nodeName == 'P') {
      this.refs.category.innerHTML = e.target.innerHTML;
      this.showList()
    }
  }


    
    check () {
      const refsKeys = Object.keys(this.refs);
        refsKeys.forEach((key) => {
            if (!this.refs[key].value && key !== 'form') {

                const node = document.createElement('LABEL');                 
                const textNode = document.createTextNode('This field can\'t be empty!');      
                node.appendChild(textNode); 
                this.refs[key].parentElement.appendChild(node);

            }
        });
    }

  editPlace (e) {
    e.preventDefault();
      const id = this.state.id;
      const name = this.state.name;
      const images = this.state.images;
      const location = this.state.location;
      const zipcode = this.state.zipcode;
      const category = this.state.category;
      const description = this.state.description;
      const parentnotes = this.state.parentnotes;
      const features = this.state.features;
      const faq = this.state.faq;
      const pricing = this.state.pricing;
      const placeEmail = this.state.placeEmail;
      const website = this.state.website;
      const phone =  this.state.phone;
      const city = this.state.city;

      const week_day_1 = this.week_day_1_select.value;
      let week_day_1_opening, week_day_1_closing;
      if(week_day_1 == '2') {
          week_day_1_opening = this.refs.week_day_1_timepicker_open.state.value.toString();
          week_day_1_closing = this.refs.week_day_1_timepicker_close.state.value.toString();
      }
      const week_day_2 = this.week_day_2_select.value;
      let week_day_2_opening, week_day_2_closing;
      if(week_day_2 == '2') {
          week_day_2_opening = this.refs.week_day_2_timepicker_open.state.value.toString();
          week_day_2_closing = this.refs.week_day_2_timepicker_close.state.value.toString();
      }
      const week_day_3 = this.week_day_3_select.value;
      let week_day_3_opening, week_day_3_closing;
      if(week_day_3 == '2') {
          week_day_3_opening = this.refs.week_day_3_timepicker_open.state.value.toString();
          week_day_3_closing = this.refs.week_day_3_timepicker_close.state.value.toString();
      }
      const week_day_4 = this.week_day_4_select.value;
      let week_day_4_opening, week_day_4_closing;
      if(week_day_4 == '2') {
          week_day_4_opening = this.refs.week_day_4_timepicker_open.state.value.toString();
          week_day_4_closing = this.refs.week_day_4_timepicker_close.state.value.toString();
      }
      const week_day_5 = this.week_day_5_select.value;
      let week_day_5_opening, week_day_5_closing;
      if(week_day_5 == '2') {
          week_day_5_opening = this.refs.week_day_5_timepicker_open.state.value.toString();
          week_day_5_closing = this.refs.week_day_5_timepicker_close.state.value.toString();
      }
      const week_day_6 = this.week_day_6_select.value;
      let week_day_6_opening, week_day_6_closing;
      if(week_day_6 == '2') {
          week_day_6_opening = this.refs.week_day_6_timepicker_open.state.value.toString();
          week_day_6_closing = this.refs.week_day_6_timepicker_close.state.value.toString();
      }
      const week_day_7 = this.week_day_7_select.value;
      let week_day_7_opening, week_day_7_closing;
      if(week_day_7 == '2') {
          week_day_7_opening = this.refs.week_day_7_timepicker_open.state.value.toString();
          week_day_7_closing = this.refs.week_day_7_timepicker_close.state.value.toString();
      }

      let latLng ={};
      const fulllocation = `${city}, ${location}, ${zipcode}`;
      //remove all special char
      const regExp = (/[^\w\s]/gi);
      const cityArr = city.split(regExp);

    if (name && location && city && zipcode) {
    API.getPlace(cityArr[0]).then((res) => {
      if (res) {
        cityImg = res.photos[0].image.mobile;
      }

    this.geocode(fulllocation).then((res) => {

      latLng.lat = res[0].geometry.location.lat();
      latLng.lng = res[0].geometry.location.lng();

        let editState = {
          id,
          name,
          images,
          location,
          latLng,
          zipcode,
          category,
          description,
          parentnotes,
          features,
          faq,
          pricing,
          placeEmail,
          website,
          phone,
          city,
          week_day_1,
          week_day_2,
          week_day_3,
          week_day_4,
          week_day_5,
          week_day_6,
          week_day_7
        };

        if(week_day_1 == '2') {
            editState = { ...editState, week_day_1_opening, week_day_1_closing};
        }
        if(week_day_2 == '2') {
            editState = { ...editState, week_day_2_opening, week_day_2_closing};
        }
        if(week_day_3 == '2') {
            editState = { ...editState, week_day_3_opening, week_day_3_closing};
        }
        if(week_day_4 == '2') {
            editState = { ...editState, week_day_4_opening, week_day_4_closing};
        }
        if(week_day_5 == '2') {
            editState = { ...editState, week_day_5_opening, week_day_5_closing};
        }
        if(week_day_6 == '2') {
            editState = { ...editState, week_day_6_opening, week_day_6_closing};
        }
        if(week_day_7 == '2') {
            editState = { ...editState, week_day_7_opening, week_day_7_closing};
        }

        this.props.dispatch(startEditPlace(editState));
        console.log(editState);
        window.location = `#/user/`;
      

    });
    });
    }


    
    
    
  }

  handleEdit (e) {
   this.setState({[e.target.dataset.ref]: e.target.value});
 }
  componentDidMount () {
    const {tickets} = this.props;
    const {id} = this.props.params;
    const current = tickets.find((item) => {
      if(item.id == id){
        return item
      }
    });
    this.setState({
      name: current.name,
      images: current.images,
      location: current.location,
      zipcode: current.zipcode,
      category: current.category,
      description: current.description,
      id: current.id,
      placeEmail: current.placeEmail,
      website: current.website,
      phone: current.phone,
      city: current.city,
      parentnotes: current.parentnotes,
      features: current.features,
      faq: current.faq,
      pricing: current.pricing,
      week_day_1: current.week_day_1,
      week_day_1_timepicker_open: current.week_day_1_timepicker_open,
      week_day_1_timepicker_close: current.week_day_1_timepicker_close
    })
  }

  showList () {
    this.setState({
      hidden: !this.state.hidden
    })
  }
    


  addPredict (e) {
    this.setState({
      cities: [],
      city: e.target.innerHTML
    });
  }

    renderFileUploadButton() {
        return (
            <FileUpload uploadValue={ this.state.uploadValue } onUpload={ this.handleUpload } />
        );
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
                            id: task.snapshot.metadata.generation,
                            name: task.snapshot.metadata.name,
                            image: task.snapshot.downloadURL
                        };
          
                        const dbRef = firebaseRef.database().ref('place').push();
                        const newImage = dbRef.push();
                        newImage.set(record);

                            that.setState({
                                images: that.state.images.concat(record)
                            });
                    });    
                }) (event.target.files[i]);
            }   
        }
    }

    handleRemove() {
        if (this.state.openImage) {
            var file = null;
            const src = this.state.openImage;
            const dbRef = firebaseRef.database().ref('place');
            dbRef.orderByChild('image').equalTo(src).on('child_added', snapshot => {
                file = snapshot.val();
                snapshot.ref.remove();
                this.setState({
                    openImage: null,
                    images: this.state.images.filter(image => image.id !== file.id)
                });
            });
        }


        if (event && event.target && event.target.files.length) {
            const that = this;
            for (let i = 0; i < event.target.files.length; i = i + 1 ) {
                ( (item) => {
                    //Get the file from the event.
                    var file = null;
                    //Receive the reference.
                    const storageRef = firebaseRef.storage().ref(`/place/${item.name}`);
                    //Task to upload the file to Firebase.
                    const task = storageRef.put(item);
                    //Firebase utility to receive the file status.
                    task.on('child_added', snapshot => {
                        file = snapshot.val();
                        snapshot.ref.remove();
                        this.setState({
                            openImage: null,
                            images: this.state.images.filter(image => image.id !== file.id)
                        });
                    }); 
                }) (event.target.files[i]);
            }   
        }

    }

    openModalImage() {
        return (
            <Modal 
            isOpen={ this.state.openImage!==null }
            onRequestClose={ this.closeImage } onUpload={ this.handleRemove }
            style={ customStyles }
            contentLabel="Image Modal">
              <img className='imageZoom' src={ this.state.openImage } alt="" />
              <img className='closeButton' src={ addImage } alt="Close" onClick={ this.closeImage } />
              <img className='removeButton' src={ removeImage } alt="Eliminar" onClick={ this.handleRemove } />
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
    const predictions = this.state.cities.map((city) => {
      return <li onClick={this.addPredict.bind(this)} key={city.id}>{city.description}</li>
    });
    const renderList = () => {
      if(this.state.cities.length) {
        return <ul className='list-unstyled city-auto'>{predictions}</ul>
      }
    };
    const renderCategoryList = () => {
        if(!this.state.hidden) {
            return (
                <div onClick={this.selectCategory.bind(this)} className='hidden'>
                    <p>Pregnancy Advice</p>
                    <p>Beauty and Fashion</p>
                    <p>Baby massage</p>
                    <p>Pregnancy photography</p>
                    <p>Mother nutritionist</p>
                    <p>Lactation support</p>
                    <p>Post natal yoga</p>
                    <p>Mom health</p>
                    <p>Physiotherpest</p>
                    <p>Play Schools</p>
                    <p>Day Care</p>
                    <p>Fun Places</p>
                    <p>Baby Nutritionist</p>
                    <p>Hobbies</p>
                    <p>Sports</p>
                    <p>Shopping</p>
                    <p>Early learning</p>
                    <p>Gifts for children</p>
                    <p>Birthdays</p>
                    <p>Vaccination</p>
                    <p>Baby massage</p>
                    <p>Toys</p>
                </div>
            )
        }
    }

    return (
        <div className='edit-place'>
            <h3 className='action-title'>Edit</h3>
            <form ref='form' onSubmit={this.editPlace.bind(this)}>

            <Tabs forceRenderTabPanel defaultIndex={0}>
                <TabList>
                    <Tab>About</Tab>
                    <Tab>Photos</Tab>
                    <Tab>Location</Tab>
                </TabList>
            

            <TabPanel>
                <div className='row'>
                    <div className='col-6'>
                        <div className="form-group">
                            <label>Name</label>
                            <input data-ref='name' onChange={this.handleEdit.bind(this)} value={this.state.name} ref='name' type="text" className="form-control"  placeholder="Enter Name of store"/>
                        </div>
                        <div className="form-group">
                            <label>Category</label>
                            <div className='drop-wrap'>
                                <div data-ref='category'  onClick={this.showList.bind(this)} ref='category' className="form-control category-list">
                                    Other
                                </div>
                                {renderCategoryList()}
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Description</label>
                            <textarea data-ref='description' onChange={this.handleEdit.bind(this)} value={this.state.description} ref='description' rows="5" className="form-control"  placeholder="Enter your description"/>
                        </div>
                        <div className="form-group">
                            <label>Information for Parents</label>
                            <textarea
                                data-ref='parentnotes'
                                ref='parentnotes'
                                onChange={this.handleEdit.bind(this)}
                                value={this.state.parentnotes}
                                rows="5"
                                className="form-control"
                                placeholder="What should parents know about visiting this place with children?"
                            />
                        </div>
                        <div className="form-group">
                            <label>Features</label>
                            <textarea
                                data-ref='features'
                                ref='features'
                                onChange={this.handleEdit.bind(this)}
                                value={this.state.features}
                                rows="5"
                                className="form-control"
                                placeholder="Features?"
                            />
                        </div>
                        <div className="form-group">
                            <label>FAQ</label>
                            <textarea
                                data-ref='faq'
                                ref='faq'
                                onChange={this.handleEdit.bind(this)}
                                value={this.state.faq}
                                rows="5"
                                className="form-control"
                                placeholder="faq?"
                            />
                        </div>
                        <div className="form-group">
                            <label>Pricing</label>
                            <textarea
                                data-ref='pricing'
                                ref='pricing'
                                onChange={this.handleEdit.bind(this)}
                                value={this.state.pricing}
                                rows="5"
                                className="form-control"
                                placeholder="pricing?"
                            />
                        </div>
                    </div>
                    <div className='col-6'>
                        <div className="form-group">
                            <label>Email</label>
                            <input data-ref='placeEmail' onChange={this.handleEdit.bind(this)} value={this.state.placeEmail} ref='placeEmail' type="text" className="form-control"  placeholder="email@example.com"/>
                        </div>
                        <div className="form-group">
                            <label>Website</label>
                            <input data-ref='website' onChange={this.handleEdit.bind(this)} value={this.state.website} ref='website' type="text" className="form-control"  placeholder="http://www.example.com"/>
                        </div>
                        <div className="form-group">
                            <label>Phone</label>
                            <input data-ref='phone' onChange={this.handleEdit.bind(this)} value={this.state.phone} ref='phone' type="text" className="form-control"  placeholder="+91 (555) 555-5555"/>
                        </div>

                        <div className="form-group">
                            <h6>Timing</h6>
                        
                            <div className='days mb-1 row justify-content-between align-items-center pl-3 pr-3'>
                                <div className='col-2'>
                                    Monday
                                </div>
                                <select onChange={(e) => this.handleChange_1(e)} className='form-control col-3' data-ref='week_day_1' ref={week_day_1 => this.week_day_1_select = week_day_1}>
                                    <option value='1'>Full day</option>
                                    <option value='2'>Timing</option>
                                    <option value='3'>Closed</option>
                                </select>
                                { this.state.show_week_day_1_full  ? 
                                    <div className='col-6'>Full Day</div>
                                 : ''}
                                { this.state.show_week_day_1_time  ? 
                                    <div className='col-6'>
                                        <div className='row'>
                                            <TimePicker data-ref='week_day_1_timepicker_open' ref='week_day_1_timepicker_open' defaultValue={moment()} showSecond={false} />
                                            <TimePicker data-ref='week_day_1_timepicker_close' ref='week_day_1_timepicker_close' defaultValue={moment()} showSecond={false} />
                                        </div>
                                    </div>
                                 : ''}
                                { this.state.show_week_day_1_closed  ? 
                                    <div className='col-6'>Closed</div>
                                 : ''}
                            </div>
                            <div className='days mb-1 row justify-content-between align-items-center pl-3 pr-3'>
                                <div className='col-2'>
                                    Monday
                                </div>
                                <select onChange={(e) => this.handleChange_2(e)} className='form-control col-3' data-ref='week_day_2' ref={week_day_2 => this.week_day_2_select = week_day_2}>
                                    <option value='1'>Full day</option>
                                    <option value='2'>Timing</option>
                                    <option value='3'>Closed</option>
                                </select>
                                { this.state.show_week_day_2_full  ? 
                                    <div className='col-6'>Full Day</div>
                                 : ''}
                                { this.state.show_week_day_2_time  ? 
                                    <div className='col-6'>
                                        <div className='row'>
                                            <TimePicker data-ref='week_day_2_timepicker_open' ref='week_day_2_timepicker_open' defaultValue={moment()} showSecond={false} />
                                            <TimePicker data-ref='week_day_2_timepicker_close' ref='week_day_2_timepicker_close' defaultValue={moment()} showSecond={false} />
                                        </div>
                                    </div>
                                 : ''}
                                { this.state.show_week_day_2_closed  ? 
                                    <div className='col-6'>Closed</div>
                                 : ''}
                            </div>
                            <div className='days mb-1 row justify-content-between align-items-center pl-3 pr-3'>
                                <div className='col-2'>
                                    Monday
                                </div>
                                <select onChange={(e) => this.handleChange_3(e)} className='form-control col-3' data-ref='week_day_3' ref={week_day_3 => this.week_day_3_select = week_day_3}>
                                    <option value='1'>Full day</option>
                                    <option value='2'>Timing</option>
                                    <option value='3'>Closed</option>
                                </select>
                                { this.state.show_week_day_3_full  ? 
                                    <div className='col-6'>Full Day</div>
                                 : ''}
                                { this.state.show_week_day_3_time  ? 
                                    <div className='col-6'>
                                        <div className='row'>
                                            <TimePicker data-ref='week_day_3_timepicker_open' ref='week_day_3_timepicker_open' defaultValue={moment()} showSecond={false} />
                                            <TimePicker data-ref='week_day_3_timepicker_close' ref='week_day_3_timepicker_close' defaultValue={moment()} showSecond={false} />
                                        </div>
                                    </div>
                                 : ''}
                                { this.state.show_week_day_3_closed  ? 
                                    <div className='col-6'>Closed</div>
                                 : ''}
                            </div>
                            <div className='days mb-1 row justify-content-between align-items-center pl-3 pr-3'>
                                <div className='col-2'>
                                    Monday
                                </div>
                                <select onChange={(e) => this.handleChange_4(e)} className='form-control col-3' data-ref='week_day_4' ref={week_day_4 => this.week_day_4_select = week_day_4}>
                                    <option value='1'>Full day</option>
                                    <option value='2'>Timing</option>
                                    <option value='3'>Closed</option>
                                </select>
                                { this.state.show_week_day_4_full  ? 
                                    <div className='col-6'>Full Day</div>
                                 : ''}
                                { this.state.show_week_day_4_time  ? 
                                    <div className='col-6'>
                                        <div className='row'>
                                            <TimePicker data-ref='week_day_4_timepicker_open' ref='week_day_4_timepicker_open' defaultValue={moment()} showSecond={false} />
                                            <TimePicker data-ref='week_day_4_timepicker_close' ref='week_day_4_timepicker_close' defaultValue={moment()} showSecond={false} />
                                        </div>
                                    </div>
                                 : ''}
                                { this.state.show_week_day_4_closed  ? 
                                    <div className='col-6'>Closed</div>
                                 : ''}
                            </div>
                            <div className='days mb-1 row justify-content-between align-items-center pl-3 pr-3'>
                                <div className='col-2'>
                                    Monday
                                </div>
                                <select onChange={(e) => this.handleChange_5(e)} className='form-control col-3' data-ref='week_day_5' ref={week_day_5 => this.week_day_5_select = week_day_5}>
                                    <option value='1'>Full day</option>
                                    <option value='2'>Timing</option>
                                    <option value='3'>Closed</option>
                                </select>
                                { this.state.show_week_day_5_full  ? 
                                    <div className='col-6'>Full Day</div>
                                 : ''}
                                { this.state.show_week_day_5_time  ? 
                                    <div className='col-6'>
                                        <div className='row'>
                                            <TimePicker data-ref='week_day_5_timepicker_open' ref='week_day_5_timepicker_open' defaultValue={moment()} showSecond={false} />
                                            <TimePicker data-ref='week_day_5_timepicker_close' ref='week_day_5_timepicker_close' defaultValue={moment()} showSecond={false} />
                                        </div>
                                    </div>
                                 : ''}
                                { this.state.show_week_day_5_closed  ? 
                                    <div className='col-6'>Closed</div>
                                 : ''}
                            </div>
                            <div className='days mb-1 row justify-content-between align-items-center pl-3 pr-3'>
                                <div className='col-2'>
                                    Monday
                                </div>
                                <select onChange={(e) => this.handleChange_6(e)} className='form-control col-3' data-ref='week_day_6' ref={week_day_6 => this.week_day_6_select = week_day_6}>
                                    <option value='1'>Full day</option>
                                    <option value='2'>Timing</option>
                                    <option value='3'>Closed</option>
                                </select>
                                { this.state.show_week_day_6_full  ? 
                                    <div className='col-6'>Full Day</div>
                                 : ''}
                                { this.state.show_week_day_6_time  ? 
                                    <div className='col-6'>
                                        <div className='row'>
                                            <TimePicker data-ref='week_day_6_timepicker_open' ref='week_day_6_timepicker_open' defaultValue={moment()} showSecond={false} />
                                            <TimePicker data-ref='week_day_6_timepicker_close' ref='week_day_6_timepicker_close' defaultValue={moment()} showSecond={false} />
                                        </div>
                                    </div>
                                 : ''}
                                { this.state.show_week_day_6_closed  ? 
                                    <div className='col-6'>Closed</div>
                                 : ''}
                            </div>
                            <div className='days mb-1 row justify-content-between align-items-center pl-3 pr-3'>
                                <div className='col-2'>
                                    Monday
                                </div>
                                <select onChange={(e) => this.handleChange_7(e)} className='form-control col-3' data-ref='week_day_7' ref={week_day_7 => this.week_day_7_select = week_day_7}>
                                    <option value='1'>Full day</option>
                                    <option value='2'>Timing</option>
                                    <option value='3'>Closed</option>
                                </select>
                                { this.state.show_week_day_7_full  ? 
                                    <div className='col-6'>Full Day</div>
                                 : ''}
                                { this.state.show_week_day_7_time  ? 
                                    <div className='col-6'>
                                        <div className='row'>
                                            <TimePicker data-ref='week_day_7_timepicker_open' ref='week_day_7_timepicker_open' defaultValue={moment()} showSecond={false} />
                                            <TimePicker data-ref='week_day_7_timepicker_close' ref='week_day_7_timepicker_close' defaultValue={moment()} showSecond={false} />
                                        </div>
                                    </div>
                                 : ''}
                                { this.state.show_week_day_7_closed  ? 
                                    <div className='col-6'>Closed</div>
                                 : ''}
                            </div>

                        </div>
                    </div>
                </div>
            </TabPanel>
            <TabPanel>
                <section className="photos">
                    <div>
                        <h3>Photos</h3>
                    </div>

                    <div className='place__images'>
                        <ul>
                            {this.renderFileUploadButton() }
                               { this.state.images.map(image => ( 
                                   <li className='store__images--item'>
                                        <img className='img-fluid' src={ image.image } key={ image.id } alt="" onClick={ this.openImage }/>
                                        <input type='hidden' ref='images' value={ image.image } />
                                   </li>
                               )).reverse() }
                               { this.openModalImage() }
                        </ul>
                    </div> 

                    <div className='featured-photo store__images'>

                    </div>

                </section>
            </TabPanel>
            <TabPanel>
                <div className='row edit-place__location'>
                    <div className='col-6'>
                        <div className="form-group">
                            <label>Street Location</label>
                            <input data-ref='location' onChange={this.handleEdit.bind(this)} value={this.state.location} ref='location' type="text" className="form-control"  placeholder="Enter location"/>
                        </div>
                        <div className="form-group">
                            <label>City</label>
                            <input data-ref='city'  value={this.state.city} onChange={this.handleGetCities.bind(this)} ref='city' type="text" className="form-control"  placeholder="City name"/>
                            {renderList()}
                        </div>
                        <div className="form-group">
                            <label>Zip Code</label>
                            <input data-ref='zipcode' onChange={this.handleEdit.bind(this)} value={this.state.zipcode} ref='zipcode' type="text" className="form-control"  placeholder="12345"/>
                        </div>
                    </div>
                </div>
            </TabPanel>
        </Tabs>   
                <button type="submit" className="btn">Submit</button>
            </form>
        </div>
    )
  }
}

export default connect(({tickets}) => {
  return {
    tickets
  }
})(EditPlace)
