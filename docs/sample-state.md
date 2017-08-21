{
  entities {
    routes {
      user_id,
      start_lat,
      start_lng,
      end_lat,
      end_lng,
      start_time,
      end_time
    }
    comments {
      body,
      route_id,
      commenter_id
    }
    friends {
      user1_id,
      user2_id
    }
  }
  session {
    current_user: {},
    errors: []
  }
}
