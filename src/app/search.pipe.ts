import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(reports:any[], queryString: string): any[] {
    return reports.filter(r=>{
      return r.criminalName.toLowerCase().includes(queryString.toLowerCase())
    });
  }

}
