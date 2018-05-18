## Judgy Info - Must Read

Libraries used are

- React v16.3.2
- Material UI Next
- Firebase
- React Router Dom
- URLSearchParams Polyfill (npm install url-search-params-polyfill)
- Github Pages

IDE's used

- Atom
- Visual Studio Code

Other Programs

- Adobe XD
- Adobe Photoshop


## Template Page

There is a template page which can be used to create new pages under

`src/pages/template/template.js`

##Firebase and Retrieveing Data

Be careful if you plan to change anything in the firebase folder. I have already set up a method that would call data for you.

To get data from the user, you need to call db which is already imported in the template page.
The path is set to /users/ and adds on to that

```
var userId = authUser.uid;
var data;
db.onceGetData(PUT PATH HERE).then(function(snapshot) { data = (snapshot.val() && snapshot.val().DATA_NAME) || 'Anonymous';
```

For example `userId` and `snapshot.val().username` would get the user's username from the database.
The path you would enter would be `userId` and the desired data is `username`. The method would then call `/users/username`

You can then use the data variable to do whatever you need.

##Firebase and Writing Data

Not yet added in
