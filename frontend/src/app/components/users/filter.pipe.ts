
import { Pipe, PipeTransform } from "@angular/core";
import { User } from "src/app/services/authentication.service";

@Pipe({
  name: 'filterUser',
})
export class FilterPipe implements PipeTransform{
  transform(value: string, length: number) {
    if(value.length > length){
      return value.substring(0, length) + '...';
    }
    return value; 
  }
}
