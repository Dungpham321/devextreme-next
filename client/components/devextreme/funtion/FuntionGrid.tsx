import { RefObject } from 'react';
import { DataGrid } from 'devextreme-react/data-grid';
import type { DataGridRef } from 'devextreme-react/data-grid';
import applyChangesToData from "devextreme/data/apply_changes";

export const hideGridHeader = (gridRef: RefObject<DataGridRef | null>) => {
  const instance = gridRef?.current?.instance();
  if (!instance) return;
  instance.option('groupPanel.visible', false);
  instance.option('filterRow.visible', false);
  instance.option('filterPanel.visible', false); // tùy bạn
  instance.option('headerFilter.visible', false);
  instance.option('searchPanel.visible', false);
  instance.option('export.enabled', false);
  instance.option('onToolbarPreparing', (e: any) => {
    e.toolbarOptions.items = [];
  });
  instance.repaint();
};
export function getGridDataChanges(gridRef: React.RefObject<any>) {
  const grid = gridRef.current?.instance();
  const allData = grid?.getDataSource()?.items() || [];
  const changes = grid?.option("editing.changes") || [];
  const merged = applyChangesToData(allData, changes, { keyExpr: "_id" });
  return merged;
}

