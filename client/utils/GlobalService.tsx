// utils/customDataSource.ts
import CustomStore from 'devextreme/data/custom_store';
import axiosAuth from '@/utils/Axios';
const URL_API = process.env.NEXT_PUBLIC_URL_API;

interface LoadOptions {
    fields: string;
    keys: string;
    defaultSort: string;
    sort?: string;
    filter?: string;
    skip: number;
    take: number;
    dataField: string;
    searchOperation?: string;
    searchValue?: string;
    requireTotalCount: boolean;
}

interface LoadOptionsP {
    fields: string;
    keys: string;
    defaultSort: string;
    requireTotalCount: boolean;
}

interface RequestResult {
    Data: ResultData | any;
}

interface ResultData {
    items: any;
    totalCount: number;
}
export async function GetData(url: string, data: object | null) {
    let resData;
    let status = 0;
    await axiosAuth.get(URL_API + url, {params: data}).then(function(response){
        resData = response.data;
    }).catch((resp) => {
        status = resp.status;
    });
    //if(status == 401) await axios.post('/dangxuat').then(function(response){});
    return resData;
}
export async function PostData(url: string, data: object | null) {
    let resData;
    await axiosAuth.post(URL_API + url, data).then(function(response){
        resData = response.data;
    });
    return resData;
}

export async function PutData(url: string, data: object | null) {
    let resData;
    await axiosAuth.put(URL_API + url, data).then(function(response){
        resData = response.data;
    });
    return resData;
}

export async function DeleteData(url: string, data: object | null) {
    let resData;
    await axiosAuth.delete(URL_API + url, {data: data}).then(function(response){
        resData = response.data;
    });
    return resData;
}
export async function OnLoad (loadOptions: any, url: string, fields: any, keys: any, defaultSort: any, exParamerter: any) {
    let parameters = {
        fields: JSON.stringify(fields),
        keys: JSON.stringify(keys),
        defaultSort: JSON.stringify(defaultSort),
        sort: loadOptions.sort ? JSON.stringify(loadOptions.sort) : null,
        filter: loadOptions.filter ? JSON.stringify(loadOptions.filter) : null,
        skip: loadOptions.skip,
        take: loadOptions.take,
        dataField: loadOptions.dataField,
        searchOperation: loadOptions.searchOperation ? loadOptions.searchOperation : null,
        searchValue: loadOptions.searchValue ? loadOptions.searchValue : null,
        requireTotalCount: loadOptions.requireTotalCount || true
    } as LoadOptions;
    Object.assign(parameters, exParamerter || {});
    const result: RequestResult | undefined = await GetData(url, parameters);
    return result ? { data: result["Data"]["items"], totalCount: result["Data"]["totalCount"] } : result;
}
export async function OnLoadP (loadOptions: any, url: string, fields: any, keys: any, defaultSort: any, exParamerter: any) {
    var parameters = {
        fields: JSON.stringify(fields),
        keys: JSON.stringify(keys),
        defaultSort: JSON.stringify(defaultSort),
        requireTotalCount: false
    } as LoadOptionsP;
    Object.assign(parameters, exParamerter || {});
    const result: RequestResult | undefined = await GetData(url, parameters);
    return result ? result["Data"]["items"] : result;
};
export function DataSource (u: any, k: any, f: any, s: any, exOps = {}) {//url, key, field, sort, ex ops
    let op = {
        ul: "/List",
        ulo: function () { return null },
        bl: function () { },
        al: function (response: any) { },
        uu: "",
        uuo: function () { return null },
        bu: function (key: any, values: any) { },
        au: function (response: any) { },
        ui: "/Create",
        uio: function () { return null },
        bi: function (values: any) { },
        ai: function (response: any) { },
        ca: true,
        bk: undefined,
        err: function (error: any) { },
    };
    op = Object.assign(op, exOps);
    const data = {items: [], data: {}};
    data.data = new CustomStore({
        key: k.length == 1 ? k[0] : k,
        async load (loadOptions) {            
            op.bl();
            let result = await OnLoad(loadOptions, u + op.ul, f, k, s, op.ulo());
            if(result) data.items = result["data"];
            else throw 'Lỗi tải dữ liệu';
            op.al(result);
            return result;
        },
        async update (key, values) {
            var key_url = key;
            if (typeof key === 'object') {
                key_url = "";
                Object.keys(key).map(function (oKey) {
                    key_url += (key_url != "" ? "/" : "") + encodeURIComponent(key[oKey]);
                });
            } else {
                key_url = encodeURIComponent(key_url);
            }
            op.bu(key, values);
            let result = await PutData(u + op.uu + "/" + key_url, values);
            return result;
        },
        async insert (values) {
            op.bi(values);
            let result = await PostData(u + op.ui, values);
            op.ai(result);
            return result;
        },
        byKey: op.bk,
        cacheRawData: op.ca,
        errorHandler: (error:any) => {  op.err(error); }
    });
    return data;
};
export function DataSourceP (u: any, k: any, f: any, s: any, exOps = {}) {//url, key, field, sort, ex ops
    let op = {
        ulo: function () { return null; },
        bl: function () { },
        al: function (response: any) { },
        lm: "raw",
        ca: true,
        bk: undefined,
    };
    op = Object.assign(op, exOps);
    const data = {items: [], data: {}};
    data.data = new CustomStore({
        key: k.length == 1 ? k[0] : k,
        loadMode: "raw",
        async load (loadOptions) {
            op.bl();
            let result = await OnLoadP(loadOptions, u, f, k, s, op.ulo());
            if(result) data.items = result["data"];
            else throw 'Lỗi tải dữ liệu';
            op.al(result);
            return result;
        },
        byKey: op.bk,
        cacheRawData: op.ca
    });
    return data;
};
// export function createCustomDataSource(url: string, extraParams: { userId?: string; status?: string }) {
//     return new CustomStore({
//         key: '_id',
//         load: async (loadOptions: LoadOptions<any>) => {
//             const params: string[] = [];
//             const keys: (keyof LoadOptions<any>)[] = ['skip', 'take', 'sort', 'filter'];
//             keys.forEach((key) => {
//                 if (loadOptions[key]) {
//                     params.push(`${key}=${JSON.stringify(loadOptions[key])}`);
//                 }
//             });
//             const query = params.join('&');
       
//             try {
//                 const response = await axiosAuth.get(URL_API + url + `/List?${query}`);
//                 return {
//                     data: response.data.data,
//                     totalCount: response.data.totalCount,
//                 };
//             } catch (error) {
//                 throw 'Data loading error';
//             }
//         },
//     });
// }
