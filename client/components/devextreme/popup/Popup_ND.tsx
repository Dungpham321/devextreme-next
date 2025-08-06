'use client';
import React, { useRef, useEffect, useMemo, useState } from 'react';
import Popup from 'devextreme-react/popup';
import { Button } from 'devextreme-react/button';
import DataGrid, { Column, DataGridRef, type DataGridTypes } from 'devextreme-react/data-grid';
import Grid_custom from "@/components/devextreme/Grid_custom";
import { hideGridHeader } from '../funtion/FuntionGrid';
import { getGridDataChanges } from '../funtion/FuntionGrid';
import { DataSource, GetData } from '@/utils/GlobalService';
interface PopupNDProps {
    visible: boolean;
    title?: string;
    width?: number;
    height?: number;
    children?: React.ReactNode;
    onClose: () => void;
    showCloseButton?: boolean;
    hideOnOutsideClick?: boolean;
    showFooter?: boolean;
    onConfirm?: () => void;
    confirmText?: string;
    cancelText?: string;
    parm?: par | null;
}
const ChildProps = {
    keyExpr: "_id",
    n: false,
    e: false,
    d: false,
    c: false
}
interface par {
    nguoidung_id: string,
    doituong_id: string,
    doituong_loai: string,
    chucnang: string
}
interface DataSourceType {
    data: any;
    items: [];
}
const PopupND: React.FC<PopupNDProps> = ({
    visible,
    title = 'Lựa chọn',
    width = 400,
    height = 300,
    onClose,
    showCloseButton = true,
    hideOnOutsideClick = true,
    showFooter = false,
    onConfirm,
    confirmText = 'Đồng ý',
    cancelText = 'Hủy',
    parm
}) => {
    const [dataSourced, setdataSourced] = useState([]);
    const gridRef = useRef<DataGridRef | null>(null);
   // const dataSource = DataSource("user", ['_id'], ["ten_dang_nhap", "ho_ten"], ["ngaytao"]) as DataSourceType;
    //const dataMemo = useMemo(() => { return dataSource.data }, [visible]);
    const GetDataSource = () => {
        GetData("HT_NGUOIDUNG_SD/List",{
            NGUOIDUNG_ID: parm?.nguoidung_id, 
            DOITUONG_ID: parm?.doituong_id,
            CHUCNANG: parm?.chucnang,
            DOITUONG_LOAI: parm?.doituong_loai
        }).then((response: any) => {
            setdataSourced(response.Data);
        });
    }
    const col = [
        { df: "_id", c: "Mã", w: 150, ae: false, v:false},
        { df: "TEN_DANG_NHAP", c: "Tên đăng nhập", ae: false },
        { df: "CHON", c: "Chọn", dt: 'boolean',w: 80, ae: true }
    ]
    useEffect(() => {
       GetDataSource();
        setTimeout(() => {
            hideGridHeader(gridRef);
            gridRef.current?.instance().option('editing.allowUpdating', true);
        }, 200);
    }, [visible]);
    
    var onConfirmD = () => {
        const megger = getGridDataChanges(gridRef);
        ///console.log("All", megger);
    }
    return (
        <Popup
            visible={visible}
            onHiding={onClose}
            showCloseButton={showCloseButton}
            title={title}
            width={width}
            height={height}
            dragEnabled={true}
            hideOnOutsideClick={hideOnOutsideClick}
        >
            <div className="flex flex-col h-full">
                {/* Nội dung chính: chiếm hết chiều cao còn lại */}
                <div className="flex-1 min-h-0 overflow-hidden">
                    <Grid_custom
                        dataSource={dataSourced}
                        keyExpr={ChildProps.keyExpr}
                        // @ts-ignore
                        cols={col}
                        n={ChildProps.n}
                        e={ChildProps.e}
                        d={ChildProps.d}
                        Title={""}
                        ref={gridRef}
                        selecttion='none'
                        modeEditting='batch'
                        url=''
                    />
                </div>

                {/* Footer nút xác nhận */}
                {showFooter && (
                    <div className="flex justify-end mt-4 gap-2 px-4 py-2">
                        <Button text={cancelText} onClick={onClose} type="normal" />
                        <Button text={confirmText} onClick={() => { onConfirmD?.(); onClose(); }} type="success" />
                    </div>
                )}
            </div>
        </Popup>
    );
};

export default PopupND;


