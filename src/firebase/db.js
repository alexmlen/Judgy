import { db } from './firebase';

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