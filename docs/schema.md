users

id integer not null, primary key
username string not null, indexed, uniqued
email string not null, indexed, uniqued
password_digest string not null
session_token string not null, uniqued

routes

id integer not null, primary key
user_id integer not null, foreign key
route string not null
start_time Datetime not null
end_time Datetime null

comments

id integer not null, primary key
body text not null
route_id integer not null, foeign key
commenter_id integer not null, foreign key

friends
id integer not null, primary key
user1_id integer not null, foreign key
user2_id integer not null, foreign key//2 is friends of 1
