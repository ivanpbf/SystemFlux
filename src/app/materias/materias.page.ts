import { Component, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Router } from "@angular/router";
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-materias',
  templateUrl: './materias.page.html',
  styleUrls: ['./materias.page.scss'],
})
export class MateriasPage implements OnInit {
  items: any;
  
  constructor(private router: Router, public http: Http) { 
    this.getMaterias();
  }

  getMaterias(){
    if(this.items){
      return Promise.resolve(this.items);
    }
    return new Promise(resolve=>{
      this.http.get('http://localhost:3000/materias')
      .pipe(map(res=>res.json())).subscribe(items =>{
        this.items = items;
        resolve(this.items);
      })
    })
  }
  
  getItems(ev) {
    // Reset items back to all of the items
    this.getMaterias();

    // set val to the value of the ev target
    var val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  Go(item: string) {
    this.router.navigateByUrl('/materias/'+item); //ojo aqui, se deberia ir al id del objeto en mongo
  }

  ngOnInit() {
  }

}
