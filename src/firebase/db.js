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
    var ContInv = "https://alexmlen.github.io/Judgy/join?compKey=" + compKey + "#/join";
    var judgeInv = "https://alexmlen.github.io/Judgy/join?compKey=" + compKey + "&id=" + judgeKey + "#/join";
    var successMessage = 'You have successfully created ' + competitionName;
    var contInvite = 'To invite a contestant share this link: \n' + ContInv;
    var judgeInvite = 'To invite a judge share this link: \n' + judgeInv;
    var returnMsg = 'You have successfully created ' + competitionName + "\n\n" + contInvite + "\n\n" + judgeInvite;
    var returnArray = [];
    returnArray.push(successMessage);
    returnArray.push(contInvite);
    returnArray.push(judgeInvite);
    //alert('You have successfully created ' + competitionName + "\n\n" + contInvite + "\n\n" + judgeInvite);
    return returnArray;
  }

  export function checkCompetitionKey(compKey){
    var rootRef = db.ref();
    var keyRef = rootRef.child("competitions/" + compKey);

  }

  export function joinCompetitionContestant(compKey, contestant){
    db.ref('/competitions/' + compKey + '/constestant/').push({
      contestant
    });
    db.ref('/users/' + contestant + '/competitions/').push({
      compKey
    });
  }

  export function getCompetitorApplication(compKey){
    var rootRef = db.ref();
    var keyRef = rootRef.child("competitions/" + compKey + "/competitorApplication")
    return keyRef.once("value", function(snapshot){});
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
