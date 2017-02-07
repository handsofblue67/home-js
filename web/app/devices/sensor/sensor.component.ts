import { Component, Input, trigger, state, style, transition, animate, group } from '@angular/core'

@Component({
  selector: 'app-sensor',
  template: `<span [@growShrink]="'in'">
    <strong>{{_component.name}}:</strong> {{_component.controlState}}
    <span [ngSwitch]="_component?.units">
      <span *ngSwitchCase="'percent'">%</span>
      <span *ngSwitchCase="'celsius'">&deg;C</span>
    </span>
  </span>`,
  animations: [
    trigger('growShrink', [
      state('in', style({ transform: 'scale(1)', opacity: 1 })),
      transition('void => *', [
        style({ transform: 'scale(0)', opacity: 0 }),
        group([
          animate('1.3s ease', style({ transform: 'scale(1)' })),
          animate('1.3s ease', style({ opacity: 1 })),
        ])
      ]),
      transition('* => void', [
        group([
          animate('1.3s ease', style({ transform: 'scale(0)' })),
          animate('1.3s ease', style({ opacity: 0 }))
        ])
      ])
    ])
  ],
})
export class SensorComponent {
  private _component: any

  @Input()
  set component(component: any) {
    this._component = component
  }

  constructor() { }

}
