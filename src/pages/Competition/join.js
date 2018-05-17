import React, { Component } from 'react';
import Sidebar from '../../components/sidebar/sidebar';
import { BrowserRouter as Redirect } from "react-router-dom";

import AuthUserContext from '../../components/withAuth/AuthUserContext';
import withAuthorization from '../../components/withAuth/withAuthorization';
import { db } from '../../firebase';
import { auth } from '../../firebase';

import TextField from 'material-ui/TextField';

import 'url-search-params-polyfill';

class Join extends Component{
  constructor(props){
    super(props);
    var search = new URLSearchParams(window.location.search);
    this.state = {
      competitionKey: search.get("compKey"),
      id: search.get("id"),
      judge: false,
      name: "",
    };

    this.handleCompetitionKey = this.handleCompetitionKey.bind(this);
    this.handleJudgeKey = this.handleJudgeKey.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleCompetitionKey(event){
    this.setState({
      competitionKey: event.target.value,
    });
    var temp = db.getCompetitionName(this.state.competitionKey);
    this.setState({
      name: temp,
    });
  }

  handleJudgeKey(event){
    this.setState({id: event.target.value})
  }

  handleSubmit(event){
    db.checkJudgeKey(this.state.competitionKey, this.state.id).then(function(result){
      var check = result.val();
      var confirm;
      if(check == this.state.id) {
        //alert("True");
        confirm = true;
      } else {
        //alert("False");
        confirm = false;
      }
      db.getCompetitionName(this.state.competitionKey).then(function(name){
        if(confirm){
          db.joinCompetitionJudge(this.state.competitionKey, auth.getUserID());
          alert("You have successfully joined "
          + name.val() + " as a judge.");
        } else {
          db.joinCompetitionContestant(this.state.competitionKey, auth.getUserID());
          alert("You have successfully joined "
          + name.val() + " as a contestant.");
        };
      });
    }.bind(this));
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
              <TextField
                type="text"
                value={this.state.competitionKey}
                placeholder="Competition key"
                onChange={this.handleCompetitionKey} />
            </label>
            <div>
            <label>
              <TextField
                type="text"
                value={this.state.id}
                placeholder="Only judges fill this"
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

export default withAuthorization(authCondition)(Join);
