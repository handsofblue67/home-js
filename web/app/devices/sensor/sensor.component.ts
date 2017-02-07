import { Component, Input, trigger, state, style, transition, animate, group } from '@angular/core'

@Component({
  selector: 'app-sensor',
  template: `<span [@growShrink]="'in'">
    <strong>{{component.name}}:</strong> {{component.controlState}}
    <span *ngIf="component?.units === 'percent'">%</span>
    <span *ngIf="component?.units === 'celsius'">&deg;C</span>
  </span>
  `,
  animations: [
    trigger('growShrink', [
      state('in', style({ transform: 'scale(1)', opacity: 1 })),
      transition('void => *', [
        style({ transform: 'scale(0)', opacity: 0 }),
        group([
          animate('1.3s ease', style({transform: 'scale(1)'})),
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
  private _sensorValue: number

  @Input()
  set component(component: any) {
    this._sensorValue = component.controlState
  }

  constructor() { }

}
