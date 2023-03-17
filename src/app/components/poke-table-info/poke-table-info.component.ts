
import { OnInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
import { PokemonService } from 'src/app/services/pokemon.service';
import {MatDialog} from '@angular/material/dialog';
import { empty } from 'rxjs';


@Component({
  selector: 'app-poke-table-info',
  templateUrl: './poke-table-info.component.html',
  styleUrls: ['./poke-table-info.component.css']
})
export class PokeTableInfoComponent implements OnInit{

  displayedColumns:string[] = ['position', 'image', 'name'];
  data: any[] = [];
  dataSource = new MatTableDataSource<any>(this.data);
  pokemonsTeam = [];
  pokemon:any;
  pokemonSelect:any;
  num:number = 0;
  
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private pokemonService: PokemonService,  private dialog: MatDialog){}

 ngOnInit(): void{
    this.getPokemons();
  }

  getPokemons(){
    // limite que mostraremos de pokemons
    let limitShow = 160;
    let pokeData;

    for(let i=1; i<=limitShow; i++){
      this.pokemonService.getPokemons(i).subscribe(
        resp =>{
          pokeData = {
            position: i,
            image:resp.sprites.front_default,
            name:resp.name
          };
          this.data.push(pokeData);
          this.dataSource = new MatTableDataSource<any>(this.data);
          this.dataSource.paginator = this.paginator;
        }
      );
    }
    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getCard(row:any)
  {
  this.pokemonService.getPokemons(row.position).subscribe(
    resp =>{
      this.pokemon = resp;
    }
  )
  this.showCardPokemon().then()
  }


  showCardPokemon(){

    return new Promise((resolve, reject)=>{

      setTimeout(() => {
    let container = document.getElementById("cardContent");
    console.log(this.pokemon);

    //Show Card Pokémon Template
    container.innerHTML = 
    `<h1 style="margin: auto; text-transform: uppercase; text-align:center;">${this.pokemon.name}</h1>
    <h4 style="background-color:white; align-items:center; margin-top:auto;  font-size: 12px; border-radius:99%; margin-bottom:auto; padding:5px; width:40px; height:40px; margin:auto; border:solid 1px black; text-align:center;">#${this.pokemon.id}</h4>
    <img style="  margin:auto; width: 200px !important; height:200px !important;"
     src="${this.pokemon.sprites.other.dream_world.front_default}" alt="Pokemon" />
    <div style="display:flex; flex-direction:column; align-items:center; margin:auto">
    <div style="width:100%; display:flex; flex-direction:row; justify-content:space-around">
        <h4 style="font-weight:bold">
          ${this.pokemon.stats[1].base_stat} K
        </h4>
        <h4 style="font-weight:bold">
          ${this.pokemon.stats[2].base_stat} K
        </h4>
        <h4 style="font-weight:bold">
          ${this.pokemon.stats[3].base_stat} K
        </h4>
    </div>
    <div style="width:100%; display:flex; flex-direction:row; justify-content:space-around">
        <p style="font-weight:500">
          Ataque
        </p>
        <p style="font-weight:500">
          Defensa
        </p>
        <p style="font-weight:500">
          Especial
        </p>
    </div>
    </div>
    </div>
    `;
      }, 600);
    });
  }

  openDialog() {
    this.dialog.open(DialogCompleteTeam);
  }

 

  takePokemon(row:number){
    let quantityMaxTeam=6;
    if(this.num<quantityMaxTeam){
    this.pokemonService.getPokemons(row).subscribe(
      resp =>{
        this.pokemonSelect = resp;
        this.pokemonsTeam[this.num] = this.pokemonSelect
        this.num++;
      }
    )
    }
    else{
      this.openDialog();
    }
  }

}

@Component({
  selector: 'alert-complete-team',
  templateUrl: 'alert-complete-team.html',
  styleUrls: ['./poke-table-info.component.css']
})
export class DialogCompleteTeam {

  constructor(private dialog: MatDialog){}
  closeDialog() {
    this.dialog.closeAll();
  }

}