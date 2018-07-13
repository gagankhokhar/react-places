import React, {Component} from 'react'
import {connect} from 'react-redux'
import moment from 'moment'
import {styles} from 'MapStyle'
import {show} from 'actions'
import {commentShow} from 'actions'
import * as API from 'API'
import * as actions from 'actions'
import CommentBox from '../reviews/CommentBox'
import placeholder from '../img/placeholder.png'
import {Link} from 'react-router'
import AllImages from 'AllImages'

class ShowPlace extends Component {
  constructor (props) {
    super(props);
    this.state = {
      name: '',
      location: '',
      images: '',
      featuredimages: '',
      zipcode: '',
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
      category: '',
      email: '',
      nursing_great: '',
      nursing_great_description: '',
      changing_table: '',
      changing_table_description: '',
      kids_menu: '',
      kids_menu_description: '',
      kids_eat_free: '',
      kids_eat_free_description: '',
      highchair: '',
      highchair_description: '',
      stroller_at_table: '',
      stroller_at_table_description: '',
      parking: '',
      parking_description: '',
      drive_thru: '',
      drive_thru_description: '',
      restroom: '',
      restroom_description: '',
      mothers_room: '',
      mothers_room_description: '',
      child_care: '',
      child_care_description: '',
      adults_only: '',
      adults_only_description: '',
      fun_for_grownups: '',
      fun_for_grownups_description: '',
      play_great: '',
      play_great_description: '',
      indoor_play: '',
      indoor_play_description: '',
      water_play: '',
      water_play_description: '',
      week_day_1: '',
      week_day_1_opening: '',
      week_day_1_closing: '',
      week_day_2: '',
      week_day_2_opening: '',
      week_day_2_closing: '',
      week_day_3: '',
      week_day_3_opening: '',
      week_day_3_closing: '',
      week_day_4: '',
      week_day_4_opening: '',
      week_day_4_closing: '',
      week_day_5: '',
      week_day_5_opening: '',
      week_day_5_closing: '',
      week_day_6: '',
      week_day_6_opening: '',
      week_day_6_closing: '',
      week_day_7: '',
      week_day_7_opening: '',
      week_day_7_closing: ''
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
      }) || this.props.dispatch(show(id)).then((res) => {
        //console.log(res.val());
        return res.val() || {};
      });
      resolve(current)
    });
    
    promise.then((res) => {
        let imagesAll = res.images;
        let showAllmagesLink = false;
        if(imagesAll && imagesAll.length  >3) {
            imagesAll = imagesAll.splice(0,3);
            showAllmagesLink = true;
        }
    this.setState({
      name: res.name,
      images: imagesAll,
      // images: res.images,
      featuredimages: res.featuredimages,
      location: res.location,
      zipcode: res.zipcode,
      description: res.description,
      parentnotes: res.parentnotes,
      features: res.features,
      faw: res.faw,
      pricing: res.pricing,
      id: res.id,
      placeEmail: res.placeEmail,
      phone: res.phone,
      website: res.website,
      city: res.city,
      category: res.category,
      email: res.email,
      createdAt: res.createdAt,
      latLng: res.latLng,
      nursing_great: res.nursing_great,
      nursing_great_description: res.nursing_great_description,
      changing_table: res.changing_table,
      changing_table_description: res.changing_table_description,
      kids_menu: res.kids_menu,
      kids_menu_description: res.kids_menu_description,
      kids_eat_free: res.kids_eat_free,
      kids_eat_free_description: res.kids_eat_free_description,
      highchair: res.highchair,
      highchair_description: res.highchair_description,
      stroller_at_table: res.stroller_at_table,
      stroller_at_table_description: res.stroller_at_table_description,
      parking: res.parking,
      parking_description: res.parking_description,
      drive_thru: res.drive_thru,
      drive_thru_description: res.drive_thru_description,
      restroom: res.restroom,
      restroom_description: res.restroom_description,
      mothers_room: res.mothers_room,
      mothers_room_description: res.mothers_room_description,
      child_care: res.child_care,
      child_care_description: res.child_care_description,
      adults_only: res.adults_only,
      adults_only_description: res.adults_only_description,
      fun_for_grownups: res.fun_for_grownups,
      fun_for_grownups_description: res.fun_for_grownups_description,
      play_great: res.play_great,
      play_great_description: res.play_great_description,
      indoor_play: res.indoor_play,
      indoor_play_description: res.indoor_play_description,
      water_play: res.water_play,
      water_play_description: res.water_play_description,
      week_day_1: res.week_day_1,
      week_day_1_opening: res.week_day_1_opening,
      week_day_1_closing: res.week_day_1_closing,
      week_day_2: res.week_day_2,
      week_day_2_opening: res.week_day_2_opening,
      week_day_2_closing: res.week_day_2_closing,
      week_day_3: res.week_day_3,
      week_day_3_opening: res.week_day_3_opening,
      week_day_3_closing: res.week_day_3_closing,
      week_day_4: res.week_day_4,
      week_day_4_opening: res.week_day_4_opening,
      week_day_4_closing: res.week_day_4_closing,
      week_day_5: res.week_day_5,
      week_day_5_opening: res.week_day_5_opening,
      week_day_5_closing: res.week_day_5_closing,
      week_day_6: res.week_day_6,
      week_day_6_opening: res.week_day_6_opening,
      week_day_6_closing: res.week_day_6_closing,
      week_day_7: res.week_day_7,
      week_day_7_opening: res.week_day_7_opening,
      week_day_7_closing: res.week_day_7_closing,
    }, this.setMap(res.latLng),
    );
    })
  }

  setMap (latLng) {
    const map = new google.maps.Map(this.refs.map, {
      zoom: 15,
      center: latLng,
      styles: styles
    });

    const marker = new google.maps.Marker({
      position: latLng,
      map: map
    });
  }

  render () {


    const {
      name, 
      images, 
      featuredimages, 
      location, 
      zipcode,
      description, 
      parentnotes, 
      features, 
      faq, 
      pricing, 
      placeEmail, 
      website, 
      phone, 
      city, 
      category, 
      email, 
      createdAt,
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
      week_day_1_opening,
      week_day_1_closing,
      week_day_2,
      week_day_2_opening,
      week_day_2_closing,
      week_day_3,
      week_day_3_opening,
      week_day_3_closing,
      week_day_4,
      week_day_4_opening,
      week_day_4_closing,
      week_day_5,
      week_day_5_opening,
      week_day_5_closing,
      week_day_6,
      week_day_6_opening,
      week_day_6_closing,
      week_day_7,
      week_day_7_opening,
      week_day_7_closing
    } = this.state;
    const date = moment.unix(createdAt).format('MMMM Do, YYYY @ k:mm ');
    const {cityImg} = this.props;
    const imgSrc = cityImg || placeholder;
    const userEmail = email || 'Anonimus';
    const show_description = this.state.description == '' ? false : true;
    const show_parentnotes = this.state.parentnotes == '' ? false : true;
    const show_placeEmail = this.state.placeEmail == '' ? false : true;
    const show_website = this.state.website == '' ? false : true;
    const show_phone = this.state.phone == '' ? false : true;
    const show_nursing = this.state.nursing_great == 'yes' ? true : false;
    const show_changing_table = this.state.changing_table == 'yes' ? true : false;
    const show_kids_menu = this.state.kids_menu == 'yes' ? true : false;
    const show_kids_food = this.state.kids_eat_free == 'yes' ? true : false;
    const show_highchair = this.state.highchair == 'yes' ? true : false;
    const show_stroller_at_table = this.state.stroller_at_table == 'yes' ? true : false;
    const show_parking = this.state.parking == 'yes' ? true : false;
    const show_drive_thru = this.state.drive_thru == 'yes' ? true : false;
    const show_restroom = this.state.restroom == 'yes' ? true : false;
    const show_mothers_room = this.state.mothers_room == 'yes' ? true : false;
    const show_child_care = this.state.child_care == 'yes' ? true : false;
    const show_adults_only = this.state.adults_only == 'yes' ? true : false;
    const show_fun_for_grownups = this.state.fun_for_grownups == 'yes' ? true : false;
    const show_play_great = this.state.play_great == 'yes' ? true : false;
    const show_indoor_play = this.state.indoor_play == 'yes' ? true : false;
    const show_water_play = this.state.water_play == 'yes' ? true : false;


    const show_week_day_1_full = this.state.week_day_1 == '1' ? true : false;
    const show_week_day_1_time = this.state.week_day_1 == '2' ? true : false;
    const show_week_day_1_closed = this.state.week_day_1 == '3' ? true : false;
    const show_week_day_2_full = this.state.week_day_2 == '1' ? true : false;
    const show_week_day_2_time = this.state.week_day_2 == '2' ? true : false;
    const show_week_day_2_closed = this.state.week_day_2 == '3' ? true : false;
    const show_week_day_3_full = this.state.week_day_3 == '1' ? true : false;
    const show_week_day_3_time = this.state.week_day_3 == '2' ? true : false;
    const show_week_day_3_closed = this.state.week_day_3 == '3' ? true : false;
    const show_week_day_4_full = this.state.week_day_4 == '1' ? true : false;
    const show_week_day_4_time = this.state.week_day_4 == '2' ? true : false;
    const show_week_day_4_closed = this.state.week_day_4 == '3' ? true : false;
    const show_week_day_5_full = this.state.week_day_5 == '1' ? true : false;
    const show_week_day_5_time = this.state.week_day_5 == '2' ? true : false;
    const show_week_day_5_closed = this.state.week_day_5 == '3' ? true : false;
    const show_week_day_6_full = this.state.week_day_6 == '1' ? true : false;
    const show_week_day_6_time = this.state.week_day_6 == '2' ? true : false;
    const show_week_day_6_closed = this.state.week_day_6 == '3' ? true : false;
    const show_week_day_7_full = this.state.week_day_7 == '1' ? true : false;
    const show_week_day_7_time = this.state.week_day_7 == '2' ? true : false;
    const show_week_day_7_closed = this.state.week_day_7 == '3' ? true : false;
    

    const {id} = this.props.params;
    const {website2} = this.state.website;

    return (
      <div className='place'>
        <div className='row'>
            <div className="place__info col-8">

                <div className="place__title">
                    <h4>{name}</h4>
                    <div className='meta'>{city}, {location}, {zipcode}</div>
                    <div><span className='colored-gray'>Category</span>:<span className='btn btn-link'>{category}</span></div>
                </div>
                <div className="place__description mt-3">
                    { show_description  ? (
                      <p><span className='colored-gray'>Description:</span> {description}</p>
                    ) : ('')
                    }

                    { show_parentnotes  ? (
                      <p><span className='colored-gray'>Information for Parents:</span> {parentnotes}</p>
                    ) : ('')
                    }
                </div>

                <div className='place__images'>                    
                    <ul className='p-0'>
                    {
                        images ? (
                            images.map(function(item) {
                                return <li><img className='img-fluid' src={item.image}/></li>;
                            })    
                        ) : ''
                    }
                    <Link className='more' to={`place/${id}/images`}>See all photos</Link>
                    </ul>
                    
                </div>

                <div className='row'>

                    <div className='place__guide__item col-12'>
                        <div className='colored-gray'>Features</div>
                        <p>{features}</p>
                    </div>
                    <div className='place__guide__item col-12'>
                        <div className='colored-gray'>FAQ</div>
                        <p>{faq}</p>
                    </div>
                    <div className='place__guide__item col-12'>
                        <div className='colored-gray'>Pricing</div>
                        <p>{pricing}</p>
                    </div>
                    <ul className='place__guide col-6'>
                        { show_nursing  ? (
                        <li className='place__guide__item'>
                            <i className="fa fa-check"></i>
                            <div>
                                <h5>Good for Nursing</h5>
                                <p>{nursing_great_description}</p>
                            </div>
                        </li>
                        ) : ('')
                        }

                        { show_changing_table  ? (
                        <li className='place__guide__item'>
                            <i className="fa fa-check"></i>
                            <div>
                                <h5>Changing Tables</h5>
                                <p>{changing_table_description}</p>
                            </div>
                        </li>
                        ) : ('')
                        }

                        { show_kids_menu  ? (
                        <li className='place__guide__item'>
                            <i className="fa fa-check"></i>
                            <div>
                                <h5>Kids menu</h5>
                                <p>{kids_menu_description}</p>
                            </div>
                        </li>
                        ) : ('')
                        }

                        { show_kids_food  ? (
                        <li className='place__guide__item'>
                            <i className="fa fa-check"></i>
                            <div>
                                <h5>Free Food</h5>
                                <p>{kids_eat_free_description}</p>
                            </div>
                        </li>
                        ) : ('')
                        }

                        { show_highchair  ? (
                        <li className='place__guide__item'>
                            <i className="fa fa-check"></i>
                            <div>
                                <h5>Highchairs</h5>
                                <p>{highchair_description}</p>
                            </div>
                        </li>
                        ) : ('')
                        }

                        { show_stroller_at_table  ? (
                        <li className='place__guide__item'>
                            <i className="fa fa-check"></i>
                            <div>
                                <h5>Stroller Friendly</h5>
                                <p>{stroller_at_table_description}</p>
                            </div>
                        </li>
                        ) : ('')
                        }

                        { show_parking  ? (
                        <li className='place__guide__item'>
                            <i className="fa fa-check"></i>
                            <div>
                                <h5>Parking</h5>
                                <p>{parking_description}</p>
                            </div>
                        </li>
                        ) : ('')
                        }

                        { show_drive_thru  ? (
                        <li className='place__guide__item'>
                            <i className="fa fa-check"></i>
                            <div>
                                <h5>Drive thru</h5>
                                <p>{drive_thru_description}</p>
                            </div>
                        </li>
                        ) : ('')
                        }
                    </ul>
                    <ul className='place__guide col-6'>   
                        { show_restroom  ? (
                        <li className='place__guide__item'>
                            <i className="fa fa-check"></i>
                            <div>
                                <h5>Restrooms</h5>
                                <p>{restroom_description}</p>
                            </div>
                        </li>
                        ) : ('')
                        }

                        { show_mothers_room  ? (
                        <li className='place__guide__item'>
                            <i className="fa fa-check"></i>
                            <div>
                                <h5>Mothers Room</h5>
                                <p>{mothers_room_description}</p>
                            </div>
                        </li>
                        ) : ('')
                        }

                        { show_child_care  ? (
                        <li className='place__guide__item'>
                            <i className="fa fa-check"></i>
                            <div>
                                <h5>Child Care</h5>
                                <p>{child_care_description}</p>
                            </div>
                        </li>
                        ) : ('')
                        }

                        { show_adults_only  ? (
                        <li className='place__guide__item'>
                            <i className="fa fa-check"></i>
                            <div>
                                <h5>Limits to children</h5>
                                <p>{adults_only_description}</p>
                            </div>
                        </li>
                        ) : ('')
                        }

                        { show_fun_for_grownups  ? (
                        <li className='place__guide__item'>
                            <i className="fa fa-check"></i>
                            <div>
                                <h5>Night dat without kids</h5>
                                <p>{fun_for_grownups_description}</p>
                            </div>
                        </li>
                        ) : ('')
                        }

                        { show_play_great  ? (
                        <li className='place__guide__item'>
                            <i className="fa fa-check"></i>
                            <div>
                                <h5>Good for play</h5>
                                <p>{play_great_description}</p>
                            </div>
                        </li>
                        ) : ('')
                        }

                        { show_indoor_play  ? (
                        <li className='place__guide__item'>
                            <i className="fa fa-check"></i>
                            <div>
                                <h5>Indoor Park</h5>
                                <p>{indoor_play_description}</p>
                            </div>
                        </li>
                        ) : ('')
                        }

                        { show_water_play  ? (
                        <li className='place__guide__item'>
                            <i className="fa fa-check"></i>
                            <div>
                                <h5>Water Park</h5>
                                <p>{water_play_description}</p>
                            </div>
                        </li>
                        ) : ('')
                        }
                    </ul>
                </div>
            </div>

            <div className='col-4 pl-4 place__sidebar sidebar pl-5'>
                <h4>Contact Information</h4>
                <div ref='map' className='place__sidebar__item map-show-place'>
                    <p>Map will be here</p>
                </div>

                <div className='place__sidebar__item'>
                    <h5 className='place__sidebar__item--title'>Address</h5>
                    <div>
                        <p>{location}</p>
                        <p>{city}</p>
                        <p>{zipcode}</p>
                    </div>
                </div>


                <div className='place__sidebar__item'>
                    <h5 className='place__sidebar__item--title'>Website</h5>
                    <p><a href={ website } target="_blank">{website}</a></p>
                </div>



                { show_phone  ? (
                <div className='place__sidebar__item'>
                    <h5 className='place__sidebar__item--title'>Phone</h5>
                    <p><a href="tel:{ phone }">{phone}</a></p>
                </div>
                ) : ('')
                }

                { show_placeEmail  ? (
                <div className='place__sidebar__item'>
                    <h5 className='place__sidebar__item--title'>Email</h5>
                    <p><a href={ placeEmail }>{placeEmail}</a></p>
                </div>
                ) : ('')
                }


                <div className='place__sidebar__item'>
                    <h5 className='place__sidebar__item--title'>Timing</h5>
                    <table className="table">
                        <thead>
                            <tr>
                                <td></td>
                                <td>Opening time</td>
                                <td>Closing time</td>
                            </tr>
                        </thead>
                        <tbody>
                            { show_week_day_1_time  ? (
                            <tr>
                                <td>Mon: </td>
                                <td><span className='time-inner'><span>{week_day_1_opening}</span></span></td>
                                <td><span className='time-inner'><span>{week_day_1_closing}</span></span></td>
                            </tr>
                            ) : null
                            }
                            { show_week_day_1_full  ? (
                                <tr>
                                    <td>Mon: </td>
                                    <td>Full day</td>
                                    <td></td>
                                </tr>
                            ) : null
                            }
                            { show_week_day_1_closed  ? (
                            <tr>
                                <td>Mon: </td>
                                <td>Closed</td>
                                <td></td>
                            </tr>
                            ) : null
                            }

                            { show_week_day_2_time  ? (
                            <tr>
                                <td>Tue: </td>
                                <td><span className='time-inner'><span>{week_day_2_opening}</span></span></td>
                                <td><span className='time-inner'><span>{week_day_2_closing}</span></span></td>
                            </tr>
                            ) : null
                            }
                            { show_week_day_2_full  ? (
                                <tr>
                                    <td>Tue: </td>
                                    <td>Full day</td>
                                    <td></td>
                                </tr>
                            ) : null
                            }
                            { show_week_day_2_closed  ? (
                            <tr>
                                <td>Tue: </td>
                                <td>Closed</td>
                                <td></td>
                            </tr>
                            ) : null
                            }

                            { show_week_day_3_time  ? (
                            <tr>
                                <td>wed: </td>
                                <td><span className='time-inner'><span>{week_day_3_opening}</span></span></td>
                                <td><span className='time-inner'><span>{week_day_3_closing}</span></span></td>
                            </tr>
                            ) : null
                            }
                            { show_week_day_3_full  ? (
                                <tr>
                                    <td>wed: </td>
                                    <td>Full day</td>
                                    <td></td>
                                </tr>
                            ) : null
                            }
                            { show_week_day_3_closed  ? (
                            <tr>
                                <td>wed: </td>
                                <td>Closed</td>
                                <td></td>
                            </tr>
                            ) : null
                            }

                            { show_week_day_4_time  ? (
                            <tr>
                                <td>Thurs: </td>
                                <td><span className='time-inner'><span>{week_day_4_opening}</span></span></td>
                                <td><span className='time-inner'><span>{week_day_4_closing}</span></span></td>
                            </tr>
                            ) : null
                            }
                            { show_week_day_4_full  ? (
                                <tr>
                                    <td>Thurs: </td>
                                    <td>Full day</td>
                                    <td></td>
                                </tr>
                            ) : null
                            }
                            { show_week_day_4_closed  ? (
                            <tr>
                                <td>Thurs: </td>
                                <td>Closed</td>
                                <td></td>
                            </tr>
                            ) : null
                            }

                            { show_week_day_5_time  ? (
                            <tr>
                                <td>Fri: </td>
                                <td><span className='time-inner'><span>{week_day_5_opening}</span></span></td>
                                <td><span className='time-inner'><span>{week_day_5_closing}</span></span></td>
                            </tr>
                            ) : null
                            }
                            { show_week_day_5_full  ? (
                                <tr>
                                    <td>Fri: </td>
                                    <td>Full day</td>
                                    <td></td>
                                </tr>
                            ) : null
                            }
                            { show_week_day_5_closed  ? (
                            <tr>
                                <td>Fri: </td>
                                <td>Closed</td>
                                <td></td>
                            </tr>
                            ) : null
                            }

                            { show_week_day_6_time  ? (
                            <tr>
                                <td>Sat: </td>
                                <td><span className='time-inner'><span>{week_day_6_opening}</span></span></td>
                                <td><span className='time-inner'><span>{week_day_6_closing}</span></span></td>
                            </tr>
                            ) : null
                            }
                            { show_week_day_6_full  ? (
                                <tr>
                                    <td>Sat: </td>
                                    <td>Full day</td>
                                    <td></td>
                                </tr>
                            ) : null
                            }
                            { show_week_day_6_closed  ? (
                            <tr>
                                <td>Sat: </td>
                                <td>Closed</td>
                                <td></td>
                            </tr>
                            ) : null
                            }

                            { show_week_day_7_time  ? (
                            <tr>
                                <td>Sun: </td>
                                <td><span className='time-inner'><span>{week_day_7_opening}</span></span></td>
                                <td><span className='time-inner'><span>{week_day_7_closing}</span></span></td>
                            </tr>
                            ) : null
                            }
                            { show_week_day_7_full  ? (
                                <tr>
                                    <td>Sun: </td>
                                    <td>Full day</td>
                                    <td></td>
                                </tr>
                            ) : null
                            }
                            { show_week_day_7_closed  ? (
                            <tr>
                                <td>Sun: </td>
                                <td>Closed</td>
                                <td></td>
                            </tr>
                            ) : null
                            }

                        </tbody>
                    </table>
                </div>


            </div>
        </div>

        <hr/>

        <div className='place__reviews row mt-5'>
            <div className='col-8'>
                <form className="post" method="post">
                    <div className='form-group'>
                        <textarea className="form-control" name="comment" placeholder="Ask a question or share a tip about this place..."></textarea>
                        <button className="btn btn-submit btn-sm mt-2 pl-5 pr-5 text-uppercase">Post</button>
                    </div>
                </form>

                <div className='review'>
                    <div className="story">
                        <img className='avatar' src={imgSrc}/>
                        <div className="meta">
                            <a className="name" href="#"><span>Lynn</span></a>
                            <a className="timestamp" href="#" title="Nov 17 2017 at 5:40 PM"><span>Nov 17, 2017</span></a>
                        </div>
                        <p className="rating mb-2">
                            ★★★★
                        </p>
                        <p className="review--description mb-3">Plenty of parking.  A bunch of park benches if you need to feed or change baby. Strollers and babies everywhere on a nice clear sunny day.  Nice paved trails and sidewalks so you can wander for hours with baby asleep  in a carrier or stroller.  So many trees where you can find shade for the baby or chill out on a blanket.  Do try to avoid the areas where the homeless hangout.</p>
                        <ul className="review--actions">
                            <li>
                                <a className="login" href="#"><span className="fa fa-heart"></span>1 Like</a>
                            </li>
                            <li>
                                <a className="login" href="#"><span className="fa fa-comment"></span>Reply</a>
                            </li>
                            <li className="save">
                                <a className="login" href="#"><span className="fa fa-bookmark"></span>Save</a>
                            </li>
                        </ul>
                    </div>
                </div>

                <p className='mt-4 text-center text-muted'>The end!</p>

            </div>
        </div>
      </div>

    )
  }
}



export default connect(({tickets}) => {
  return {
    tickets
  }
})(ShowPlace);
