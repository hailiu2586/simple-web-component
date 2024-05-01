/// <reference types="react" />
declare namespace SimpleReactWebComponent {
  interface ToastReactProps {
    bread: string;
    slices: number;
  }
  const ToastReact: React.FC<ToastReactProps>;
}