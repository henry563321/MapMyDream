Component Hierarchy

AuthFormContainer
  AuthForm

HomeContainer
  Home
  Sidebar
  {RoutesContainer
  NewRouteContainer} /
  {FriendsContainer
  NewFriendsContainer}

RoutesContainer
  Routes
    CommentsContainer

NewRouteContainer
  NewRoute(map)

CommentsContainer
  Comments
  NewCommentsContainer

NewCommentsContainer
  NewComments

FriendsContainer
  Friends

NewFriendsContainer
  NewFriends

Search
  RoutesContainer
  NewFriendsContainer




Path	Component
"/sign-up"	"AuthFormContainer"
"/sign-in"	"AuthFormContainer"
"/home"	"HomeContainer"
"/home/friends"	"FriendsContainer"
"/home/routes"	"RoutesContainer"
"/home/routes/:id/comments"	"CommentsContainer"
"/search"	"RouteSearch"
"/search/Routes"	"RouteSearchResult"
"/search/Routes/new-friends" 	 "NewFriendsContainer"
"home/routes/new-route" 	"NewRouteContainer"
"home/routes/:id/new-comment" 	"NewCommentsContainer"
"users/new-friends" 	 "NewFriendsContainer"
