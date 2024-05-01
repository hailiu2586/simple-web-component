import { customElement, html, css, FASTElement, attr } from '@microsoft/fast-element';

const template = html`<div>Toasting ${x => x.slices} slice of ${x => x.bread}</div>`;
const styles = css`:host { display: block; }`;

@customElement({ name: 'toast-oven', template, styles })
export class Toast extends FASTElement {
    @attr slices = 2;
    @attr bread = 'rye';
} 