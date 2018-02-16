const mergeArraysOnProperty = (targetArray, sourceArray, uniqueIdentifier) => {
	const output = [];
	let i = 0;
	let	j = 0;
	let	k = 0;
	while (i < targetArray.length && j < sourceArray.length) {
		// If the unique identifier is equal to the incoming value, overwrite the object.
		// Don't use greater than or less than as this may be used with more than just 'uid'.
		if (targetArray[i][uniqueIdentifier] === sourceArray[j][uniqueIdentifier]) {
			output[k] = { ...targetArray[i], ...sourceArray[j] };
			i += 1;
			j += 1;
		} else {
			// Otherwise, use what already exists.
			output[k] = targetArray[i];
			i += 1;
		}
		k += 1;
	}

	while (i < targetArray.length) {
		output[k] = targetArray[i];
		i += 1;
		k += 1;
	}

	while (j < sourceArray.length) {
		output[k] = { ...sourceArray[j] };
		j += 1;
		k += 1;
	}
	return output;
};

const validateRows = (rows) => {
	const uniquePrice = {};
	return rows.map((row) => {
		const result = { ...row, error: {}, warning: {} };
		if (uniquePrice[row.price]) {
			result.error.price = 'ERROR';
			uniquePrice[row.price].error.price = 'ERROR';
		} else {
			uniquePrice[row.price] = result;
		}
		return result;
	});
};

export default (state = { rowData: [], rowSelection: [] }, action) => {
	switch (action.type) {
		case 'ROW_DATA_CHANGED':
			return {
				...state,
				rowData: action.rowData,
			};
		case 'ROW_SELECTION_CHANGED':
			return {
				...state,
				rowSelection: action.rowSelection,
			};
		case 'UPDATE_LINES': {
			const newRowData = mergeArraysOnProperty(state.rowData, action.lines, 'symbol');
			const finalRowData = validateRows(newRowData);

			return {
				...state,
				rowData: finalRowData,
			};
		}
		default:
			return state;
	}
};
