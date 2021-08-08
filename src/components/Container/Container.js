import {Route} from 'react-router-dom';
import React from 'react';
import Actions from './Actions/Actions'
import Clients from './Clients/Clients'
import Analytics from './Analytics/Analytics'

function Container() {
    return (
       [ 
        <Route key="clients" exact path="/clients" render={() => <Clients />}  />,
        <Route key="actions" exact path="/actions" render={() => <Actions />}  />,
        <Route key="analytics" exact path="/analytics" render={() => <Analytics />}  />
        // <Route  key="favouritesById" exact path="/favourite/:id" render={(match) => <MediaCard match={match}/>}  />
      ]
    );
  }
  
  export default Container;
  