import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(list: any[], searchTerm: string): any[] {
    if(!list  || !searchTerm){
      console.log("term", searchTerm)
      return list;
    }
  try {
    return list.filter(lis => lis.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !==-1);

  } catch (error) {
    return list.filter(lis => lis.user.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !==-1);
    
  }
    
  }

}
