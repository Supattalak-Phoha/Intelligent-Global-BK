import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient) { }

  getData(): Observable<any> {
    const apiUrl = 'assets/data/data.json'; // เส้นทางไปยังไฟล์ JSON
    return this.http.get<any>(apiUrl);
  }

  updateJson(data: any): Observable<any> {
    const apiUrl = 'assets/data/data.json'; // เส้นทางไปยังไฟล์ JSON
    return this.http.put( apiUrl, data);  // This won't work for local JSON files
  }

  async login(username: string, password: string) {
    const apiUrl = 'assets/data/users.json'; // เส้นทางไปยังไฟล์ JSON
    const users: any[] = await this.http.get<any>(apiUrl)?.toPromise();
    const user: any = users?.find?.(x => x.username === username && x.password === password)
    return user
  }


  private apiUrl = '/api/data';

  getData1(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  addData(data: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<any>(this.apiUrl, data, httpOptions);
  }

  updateData(id: number, data: any): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.put<any>(url, data, httpOptions);
  }

  deleteData(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<any>(url);
  }
}
