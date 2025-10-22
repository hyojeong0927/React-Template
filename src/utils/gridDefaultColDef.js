export const getDefaultColDef = (mergeFields = []) => ({
  tooltipComponent: 'customTooltip',
  sortable: true,
  resizable: true,
  editable: true,
  cellClassRules: {
    'hide-duplicate-cell': params => {
      const { node, api, data } = params;
      if (node.rowIndex === 0) return false;

      const prevNode = api.getDisplayedRowAtIndex(node.rowIndex - 1);
      return mergeFields.some(field => prevNode?.data?.[field] === data[field]);
    },
  },
});
