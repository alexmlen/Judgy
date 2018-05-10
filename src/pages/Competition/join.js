import React, { Component } from 'react';
import Sidebar from '../../components/sidebar/sidebar';
import { BrowserRouter as Redirect } from "react-router-dom";

import AuthUserContext from '../../components/withAuth/AuthUserContext';
import withAuthorization from '../../components/withAuth/withAuthorization';
import { db } from '../../firebase';
import { auth } from '../../firebase';
import firebase from '../../firebase/firebase';

import 'url-search-params-polyfill';

class Creation extends Component{
  constructor(props){
    super(props);
    var search = new URLSearchParams(window.location.search);
    this.state = {
      competitionKey: search.get("compKey"),
      id: search.get("id"),
      judge: false,
    };

    this.handleCompetitionKey = this.handleCompetitionKey.bind(this);
    this.handleJudgeKey = this.handleJudgeKey.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleCompetitionKey(event){
    this.setState({
      competitionKey: event.target.value,
    });
  }

  handleJudgeKey(event){
    this.setState({id: event.target.value})
  }

  handleSubmit(event){
    //var name = db.getCompetitionName(this.state.competitionKey);
    alert(auth.getUserID());
    if(db.checkJudgeKey(this.state.competitionKey, this.state.id)){
      db.joinCompetitionJudge(this.state.competitionKey, auth.getUserID());
      alert("You have successfully joined as a judge.");
    } else {
      db.joinCompetitionContestant(this.state.competitionKey, auth.getUserID());
      alert("You have successfully joined as a contestant.");
    };

    event.preventDefault();
  }

  doCreateForm(){

  }

  render(){

    return(
      <div className="page-centered">
        <Sidebar />
        <div style={{flexGrow: 1}}>
          <h1>Join a Competition</h1>
          <form onSubmit={this.handleSubmit}>
            <label>
              Competition Key:
              <input
                type="text"
                value={this.state.competitionKey}
                onChange={this.handleCompetitionKey} />
            </label>
            <div>
            <label>
              Judge ID:
              <input
                type="text"
                value={this.state.id}
                onChange={this.handleJudgeKey} />
            </label>
            </div>
            <div>
            <input type="submit" value="Submit" />
            </div>
          </form>
        </div>
      </div>
    )
  }
}

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(Creation);
