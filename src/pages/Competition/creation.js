import React, { Component } from 'react';
import Sidebar from '../../components/sidebar/sidebar';
import { BrowserRouter as Redirect } from "react-router-dom";

import AuthUserContext from '../../components/withAuth/AuthUserContext';
import withAuthorization from '../../components/withAuth/withAuthorization';
import { db } from '../../firebase';
import { auth } from '../../firebase';

class Creation extends Component{
  constructor(props){
    super(props);
    this.state = {
      competitionName: 'Enter a name for the competition',
      competitorFields: [''],
      judgeFields: [''],
      redirect: false,
    };

    this.handleCompetitionNameChange = this.handleCompetitionNameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleCompetitionNameChange(event){
    this.setState({competitionName: event.target.value});
  }

  handleSubmit(event){
    db.doCreateCompetition(this.state.competitionName, auth.getUserID(), this.state.competitorFields, this.state.judgeFields);
    alert(this.state.competitionName + ' has been created.');
    event.preventDefault();
    this.setState({ redirect: true });
  }

  doCreateCompetitorForm(){
    return this.state.competitorFields.map((fields, i) =>
      <div key={i}>
        <input
          type="text"
          placeholder={`Field #${i+1}`}
          value={fields||''}
          onChange={this.handleCompetitorFieldChange.bind(this, i)}/>
        <input
          type='button'
          value="-"
          onClick={this.handleRemoveCompetitorField.bind(this, i)}/>
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
      <div key={i}>
        <input
          type="text"
          placeholder={`Field #${i+1}`}
          value={fields||''}
          onChange={this.handleJudgeFieldChange.bind(this, i)}/>
        <input
          type='button'
          value="-"
          onClick={this.handleRemoveJudgeField.bind(this, i)}/>
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
              Name of Competition:
              <input
                type="text"
                value={this.state.value}
                onChange={this.handleCompetitionNameChange} />
            </label>
            <h4>Competitor Form Creation</h4>
            <div>
              {this.doCreateCompetitorForm()}
              <input
                type='button'
                value='Add Field'
                onClick={this.handleAddCompetitorField.bind(this)}/>
            </div>
            <h4>Judge Form Creation</h4>
            <div>
              {this.doCreateJudgeForm()}
              <input
                type='button'
                value='Add Field'
                onClick={this.handleAddJudgeField.bind(this)}/>
            </div>
            <input type="submit" value="Submit" />
          </form>
        </div>
      </div>
    )
  }
}

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(Creation);
