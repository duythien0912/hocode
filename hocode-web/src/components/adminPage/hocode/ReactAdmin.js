/**
 * Generated ReactAdmin.js code. Edit at own risk.
 * When regenerated the changes will be lost.
**/
import React from 'react';
import { Admin, Resource } from 'react-admin';

import authProvider from './auth/authProvider';
import catchAll from './catchAll';
import customRoutes from './customRoutes';
import dataProvider from "./dataProvider";
import MyLayout from './MyLayout';
import { theme } from './theme';

import { history } from '../../../js/store/store'

import {
    ModelBookList,
} from './resources/ModelBook';

import {
    ModelCourseList,
} from './resources/ModelCourse';

import {
    ModelEventList,
} from './resources/ModelEvent';

import {
    ModelMinitaskList,
} from './resources/ModelMinitask';

import {
    ModelTaskList,
} from './resources/ModelTask';


const ReactAdmin = () => (
    <Admin
        appLayout={MyLayout}
        authProvider={authProvider}
        catchAll={catchAll}
        customRoutes={customRoutes}
        dataProvider={dataProvider}
        title="Hocode Admin"
        theme={theme}
        history={history}
    >
        <Resource
            name="books"
            list={ ModelBookList }
        />
        <Resource
            name="courses"
            list={ ModelCourseList }
        />
        <Resource
            name="events"
            list={ ModelEventList }
        />
        <Resource
            name="minitasks"
            list={ ModelMinitaskList }
        />
        <Resource
            name="tasks"
            list={ ModelTaskList }
        />
    </Admin>
);

export default ReactAdmin;
/** End of Generated Code **/