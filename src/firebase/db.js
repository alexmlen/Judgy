import { db } from './firebase';
import { auth } from './firebase';

// User API

export const doCreateUser = (id, username, email) =>
  db.ref(`users/${id}`).set({
    username,
    email,
  });

export const onceGetUsers = () =>
  db.ref('users').once('value');

export const onceGetUser = (userId) =>
  db.ref('/users/' + userId).once('value');

  export const onceGetData = (data) =>
  db.ref('/users/' + data).once('value');

  export function doCreateCompetition(competitionName, creator, competitorApplication, judgeApplication){
    var compKey = db.ref('/competitions/').push().key;
    db.ref('/users/' + creator + '/competitions/').push({
      compKey
    });
    var judgeKey = db.ref('/competitions/').push().key;
    db.ref('/competitions/' + compKey).set({
      competitionName,
      creator,
      competitorApplication,
      judgeApplication,
      judgeKey,
    });
  }

  export function joinCompetitionContestant(compKey, contestant){
    db.ref('/competitions/' + compKey + '/constestant/').push({
      contestant
    });
    db.ref('/users/' + contestant + '/competitions/').push({
      compKey
    });
  }

  export function joinCompetitionJudge(compKey, judge){
    db.ref('/competitions/' + compKey + '/judge/').push({
      judge
    });
    db.ref('/users/' + judge + '/competitions/').push({
      compKey
    });
  }

  export function getCompetitionName(compKey){
    var rootRef = db.ref();
    var keyRef = rootRef.child("competitions/" + compKey + "/competitionName");
    return keyRef.once("value", function(snapshot){});
  }

  export function checkJudgeKey(compKey, judgeKey){
    var rootRef = db.ref();
    var keyRef = rootRef.child("competitions/" + compKey + "/judgeKey");
    
    return keyRef.once("value", function(snapshot){});
  }

  export function getCompetitions(authID){
    var rootRef = db.ref();
    var keyRef = rootRef.child("users/" + authID + "/competitions");
    return keyRef.once("value", function(snapshot){});
  }
