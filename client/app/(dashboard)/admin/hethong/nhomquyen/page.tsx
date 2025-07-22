"use client";
import React, { useEffect, useState, useRef, useMemo, Children } from 'react'
import Grid_custom from "@/components/devextreme/Grid_custom";
import { DataSource, DataSourceP } from "@/utils/GlobalService";
import DataGrid, { Column, DataGridRef, type DataGridTypes } from 'devextreme-react/data-grid';
import { useRouter, useParams } from 'next/navigation';
import PopupND from '@/components/devextreme/popup/Popup_ND';

interface DataSourceType {
    data: any;
    items: [];
}
export default function NhomQuyen() {
    const router = useRouter();
    const gridRef = useRef<DataGridRef | null>(null);
    const [showPopup, setShowPopup] = useState(false);
    const ChildProps = {
        keyExpr: "_id",
        n: true,
        e: true,
        d: true,
        c: false
    }
    const dataTrangThai: any[] = [
        { id: 0, ten: "Không sử dụng" },
        { id: 1, ten: "Sử dụng" }
    ]
    const dataSource = DataSource("HT_NHOMQUYEN", ['_id'], ["TEN", "MO_TA", "VI_TRI", "TRANG_THAI", "ngaytao"], ["ngaytao"]) as DataSourceType;
    const dataMemo = useMemo(() => { return dataSource.data }, []);
    useEffect(() => {
        gridRef.current?.instance().option("editing.form.colCount", 1);
        gridRef.current?.instance().option("onInitNewRow", (e) => {
            e.data.TRANG_THAI = 1;
        });
    }, []);
    //các cột của lưới
    const col = [
        { df: "TEN", c: "Tên", rq: true, w: 150 },
        { df: "MO_TA", c: "Mô tả" },
        { df: "VI_TRI", c: "Vị trí", rq: true, dt: 'number' },
        { df: "TRANG_THAI", c: "Trạng thái", lds: dataTrangThai, lve: 'id', lde: 'ten' },
        {
            c: "Phân quyền", w: 100, ops: {
                type: 'buttons',
                name: 'btnPhanQuyen',
                buttons: [
                    {
                        text: "Phân quyền",
                        icon: "detailslayout",
                        name: "config",
                        onClick(e: DataGridTypes.ColumnButtonClickEvent) {
                            if (e.row) router.push("/admin/hethong/nhomquyen/" + e.row.data._id);
                        }
                    }
                ]
            }

        },
        {
            c: "Người dùng", w: 100, ops: {
                type: 'buttons',
                name: 'btnNguoiDung',
                buttons: [
                    {
                        text: "Người dùng",
                        icon: "fa-solid fa-user",
                        name: "config",
                        onClick(e: DataGridTypes.ColumnButtonClickEvent) {
                            // if (e.row) router.push("/admin/hethong/nhomquyen/" + e.row.data._id);
                            setShowPopup(true);
                        }
                    }
                ]
            }

        },
    ]

    return (
        <div className="">
            <Grid_custom
                dataSource={dataMemo}
                keyExpr={ChildProps.keyExpr}
                // @ts-ignore
                cols={col}
                n={ChildProps.n}
                e={ChildProps.e}
                d={ChildProps.d}
                Title={"Nhóm quyền"}
                ref={gridRef}
                popupHeight={400}
                popupWidth={400}
                url='HT_NHOMQUYEN'
            />
            <div className='popup'>
                <PopupND visible={showPopup} onClose={() => setShowPopup(false)} showFooter={true} onConfirm={() => console.log('Đã xác nhận')} height={500} width={800}></PopupND>
            </div>
        </div>
    );
}