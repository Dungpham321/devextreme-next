"use client";
import React, { useEffect, useState, useRef, useMemo } from 'react'
import Grid_custom from "@/components/devextreme/Grid_custom";
import { DataSource, DataSourceP } from "@/utils/GlobalService";
import DataGrid, { DataGridRef, type DataGridTypes } from 'devextreme-react/data-grid';
import { useRouter, useParams } from 'next/navigation';
import opsGridDropdownTree from '@/components/devextreme/opsGridDropdownTree';
import { tree } from 'next/dist/build/templates/app-page';
import opsGridDropdownTrees from '@/components/devextreme/opsGridDropdownTrees';
interface DataSourceType {
    data: any;
    items: [];
}
export default function MenuItem() {
    const router = useRouter();
    const params = useParams();
    const gridRef = useRef<DataGridRef | null>(null);
    const ChildProps = {
        keyExpr: "_id",
        n: true,
        e: true,
        d: true,
        c: false
    }
    const dataSource = DataSource("HT_MENU_ITEM", ['_id'], ["NAME", "HREF", "PERM", "WEIGHT", "PID", "ICON", "HIDEN"], ["ngaytao"], {
        ulo() { return { MID: params.mid } },
        bi(values: any) {
            values.MID = params.mid;
            //if (values.PERM != null && Array.isArray(values.PERM)) values.PERM = values.PERM.join(",");
        },
        bu(key: any, values: any) {
            //if (values.PERM != null && Array.isArray(values.PERM)) values.PERM = values.PERM.join(",");
        },
    }) as DataSourceType;
    //dataSourcePs
    const dataCapCha = useMemo(() => {
        return DataSourceP("HT_MENU_ITEM/List", ["_id"], ["NAME", "PID"], ["PID", "WEIGHT"], {
            ulo() { return { MID: params.mid } },
            ca: true
        }) as DataSourceType
    }, [params.mid]);

    const dataPerm = useMemo(() => {
        return DataSourceP("HT_MENU_ITEM/Perm", ["MA"], ["MA", "TEN", "NHOM_QUYEN", "CHUC_NANG"], ["SAP_XEP"], {
            ca: true
        }) as DataSourceType
    }, []);
    useEffect(() => {
        // gridRef.current?.instance().option("editing.form.colCount", 1);
        gridRef.current?.instance().option("onInitNewRow", (e) => {
            e.data.HIDEN = false;
        });
    }, []);
    //các cột của lưới
    const col = [
        { df: "NAME", c: "Tên", rq: true, w: 150 },
        { df: "HREF", c: "Đường dẫn" },
        { df: "PID", c: "Cấp cha", lds: dataCapCha.data, lde: "NAME", lve: "_id", ops: { editCellComponent: opsGridDropdownTree } },
        {
            df: "PERM", c: "Quyền", lds: dataPerm.data, lve: 'MA', lde: 'TEN',
            ops: {
                cellRender: function (cell: any) {
                    let str = "";
                    if (cell.value) {
                        var ids = cell.value.split(",");
                        ids.forEach(function (vl: string) {
                            var vls = vl.split(";");
                            str += (str == "" ? "" : ", ") + vls[0];
                        });
                        return str;
                    }
                },
                editCellComponent:opsGridDropdownTrees
            }
        },
        { df: "WEIGHT", c: "Vị trí", rq: true, dt: 'number'},
        { df: "ICON", c: "Biểu tượng" },
        { df: "HIDEN", c: "Ẩn", dt: 'boolean' },
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