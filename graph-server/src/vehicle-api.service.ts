import { Injectable } from "@nestjs/common";
import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';


@Injectable()
export class VehicleAPIService extends RESTDataSource {

  constructor() {
    super();
    this.baseURL = 'https://chatbot-a0b23.firebaseio.com';
  }

  async findOneBy(id) {
    console.log(id);
    const query = `
        {query{
          vehicleById(id: ${id}){
            id,
            firstName,
            lastName,
            email,
            carMake,
            carModel,
            vinNumber,
            manufacturedDate
          }
          }}
        `;
          console.log(query);
        this.get('user.json')
        .then((res)=> {
          console.log(res);
          return res;
        }).catch(e => {
          console.log(e);
        });
  }

}