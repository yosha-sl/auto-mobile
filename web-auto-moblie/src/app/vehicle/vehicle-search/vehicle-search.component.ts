import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-vehicle-search',
  templateUrl: './vehicle-search.component.html',
  styleUrls: ['./vehicle-search.component.css']
})
export class VehicleSearchComponent implements OnInit {

  result;

  constructor(
    private http: HttpClient) { }

  ngOnInit(): void {
  }

  onSearch(val) {
    console.log(val);
    this.result = []
    let query = `
    query{
      allVehicles(filter: {
        carMake: {
          includesInsensitive: "${val}"
        }
      }){
        nodes{
          carModel,
          carMake,
          vinNumber
        }
      }
    }
      `
    return this.http.post(`${environment.gatewayURL}/graph`, { query }).subscribe((res: any) => {
      console.log(res);
      this.result = res.data.allVehicles.nodes;
    });
  }

}
