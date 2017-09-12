import React from 'react';
import PropTypes from 'prop-types';
import {
	isFunction,
} from 'lodash';
import RTTooltip from 'react-toolbox/lib/tooltip';

// import style from './cellRenderer.style.scss';

/**
 * Cell renderer component.
 */
export default class CellRenderer extends React.Component {

	/**
	 * Constructor.
	 */
	constructor(props) {
		super(props);

		this.numeric = props.colDef.numeric && true;
	}

	/**
	 * Render.
	 */
	render() {
		let value = this.props.value;

		const field = this.props.colDef.field;

		const error = this.props.data.error ? this.props.data.error[field] : '';
		const warning = this.props.data.warning ? this.props.data.warning[field] : '';

		if (this.props.colDef.integer) {
			value = formatLocaleStringPriceCost(value, 'int');
		}

		if (this.props.colDef.costPrecision) {
			value = formatLocaleStringPriceCost(value, 'cost');
		}

		if (this.props.colDef.pricePrecision) {
			value = formatLocaleStringPriceCost(value, 'price');
		}

		const TooltipDiv = RTTooltip('div');

		// Handle errors and warnings.
		if (error || warning) {
			let tooltip;
			let outerStyle;

			if (error) {
				outerStyle = style.mEditableWithError;
				tooltip = (
					<div className={`${style.mTooltipContainer} ${style.mErrorBorder}`}>
						<div className={`${style.mTooltipTitle} ${style.mError}`}>{ERROR}</div>
						<div className={style.mMessage}>{error}</div>
					</div>
				);
			} else {
				outerStyle = style.mEditableWithWarning;
				tooltip = (
					<div className={`${style.mTooltipContainer} ${style.mWarningBorder}`}>
						<div className={`${style.mTooltipTitle} ${style.mWarning}`}>{WARNING}</div>
						<div className={style.mMessage}>{warning}</div>
					</div>
				);
			}

			return (
				<TooltipDiv tooltip={tooltip} tooltipPosition="right" tooltipDelay={200} theme={style} >
					<div className={`${outerStyle} ${this.numeric && style.mNumeric}`}>
						<div className={style.mTriangle} />
						<span>{value}</span>
					</div>
				</TooltipDiv>
			);
		}

		// Handle case without error/warning.
		const isEditable = (isFunction(this.props.colDef.editable))
					? this.props.colDef.editable(this.props)
					: this.props.colDef.editable;

		return (
			isEditable
			? <div className={`${style.mEditable} ${this.numeric && style.mNumeric}`}>
				<div className={style.mTriangle} />
				<FontIcon className={style.mPenIcon} value="create" />
				<span>{value}</span>
			</div>
			: <div className={`${style.mNotEditable} ${this.numeric && style.mNumeric}`}>
				<span>{value}</span>
			</div>
		);
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
		field: PropTypes.string
	})
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
	})
};
