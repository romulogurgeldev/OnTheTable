import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {


  transform(list: any[], searchTerm: string): any[] {
    if(!list  || !searchTerm){

      return list;
    }

    
    return list.filter(lis => lis.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !==-1);
  }
}
