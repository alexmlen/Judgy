import React, { Component } from 'react';
import Sidebar from '../../components/sidebar/sidebar';
import { BrowserRouter as Redirect } from "react-router-dom";

import AuthUserContext from '../../components/withAuth/AuthUserContext';
import withAuthorization from '../../components/withAuth/withAuthorization';
import { db } from '../../firebase';
import { auth } from '../../firebase';

import 'url-search-params-polyfill';

class Manage extends Component{
  constructor(props){
    super(props);
    this.state = {
      competitionIDs: [''],
      competitionNames: [''],
    };
    var competitionIDs = [];
    var competitionNames = [];
    db.getCompetitions(auth.getUserID()).then(function(result){
      result.forEach(function(child){
        competitionIDs.push(child.val().compKey);
      })
      this.setState({competitionIDs});
    }.bind(this));

    // this.state.competitionIDs.forEach(function(element){
    //   db.getCompetitionName(element).then(function(result){
    //     // competitionNames.push(result.val());
    //     this.setState(prevState => ({
    //       competitionNames: [...prevState.competitionNames, result.val()]
    //     }))
    //   }.bind(this))
    // })
  }

  doShowCompetitions(){
    alert(this.state.competitionIDs);
  }

  doDisplayCompetitions(){
    return this.state.competitionIDs.map((ids, i) =>
      <div key={i}>
        <li>{ids}</li>
      </div>
    )
  }

  render(){

    return(
      <div className="page-centered">
        <Sidebar />
        <div style={{flexGrow: 1}}>
          {this.doDisplayCompetitions()}
        </div>
      </div>
    )
  }
}

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(Manage);
