import React, { useCallback } from 'react';

import { ValidationRule } from 'devextreme-react/common';
import {
  Form,
  Item, GroupItem, Label,
  type FormTypes,
} from 'devextreme-react/form';
import 'devextreme-react/text-area';

const validationRules: {
  taikhoan: ValidationRule[],
  matkhau: ValidationRule[]
} = {
  taikhoan: [
    { type: 'required', message: 'Tài khoản là thông tin cần nhập.' },
  ],
  matkhau: [
    { type: 'required', message: 'Mật khẩu là thông tin cần nhập' },
  ],
};

export const Form_custom = () => {
  return (
    <div>Form_custom</div>
  )
}
