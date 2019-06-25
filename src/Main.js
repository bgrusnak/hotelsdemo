import * as React from "react";
import { Link } from 'react-router-dom';
import {
  Button,
  InputGroup,
  Card, Elevation,
  HTMLTable
} from "@blueprintjs/core";

import { sampleSize } from "lodash";

export interface IMainState {
  searchString?: string;
  oldSearchString?: string;
  results?: any[];
  hotels: any[];
}

export default class Main extends React.PureComponent<IMainState> {
  state: IMainState = {
    searchString: '',
    oldSearchString: '',
    hotels: []
  };
  constructor(props) {
    super(props);
    this.handleSearchClick = this.handleSearchClick.bind(this);
    this.searchInput = React.createRef();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const prevHotels = JSON.stringify(prevState.hotels)
    const newHotels = JSON.stringify(nextProps.hotels)
    const next = {}
    if (prevHotels !== newHotels) {
      next.hotels = nextProps.hotels
    }
    if (nextProps.searchString !== prevState.oldSearchString) {
      next.oldSearchString = nextProps.searchString
      next.searchString = nextProps.searchString
    }
    if (next !== {}) return next;
    return null;
  }

  searchHotels(query, hotels) {
    return hotels.reduce((acc, hotel) => {
      if (hotel.city.toLowerCase() !== query.toLowerCase() && hotel.name.toLowerCase() !== query.toLowerCase()) {
        return acc;
      }
      return [...acc, hotel]
    }, [])
  }

  render() {
    const { searchString, hotels } = this.state;
    const results = searchString === ''
      ? sampleSize(hotels, 5)
      : this.searchHotels(searchString, hotels)
    const rows = results.map(result =>
      <tr key={result.id}>
        <td><img src={`${result.id}/${result.images[0]}`} width="100" height="100" /></td>
        <td>{Array(result.stars).fill('\u2606')}</td>
        <td><Link to={`/hotel/${result.id}?${searchString}`}>{result.name}</Link></td>
        <td><Link to={`/?${result.city}`}>{result.city}</Link></td>
      </tr>
    )
    const title = searchString === ''
      ? <h1>Featured hotels</h1>
      : <h1>Found hotels for {searchString}</h1>;
    return (
      <>
        <Card interactive={true} elevation={Elevation.TWO}>
          <h3>Search hotel / city</h3>
          <InputGroup inputRef={this.searchInput} className="bp3-input" defaultValue={searchString} placeholder="" />
          <Button icon="search" onClick={this.handleSearchClick} >Search</Button>
        </Card>
        {title}
        <HTMLTable style={{ width: '100%' }}>
          <thead>
            <tr>
              <th> </th>
              <th>Stars</th>
              <th>Name</th>
              <th>City</th>
            </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </HTMLTable>
      </>
    );
  }


  handleSearchClick = () => this.setState({ searchString: this.searchInput.current.value });

}