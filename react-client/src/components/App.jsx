import React from 'react';
import { Link, Router, Navigation } from 'react-router';
import SignIn from './Auth/signIn.jsx';
import SideBar from './sideBar/sideBar.jsx';
import $ from 'jquery';
import Main from './auth/main.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      loginStatus: ''
    };
    this.loginStatus = this.loginStatus.bind(this);
  }
  componentWillMount() {

  }
  signOut() {
    $.ajax({
      type: 'GET',
      url: '/SignOut',
    }).done(function() {
      console.log('successful sign out');
      window.location = window.location.pathname + '#/Main';
    }).fail(function() {
      console.log('failed sign out');
    });      
  }

  loginStatus(status) {
    this.setState({loginStatus: status});
  }

  render() {
    console.log(window.location.pathname + '#');

    const childrenWithProps = React.Children.map(this.props.children,
     (child) => React.cloneElement(child, {
       loginStatus: this.loginStatus
     }));
  if (!childrenWithProps) {
    return (
     <div>
      <div className="row pt-1">
        { /* logo */ } 
        <Link to="/Main">
        <div className="col-xs-1"><img className="d-inline-block align-bottom mx-auto" src="images/hcampr-logo.png" width="72" /></div>
        <div className="col-xs-6">
          <div className="headline off-white">Happy Campr</div>
        </div>
        </Link>
     
        { /* top navbar */ } 
        <nav className="col-xs-5 navbar navbar-full navbar-dark">
          <div className="form-inline float-xs-right">
            <button className="mt-1 mr-1 btn btn-outline-warning" type="submit"><Link to="/SignIn">Sign In</Link></button>
            <button onClick={this.signOut} className="mt-1 mr-1 btn btn-outline-warning" type="submit">Sign Out</button>
          </div>
        </nav>
      </div>

       <div className="Main mt-1">
          <div className="row">
            <div className="">
              {<Main/>}
            </div>
          </div>
       </div>
       
     </div>
   ); }


    var pathName = childrenWithProps[0].props.location.pathname;

    // for signup view, set column to be full-width
    if (pathName = "/SignUp") {
      return (
        <div>
          <div className="row pt-1">
            { /* logo */ } 
            <div className="col-xs-1"><img className="d-inline-block align-bottom mx-auto" src="images/hcampr-logo.png" width="72" /></div>
            <div className="col-xs-6">
              <div className="headline off-white">Happy Campr</div>
            </div>
         
            { /* top navbar */ } 
            <nav className="col-xs-5 navbar navbar-full navbar-dark">
              <div className="form-inline float-xs-right">
                <button className="mt-1 mr-1 btn btn-outline-warning" type="submit"><Link to="/SignIn">Sign In</Link></button>
                <button onClick={this.signOut} className="mt-1 mr-1 btn btn-outline-warning" type="submit"><Link to="/SignIn">Sign Out</Link></button>
              </div>
            </nav>
          </div>


          <div className="Main mt-1">
           <div className="col-xs-12 card">
             <div className="card-block">
              {childrenWithProps}
             </div>
           </div>
          </div>
          <div className="col-xs-4 pt-1 Sidebar">
            <SideBar views={this.state.loginStatus}/>
          </div>
        </div>
      );
    } else { // this is a non-signup view with sidebar
      console.log('we are in the non-signup with to show a sidebar');
      return (
        <div>
          <div className="row pt-1">
            { /* logo */ } 
            <div className="col-xs-1"><img className="d-inline-block align-bottom mx-auto" src="images/hcampr-logo.png" width="72" /></div>
            <div className="col-xs-6">
              <div className="headline off-white">Happy Campr</div>
            </div>
         
            { /* top navbar */ } 
            <nav className="col-xs-5 navbar navbar-full navbar-dark">
              <div className="form-inline float-xs-right">
                <button className="mt-1 mr-1 btn btn-outline-warning" type="submit"><Link to="/SignIn">Sign In</Link></button>
                <button onClick={this.signOut} className="mt-1 mr-1 btn btn-outline-warning" type="submit"><Link to="/SignIn">Sign Out</Link></button>
              </div>
            </nav>
          </div>

          <div className="Main mt-1">
           <div className="col-xs-8 card">
             <div className="card-block">
              {childrenWithProps}
             </div>
           </div>
          </div>
          <div className="col-xs-4 pt-1 Sidebar">
            <SideBar views={this.state.loginStatus}/>
          </div>
        </div>
      );
    }
  }
}

export default App; 
