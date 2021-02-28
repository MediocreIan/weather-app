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
    this.setState({ lat: this.props.lat, lng: this.props.lng })

  }
  componentDidMount()
  {
    if (this.state.daily.length === 0)
    {
      fetch(`https://blooming-river-20950.herokuapp.com/sevenDay/lat=${this.state.lat}&lng=${this.state.lng}`).then((res) =>
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
      dayCells.push(<div className="seven-day-container-cell" >{new Date(this.addXDays(this.state.currentDateTime, i)).toLocaleString()} <p>{Math.floor(e.temp.day)}°</p><p>{e.weather[0].description}</p></div>
      )
    });
    return (
      <div className="seven-day-container">
        {dayCells}
      </div>
    )
  }
}

export default SevenDayWeatherDisplay