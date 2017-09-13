import React from 'react';
import PropTypes from 'prop-types';

// import style from './cellRenderer.style.scss';

/**
 * Cell renderer component.
 */
export default class CellRenderer extends React.Component {
	render() {
		const value = this.props.value;

		const field = this.props.colDef.field;

		const error = this.props.data.error ? this.props.data.error[field] : '';
		const warning = this.props.data.warning ? this.props.data.warning[field] : '';

				// Handle errors and warnings.
		if (error || warning) {
			return (<div style={{ backgroundColor: 'red' }}>{value}</div>);
		}
		return (<div>{value}</div>);
	}
}

/**
 * Prop types validation.
 */
CellRenderer.propTypes = {
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	data: PropTypes.shape({
		error: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
		warning: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
	}),
	colDef: PropTypes.shape({
		pricePrecision: PropTypes.bool,
		costPrecision: PropTypes.bool,
		integer: PropTypes.bool,
		editable: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
		numeric: PropTypes.bool,
		field: PropTypes.string,
	}),
};

/**
 * Default Prop types
 */
CellRenderer.defaultProps = {
	value: undefined,
	data: undefined,
	colDef: PropTypes.shape({
		pricePrecision: false,
		costPrecision: false,
		integer: false,
		editable: undefined,
		numeric: false,
		field: '',
	}),
};
