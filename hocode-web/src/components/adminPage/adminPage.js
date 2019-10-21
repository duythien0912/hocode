
import React, { Component } from 'react';
import { Admin, Resource, ListGuesser } from 'react-admin';
import restProvider from 'ra-data-simple-rest';
import { Show, SimpleShowLayout, List, Datagrid, Edit, Create, SimpleForm, NumberField, NumberInput, BooleanInput, DisabledInput, TextInput, LongTextInput, TextField, BooleanField, RichTextField, } from 'react-admin';
import BookIcon from '@material-ui/icons/Book';
import { createMuiTheme } from '@material-ui/core/styles';

const dataProvider = restProvider('https://hocode.appspot.com/api/v1');



class AdminPage extends Component {

    render() {
        const { match: { params } } = this.props;
        console.log(params);
        return (
            <React.Fragment>
                <Admin
                    dataProvider={dataProvider} >
                    <Resource
                        name="minitasks"
                        icon={BookIcon}
                        list={MiniTasksList}
                        edit={MiniTasksEdit}
                        create={MiniTasksCreate}
                        show={MiniTasksShow}
                    />

                </Admin>
            </React.Fragment>
        );
    }
}

export default AdminPage;

export const MiniTasksShow = props => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="id" />
            <TextField source="mini_task_name" />
            <NumberField source="point_unlock" />
            <TextField source="status" />
            <BooleanField source="vitri" />
            <TextField source="name_func" />
            <TextField source="output_type_func" />
            <TextField source="level" />
            <TextField source="task_id" />
            <RichTextField source="mini_task_desc" />
            <RichTextField source="template_code" />
        </SimpleShowLayout>
    </Show>
);


export const MiniTasksList = (props) => (
    <List {...props}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="mini_task_name" />
            <NumberField source="point_unlock" />
            {/* <TextField source="status" />
            <BooleanField source="vitri" />
            <TextField source="name_func" />
            <TextField source="output_type_func" />
            <TextField source="level" />
            <TextField source="task_id" />
            <RichTextField source="mini_task_desc" />
            <RichTextField source="template_code" /> */}


        </Datagrid>
    </List>
);
const MiniTasksTitle = ({ record }) => {
    return <span>MiniTasks {record ? `"${record.mini_task_name}"` : ''}</span>;
};

export const MiniTasksEdit = (props) => (
    <Edit
        title={<MiniTasksTitle />}
        {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <TextInput source="mini_task_name" />
            <NumberInput source="point_unlock" />
            <TextInput source="status" />
            <BooleanInput source="vitri" />
            <TextInput source="name_func" />
            <TextInput source="output_type_func" />
            <TextInput source="level" />
            <TextInput source="task_id" />
            <LongTextInput source="mini_task_desc" />
            <LongTextInput source="template_code" />
        </SimpleForm>
    </Edit>
);

export const MiniTasksCreate = (props) => (
    <Create title="Create a MiniTasks" {...props}>
        <SimpleForm>
            {/* <TextInput source="id" /> */}
            <TextInput source="mini_task_name" />
            <NumberInput source="point_unlock" />
            <TextInput source="status" />
            <BooleanInput source="vitri" />
            <TextInput source="name_func" />
            <TextInput source="output_type_func" />
            <TextInput source="level" />
            <TextInput source="task_id" />
            <LongTextInput source="mini_task_desc" />
            <LongTextInput source="template_code" />
        </SimpleForm>
    </Create>
);
