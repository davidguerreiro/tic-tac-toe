import React from 'react';
import PropTypes from 'prop-types';

function Square(props) {
    return(
        <button className={props.className} onClick={props.onClick}>
            {props.value}
        </button>
    );
}

Square.propTypes = {
    value: PropTypes.string,
    onClick: PropTypes.func,
    className: PropTypes.string,
};

export default Square;