import React  from 'react';
import {fakeData} from '../config/config'
import CategoryButton from '../ui-components/category-buttons';
import { Link } from 'react-router-dom'
// import './App.css';

class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {data: []};
  }


  componentDidMount() {
    fetch('https://data.cityofnewyork.us/resource/386y-9exk.json')
      .then(res => res.json())
      .then(result => {
        this.setState({
          data: result
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
    return this.renderLinks(hasFiltered)
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
      <ul>
          {
            categoryList.map(category => <li><CategoryButton onClick={this.filterByCateogry('health')} category={category} /></li>)
          }
      </ul>
    )    
  }

  renderLinks = (organizations) => {
    return (
      <ul>
        {
          organizations.map((item, index) => {
            return <li key={index}>{this.renderAnchor(item)}</li>
          })
        }
      </ul>
    )
  }

  render() {
    return (
      <div className="App">
        <h1>NYC Womens Resource Guide</h1>
        {this.filterByCateogry('childcare')}
        {this.renderCategories(fakeData)}
      </div>
    );
  }
}

export default Home;
