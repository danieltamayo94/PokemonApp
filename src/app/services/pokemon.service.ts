import { Injectable } from '@angular/core';
import { security } from 'src/security/security';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  url = security.apiUrl;

  constructor(private http: HttpClient) {}
    getPokemons(index:any){
      return this.http.get<any>(`${this.url}/pokemon/${index}`)
    }
  
}
