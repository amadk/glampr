import React from 'react';
import $ from 'jquery';
const SignIn = (props) => {

  $.ajax({
   type: "GET",
   url: '/SignIn',
  }).done(function(res){
    console.log('*******signin response', res);
    if(res.auth) {
      if (!!res.status) {
        props.loginStatus('user')
        window.location = window.location.pathname + '#/TripDetailsUser';
      } else {
        props.loginStatus('maker')
        window.location = window.location.pathname + '#/StartTrip';
      }
    } else {
       window.location = window.location.pathname + '#/Main';      
    }
  }).fail(function (){
    console.log('*******signin response', res);

    window.location = window.location.pathname + '#/Main';
    console.log('failed to get from signin');
  });

  let username = ''
  let password = ''
  let currUser = {};
  currUser.username = username;
  currUser.password = password;
  
  const handleChange = (e) => {
    let inputType = e.target.getAttribute('data-type');
    let input = e.target.value;
    if (inputType === 'username') {
      currUser.username = input;
    }
    if (inputType === 'password') {
      currUser.password = input;
    }
  };

  const signIn = () => {

    $.ajax({
      type: 'POST',
      url: '/SignIn',
      contentType: 'application/json',
      data: JSON.stringify(currUser)
    }).done(function(res){
      console.log('*******signin response', res);
      if(res.auth) {
        if (!!res.status) {
          props.loginStatus('user');
          window.location = window.location.pathname + '#/TripDetailsUser';
        } else {
          props.loginStatus('maker');
          window.location = window.location.pathname + '#/StartTrip';
        }
      }
      console.log('successful post from signin');
    }).fail(function () {
      window.location = window.location.pathname + '#/SignIn';

      console.log('failed to post from signin');
    });
  };

  return (
    <div className ="">
      <img className="img-thumbnail float-xs-right" width="700" src="images/great-outdoors/starry-tent.jpg" />
      <h1> Sign In</h1>
      <div>
        <p>
        Email<br />
        <input 
          data-type="username"
          type="text" 
          placeholder=""
          onChange= {handleChange}
        />
        </p>
      </div>
      <div>
        <p>
        Password<br />
        <input 
          data-type="password" 
          type="password" 
          placeholder=""
          onChange={handleChange}
        />
        </p>
      </div>
      <button className="btn btn-warning btn-lg btn-sm" id="submit" onClick={signIn}> Sign In </button>
    </div>
  );
};

export default SignIn;