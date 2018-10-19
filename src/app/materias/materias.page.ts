import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-materias',
  templateUrl: './materias.page.html',
  styleUrls: ['./materias.page.scss'],
})
export class MateriasPage implements OnInit {
  items;
  
  constructor() { 
    this.initializeItems();
  }

  initializeItems(){
    this.items = [
      'Materia 1',
      'Materia 2',
      'Materia 3',
      'Etc',
      'Ingenieria de Software'
    ];
  }
  
  getItems(ev) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the ev target
    var val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  itemSelected(item: string) {
  console.log("Selected Item", item);
  }

  ngOnInit() {
  }

}
