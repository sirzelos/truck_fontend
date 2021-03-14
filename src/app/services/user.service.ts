import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
@Injectable({ providedIn: "root" })
export class UsersService {
  constructor(private http: HttpClient) {}

  async getShippingCompany(): Promise<any> {
    const result = await this.http
      .get("http://127.0.0.1:8000/shippingCompany")
      .toPromise();

    return result;
  }
  async getDetailShippingCompany(id: Number): Promise<any> {
    const result = await this.http
      .get("http://127.0.0.1:8000/getDetailShippingCompany/" + id)
      .toPromise();

    return result;
  }

  async saveDetailShippingCompany(form: any): Promise<any> {
    const result = await this.http
      .post("http://127.0.0.1:8000/addDetailShippingCompany/", form)
      .toPromise();
    return result;
  }
}
