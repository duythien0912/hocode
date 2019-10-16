
import React, { Component } from 'react';
import { Admin, Resource, ListGuesser } from 'react-admin';
import simpleRestProvider from 'ra-data-simple-rest';

const dataProvider = simpleRestProvider('https://hocode.appspot.com/api/v1');



class AdminPage extends Component {

    render() {
        const { match: { params } } = this.props;
        console.log(params);
        return (
            <React.Fragment>
                <Admin dataProvider={dataProvider} >
                    <Resource name="minitasks" list={ListGuesser} />

                </Admin>
            </React.Fragment>
        );
    }
}

export default AdminPage;
