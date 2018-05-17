import React, { Component } from 'react';
import Sidebar from '../../components/sidebar/sidebar';
import { BrowserRouter as Redirect } from "react-router-dom";

import AuthUserContext from '../../components/withAuth/AuthUserContext';
import withAuthorization from '../../components/withAuth/withAuthorization';
import { db } from '../../firebase';
import { auth } from '../../firebase';

import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';

import 'url-search-params-polyfill';

const centered = {
  float: 'center',
  flexGrow: 1,
};

class Manage extends Component{
  constructor(props){
    super(props);
    this.state = {
      competitionIDs: [''],
      competitionNames: [''],
    };
    // db.getCompetitionName(auth.getUserID()).then(function(result){
    //   result.forEach(function(child){
    //     competitionIDs.push(child.val().compKey);
    //   })
    //   this.setState({competitionIDs});
    // }.bind(this));
  }

  componentDidMount(){
    var competitionIDs = [];
    var competitionNames = [];
    //Gets competition id's the user is a part of
    db.getCompetitions(auth.getUserID()).then(function(result){
      result.forEach(function(child){
        competitionIDs.push(child.val().compKey);
        db.getCompetitionName(child.val().compKey).then(data =>{
          competitionNames.push(data.val())
          this.setState({competitionNames});
        });
      }.bind(this))
      this.setState({competitionIDs});
    }.bind(this));

  }

  doDisplayCompetitions(){
    var compids = [];
    var compnames = [];
    this.state.competitionNames.map((ids) =>
      compnames.push(ids),
    )
    this.state.competitionIDs.map((ids, i) =>
      compids.push(ids),
    )
    return compids.map((ids, i) =>
      <div className="boxed" style={{margin: "auto"}}>
        <Paper elevation={4} style={{minWidth: "20em", minHeight: "5em",}}>
          <label>{compnames[i]}</label>
          <div/>
          <label>{ids}</label>
          <div>
          <Button>Manage</Button>
          <Button>Judges</Button>
          <Button>Submissions</Button>
          </div>
        </ Paper>
      </div>
    )
  }

  render(){

    return(
      <div className="page-centered">
        <Sidebar />
        <div style={centered}>
          <h1>Competitions You Are In</h1>
          <div>
            {this.doDisplayCompetitions()}
          </div>
        </div>
      </div>
    )
  }
}

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(Manage);
