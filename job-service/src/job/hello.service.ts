import { HttpService, Injectable } from "@nestjs/common";
import { map } from 'rxjs/operators';
@Injectable()
export class HelloService{

    constructor(private http: HttpService) { }

    done(){
       
    }
}