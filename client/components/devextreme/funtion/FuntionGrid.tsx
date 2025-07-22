import { RefObject } from 'react';
import { DataGrid } from 'devextreme-react/data-grid';
import type { DataGridRef } from 'devextreme-react/data-grid';

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
