'use client';
import React, { useCallback, useRef, useState, useMemo, useEffect } from 'react';
import TreeView, { TreeViewRef, type TreeViewTypes } from 'devextreme-react/tree-view';
import { useRouter, useParams } from 'next/navigation';
import { DataSource, DataSourceP } from "@/utils/GlobalService";
import SelectBox from 'devextreme-react/select-box';
import { Button, ButtonRef } from 'devextreme-react/button';
import themes from 'devextreme/ui/themes';
import { GetData } from '@/utils/GlobalService';

interface DataSourceType {
    data: any;
    items: [];
}
const PhanQuyenPage = () => {
    const params = useParams();
    const treeViewRef = useRef<TreeViewRef>(null);
    const btnRef = useRef<ButtonRef>(null);
    const autoSelect = useRef(false);
    const [RID, setRID] = useState(params.pid);
    const dataListQuyen = DataSourceP("HT_NHOMQUYEN_QUYEN/ListQUYEN", ["MA"], ["MA", "TEN", "CHUC_NANG"], ["SAP_XEP"], {
        ca: true
    }) as DataSourceType
    const dataListNhomQuyen = DataSourceP("HT_NHOMQUYEN/List", ["_id"], ["_id", "TEN"], ["TEN"], {
        ca: true
    }) as DataSourceType
    const loadData = () => {
        if (typeof treeViewRef === 'undefined') return;
        setTimeout(() => {
            treeViewRef.current?.instance().option('visible', true)
        }, 500);
        if (typeof treeViewRef !== 'undefined') treeViewRef.current?.instance().unselectAll();
        btnRef.current?.instance().option('disabled', true);
        GetData('HT_NHOMQUYEN_QUYEN/List', { RID: RID }).then((reponse: any) => {
            const items = reponse.Data;
            const nodes: any = treeViewRef.current?.instance().getNodes();
            autoSelect.current = true;
            items.forEach((item: any) => {
                let hasChild = true;
                for (const n of nodes) {
                    if (item.QUYEN === n.key && (n.children?.length ?? 0) !== 0) {
                        hasChild = false;
                        break;
                    }
                }
                if (hasChild) {
                    treeViewRef.current?.instance().selectItem(item.QUYEN);
                }
            });
            autoSelect.current = false;

        });
    }
    useEffect(() => {
        loadData()
    }, [RID]);

    return (
        <div>
            <div className="w-auto">
                <div className='Title_content text-lg'>
                    Phân quyền
                </div>
                <div className="flex items-center mb-2 mt-2.5">
                    <label className="min-w-[120px] text-left label-text">
                        Nhóm quyền
                    </label>
                    <SelectBox
                        id="my-selectbox"
                        dataSource={dataListNhomQuyen.data}
                        valueExpr="_id"
                        displayExpr="TEN"
                        value={RID}
                        width={500}
                        searchEnabled={true}
                        onSelectionChanged={(e) => {
                            const selected = e.selectedItem._id;
                            setRID(selected);
                            if (typeof RID !== 'undefined') {
                                setTimeout(() => {
                                    loadData();
                                }, 200);
                            } else {
                                loadData();
                            }
                        }}
                    />
                    {/* lưu */}
                    <Button className='ml-2'
                        text="Lưu lại"
                        type='success'
                        ref={btnRef}
                        //disabled= {true}
                        onClick={(e)=>{

                        }}
                        
                    />
                </div>
                <TreeView
                    dataSource={dataListQuyen.data}
                    dataStructure="plain"
                    keyExpr="MA"
                    displayExpr="TEN"
                    parentIdExpr="CHUC_NANG"
                    rootValue=""
                    showCheckBoxesMode="normal"
                    selectionMode="multiple"
                    selectByClick={true}
                    selectNodesRecursive={true}
                    searchEnabled={true}
                    noDataText="không có dữ liệu"
                    height={320}
                    ref={treeViewRef}
                    visible={true}
                    onItemSelectionChanged={(e)=>{
                       // if(!autoSelect.current)  {
                            btnRef.current?.instance().option('disabled', false);
                            btnRef.current?.instance().repaint();
                        //}
                    }}
                />
            </div>
        </div>
    );
};

export default PhanQuyenPage;
