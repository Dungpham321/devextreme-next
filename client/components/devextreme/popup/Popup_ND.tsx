'use client';
import React, { useRef, useEffect } from 'react';
import Popup from 'devextreme-react/popup';
import { Button } from 'devextreme-react/button';
import DataGrid, { Column, DataGridRef, type DataGridTypes } from 'devextreme-react/data-grid';
import Grid_custom from "@/components/devextreme/Grid_custom";
import { hideGridHeader } from '../funtion/FuntionGrid';
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
}
const ChildProps = {
    keyExpr: "_id",
    n: false,
    e: false,
    d: false,
    c: false
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
    cancelText = 'Hủy'
}) => {
    const gridRef = useRef<DataGridRef | null>(null);
    const data = [
        { _id: 1, ten_dang_nhap: 'Nguyễn Văn A', ho_ten: 'a@example.com' },
        { _id: 2, ten_dang_nhap: 'Trần Thị B', ho_ten: 'b@example.com' },
        { _id: 3, ten_dang_nhap: 'Lê Văn C', ho_ten: 'c@example.com' }
    ];
    const col = [
        { df: "ten_dang_nhap", c: "Tên đăng nhập", rq: true, w: 150  ,ae: false},
        { df: "ho_ten", c: "Họ tên"  ,ae: false},
        { df: "chon", c: "Chọn",dt:'boolean' ,ae: true}
    ]
    useEffect(() => {
        setTimeout(() => {
            hideGridHeader(gridRef);
            gridRef.current?.instance().option('editing.allowUpdating',true);
        }, 200);
    }, [visible]);

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
                        dataSource={data}
                        keyExpr={ChildProps.keyExpr}
                        // @ts-ignore
                        cols={col}
                        n={ChildProps.n}
                        e={ChildProps.e}
                        d={ChildProps.d}
                        Title={""}
                        ref={gridRef}
                        selecttion='none'
                        modeEditting='cell'
                        url=''
                    />
                </div>

                {/* Footer nút xác nhận */}
                {showFooter && (
                    <div className="flex justify-end mt-4 gap-2 px-4 py-2">
                        <Button text={cancelText} onClick={onClose} type="normal" />
                        <Button text={confirmText} onClick={() => { onConfirm?.(); onClose(); }} type="success" />
                    </div>
                )}
            </div>
        </Popup>
    );
};

export default PopupND;


