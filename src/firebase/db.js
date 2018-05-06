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

  export const onceGetCompetitionCount = () =>
  db.ref('/competitions/count').once('value');

  // In case push idea doesn't work
  // this will but requires unique competition names
  // export const doCreateCompetition = (competitionName, creator) =>
  //   db.ref(`competitions/${competitionName}`).set()
  //     creator,
  //   });

  // export const doCreateCompetition = (competitionName, creator, competitorApplication, judgeApplication) =>
  //   db.ref('/competitions/').push().set({
  //     competitionName,
  //     creator,
  //     competitorApplication,
  //     judgeApplication,
  //   });

  export function doCreateCompetition(competitionName, creator, competitorApplication, judgeApplication){
    var compKey = db.ref('/competitions/').push().key;
    db.ref('/users/' + creator + '/competitions/').push({
      compKey
    });
    db.ref('/competitions/' + compKey).set({
      competitionName,
      creator,
      competitorApplication,
      judgeApplication,
    });

  }
