import React from 'react';
import {Link} from 'react-router-dom';

class homePage extends React.Component {
  render() {
    return(
      <Link to="/dream/create" >CreateNewDream</Link>
    );
  }
}

export default homePage;
