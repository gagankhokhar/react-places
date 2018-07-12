import React, {Component} from 'react'
import {connect} from 'react-redux'
import moment from 'moment'
import * as actions from 'actions'
import * as API from 'API'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.scss'
import {firebaseRef} from '../firebase/index'
import FileUpload from '../gallery/FileUpload';
// import ImageUploader from './ImageUploader/index'
import TimePicker from 'rc-time-picker'
import 'rc-time-picker/assets/index.css'
// import ImageGallery from '../gallery/FileUploadFeatured';
import Modal from 'react-modal'

class AddPlace extends Component {

  constructor (props) {
    super(props)
    this.state = {
      cities: [],
      hidden: true,
      tabIndex: 0,
      uploadValue: 0,
      images: [],
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
      show_week_day_7_closed: false

    };
    console.log('imageuploader');
    console.log(this.props.images);

    this.handleChange_1 = this.handleChange_1.bind(this);
    this.handleChange_2 = this.handleChange_2.bind(this);
    this.handleChange_3 = this.handleChange_3.bind(this);
    this.handleChange_4 = this.handleChange_4.bind(this);
    this.handleChange_5 = this.handleChange_5.bind(this);
    this.handleChange_6 = this.handleChange_6.bind(this);
    this.handleChange_7 = this.handleChange_7.bind(this);
this.openModalImage = this.openModalImage.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
  }

