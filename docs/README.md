FresherNote

Minimum Viable Product

MapMyDream is a web application inspired by MapMyRun built using Ruby on Rails and React/Redux. By the end of August 2017, this app will, at a minimum, satisfy the following criteria with smooth, bug-free navigation, adequate seed data and sufficient CSS styling:

 Hosting on Heroku
 New account creation, login, and guest/demo login
 Route Creating, and Delete
 Comment on routes
 make friends with others

users can use this app to map where they actually went or the routes in earth which they dreamed

 Design Docs
[schema.md]: ./schema.md
[sample-state.md]: ./sample-state.md
[api_endpoints]: ./api_endpoints.md
[component-hierachy.md]: ./component-hierachy.md



 Implementation Timeline

Phase 1: Backend setup and Front End User Authentication (2 days)

Objective: Functioning rails project with front-end Authentication

Phase 2: Route Model, API, and components (3 days)

Objective: Route can be created and destroyed through the API, has a dashboard to show users own routes,
and can see others routes.

Phase 3: Comments (2 days)

Objective: Comments belong to Routes that can be created, read, edited and destroyed through the API.

Phase 4: Friends (2 day)

Objective: Friends can be added through the API, people can deny or confirm the request

Phase 5: Searching (1 day)

Objective: User can search routes by other user by location(lat,lng, zip, name of city)

Bonus Features (TBD)
Search for runs by location
public and private dream(only can be seen by friend or self)
