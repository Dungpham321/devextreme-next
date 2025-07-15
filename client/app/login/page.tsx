"use client";
import React, { useRef} from 'react'
import Style from './login.module.css';
import Form, {
    ButtonItem,
    GroupItem,
    SimpleItem,
    Label,
    CompareRule,
    EmailRule,
    PatternRule,
    RangeRule,
    RequiredRule,
    StringLengthRule,
    AsyncRule,
    CustomRule,
    type FormTypes,
    Item,
    FormRef,
} from 'devextreme-react/form';
import 'devextreme-react/text-area';
import 'devextreme-react/autocomplete';
import 'devextreme-react/date-range-box';
import 'devextreme/dist/css/dx.light.css';
import { Login } from '@/connect/ApiContext';
import { SetCookie } from '@/components/auth/cookies';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/devextreme/Toast_custom';
const passwordOptions = {
    mode: 'password',
    placeholder: 'Nhập mật khẩu', // Optional: add a placeholder
};
const taikhoanOptions = {
    placeholder: 'Nhập tài khoản'
}
const formData = {
    ten_dang_nhap: null,
    mat_khau: null
}
const login = () => {
    const router = useRouter();
    const formRef = useRef<FormRef>(null);
    const { triggerToast } = useToast();
    const submitButtonOptions = {
        type: "success",
        text: "Đăng nhập",
        onClick: function () {
            const validationResult = formRef.current?.instance().validate();
            if (validationResult?.isValid) {
                Login("login",formData).then((reponse) => {
                    var accessToken = reponse.Data.data;
                    localStorage.setItem('user', JSON.stringify(accessToken));
                    SetCookie(accessToken.Accesstoken);
                    router.push('/');
                    triggerToast('Đăng nhập thành công', 'success');
                });
                Object.assign(formData, {ten_dang_nhap:'',mat_khau:''})
                formRef.current?.instance().repaint();

            }
        }
    };
    return (
        <div className={Style.login} id='form_container'>
            <div className='bg-white bg-opacity-90 backdrop-blur-md rounded-lg shadow-lg p-8 w-[400px]'>
                <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">Đăng nhập</h2>
                <Form formData={formData} ref={formRef} labelLocation={'top'} >
                    <SimpleItem dataField="ten_dang_nhap" editorType="dxTextBox" editorOptions={taikhoanOptions}>
                        <Label text='Tên đăng nhập' />
                        <RequiredRule message="Tên đăng nhập là thông tin cần nhập" />
                    </SimpleItem>
                    <SimpleItem dataField="mat_khau" editorType="dxTextBox" editorOptions={passwordOptions}>
                        <Label text='Mật khẩu' />
                        <RequiredRule message="Mật khẩu là thông tin cần nhập" />
                    </SimpleItem>
                    <Item itemType="button" buttonOptions={submitButtonOptions} horizontalAlignment={'center'} />
                </Form>
            </div>
        </div>

    )
}

export default login