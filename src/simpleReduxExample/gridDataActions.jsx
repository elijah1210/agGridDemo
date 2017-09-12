export const updateRowData = rowData => ({
	type: 'ROW_DATA_CHANGED',
	rowData,
});

export const updateRowSelection = rowSelection => ({
	type: 'ROW_SELECTION_CHANGED',
	rowSelection,
});
