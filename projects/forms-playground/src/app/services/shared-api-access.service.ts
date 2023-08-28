import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class SharedApiAccessService {

    constructor(private http: HttpClient) { }

    /**
     * @definition
     * JSON PlaceHolder API access. Search for a specific Nick Name.
     * 
     * @param nickName Nick name to searched for.
     * 
     * @return
     * An http.get<any[]> Observable
     */
    checkNickName(nickName: string) {
        return this.http.get<any[]>(`https://jsonplaceholder.typicode.com/users?username=${nickName}`);
    }

}
