import { Pipe, PipeTransform } from '@angular/core'
import * as moment from 'moment'

@Pipe({ name: 'prettyDate' })
export class PrettyDatePipe implements PipeTransform {
  transform(time: Date): any {
    return moment(time).fromNow()
  }
}
