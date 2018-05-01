import { auth } from './firebase';

// Sign Up
export const doCreateUserWithEmailAndPassword = (email, password) =>
auth.createUserWithEmailAndPassword(email, password);

// Sign In
export const doLoginWithEmailAndPassword = (email, password) =>
auth.signInWithEmailAndPassword(email, password);

// Sign out
export const doLogout = () =>
auth.signOut();

// Password Reset
export const doPasswordReset = (email) =>
auth.sendPasswordResetEmail(email);

<<<<<<< HEAD
=======
// Get Username
export const getDisplayname = (uid) =>
auth.getUser(uid);

// Get User
export const getUser = (uid) =>
auth.getUser(uid);

>>>>>>> master
// Password Change
export const doPasswordUpdate = (password) =>
auth.currentUser.updatePassword(password);