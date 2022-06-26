import React from 'react';
import { connect } from 'react-redux';

import Form from 'react-bootstrap/Form';

import { setFilter } from '../../actions/actions';

function VisibilityFilterInput(props) {
    const { visibilityFilter, setFilter } = props;
    return (
        <Form.Control onChange={e => setFilter(e.target.value)}
            value={visibilityFilter}
            placeholder="Filter"
        />
    );
}

export default connect(null, { setFilter })(VisibilityFilterInput);