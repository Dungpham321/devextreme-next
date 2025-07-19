"use client";
import React, { useCallback, useRef, useState } from 'react';
import DropDownBox, { type DropDownBoxTypes } from 'devextreme-react/drop-down-box';
import TreeView, { TreeViewRef, type TreeViewTypes } from 'devextreme-react/tree-view';

interface PropsType {
    data: PropsTypeValue;
}

interface PropsTypeValue {
    value: any;
    setValue(data: any): void,
    column: any
}

const opsGridDropdownTree: React.FC<PropsType> = ({ data }) => {
  const treeViewRef = useRef<TreeViewRef>(null);

  const initialSelectedRowKeys = data?.value ?? null;
  const [treeBoxValue, setTreeBoxValue] = useState(initialSelectedRowKeys);
  const [isDropDownOpened, setIsDropDownOpened] = useState(false);

  const syncTreeViewSelection = useCallback((e: DropDownBoxTypes.ValueChangedEvent) => {
    setTreeBoxValue(e.value);
    if (!treeViewRef.current) return;

    if (!e.value) {
      treeViewRef.current.instance().unselectAll();
    } else {
      treeViewRef.current.instance().selectItem(e.value);
    }
  }, []);

  const boxOptionChanged = useCallback((e: DropDownBoxTypes.OptionChangedEvent) => {
    if (e.name === 'opened') {
      setIsDropDownOpened(e.value);
    }
  }, []);

  const contentRender = useCallback(() => {
    const treeViewItemSelectionChanged = (args: TreeViewTypes.ItemSelectionChangedEvent) => {
      const value = args.component.getSelectedNodeKeys();
      data.setValue(value[0]);
      setTreeBoxValue(value[0]);
    };

    const onTreeItemClick = () => {
      setIsDropDownOpened(false);
    };

    const treeViewOnContentReady = (e: TreeViewTypes.ContentReadyEvent) => {
      e.component.selectItem(treeBoxValue);
    };

    return (
      <TreeView
        ref={treeViewRef}
        dataSource={data.column?.lookup?.dataSource}
        keyExpr="_id"
        parentIdExpr="PID"
        dataStructure="plain"
        selectionMode="single"
        displayExpr="NAME"
        selectByClick
        onContentReady={treeViewOnContentReady}
        onItemClick={onTreeItemClick}
        onItemSelectionChanged={treeViewItemSelectionChanged}
      />
    );
  }, [data, treeBoxValue]);

  return (
    <DropDownBox
      opened={isDropDownOpened}
      value={treeBoxValue}
      valueExpr="_id"
      displayExpr="NAME"
      placeholder="Lựa chọn..."
      showClearButton
      dataSource={data.column?.lookup?.dataSource}
      onValueChanged={syncTreeViewSelection}
      onOptionChanged={boxOptionChanged}
      contentRender={contentRender}
    />
  );
};
export default opsGridDropdownTree;