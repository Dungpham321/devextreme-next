import React, { useCallback, useRef, useState } from 'react'
import DataGrid, {
  Column, Paging, Pager, SearchPanel, Editing, Popup, Form, Selection, type DataGridTypes, Item,
  Toolbar, Export
} from 'devextreme-react/data-grid';
import 'devextreme-react/text-area';
import 'devextreme/dist/css/dx.light.css';
import themes from 'devextreme/ui/themes';
import type { LocateInMenuMode, ShowTextMode } from "devextreme/ui/toolbar";
import type { ToolbarItemLocation, ToolbarItemComponent } from "devextreme/common";
import { jsPDF } from 'jspdf';
import { exportDataGrid } from 'devextreme/pdf_exporter';
type ChildProps = {
  dataSource: {};
  keyExpr: string;
  cols: [];
  toolbars: any[];
};
const colMap: Record<string, any> = {
  df: "dataField",
  c: "caption",
  ml: "editorOptions.maxLength",
  ficc: "formItem.cssClass",
  cp: "formItem.colSpan",
  dt: "dataType",
  f: "format",
  v: "visible",
  vi: "visibleIndex",
  fv: "formItem.visible",
  w: "width",
  ft: "falseText",
  tt: "trueText",
  af: "allowFiltering",
  as: "allowSorting",
  d: "editorOptions.disabled",
  ro: "editorOptions.readOnly",
  edmin: "editorOptions.min",
  edmax: "editorOptions.max",
  n: "name",
  fn: "formItem.name",
  en: "editorOptions.name",
  cc: "cssClass",
  a: "alignment",
  ae: "allowEditing",
  gi: "groupIndex",
  ef: "editorOptions.format",
  edf: "editorOptions.displayFormat",
  eumb: "editorOptions.useMaskBehavior",
  eov: "editorOptions.value",
  fx: "fixed",
  fxp: "fixedPosition",
  ect: "editCellTemplate",
  ct: "cellTemplate",
  edph: "editorOptions.placeholder",
  edsc: "editorOptions.showClearButton",
  scv: 'setCellValue',
  ccc: 'calculateCellValue',
  si: 'sortIndex',
  so: 'sortOrder',
  scc: 'showInColumnChooser',
  vr: 'validationRules',
  cl: 'columns',
  fvi: "formItem.visibleIndex",
  edm: "editorOptions.mask",
  edmc: "editorOptions.maskChar",
  edmr: "editorOptions.maskRules",
  mw: "minWidth",
};

const setValueToObject = (obj: any, value: any, path: any) => {
  path = path.split('.');
  if (path.length == 1) {
    obj[path[0]] = value;
  } else {
    var i;
    for (i = 0; i < path.length - 1; i++) {
      if (typeof obj[path[i]] === 'undefined') obj[path[i]] = {};
      obj = obj[path[i]];
    }
    obj[path[i]] = value;
  }
};
const lookUpDisplay = function (item: any, title: any) {
  if (typeof title === 'function') {
    return title(item);
  } else {
    if (Array.isArray(title)) {
      var txt = "";
      title.forEach(function (vl) {
        txt += (txt == "" ? "" : " - ") + item[vl];
      });
      return txt;
    } else {
      return item[title];
    }
  }
};
const buildColumn = (c: any, op: any) => {
  const col: Record<string, any> = { formItem: {}, editorOptions: {} };
  Object.keys(colMap).map(function (k) {
    if (c[k] != null) setValueToObject(col, c[k], colMap[k]);
  });
  if (typeof col.validationRules == 'undefined') col.validationRules = [];
  if (c.hasOwnProperty("lds")) {
    col.lookup = {
      dataSource: c.lds,
      valueExpr: c.lve != null ? c.lve : "ID",
      displayExpr: function (item: any) { return item && lookUpDisplay(item, (c.lde != null ? c.lde : "TEN")) },
    };
    col.editorOptions.showClearButton = true;
  }
  if (op && typeof op.editorOptions !== 'undefined') {
    col.editorOptions = Object.assign(col.editorOptions, op.editorOptions);
    delete op.editorOptions;
  }
  if (op && typeof op.formItem !== 'undefined') {
    col.formItem = Object.assign(col.formItem, op.formItem);
    delete op.formItem;
  }
  Object.assign(col, op || {});
  if (c.hasOwnProperty("rq") && c.rq) col.validationRules.push({ type: "required" });
  return col;
}
const Addcolumn = ({ items }: { items: any[] }) => {
  return (
    <>
      {items.map((item, index) => {
        let ops = item.ops ? { ...item.ops } : {}; // Kiểm tra ops trước khi gán
        delete item.ops;
        const column = buildColumn(item, ops);
        return <Column key={index} {...column}></Column>;
      })}
    </>
  );

};


