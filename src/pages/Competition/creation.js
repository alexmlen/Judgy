import React, { Component } from 'react';
import Sidebar from '../../components/sidebar/sidebar';
import { HashRouter as Redirect } from "react-router-dom";

import AuthUserContext from '../../components/withAuth/AuthUserContext';
import withAuthorization from '../../components/withAuth/withAuthorization';
import { db } from '../../firebase';
import { auth } from '../../firebase';

import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';

import 'url-search-params-polyfill';

class Creation extends Component{
  constructor(props){
    super(props);
    this.state = {
      competitionName: '',
      competitorFields: [''],
      judgeFields: [''],
      redirect: false,
      msg1: "",
      msg2: "",
      msg3: "",
    };

    this.handleCompetitionNameChange = this.handleCompetitionNameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleCompetitionNameChange(event){
    this.setState({competitionName: event.target.value});
  }

  handleSubmit(event){
    if(!this.state.competitionName == '' || !this.state.competitionName == ' '){
      var msg = db.doCreateCompetition(this.state.competitionName, auth.getUserID(), this.state.competitorFields, this.state.judgeFields);
      //alert(this.state.competitionName + ' has been created.');
      this.setState({
        msg1: msg[0],
        msg2: msg[1],
        msg3: msg[2],
      });
    }
    else{
      alert("Competition name cannot be blank.");
    }
    // http://localhost:3000/join?compKey=-LC5rgFUAxWnP5jHRPso&id=-LC5rgFVtc6kviMlK4AE
    // Testing url parse library
    // var search = new URLSearchParams(window.location.search);
    // db.testFunction(search.get("authKey"));
    event.preventDefault();
  }

  doCreateCompetitorForm(){
    return this.state.competitorFields.map((fields, i) =>
      <div key={i} style={{padding: "0.5em"}}>
        <TextField
          type="text"
          placeholder={`Field #${i+1}`}
          value={fields||''}
          onChange={this.handleCompetitorFieldChange.bind(this, i)}/>
        <Button
          type='button'
          variant="fab"
          mini
          value="-"
          onClick={this.handleRemoveCompetitorField.bind(this, i)}>-</Button>
      </div>
    )
  }

  handleCompetitorFieldChange(i, event){
    let competitorFields = [...this.state.competitorFields];
    competitorFields[i] = event.target.value;
    this.setState({ competitorFields });
  }

  handleAddCompetitorField(){
    this.setState(prevState => ({ competitorFields: [...prevState.competitorFields, '']}))
  }

  handleRemoveCompetitorField(i){
    let competitorFields = [...this.state.competitorFields];
    competitorFields.splice(i, 1);
    this.setState({ competitorFields });
  }

  doCreateJudgeForm(){
    return this.state.judgeFields.map((fields, i) =>
      <div key={i} style={{padding: "0.5em"}}>
        <TextField
          type="text"
          placeholder={`Field #${i+1}`}
          value={fields||''}
          onChange={this.handleJudgeFieldChange.bind(this, i)}/>
        <Button
          type='button'
          variant="fab"
          mini
          value="-"
          onClick={this.handleRemoveJudgeField.bind(this, i)}>-</Button>
      </div>
    )
  }

  handleJudgeFieldChange(i, event){
    let judgeFields = [...this.state.judgeFields];
    judgeFields[i] = event.target.value;
    this.setState({ judgeFields });
  }

  handleAddJudgeField(){
    this.setState(prevState => ({ judgeFields: [...prevState.judgeFields, '']}))
  }

  handleRemoveJudgeField(i){
    let judgeFields = [...this.state.judgeFields];
    judgeFields.splice(i, 1);
    this.setState({ judgeFields });
  }

  render(){
    // if(this.state.redirect){
    //   return <Redirect to="/home"/>
    // }
    // Persistence is broken as it takes you to login screen

    return(
      <div className="page-centered">
        <Sidebar />
        <div style={{flexGrow: 1}}>
          <h1>Create a Competition</h1>
          <form onSubmit={this.handleSubmit}>
            <label>
              <TextField
                type="text"
                value={this.state.value}
                placeholder="Name of Competition"
                onChange={this.handleCompetitionNameChange}/>
            </label>
            <h4>Competitor Form Creation</h4>
            <div>
              {this.doCreateCompetitorForm()}
              <Button
                type='button'
                value='Add Field'
                onClick={this.handleAddCompetitorField.bind(this)}>Add Field</Button>
            </div>
            <h4>Judge Form Creation</h4>
            <div>
              {this.doCreateJudgeForm()}
              <Button
                type='button'
                value='Add Field'
                onClick={this.handleAddJudgeField.bind(this)}>Add Field</Button>
            </div>
            <Button type="submit" value="Submit" variant="raised" >Submit</Button>
          </form>
          <div>
            <h2>{this.state.msg1}</h2>
          </div>
          <div>
            <h2>{this.state.msg2}</h2>
          </div>
          <div>
            <h2>{this.state.msg3}</h2>
          </div>
        </div>
      </div>
    )
  }
}

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(Creation);
