import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Control from '../../elements/Control';
import mapToCssModules from '../../utils/mapToCssModules';

const renderOptions = options => {
	return (options || []).map(({label, ...opt}) => (
		<option key={opt.value} {...opt}>{label}</option>
	));
};

/**
 * A <select /> component.
 */
const Select = ({
	className,
	id,
	name,
	isInline,

	cssModule,

	options,
	children,

	required,
	requiredText,

	preAddon,
	postAddon,

	label,
	labelProps,

	tooltip,
	tooltipProps,

	helpText,

	error,
	status,
	statusMessage,

	width,

	...attrs
}) => {
	let _status = status;
	let _statusMessage = statusMessage;

	if (error) {
		_status = 'error';
		_statusMessage = error;
	}

	const isInvalid = _status === 'error';

	const inputClasses = mapToCssModules(classNames(
		'select-input',
		{
			[`select-input--${_status}`]: !!_status,
		},
	), cssModule);

	const inputId = id || name;

	const optionalInputAttributes = {};

	if (_statusMessage) {
		optionalInputAttributes['aria-describedby'] = `${inputId}-status-msg`;
	}

	return (
		<Control
			className={className}
			name={inputId}
			isInline={isInline}
			label={label}
			labelProps={labelProps}
			tooltip={tooltip}
			tooltipProps={tooltipProps}
			helpText={helpText}
			required={required}
			requiredText={requiredText}
			width={width}
			status={_status}
			statusMessage={_statusMessage}
		>
			<div className={inputClasses}>
				{preAddon &&
					<div className={mapToCssModules('select-input__pre', cssModule)}>{preAddon}</div>
				}

				<select
					id={inputId}
					name={name}
					required={required}
					aria-required={required}
					aria-invalid={isInvalid}
					{...optionalInputAttributes}
					{...attrs}
				>
					{children || renderOptions(options)}
				</select>

				{postAddon &&
					<div className={mapToCssModules('select-input__post', cssModule)}>{postAddon}</div>
				}
			</div>
		</Control>
	);
};

Select.defaultProps = {
	className: null,
	isInline: false,

	id: undefined,

	cssModule: null,

	options: [],
	children: null,

	required: false,

	preAddon: null,
	postAddon: null,

	label: null,
	labelProps: {},

	tooltip: null,
	tooltipProps: {},

	helpText: null,

	error: null,
	status: null,
	statusMessage: null,

	width: null,
	requiredText: null,
};

Select.propTypes = {
	className: PropTypes.string,
	/**
	 * name will be used as the input's id if it's not provided.
	 */
	id: PropTypes.string,
	/**
	 * The name of the input, will also be used as the id.
	 */
	name: PropTypes.string.isRequired,
	/**
	 * Takes options options of the form: { label: <string>, value: <any, ...extraProps }. Ignored if `children` are passed in.
	 */
	options: PropTypes.array,
	/**
	 * You can pass in <option/>s as childre. If children are provided, the `options` prop is ignored.
	 */
	children: PropTypes.node,
	/**
	 * The label of the control.
	 */
	label: PropTypes.node,
	/**
	 * Props to be passed to the label
	 */
	labelProps: PropTypes.object,
	/**
	 * The content of the controls tooltip.
	 */
	tooltip: PropTypes.node,
	/**
	 * Props to be passed to the tooltip
	 */
	tooltipProps: PropTypes.object,
	/**
	 * Help text to display below the field.
	 */
	helpText: PropTypes.node,
	/**
	 * Display something to the left of the field
	 */
	preAddon: PropTypes.node,
	/**
	 * Display something to the right of the field
	 */
	postAddon: PropTypes.node,
	/**
	 * If true, the control will use an inline layout
	 */
	isInline: PropTypes.bool,
	error: PropTypes.node,
	status: PropTypes.oneOf([
		'error',
		'warning',
		'info',
		'success',
	]),
	statusMessage: PropTypes.node,
	required: PropTypes.bool,
	/**
	 * Will be full width if not specified
	 */
	width: PropTypes.oneOf([
		'xl',
		'l',
		'm',
		's',
		'xs',
		'xxs',
	]),
	cssModule: PropTypes.object,
	requiredText: PropTypes.func,
};

export default Select;
