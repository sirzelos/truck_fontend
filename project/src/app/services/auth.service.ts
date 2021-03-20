import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class Authentication {
  token: string;
  constructor(private http: HttpClient) {
    this.token = window.localStorage.getItem("token");
  }
  saveToken(token?: string): void {
    this.token = token;
    window.localStorage.setItem("token", token);
  }

  getToken(): string {
    this.token = window.localStorage.getItem("token");

    return this.token;
  }

  isLoggedIn(): boolean {
    if (!this.getToken()) {
      return false;
    } else {
      return true;
    }
  }

  logout(): void {
    window.localStorage.removeItem("token");
    this.token = null;
  }

  getKey(): string {
    let id = "m9TnVGzG6VhAYzvYNkRZNDMngx3D5hWPXAD18ccz";
    return id;
  }

  async currentUser(): Promise<any> {
    if (this.isLoggedIn()) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      });
      const result: any = await this.http
        .get("http://127.0.0.1:8000/user", { headers: headers })
        .toPromise();

      return result;
    } else {
      return null;
    }
  }
}
