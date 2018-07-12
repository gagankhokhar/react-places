import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import * as actions from 'actions'
import {noDupe} from 'API'

import ActiveFiltersList from 'ActiveFiltersList'

class ControlsBar extends Component{

  getSearchValue (e) {
    const searchVal = this.refs.search.value;
    this.props.dispatch(actions.getSearch(searchVal))
    e.preventDefault();
  }

  handleFilter (e) {
    if(e.target && e.target.nodeName == "P"){
      const key = e.target.dataset.key;
      const property = e.target.innerHTML;
      this.props.dispatch(actions.filterBy(key, property));
    }
  }

  focusField () {
    this.refs.searchField.setAttribute('id', 'focused')
  }

  removeId () {
    this.refs.searchField.removeAttribute('id')
  }

  render () {
    const {tickets} = this.props;

    const datesNoDupe = noDupe(tickets, 'formatedDate');
    const arrWithoutDupe = datesNoDupe.map((item) => <p data-key='formatedDate' key={item}>{item}</p>);

    const citiesNoDupe = noDupe(tickets, 'city');
    const arrCitiesWithoutDupe = citiesNoDupe.map((item) => <p data-key='city' key={item}>{item}</p>);

    return (
      <nav className="navbar navbar-expand-lg">

          <ul className="navbar-nav mr-auto controls-list">
           
            <li  className="nav-item date-hover nav-filter">
              <a className="btn" href="#">City</a>
              <div onClick={this.handleFilter.bind(this)} className='date-dropdown'>
                {arrCitiesWithoutDupe}
                <p data-key='city'>All</p>
              </div>
            </li>
            <li className="nav-item date-hover nav-filter">
              <a className="btn" href="#">Category</a>
                <div onClick={this.handleFilter.bind(this)} className='date-dropdown'>
                  <p data-key='category'>Pregnancy Advice</p>
                  <p data-key='category'>Beauty and Fashion</p>
                  <p data-key='category'>Baby massage</p>
                  <p data-key='category'>Pregnancy photography</p>
                  <p data-key='category'>Mother nutritionist</p>
                  <p data-key='category'>Lactation support</p>
                  <p data-key='category'>Post natal yoga</p>
                  <p data-key='category'>Mom health</p>
                  <p data-key='category'>Physiotherpest</p>
                  <p data-key='category'>Play Schools</p>
                  <p data-key='category'>Day Care</p>
                  <p data-key='category'>Fun Places</p>
                  <p data-key='category'>Baby Nutritionist</p>
                  <p data-key='category'>Hobbies</p>
                  <p data-key='category'>Sports</p>
                  <p data-key='category'>Shopping</p>
                  <p data-key='category'>Early learning</p>
                  <p data-key='category'>Gifts for children</p>
                  <p data-key='category'>Birthdays</p>
                  <p data-key='category'>Vaccination</p>
                  <p data-key='category'>Baby massage</p>
                  <p data-key='category'>Toys</p>
                </div>
            </li>
          </ul>

          <div ref='searchField' className='search-field'>
            <input onBlur={this.removeId.bind(this)} onFocus={this.focusField.bind(this)} onChange={this.getSearchValue.bind(this)} ref='search' className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search"/>
            <ActiveFiltersList/>
          </div>

      </nav>
    )
  }
}

export default connect(({tickets}) => {
  return {
    tickets
  }
})(ControlsBar)
