import { Component, OnInit } from '@angular/core';
import { ItemService } from '../services/item.service';

interface Item { id?: number; name: string; description?: string }

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
  items: Item[] = [];
  model: Item = { name: '', description: '' };
  editId: number | null = null;

  constructor(private svc: ItemService) {}
  ngOnInit() { this.load(); }
  load() { this.svc.getAll().subscribe(d => this.items = d); }
  create() { this.svc.create(this.model).subscribe(() => { this.model={name:'',description:''}; this.load();});}
  edit(i:Item){this.editId=i.id??null; this.model={...i};}
  update(){this.svc.update(this.editId!,this.model).subscribe(()=>{this.editId=null;this.model={name:'',description:''};this.load();});}
  delete(id:number){this.svc.delete(id).subscribe(()=>this.load());}
}