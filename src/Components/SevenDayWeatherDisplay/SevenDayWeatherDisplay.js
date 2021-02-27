import React from 'react'
import PropTypes from 'prop-types'
import './SevenDayWeatherDisplay.css'

class SevenDayWeatherDisplay extends React.Component
{
  constructor(props)
  {
    super(props)
    this.state = {
      lat: this.props.lat,
      lng: this.props.lng,
      currentDateTime: new Date().getTime(),
      daily: []

    }
  }

  componentWillMount()
  {
    // let myVar = this
    // navigator.geolocation.getCurrentPosition((position) =>
    // {
    //   myVar.setState({ lat: position.coords.latitude, lng: position.coords.longitude })
    // })
    this.setState({ lat: this.props.lat, lng: this.props.lng })
    console.log("STATE SET WITH PROPS")

  }
  componentDidMount()
  {
    if (this.state.daily.length === 0)
      console.log(this.state.lat)
    {
      fetch(`http://localhost:8000/sevenDay/lat=${this.state.lat}&lng=${this.state.lng}`).then((res) =>
      {
        return res.json()
      }).then((data) =>
      {
        if (data.daily)
        {
          this.setState({ daily: data.daily })
        }
        else
        {
          console.log(data.message)
        }
      })
    }
  }

  addXDays = (date, daysToAdd) =>
  {
    return date + (daysToAdd * 86400000)
  }

  render()
  {
    let dayCells = []


    this.state.daily.forEach((e, i) =>
    {
      dayCells.push(<div className="seven-day-container-cell">{new Date(this.addXDays(this.state.currentDateTime, i)).toLocaleString()} <p>{e.temp.day}</p></div>
      )
    });
    console.log(this.state)
    return (
      <div className="seven-day-container">
        {dayCells}
      </div>
    )
  }
}

export default SevenDayWeatherDisplay