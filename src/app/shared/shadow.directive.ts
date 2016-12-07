import { Directive, ElementRef, Input, Renderer } from '@angular/core'

@Directive({ selector: '[shadowOnScoll]' })
export class ShadowOnScrollDirective {
    private _atTop: boolean = true
    @Input() set scrollHeight(scrollHeight: number) {
        this._atTop = scrollHeight ? false : true
    }
    constructor(el: ElementRef, renderer: Renderer) {
       renderer.setElementStyle(el.nativeElement, 'box-shadow', '0 0 4px rgba(0,0,0,.14),0 4px 8px rgba(0,0,0,.28)')
    }
}