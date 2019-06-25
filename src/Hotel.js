import * as React from "react";
import { Link } from 'react-router-dom';
import ImageGallery from 'react-image-gallery';
import {
  Card, Elevation, Button, Classes, Dialog
} from "@blueprintjs/core";
import { DateRange, DateRangePicker, DateTimePicker } from "@blueprintjs/datetime";


export interface IHoteltate {
  hotel: object;
  dateRange?: DateRange;
  searchString?: string;
  isDialogVisible?: Boolean;
}

export default class Hotel extends React.PureComponent<IHoteltate> {
  state: IHoteltate = {
    hotel: {},
    searchString: '',
    isDialogVisible: false
  };
  constructor(props) {
    super(props);
    this.handleReserve = this.handleReserve.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const prevHotel = JSON.stringify(prevState.hotel)
    const newHotel = JSON.stringify(nextProps.hotel)
    const next = {}
    if (prevHotel !== newHotel) {
      next.hotel = nextProps.hotel
    }
    if (nextProps.searchString !== prevState.searchString) {
      next.searchString = nextProps.searchString
    }
    if (next !== {}) return next;
    return null;
  }


  render() {
    const { isDialogVisible, searchString, hotel } = this.state;
    return (
      <>
        <Dialog
          icon="info-sign"
          onClose={this.handleClose}
          title="Hotel room reservation"
          isOpen={isDialogVisible}
        >
          <div className={Classes.DIALOG_BODY}>
            <p>Room is reserved</p>
          </div>
        </Dialog>
        <Card interactive={true} elevation={Elevation.TWO}>
          <h1>{hotel.name} {Array(hotel.stars).fill('\u2606')}</h1>
          <h2>{hotel.city}</h2>
          <p>{hotel.description}</p>
          <DateRangePicker
            value={this.state.dateRange}
            onChange={this.handleDateChange}
          />
          <Button onClick={this.handleReserve}>Make reservation</Button>
          <Link to={`/?${searchString}`}>Back</Link>
          <ImageGallery items={hotel.images.map(image => ({
            original: `/${hotel.id}/${image}`,
            thumbnail: `/${hotel.id}/${image}`
          }))} />

        </Card>
      </>
    );
  }

  handleDateChange = (dateRange: DateRange) => this.setState({ dateRange });
  handleReserve = () => this.setState({ isDialogVisible: true });
  handleClose = () => this.setState({ isDialogVisible: false });
}