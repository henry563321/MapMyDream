# MapMyDream

[MapMyDream Live](https://map-my-dream.herokuapp.com/#/)

MapMyDream is a full-stack web application inspired by MapMyRun. It utilizes
Ruby on Rails on the backend, a PostgreSQL database, and React.js with a Redux
architectural framework on the frontend, and it use goole map API when user
deal with their dreams.

## Feature and Implement

### HomePage and Comment

Every user has their activities in this page, also, they can see their
friends activities here, the activities is sorted by the time they update it.
User can add comment under the activities, only own user can delete their
comment.

We get the data in the backend, the return value is the whole dream table,
and comments, we sort it in the frontend and use selector to find out which is
belongs_to currentUser and his friends, and the comments belongs to these
dreams.

![homepage](/docs/productionimages/home_page.png)

### Friending

There are 2 page of friending separated with tabs.

First is the part of edit friend, with list of friend you have, that you can
view their activities and unFriend if you want. And list of friend request,
which you can accept or deny, the request be accept will add new friend to
your friend list.

![editfriend](/docs/productionimages/edit_friend.png)

Second part is the friend searching ,you can search their username to find out
a friend, only the user not your friend or in your request will show up.
When you send the request, there will be a pending request you can see the status.
You can cancel that if you want, or if your request been denied, you can cancel
it and resend it.

![makefriend](/docs/productionimages/make_friend.png)


## Future Direction of Project

Besides the feature I have already made, here's some more I want to implement
in the future.

### Search Dream In Location

A great way to find friend with same dream is to search these dream with
their location, there will be a search box for dream searching,
and graph of dream, with the list of all dream fit the condition , and the Link
of add friend ,view profile.

### User Profile

User should have their own profile , with a image they upload and several
personal information about themself, people can edit it, and view friends
profile.
