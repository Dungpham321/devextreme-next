"use client";
import React, { useCallback, useRef, useState } from 'react';
import DropDownBox, { type DropDownBoxTypes } from 'devextreme-react/drop-down-box';
import TreeView, {TreeViewRef, type TreeViewTypes } from 'devextreme-react/tree-view';

interface PropsType {
    data: PropsTypeValue;
}

interface PropsTypeValue {
    value: any;
    setValue(data: any): void,
    column: any
}

const opsGridDropdownTrees:  React.FC<PropsType> = ({data}) => {
    const treeViewRef = useRef<TreeViewRef>(null);
    //const { data: { value: dataValue } } = props;
    const dataValue = data?.value ?? null;
    const initialSelectedRowKeys = dataValue !== null && dataValue !== undefined ? dataValue.split(",") : [];
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
      }, [treeViewRef]);


    const boxOptionChanged = useCallback((e: DropDownBoxTypes.OptionChangedEvent) => {
        if (e.name === 'opened') {
            setIsDropDownOpened(e.value);
        }
    }, []);

    const contentRender = useCallback(() => {
        const treeViewItemSelectionChanged = (args: TreeViewTypes.ItemSelectionChangedEvent) => {
            const value = args.component.getSelectedNodeKeys();
            data?.setValue(value.join(","));
            setTreeBoxValue(value);
        };

        const onTreeItemClick = () => {
            setIsDropDownOpened(false);
        };

        const treeViewOnContentReady = (e: TreeViewTypes.ContentReadyEvent) => {
            e.component.unselectAll();
            treeBoxValue.forEach(function(k: any){
                e.component.selectItem(k);
                e.component.expandItem(k);
            });
        };
        console.log(data?.column["lookup"]["dataSource"]);
        return (
            <TreeView
                ref={treeViewRef}
                dataSource={data?.column["lookup"]["dataSource"]}
                dataStructure="plain"
                keyExpr="MA"
                parentIdExpr="CHUC_NANG"
                selectionMode="multiple"
                displayExpr="TEN"
                rootValue=''
                searchEnabled={true}
                selectByClick={true}
                selectNodesRecursive={true}
                showCheckBoxesMode={"normal"}
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
            valueExpr="MA"
            displayExpr="TEN"
            placeholder="Lựa chọn..."
            showClearButton={true}
            dataSource={data?.column["lookup"]["dataSource"]}
            onValueChanged={syncTreeViewSelection}
            onOptionChanged={boxOptionChanged}
            contentRender={contentRender}
        />
    );
};

export default opsGridDropdownTrees;