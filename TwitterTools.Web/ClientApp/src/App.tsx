import * as React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';
import Counter from './components/Counter';
import FetchData from './components/FetchData';
import Twitter from './components/Twitter';
import TwitterQuery from './components/TwitterQuery';

import './custom.css'

export default () => (
    <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/counter' component={Counter} />
        <Route path='/fetch-data/:startDateIndex?' component={FetchData} />
        <Route path='/twitter' component={Twitter} />
        <Route path='/twitter/get-top-hashtags'/>
        <Route path='/twitter/search?query=:query' /> 
        <Route path='/twitterQuery' component={TwitterQuery} />
        <Route path='/twitter/call?url=:url' component={TwitterQuery} />

    </Layout>
);
