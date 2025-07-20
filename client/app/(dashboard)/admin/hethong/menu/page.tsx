"use client";
import React, { useEffect, useState, useRef } from 'react'
// import DataGrid, { DataGridRef, Column, Pager, Paging, Editing, Texts, RequiredRule, type DataGridTypes } from 'devextreme-react/data-grid';
import { getUser } from "@/connect/ApiContext";
import Image from "next/image";
import Grid_custom from "@/components/devextreme/Grid_custom";
import type { LocateInMenuMode, ShowTextMode } from "devextreme/ui/toolbar";
import type { ToolbarItemLocation, ToolbarItemComponent } from "devextreme/common";
import { DataSource } from "@/utils/GlobalService";
import DataGrid, { DataGridRef, type DataGridTypes } from 'devextreme-react/data-grid';
import { useRouter } from 'next/navigation';
interface DataSourceType {
  data: any;
  items: [];
}
const MenuPage = () => {
  const router = useRouter();
  const gridRef = useRef<DataGridRef | null>(null);
  const [data, setData] = useState<any>(null);
  const dataSource = DataSource("HT_MENU", ['_id'], ["ma", "ten", "mota", "ngaytao"], ["ngaytao"]) as DataSourceType;
  useEffect(() => {
    gridRef.current?.instance().option("editing.form.colCount", 1);
    // gridRef.current?.instance().option("onInitNewRow", (e) => {

    // });
  }, []);
  const ChildProps = {
    dataSource: data,
    keyExpr: "_id",
    n: true,
    e: true,
    d: true,
    c: false
  }
  //các cột của lưới
  const col = [
    { df: "ma", c: "Mã menu", rq: true, w: 150 },
    { df: "ten", c: "Tên menu", rq: true },
    { df: "ngaytao", c: "Ngày tạo", fv: false, dt: 'date', f: 'dd/MM/y', w: 200 },
    { df: "mota", c: "Mô tả" },
    {
      c: "Liên kết", w: 100, ops:{
        type: 'buttons',
        buttons: [
        {
          text: "Cấu hình",
          icon: "detailslayout",
          name: "config",
          onClick(e: DataGridTypes.ColumnButtonClickEvent) {
            if (e.row) router.push("/admin/hethong/menu/" + e.row.data._id);
          }
        }
      ]
      }
      
    },

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
        Title={"Quản lý menu"}
        popupHeight={300}
        popupWidth={500}
        ref={gridRef}
        url='HT_MENU'
      />
    </div>
  )
}
export default MenuPage