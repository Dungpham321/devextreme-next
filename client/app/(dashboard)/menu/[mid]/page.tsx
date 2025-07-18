"use client";
import React, { useEffect, useState, useRef } from 'react'
import Grid_custom from "@/components/devextreme/Grid_custom";
import { DataSource } from "@/utils/GlobalService";
import DataGrid, { DataGridRef, type DataGridTypes } from 'devextreme-react/data-grid';
import { useRouter, useParams } from 'next/navigation';
interface DataSourceType {
    data: any;
    items: [];
}
export default  function MenuItem() {
    const router = useRouter();
    const params = useParams();
    console.log(params.mid);
    const gridRef = useRef<DataGridRef | null>(null);
    const ChildProps = {
        keyExpr: "_id",
        n: true,
        e: true,
        d: true,
        c: false
    }
    const dataSource = DataSource("HT_MENU_ITEM", ['_id'], ["NAME", "HREF", "PERM", "WEIGHT", "PID", "ICON", "HIDEN"], ["NGAYTAO"],{
         ulo() { return { MID: params.mid } },
    }) as DataSourceType;
    //các cột của lưới
    const col = [
        { df: "NAME", c: "Tên", rq: true, w: 150 },
        { df: "HREF", c: "Đường dẫn" },
        { df: "PID", c: "Cấp cha" },
        { df: "PERM", c: "Quyền" },
        { df: "WEIGHT", c: "Vị trí" },
        { df: "ICON", c: "Biểu tượng" },
        { df: "HIDEN", c: "Ẩn" },
    ]
    return (
        <div className="grid">
            <Grid_custom
                dataSource={dataSource.data}
                keyExpr={ChildProps.keyExpr}
                // @ts-ignore
                cols={col}
                n={ChildProps.n}
                e={ChildProps.e}
                d={ChildProps.d}
                Title={"Các liên kết"}
                ref={gridRef}
                url='HT_MENU_ITEM'
            />
        </div>
    );
}