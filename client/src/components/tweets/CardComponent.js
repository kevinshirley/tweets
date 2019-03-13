import React, { Component } from 'react';
import * as moment from 'moment';

class CardComponent extends Component {
    render() {
      let data = this.props.data;
      let time = moment(data.created_at);
      time = time.startOf('hour').fromNow();

      return (
        <div className="item">
          <div className="user-info">
            <div className="picture">
                <img src={data.user.profile_image_url} alt={data.user.name} className="circle responsive-img" />
            </div>
            <div className="user-name">
              <a href={`https://twitter.com/${data.user.screen_name}`} target="_blank" rel="noopener noreferrer">
                <h5 className="name">{data.user.name}</h5>
                <span className="nickname">{`@${data.user.screen_name}`}</span>
              </a>
            </div>
            <div className="time">
              {time}
            </div>
          </div>
          <div className="text">
            <p className="black-text">{data.text}</p>
          </div>
        </div>
      );
    }
}

export default CardComponent;