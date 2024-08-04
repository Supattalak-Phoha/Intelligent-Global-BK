import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
}
