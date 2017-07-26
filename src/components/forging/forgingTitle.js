import React from 'react';
import { Card, CardText } from 'react-toolbox/lib/card';
import moment from 'moment';
import LiskAmount from '../liskAmount';
import grid from '../../../node_modules/flexboxgrid/dist/flexboxgrid.css';
import style from './forging.css';


class ForgingTitle extends React.Component {

  componentDidMount() {
    this.props.loadStats('total', moment('2016-04-24 17:00'));
  }

  render() {
    return (
      <Card className={`${style.grayCard} ${grid['col-xs-12']}`}>
        <CardText>
          <div className={`${grid.row} ${grid['between-xs']}`}>
            <h2 className={`${style.delegateName} delegate-name`}>
              {this.props.account.delegate.username}
            </h2>
            <span>
              <LiskAmount val={this.props.statistics.total} /> LSK Earned
            </span>
          </div>
        </CardText>
      </Card>
    );
  }
}

export default ForgingTitle;