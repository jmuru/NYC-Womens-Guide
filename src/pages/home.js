import React  from 'react';
import {fakeData} from '../config/config'
import CategoryButton from '../ui-components/category-buttons';
import { Link } from 'react-router-dom'
// import './App.css';

class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      filteredData: []
    };
  }

  componentDidMount() {
    fetch('https://data.cityofnewyork.us/resource/386y-9exk.json')
      .then(res => res.json())
      .then(result => {
        // replace with NYC open data
        this.setState({
          data: fakeData
        });
      });
  }

  renderAnchor = (item) => {
    const linkProps = {
      pathname: `/organization/${item.organizationname}`,
      state: item
    }
    return (
      <Link onClick={() => console.log(item)} to={linkProps}>{item.organizationname}</Link>
    )
  }

  // on click method
  filterByCateogry = (category) => {
    // replace with actual data later
    const filteredLocations = fakeData.filter(organization => organization[category]);
    const hasFiltered = filteredLocations === [] ? fakeData : filteredLocations
    this.setState({
      filteredData: hasFiltered
    });
  }   

  renderCategories = (data) => {
    const categorySet = new Set();
    // gather categories
    data.map(item => {
        Object.keys(item).map(category => {
        categorySet.add(category);
      })
    });

    // map over set and list categories
    const categoryList = Array.from(categorySet);
    return(
      [
      <h3>Organization Categories</h3>,
      <ul>
          {
            categoryList.map(category => <li key={category} onClick={() => this.filterByCateogry(category)}><CategoryButton category={category} /></li>)
          }
      </ul>
      ]
    )    
  }

  renderLinks = () => {
    const locationList = this.state.filteredData === [] || this.state.filteredData === undefined ? this.state.data : this.state.filteredData;
    return (
      [
      <h3>Organizations</h3>, 
      <ul>
        {
          locationList.map((item, index) => {
            return <li key={index}>{this.renderAnchor(item)}</li>
          })
        }
      </ul>
      ]
    )
  }

  render() {
    return (
      <div className="App">
        <h1>NYC Womens Resource Guide</h1>
        {this.state.data ? this.renderCategories(this.state.data) : <div>No Categories Found</div>}
        {this.state.data ? this.renderLinks() : <div>No locations available</div>}
      </div>
    );
  }
}

export default Home;
