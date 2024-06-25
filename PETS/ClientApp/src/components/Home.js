import React, { Component } from 'react'; 
import '../css/Home/home.css'

export class Home extends Component {
  static displayName = Home.name;

  render() {
    localStorage.clear();
    return (
      <div className="untitled" >
      <div className="untitled__slides">
        <div className="untitled__slide">
          <div className="untitled__slideBg"></div>
          <div className="untitled__slideContent">
           
          </div>
        </div>
        <div className="untitled__slide">
          <div className="untitled__slideBg"></div>
          <div className="untitled__slideContent">

            
          </div>
        </div>
        <div className="untitled__slide">
          <div className="untitled__slideBg"></div>
          <div className="untitled__slideContent">
            
          </div>
        </div>
        <div className="untitled__slide">
          <div className="untitled__slideBg"></div>
          <div className="untitled__slideContent">
            
          </div>
        </div>
        
      </div>
      <div className="untitled__shutters"></div>
    </div>
    );
  }
}
