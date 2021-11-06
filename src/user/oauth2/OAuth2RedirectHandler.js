import React, { Component } from 'react';
import { ACCESS_TOKEN } from '../../constants';
import { Redirect } from 'react-router-dom'

class OAuth2RedirectHandler extends Component {
    getUrlParameter(name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');``

        var results = regex.exec(this.props.location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    };

    render() {        
        // URL parameter로 로그인한 유저의 정보를 전달한다.
        const accessToken = this.getUrlParameter('access_token');
        const refreshToken = this.getUrlParameter('refresh_token');
        const userId = this.getUrlParameter('user_id');
        const email = this.getUrlParameter('email');
        const nickname = this.getUrlParameter('nickname');

        console.log(userId, email, nickname )
        const error = this.getUrlParameter('error');

        if(accessToken) {
            localStorage.setItem(ACCESS_TOKEN, accessToken);
            localStorage.setItem("refresh_token", refreshToken);
            return <Redirect to={{
                pathname: "/profile",
                state: { from: this.props.location }
            }}/>; 
        } else {
            return <Redirect to={{
                pathname: "/login",
                state: { 
                    from: this.props.location,
                    error: error 
                }
            }}/>; 
        }
    }
}

export default OAuth2RedirectHandler;