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

import {
    ModelBookList,
    ModelBookCreate,
    ModelBookEdit,
} from './resources/ModelBook';

import {
    ModelCourseList,
    ModelCourseCreate,
    ModelCourseEdit,
} from './resources/ModelCourse';

import {
    ModelEventList,
    ModelEventCreate,
    ModelEventEdit,
} from './resources/ModelEvent';

import {
    ModelMinitaskList,
    ModelMinitaskCreate,
    ModelMinitaskEdit,
} from './resources/ModelMinitask';

import {
    ModelTaskList,
    ModelTaskCreate,
    ModelTaskEdit,
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
    >
        <Resource
            name="books"
            list={ ModelBookList }
            create={ ModelBookCreate }
            edit={ ModelBookEdit }
        />
        <Resource
            name="courses"
            list={ ModelCourseList }
            create={ ModelCourseCreate }
            edit={ ModelCourseEdit }
        />
        <Resource
            name="events"
            list={ ModelEventList }
            create={ ModelEventCreate }
            edit={ ModelEventEdit }
        />
        <Resource
            name="minitasks"
            list={ ModelMinitaskList }
            create={ ModelMinitaskCreate }
            edit={ ModelMinitaskEdit }
        />
        <Resource
            name="tasks"
            list={ ModelTaskList }
            create={ ModelTaskCreate }
            edit={ ModelTaskEdit }
        />
    </Admin>
);

export default ReactAdmin;
/** End of Generated Code **/