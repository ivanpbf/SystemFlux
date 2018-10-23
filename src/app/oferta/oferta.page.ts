import { Component, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Router } from "@angular/router";
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.page.html',
  styleUrls: ['./oferta.page.scss'],
})

export class OfertaPage implements OnInit {
  items: any;
  itemsb: any;
  itemst1: any;
  itemst2: any;
  itemst3: any;

  constructor(private router: Router, public http: Http) { 
    this.getMaterias();
  }

  getMaterias(){
    return new Promise(resolve=>{
      this.http.get('http://localhost:3000/materias')
      .pipe(map(res=>res.json())).subscribe(items =>{
        this.items = items;
        this.itemsb = undefined;
        this.itemst1 = items.filter((item)=> item.T1 == true);
        this.itemst2 = items.filter((item)=> item.T2 == true);
        this.itemst3 = items.filter((item)=> item.T3 == true);
        resolve(this.items);
    })
  })
}

getItems(ev) {
  
      // Reset items back to all of the items
      this.getMaterias().then(res=>{
        this.items = res;
  
      // set val to the value of the ev target
      let val = ev.target.value;
  
      // if the value is an empty string don't filter the items
      if (val && val.trim() != '') {
        this.itemsb = this.items.filter((item) => {
          return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
        })
      }
      if(val.trim() == ''){
        this.itemsb = undefined
      }
      if (val && val.trim() != '') {
        this.itemst1 = this.itemst1.filter((item) => {
          return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
        })
      }
      if (val && val.trim() != '') {
        this.itemst2 = this.itemst2.filter((item) => {
          return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
        })
      }
      if (val && val.trim() != '') {
        this.itemst3 = this.itemst3.filter((item) => {
          return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
        })
      }
    });
  }

  ngOnInit() {
  }

}
