Docker config (add this to the next.config.mjs if the changes are not shown)

```
// webpackDevMiddleware: (config) => {
//   // Solve compiling problem via vagrant
//   config.watchOptions = {
//     poll: 1000, // Check for changes every second
//     aggregateTimeout: 300, // delay before rebuilding
//   };
//   return config;
// },
```

## Backend schemas

### User Schema

```json
User {
  id: string,
  firstname: stirng,
  lastname: string,
  cin: string,
  phone number: string,
  email: string,
  passwordhash: string,
  role: string,
}
```

Users are website users that have an account, there are 4 types of users :

- Unverified students : can only see the progress of the inscription process (we still didn't work on it).
- Verified students : students that completed the inscreption and have access to courses and homeworks ...
- Teacher : teachers have the same access as the Verified student, but they can add resources to there courses and create homeworks and download student's submissions.
- Admin : can see the list of all the users, CRUD users and change roles, CRUD Modules and Chapters ... (the super user)
