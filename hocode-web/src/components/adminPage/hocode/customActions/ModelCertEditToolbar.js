/**
 * Generated Edit.js code. Edit at own risk.
 * When regenerated the changes will be lost.
**/
import React from 'react';
import { DeleteButton, SaveButton, Toolbar } from 'react-admin';


const ModelCertEditToolbar = props => (
    <Toolbar {...props}>
        <SaveButton
            label="Save"
            submitOnEnter={true}
        />
        <SaveButton
            label="Save and Continue Editing"
            redirect={false}
            submitOnEnter={false}
            variant="flat"
        />
        <DeleteButton />
    </Toolbar>
);

export default ModelCertEditToolbar;
/** End of Generated Code **/