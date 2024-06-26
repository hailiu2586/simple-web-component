import * as React from 'react';
import { provideReactWrapper } from '@microsoft/fast-react-wrapper';
import { Toast } from './toast';
const { wrap } = provideReactWrapper(React);
export const ToastReact = wrap(Toast);
