import React from 'react'
import PropTypes from 'prop-types'
import './HeroWeatherDisplay.css'

class HeroWeatherDisplay extends React.Component
{
  constructor(props)
  {
    super(props)
    this.state = {
      lat: this.props.lat,
      lng: this.props.lng,
      currentDateTime: Date().toLocaleString(),
      temp: 0,
      feels_like: 0,
      cityName: "",
      description: "",

    }

  }
  componentDidMount()
  {
    // if (!this.state.lat && !this.state.lng)
    // {
    //   let myVar = this
    //   navigator.geolocation.getCurrentPosition((position) =>
    //   {
    //     myVar.setState({ lat: position.coords.latitude, lng: position.coords.longitude })
    //   })
    // }
    this.setState({ lat: this.props.lat, lng: this.props.lng })
  }

  componentDidUpdate()
  {
    if (this.state.temp === 0)
    {
      fetch(`http://localhost:8000/lat=${this.state.lat}&lng=${this.state.lng}`).then((res) =>
      {
        return res.json()
      }).then((data) =>
      {
        if (data.cod === 200)
        {
          this.setState({ temp: data.main.temp, feels_like: data.main.feels_like, cityName: data.name, description: data.weather[0].description })
        }
        else
        {
          console.log(data.message)
        }
      })
    }
  }

  getHeroBackgroundClass = (weather) =>
  {
    return weather.split(' ').join('_')
  }

  render()
  {
    let heroClasses = ['hero-display-box', this.getHeroBackgroundClass(this.state.description)]
    return (
      <>
        <div className={heroClasses.join(' ')}>
          <p>temperature at {this.state.currentDateTime} in {this.state.cityName} is {this.state.temp}</p>
          <p>placeholder:a hero image witht the current weather</p>
        </div>
      </>
    )
  }
}

export default HeroWeatherDisplay