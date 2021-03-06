import React, {Component} from 'react'
import {connect} from 'react-redux'
import * as API from 'API'
import {startGetPlaces} from 'actions'
import Preloader from 'Preloader'
import Place from 'Place'
import Sort from 'Sort'

class PlaceList extends Component {
  constructor(props){
    super(props);
    this.state ={
      limit: 5,
    }
  }
  handleLimit () {
    //create action and reducer with the same name
    this.setState({
      limit: this.state.limit + 5
    })
  }


  render () {
    const {tickets, search, filterBy, loader, sort} = this.props;
    const filteredList = API.composeFilter(tickets, search, filterBy.city, filterBy.category, filterBy.formatedDate, sort);
    let arr = [];
     const {limit} = this.state;
     filteredList.forEach((ticket, index) => {
      if(index < limit){
        arr.push(ticket)
      }
    });

    const showButton = () => {
      if (filteredList.length !== arr.length) {
        return <button onClick={this.handleLimit.bind(this)} className='btn btn-default'>Load more</button>
      }
    };

    const renderList = arr.map(item => <Place key={item.id} {...item}/>)
    return (
      <div className='offset-1 col-10'>
        <Sort/>
        {renderList}
        {showButton()}
      </div>
    )
  }
}


export default connect(({tickets, search, filterBy, loader, sort}) => {
  return {
    tickets,
    search,
    filterBy,
    loader,
    sort
  }
})(PlaceList);
