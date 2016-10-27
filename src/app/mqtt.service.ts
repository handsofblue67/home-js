import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http'

import { Observable } from 'rxjs/Observable'
import './shared'

import * as mqtt from 'mqtt'

@Injectable()
export class MqttService {
  client: mqtt.Client;

  constructor() {
    // this.getBroker()
      // .subscribe(broker => this.client = mqtt.connect(broker).handleMessage())
    // mqtt.connect('')
  }

  getBroker(): Observable<string> {
    return http.get('broker')
      .map(brokerURL => brokerURL)
      .catch(this.handleError)
  }


  private handleError(err: any) {
    let errMsg = (err.message) ? err.message :
      err.status ? `${err.status} - ${err.statusTest}` : 'Server error'
    return Observable.throw(errMsg)
  }
}
