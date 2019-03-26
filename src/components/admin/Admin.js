import React, { Component } from 'react';
import AdminHeader from './AdminHeader';
import Mv from './Mv';
// import Invoice from './Invoice';
// import Settings from './Settings';
import Table from '../common/Table';
import AdminBalanceList from './AdminBalanceList';

import { BrowserRouter as Router, Route,} from "react-router-dom";

class Admin extends Component {
    render() {
        return (
            <Router>
                <div className="Admin">
                    <AdminHeader />
                    <Route exact path='/' component={Table} />
                    <Route exact path='/Mv' component={Mv} />
                     <Route exact path='/AdminBalanceList' component={AdminBalanceList} />
                    {/* <Route exact path='/Invoice' component={Invoice} />
                    <Route exact path='/Settings' component={Settings} /> */}
                </div>
            </Router>
        );
    }
}

export default Admin;