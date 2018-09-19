import React from 'react';
import PropTypes from 'prop-types';

function Square(props) {
    return(
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
}

Square.propTypes = {
    value: PropTypes.string,
    onClick : PropTypes.func,
    row : PropTypes.number,
    col : PropTypes.number,
};

export default Square;