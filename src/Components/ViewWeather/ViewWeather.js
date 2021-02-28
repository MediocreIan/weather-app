import React from 'react'
import PropTypes from 'prop-types'
import WeatherDisplay from '../WeatherDisplay/WeatherDisplay'

class ViewWeather extends React.Component
{
  constructor(props)
  {
    super(props)
    this.state = {
    }
  }




  render()  
  {
    return (
      <>
        <WeatherDisplay coords={this.state.activeLocation} />
      </>
    )
  }

}

export default ViewWeather;