import React from 'react'
import PropTypes from 'prop-types'
import HeroWeatherDisplay from '../HeroWeatherDisplay/HeroWeatherDisplay'
import SevenDayWeatherDisplay from '../SevenDayWeatherDisplay/SevenDayWeatherDisplay';




class WeatherDisplay extends React.Component
{
  constructor(props)
  {
    super(props)
    this.state = {
      lat: 0,
      lng: 0,
      searchString: "",
      key: 0,
      key2: 10
    }
  }

  componentDidMount()
  {
    if (this.state.lat === 0 && this.state.lng === 0)
    {
      let myVar = this
      navigator.geolocation.getCurrentPosition((position) =>
      {
        myVar.setState({ lat: position.coords.latitude, lng: position.coords.longitude, key: this.state.key + 1, key2: this.state.key2 + 10 })
      })
    }
  }
  componentDidUpdate()
  {
    if (!this.state.lat && !this.state.lng)
    {
      let myVar = this
      navigator.geolocation.getCurrentPosition((position) =>
      {
        myVar.setState({ coords: { lat: position.coords.latitude, lng: position.coords.longitude } })
      })
    }
  }

  handleSearchInput = (e) =>
  {
    this.setState({ searchString: e.target.value })
  }

  handleSubmit = (e) =>
  {
    e.preventDefault()

    fetch(`http://localhost:8000/search/q=${this.state.searchString}`).then((res) =>
    {
      return res.json()
    }).then((data) =>
    {
      if (data.cod === 200)
      {
        this.setState({ lat: data.coord.lat, lng: data.coord.lon, key: this.state.key + 1, key2: this.state.key2 + 10 })
      }
      else
      {
        console.log(data.message)
      }
    })
  }

  render()
  {
    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <input type="text" name="search" id="search-bar" onChange={this.handleSearchInput} />
          <input type="submit" name="search-submit" id="search-submit" />
        </form>
        <HeroWeatherDisplay lat={this.state.lat} lng={this.state.lng} key={this.state.key} />
        <SevenDayWeatherDisplay lat={this.state.lat} lng={this.state.lng} key={this.state.key2} />
      </>
    )
  }

}

export default WeatherDisplay