const Grid_custom = (props: ChildProps) => {
  const toolbarItem = [
    {
      location: "after" as ToolbarItemLocation,
      widget: "dxButton" as ToolbarItemComponent,
      name: 'myGridRefresh',
      locateInMenu: 'auto' as LocateInMenuMode,
      options: {
        icon: "refresh",
        hint: 'Làm mới dữ liệu',
        onClick: function () {

        },
        bindingOptions: {

        },
      }
    },
    {
      location: 'after' as ToolbarItemLocation,
      widget: 'dxButton' as ToolbarItemComponent,
      name: 'myGridDeleteRow',
      locateInMenu: 'auto' as LocateInMenuMode,
      options: {
        text: "Xóa",
        icon: 'trash',
        type: 'danger',
        hint: "Xoá",
        bindingOptions: {
          disabled: false,
          visible: true,
        },
        onClick: function () {

        }
      }
    },
    {
      location: 'after' as ToolbarItemLocation,
      widget: 'dxButton' as ToolbarItemComponent,
      name: 'myGridEditRow',
      locateInMenu: 'auto' as LocateInMenuMode,
      options: {
        text: "Sửa",
        icon: 'edit',
        type: 'default',
        hint: "Sửa",
        bindingOptions: {
          disabled: false,
          visible: true,
        },
        onClick: function () {

        }
      }
    },
    {
      location: 'after' as ToolbarItemLocation,
      widget: 'dxButton' as ToolbarItemComponent,
      name: 'myGridCopy',
      locateInMenu: 'auto' as LocateInMenuMode,
      visible: false,
      options: {
        icon: 'copy',
        hint: 'Sao chép',
        bindingOptions: {
          disabled: false,
          visible: true,
        },
        onClick: function () {

        }
      }
    },
    {
      location: 'after' as ToolbarItemLocation,
      widget: 'dxButton' as ToolbarItemComponent,
      name: 'myGridAddRow',
      locateInMenu: 'auto' as LocateInMenuMode,
      options: {
        text: "Thêm mới",
        icon: 'plus',
        type: 'success',
        hint: "Thêm mới",
        bindingOptions: {
          visible: true,
        },
        onClick: function () {
          addRow();
        }
      }
    },
  ];
  const allowedPageSizes = [10, 100, 200];
  const notesEditorOptions = { height: 100 };
  const [toolbars, settoolbars] = useState(props.toolbars || []);
  const gridRef = useRef(null);
  const addRow = useCallback(() => {
    gridRef.current.instance().addRow();
    gridRef.current.instance().deselectAll();
  }, [gridRef]);
  console.log(gridRef);
  //export
  const exportFormats = ['pdf'];
  const onExporting = (e: DataGridTypes.ExportingEvent) => {
    const doc = new jsPDF();
    exportDataGrid({
      jsPDFDocument: doc,
      component: e.component,
      indent: 5,
    }).then(() => {
      doc.save('Companies.pdf');
    });
  };
  //end
  //Toolbar
  const onToolbarPreparing = (e: DataGridTypes.ToolbarPreparingEvent) => {
    const mergedArray = toolbarItem.concat(toolbars);
    mergedArray.forEach(item => {
      e.toolbarOptions.items?.unshift(item);
    });
  }
  //end 
  return (
    <DataGrid
      dataSource={props.dataSource}
      keyExpr={props.keyExpr}
      showBorders={true}
      columnAutoWidth={true}
      allowColumnReordering={true}
      showColumnLines={true}
      showRowLines={true}
      rowAlternationEnabled={true}
      width={'100%'}
      height={'100%'}
      ref={gridRef}
      onExporting={onExporting}
      onToolbarPreparing={onToolbarPreparing}
    >
      {/* columns */}
      <Addcolumn items={props.cols} />
      {/* end */}

      <Paging defaultPageSize={10} />
      <Pager visible={true} showPageSizeSelector={true} allowedPageSizes={allowedPageSizes} />
      <Selection mode="multiple" selectAllMode={"allPages"} showCheckBoxesMode={"onClick"} />
      <SearchPanel visible={true} placeholder="Tra cứu" width={280} />
      <Editing mode="popup">
        <Popup title="Thêm mới" showTitle={true} width={700} height={525} />
        <Form>
          <Addcolumn items={props.cols} />
        </Form>
      </Editing>
      <Export enabled={true} formats={exportFormats} allowExportSelectedData={true} />
    </DataGrid>
  )
}
export default Grid_custom;

