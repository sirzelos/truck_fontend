import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
@Injectable({ providedIn: "root" })
export class UsersService {
  constructor(private http: HttpClient) {}
  async getDetailShippingCompany(id: Number): Promise<any> {
    const result = await this.http
      .get("http://127.0.0.1:8000/getDetailShippingCompany/" + id)
      .toPromise();

    return result;
  }
}