  handleChange_time(event) {
      let value = event.target.value;
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

  check () {
    let hasError = false;
      const refsKeys = Object.keys(this.refs);
        refsKeys.forEach((key) => {
        
        if (!this.refs[key].value && key !== 'form' && key !== 'category') {
            const node = document.createElement('LABEL');
            node.classList.add('warning-lable');
            const textNode = document.createTextNode('This field can\'t be empty!');
            node.appendChild(textNode);
          this.refs[key].parentElement.appendChild(node);
          hasError = true;
        }
         
      });
        if (hasError) {
            this.setState({openImage: true})
        }
    }

    openModalImage() {
        return (
            <Modal contentLabel="Image Modal">
            Hello
          </Modal>
        );
    }

  handleGetCities () {
      //probaly may create erros
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

  addNewPlace (e) {
    e.preventDefault();
    this.check();
    const {uid, email} = this.props.auth;
    const name = this.refs.name.value;
    const images = this.state.images;
    const location = this.refs.location.value;
    const zipcode = this.refs.zipcode.value;
    const placeEmail = this.refs.placeEmail.value;
    const website = this.refs.website.value;
    const phone = this.refs.phone.value;
    const description = this.refs.description.value;
    const parentnotes = this.refs.parentnotes.value;
    const features = this.refs.features.value;
    const faq = this.refs.faq.value;
    const pricing = this.refs.pricing.value;
    const city = this.refs.city.value;
    const category = this.refs.category.innerHTML;
    const nursing_great = this.nursing_great_select.value;
    const nursing_great_description = this.refs.nursing_great_description.value;
    const changing_table = this.changing_table_select.value;
    const changing_table_description = this.refs.changing_table_description.value;
    const kids_menu = this.kids_menu_select.value;
    const kids_menu_description = this.refs.kids_menu_description.value;
    const kids_eat_free = this.kids_eat_free_select.value;
    const kids_eat_free_description = this.refs.kids_eat_free_description.value;
    const highchair = this.highchair_select.value;
    const highchair_description = this.refs.highchair_description.value;
    const stroller_at_table = this.stroller_at_table_select.value;
    const stroller_at_table_description = this.refs.stroller_at_table_description.value;
    const parking = this.parking_select.value;
    const parking_description = this.refs.parking_description.value;
    const drive_thru = this.drive_thru_select.value;
    const drive_thru_description = this.refs.drive_thru_description.value;
    const restroom = this.restroom_select.value;
    const restroom_description = this.refs.restroom_description.value;
    const mothers_room = this.mothers_room_select.value;
    const mothers_room_description = this.refs.mothers_room_description.value;
    const child_care = this.child_care_select.value;
    const child_care_description = this.refs.child_care_description.value;
    const adults_only = this.adults_only_select.value;
    const adults_only_description = this.refs.adults_only_description.value;
    const fun_for_grownups = this.fun_for_grownups_select.value;
    const fun_for_grownups_description = this.refs.fun_for_grownups_description.value;
    const play_great = this.play_great_select.value;
    const play_great_description = this.refs.play_great_description.value;
    const indoor_play = this.indoor_play_select.value;
    const indoor_play_description = this.refs.indoor_play_description.value;
    const water_play = this.water_play_select.value;
    const water_play_description = this.refs.water_play_description.value;

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
    let cityImg = '';
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

        let place = {
          uid,
          images,
          email,
          name,
          location,
          zipcode,
          placeEmail,
          website,
          phone,
          description,
          parentnotes,
          features,
          faq,
          pricing,
          city: cityArr[0].trim(),
          category,
          latLng,
          cityImg,
          nursing_great,
          nursing_great_description,
          changing_table,
          changing_table_description,
          kids_menu,
          kids_menu_description,
          kids_eat_free,
          kids_eat_free_description,
          highchair,
          highchair_description,
          stroller_at_table,
          stroller_at_table_description,
          parking,
          parking_description,
          drive_thru,
          drive_thru_description,
          restroom,
          restroom_description,
          mothers_room,
          mothers_room_description,
          child_care,
          child_care_description,
          adults_only,
          adults_only_description,
          fun_for_grownups,
          fun_for_grownups_description,
          play_great,
          play_great_description,
          indoor_play,
          indoor_play_description,
          water_play,
          water_play_description,
          week_day_1,
          week_day_2,
          week_day_3,
          week_day_4,
          week_day_5,
          week_day_6,
          week_day_7
        };

        if(week_day_1 == '2') {
            place = { ...place, week_day_1_opening, week_day_1_closing};
        }
        if(week_day_2 == '2') {
            place = { ...place, week_day_2_opening, week_day_2_closing};
        }
        if(week_day_3 == '2') {
            place = { ...place, week_day_3_opening, week_day_3_closing};
        }
        if(week_day_4 == '2') {
            place = { ...place, week_day_4_opening, week_day_4_closing};
        }
        if(week_day_5 == '2') {
            place = { ...place, week_day_5_opening, week_day_5_closing};
        }
        if(week_day_6 == '2') {
            place = { ...place, week_day_6_opening, week_day_6_closing};
        }
        if(week_day_7 == '2') {
            place = { ...place, week_day_7_opening, week_day_7_closing};
        }

        this.props.dispatch(actions.startAddPlace(place));
        this.refs.form.reset();
      

    });
    });
    }
  }
  addPredict (e) {
    this.refs.city.value = e.target.innerHTML;
    this.setState({
      cities: []
    });
  }

  showList () {
    this.setState({
      hidden: !this.state.hidden
    })
  }

  selectCategory (e) {
    console.log(e.target.innerHTML);
    if (e.target && e.target.nodeName == 'P') {
      this.refs.category.innerHTML = e.target.innerHTML;
      this.showList()
    }
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
                        // }
                        // let curr = that.refs.images.value;
                        // let add = task.snapshot.downloadURL;
                        // if (curr) {
                        //     curr = curr + '_*_';
                        // }
                        // curr = curr + add;
                        // that.setState({
                        //     images: curr
                        // });
                        // that.refs.images.value = curr;
                        //end Chapuza
                    });    
                }) (event.target.files[i]);
            }
            
            
        }
    }



    render () {

    const predictions = this.state.cities.map((city) => {
        return <li onClick={this.addPredict.bind(this)} key={city.id}>{city.description}</li>
    });
    const renderList = () => {
        if(this.state.cities.length) {
            return <ul className='list-unstyled city-auto'>{predictions}</ul>
        }
    }
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
      <div className='NewPlace'>
        <h3 className='action-title'>Add new Store</h3>
{ this.openModalImage() }
            <form ref='form' onSubmit={this.addNewPlace.bind(this)}>

                <Tabs forceRenderTabPanel defaultIndex={0}>
                    <TabList>
                        <Tab>About</Tab>
                        <Tab>Photos</Tab>
                        <Tab>Location</Tab>
                    </TabList>
                    <TabPanel>
                        <div className='row'>
                            <div className='col-6'>
                                <h4 className='mt-3'>Description</h4>
                                <div className="form-group">
                                    <label>Name</label>
                                    <input ref='name' type="text" className="form-control"  placeholder="Enter name of Store"/>
                                </div>
                                <div className="form-group">
                                    <label>Category</label>
                                    <div className='drop-wrap'>
                                        <div onClick={this.showList.bind(this)} ref='category' className="form-control category-list">
                                            Other
                                        </div>
                                        {renderCategoryList()}
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Description</label>
                                    <textarea ref='description' rows="5" className="form-control"  placeholder="Please describe this place in a factual and neutral tone."/>
                                </div>
                                <div className="form-group">
                                    <label>Information for Parents</label>
                                    <textarea ref='parentnotes' rows="5" className="form-control"  placeholder="What should parents know about visiting this place with children?"/>
                                </div>
                                <div className="form-group">
                                    <label>Features</label>
                                    <textarea ref='features' rows="5" className="form-control"  placeholder="Features?"/>
                                </div>
                                <div className="form-group">
                                    <label>FAQ</label>
                                    <textarea ref='faq' rows="5" className="form-control"  placeholder="FAQ?"/>
                                </div>
                                <div className="form-group">
                                    <label>Pricing</label>
                                    <textarea ref='pricing' rows="5" className="form-control"  placeholder="pricing"/>
                                </div>
                            </div>
                            <div className='col-6'>
                                <h4 className='mt-3'>Contact Information</h4>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input ref='placeEmail' type="text" className="form-control"  placeholder="email@example.com"/>
                                </div>
                                <div className="form-group">
                                    <label>Website</label>
                                    <input ref='website' type="text" className="form-control"  placeholder="http://www.example.com"/>
                                </div>
                                <div className="form-group">
                                    <label>Phone</label>
                                    <input ref='phone' type="text" className="form-control"  placeholder="+91 (555) 555-5555"/>
                                </div>
                                <div className="form-group">
                                    <h6>Timing</h6>
                
                                    <div className='days mb-1 row justify-content-between align-items-center pl-3 pr-3'>
                                        <div className='col-2'>
                                            Monday
                                        </div>
                                        <select onChange={(e) => this.handleChange_1(e)} className='form-control col-3' ref={week_day_1 => this.week_day_1_select = week_day_1}>
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
                                                    <TimePicker 
                                                        ref='week_day_1_timepicker_open' 
                                                        defaultValue={moment('12:00:00', 'HH:mm:ss')} 
                                                        showSecond={false} 
                                                        placeholder='Opening time' 
                                                    />
                                                    <TimePicker 
                                                        ref='week_day_1_timepicker_close' 
                                                        defaultValue={moment('13:30:56', 'HH:mm:ss')} 
                                                        showSecond={false} 
                                                        placeholder='Closing time' 
                                                    />
                                                </div>
                                            </div>
                                         : ''}
                                        { this.state.show_week_day_1_closed  ? 
                                            <div className='col-6'>Closed</div>
                                         : ''}
                                    </div>
                                    <div className='days mb-1 row justify-content-between align-items-center pl-3 pr-3'>
                                        <div className='col-2'>
                                            Tuesday
                                        </div>
                                        <select onChange={(e) => this.handleChange_2(e)} className='form-control col-3' ref={week_day_2 => this.week_day_2_select = week_day_2}>
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
                                                    <TimePicker ref='week_day_2_timepicker_open' defaultValue={moment()} showSecond={false} />
                                                    <TimePicker ref='week_day_2_timepicker_close' defaultValue={moment()} showSecond={false} />
                                                </div>
                                            </div>
                                         : ''}
                                        { this.state.show_week_day_2_closed  ? 
                                            <div className='col-6'>Closed</div>
                                         : ''}
                                    </div>
                                    <div className='days mb-1 row justify-content-between align-items-center pl-3 pr-3'>
                                        <div className='col-2'>
                                            Wednesday
                                        </div>
                                        <select onChange={(e) => this.handleChange_3(e)} className='form-control col-3' ref={week_day_3 => this.week_day_3_select = week_day_3}>
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
                                                    <TimePicker ref='week_day_3_timepicker_open' defaultValue={moment()} showSecond={false} />
                                                    <TimePicker ref='week_day_3_timepicker_close' defaultValue={moment()} showSecond={false} />
                                                </div>
                                            </div>
                                         : ''}
                                        { this.state.show_week_day_3_closed  ? 
                                            <div className='col-6'>Closed</div>
                                         : ''}
                                    </div>
                                    <div className='days mb-1 row justify-content-between align-items-center pl-3 pr-3'>
                                        <div className='col-2'>
                                            Thursday
                                        </div>
                                        <select onChange={(e) => this.handleChange_4(e)} className='form-control col-3' ref={week_day_4 => this.week_day_4_select = week_day_4}>
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
                                                    <TimePicker ref='week_day_4_timepicker_open' defaultValue={moment()} showSecond={false} />
                                                    <TimePicker ref='week_day_4_timepicker_close' defaultValue={moment()} showSecond={false} />
                                                </div>
                                            </div>
                                         : ''}
                                        { this.state.show_week_day_4_closed  ? 
                                            <div className='col-6'>Closed</div>
                                         : ''}
                                    </div>
                                    <div className='days mb-1 row justify-content-between align-items-center pl-3 pr-3'>
                                        <div className='col-2'>
                                            Friday
                                        </div>
                                        <select onChange={(e) => this.handleChange_5(e)} className='form-control col-3' ref={week_day_5 => this.week_day_5_select = week_day_5}>
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
                                                    <TimePicker ref='week_day_5_timepicker_open' defaultValue={moment()} showSecond={false} />
                                                    <TimePicker ref='week_day_5_timepicker_close' defaultValue={moment()} showSecond={false} />
                                                </div>
                                            </div>
                                         : ''}
                                        { this.state.show_week_day_5_closed  ? 
                                            <div className='col-6'>Closed</div>
                                         : ''}
                                    </div>
                                    <div className='days mb-1 row justify-content-between align-items-center pl-3 pr-3'>
                                        <div className='col-2'>
                                            Saturday
                                        </div>
                                        <select onChange={(e) => this.handleChange_6(e)} className='form-control col-3' ref={week_day_6 => this.week_day_6_select = week_day_6}>
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
                                                    <TimePicker ref='week_day_6_timepicker_open' defaultValue={moment()} showSecond={false} />
                                                    <TimePicker ref='week_day_6_timepicker_close' defaultValue={moment()} showSecond={false} />
                                                </div>
                                            </div>
                                         : ''}
                                        { this.state.show_week_day_6_closed  ? 
                                            <div className='col-6'>Closed</div>
                                         : ''}
                                    </div>
                                    <div className='days mb-1 row justify-content-between align-items-center pl-3 pr-3'>
                                        <div className='col-2'>
                                            Sunday
                                        </div>
                                        <select onChange={(e) => this.handleChange_7(e)} className='form-control col-3' ref={week_day_7 => this.week_day_7_select = week_day_7}>
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
                                                    <TimePicker ref='week_day_7_timepicker_open' defaultValue={moment()} showSecond={false} />
                                                    <TimePicker ref='week_day_7_timepicker_close' defaultValue={moment()} showSecond={false} />
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

                        <div className='row family-amenities'>
                            <fieldset className='col-6'>
                                <h5 className='NewPlace--heading'>Family Amenities</h5>
                                <div className="form-group">
                                    <h6>Are there comfortable seats where you could feed/nurse a baby?</h6>
                                    <select className='form-control' ref={nursing_great => this.nursing_great_select = nursing_great}>
                                        <option value='no'>no</option>
                                        <option value='yes'>yes</option>
                                    </select>
                                    <textarea ref='nursing_great_description' rows="1" className="form-control mt-1"  placeholder="Add an optional note..."/>
                                </div>
                                <div className="form-group">
                                    <h6>Is there a changing table or place to change a diaper in the restroom?</h6>
                                    <select className='form-control' ref={changing_table => this.changing_table_select = changing_table}>
                                        <option value='no'>no</option>
                                        <option value='yes'>yes</option>
                                    </select>
                                    <textarea ref='changing_table_description' rows="1" className="form-control mt-1"  placeholder="Add an optional note..."/>
                                </div>
                                <div className="form-group">
                                    <h6>Do they have a kids menu?</h6>
                                    <select className='form-control' ref={kids_menu => this.kids_menu_select = kids_menu}>
                                        <option value='no'>no</option>
                                        <option value='yes'>yes</option>
                                    </select>
                                    <textarea ref='kids_menu_description' rows="1" className="form-control mt-1"  placeholder="Add an optional note..."/>
                                </div>
                                <div className="form-group">
                                    <h6>Do kids eat free?</h6>
                                    <select className='form-control' ref={kids_eat_free => this.kids_eat_free_select = kids_eat_free}>
                                        <option value='no'>no</option>
                                        <option value='yes'>yes</option>
                                    </select>
                                    <textarea ref='kids_eat_free_description' rows="1" className="form-control mt-1"  placeholder="Add an optional note..."/>
                                </div>
                                <div className="form-group">
                                    <h6>Do they have highchairs?</h6>
                                    <select className='form-control' ref={highchair => this.highchair_select = highchair}>
                                        <option value='no'>no</option>
                                        <option value='yes'>yes</option>
                                    </select>
                                    <textarea ref='highchair_description' rows="1" className="form-control mt-1"  placeholder="Add an optional note..."/>
                                </div>
                                <div className="form-group">
                                    <h6>Is this place stroller friendly?</h6>
                                    <select className='form-control' ref={stroller_at_table => this.stroller_at_table_select = stroller_at_table}>
                                        <option value='no'>no</option>
                                        <option value='yes'>yes</option>
                                    </select>
                                    <textarea ref='stroller_at_table_description' rows="1" className="form-control mt-1"  placeholder="Add an optional note..."/>
                                </div>
                                <div className="form-group">
                                    <h6>Is there plenty of parking available?</h6>
                                    <select className='form-control' ref={parking => this.parking_select = parking}>
                                        <option value='no'>no</option>
                                        <option value='yes'>yes</option>
                                    </select>
                                    <textarea ref='parking_description' rows="1" className="form-control mt-1"  placeholder="Add an optional note..."/>
                                </div>
                                <div className="form-group">
                                    <h6>Is there a drive-thru?</h6>
                                    <select className='form-control' ref={drive_thru => this.drive_thru_select = drive_thru}>
                                        <option value='no'>no</option>
                                        <option value='yes'>yes</option>
                                    </select>
                                    <textarea ref='drive_thru_description' rows="1" className="form-control mt-1"  placeholder="Add an optional note..."/>
                                </div>
                                <div className="form-group">
                                    <h6>Is there at least one restroom?</h6>
                                    <select className='form-control' ref={restroom => this.restroom_select = restroom}>
                                        <option value='no'>no</option>
                                        <option value='yes'>yes</option>
                                    </select>
                                    <textarea ref='restroom_description' rows="1" className="form-control mt-1"  placeholder="Add an optional note..."/>
                                </div>
                                <div className="form-group">
                                    <h6>Is there a private lactation room?</h6>
                                    <select className='form-control' ref={mothers_room => this.mothers_room_select = mothers_room}>
                                        <option value='no'>no</option>
                                        <option value='yes'>yes</option>
                                    </select>
                                    <textarea ref='mothers_room_description' rows="1" className="form-control mt-1"  placeholder="Add an optional note..."/>
                                </div>
                                <div className="form-group">
                                    <h6>Is there child care offered here at any time?</h6>
                                    <select className='form-control' ref={child_care => this.child_care_select = child_care}>
                                        <option value='no'>no</option>
                                        <option value='yes'>yes</option>
                                    </select>
                                    <textarea ref='child_care_description' rows="1" className="form-control mt-1"  placeholder="Add an optional note..."/>
                                </div>
                                <div className="form-group">
                                    <h6>Is this place off limits to children?</h6>
                                    <select className='form-control' ref={adults_only => this.adults_only_select = adults_only}>
                                        <option value='no'>no</option>
                                        <option value='yes'>yes</option>
                                    </select>
                                    <textarea ref='adults_only_description' rows="1" className="form-control mt-1"  placeholder="Add an optional note..."/>
                                </div>
                                <div className="form-group">
                                    <h6>Is it good for date night without the kids?</h6>
                                    <select className='form-control' ref={fun_for_grownups => this.fun_for_grownups_select = fun_for_grownups}>
                                        <option value='no'>no</option>
                                        <option value='yes'>yes</option>
                                    </select>
                                    <textarea ref='fun_for_grownups_description' rows="1" className="form-control mt-1"  placeholder="Add an optional note..."/>
                                </div>
                                <div className="form-group">
                                    <h6>Is there a good place for children to play?</h6>
                                    <select className='form-control' ref={play_great => this.play_great_select = play_great}>
                                        <option value='no'>no</option>
                                        <option value='yes'>yes</option>
                                    </select>
                                    <textarea ref='play_great_description' rows="1" className="form-control mt-1"  placeholder="Add an optional note..."/>
                                </div>
                                <div className="form-group">
                                    <h6>Is this an indoor place for children to play?</h6>
                                    <select className='form-control' ref={indoor_play => this.indoor_play_select = indoor_play}>
                                        <option value='no'>no</option>
                                        <option value='yes'>yes</option>
                                    </select>
                                    <textarea ref='indoor_play_description' rows="1" className="form-control mt-1"  placeholder="Add an optional note..."/>
                                </div>
                                <div className="form-group">
                                    <h6>Is there a splash pad, pool, or beach here?</h6>
                                    <select className='form-control' ref={water_play => this.water_play_select = water_play}>
                                        <option value='no'>no</option>
                                        <option value='yes'>yes</option>
                                    </select>
                                    <textarea ref='water_play_description' rows="1" className="form-control mt-1"  placeholder="Add an optional note..."/>
                                </div>
                            </fieldset>
                        </div>
                        <Tab>Photos</Tab>
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
                                           <li>
                                                <img className='img-fluid' src={ image.image } key={ image.id } alt="" />
                                                <input type='hidden' ref='images' value={ image.image } />
                                           </li>
                                       )).reverse() }
                                </ul>
                            </div> 

                            <div className='featured-photo store__images'>

                            </div>

                        </section>
                    </TabPanel>
                    <TabPanel>
                        <div className='row NewPlace_location'>
                            <div className='col-6'>
                                <div className="form-group">
                                    <label>Street Location</label>
                                    <input ref='location' type="text" className="form-control"  placeholder="Enter location of your store"/>
                                </div>
                                <div className="form-group">
                                    <label>Store City</label>
                                    <input onChange={this.handleGetCities.bind(this)} ref='city' type="text" className="form-control"  placeholder="Enter Store City name"/>
                                    {renderList()}
                                </div>
                                <div className="form-group">
                                    <label>Zip Code</label>
                                    <input ref='zipcode' type="text" className="form-control" placeholder="12345"/>
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

export default connect(({auth})=>{
  return {
    auth
  }
})(AddPlace);
