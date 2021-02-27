import React from 'react'
import PropTypes from 'prop-types'
import Header from '../Header/Header'
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

        <Header />
        <WeatherDisplay coords={this.state.activeLocation} />
        <h2>view weather main body</h2>
      </>
    )
  }

}

export default ViewWeather;