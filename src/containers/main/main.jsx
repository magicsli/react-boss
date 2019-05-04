import React, { Component } from 'react'

import {Switch, Route} from 'react-router-dom'

import BossInfo from "../boss-info/boss-info"
import DashenInfo from "../dashen-info/dashen-info"


export default class Main extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path="/bossinfo" component={BossInfo} />
          <Route path="/dasheninfo" component={DashenInfo} />
        </Switch>
      </div>
    )
  }
}
