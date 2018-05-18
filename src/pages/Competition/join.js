import React, { Component } from 'react';
import Sidebar from '../../components/sidebar/sidebar';
import { HashRouter as Redirect } from "react-router-dom";

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
      joined: false,
      formRendered: false,
      competitorSubmission: "",
      competitionFields: [],
      competitionName: "",
    };

    this.handleCompetitorSubmit = this.handleCompetitorSubmit.bind(this);
    this.handleCompetitionKey = this.handleCompetitionKey.bind(this);
    this.handleJudgeKey = this.handleJudgeKey.bind(this);
    this.handleCompetitionSubmission = this.handleCompetitionSubmission.bind(this);
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

  handleCompetitionSubmission(event){
    this.setState({
      competitorSubmission: event.target.value,
    })
  }

  handleCompetitorSubmit(event){
    alert("You have successfully joined " + this.state.competitionName + " as a contestant.");
  }

  handleSubmit(event){
    var that = this;
    db.checkJudgeKey(this.state.competitionKey, this.state.id).then(function(result){
      if(result.exists()){
        var check = result.val();
        var confirm;
        if(check == this.state.id) {
          //alert("True");
          confirm = true;
        } else {
          //alert("False");
          confirm = false;
        }
        db.getCompetitionName(that.state.competitionKey).then(function(name){
          if(confirm){
            db.joinCompetitionJudge(that.state.competitionKey, auth.getUserID());
            alert("You have successfully joined "
            + name.val() + " as a judge.");
          } else {
            this.setState({
              joined: true,
              competitionName: name.val()
            })
            db.joinCompetitionContestant(that.state.competitionKey, auth.getUserID());
            //alert("You have successfully joined "
            //+ name.val() + " as a contestant.");
          };
        }.bind(this));
      }
    else{
      alert("That competition doesn't exist");
    }
    }.bind(this));
    event.preventDefault();
  }



  doCreateCompetitorForm(){
    var competitionFields = [];
    if(!this.state.formRendered){
      db.getCompetitorApplication(this.state.competitionKey).then(function(fields){
        fields.forEach(function(child, i){
          competitionFields.push(child.val());
        }.bind(this))
        this.setState({
          competitionFields,
          formRendered: true});
      }.bind(this));
    }
    competitionFields = this.state.competitionFields;
    return competitionFields.map((ids,i) =>
    <div>
      <div>
      <label>{ids}</label>
      <div>
      <TextField
        type="text"
        placeholder={i}/>
      </div>
      </div>
    </div>
    )
  }

  render(){
    if(this.state.joined){
      return(
        <div className="page-centered">
          <Sidebar />
          <div style={{flexGrow: 1}}>
            <h1>Competitor Application</h1>
            <form onSubmit={this.handleCompetitorSubmit}>
              {this.doCreateCompetitorForm()}
              <div>
              <input type="submit" value="Submit" />
              </div>
            </form>
          </div>
        </div>
      )
    } else {
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
}

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(Join);
