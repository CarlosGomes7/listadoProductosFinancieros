import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductFinancialModel } from '../../../../domain/models/product-financial';
import { DateListProductPipe } from '../../pipes/date-list-product.pipe';

const IMPORTS = [DateListProductPipe];

@Component({
  selector: 'app-list-product-financial-table',
  standalone: true,
  imports: [...IMPORTS],
  templateUrl: './list-product-financial-table.component.html',
  styleUrl: './list-product-financial-table.component.scss'
})

export class ListProductFinancialTableComponent {
  @Input() registros:ProductFinancialModel [] = [];
  @Output() elementUpdateItems = new EventEmitter<ProductFinancialModel>();
  @Output() idDelete = new EventEmitter<string>();

  flagShowMenu: Boolean = false;
  itemSeleted!: ProductFinancialModel;
  iconDescription:string="/assets/images/icons/info-circle.svg";

  constructor() { }

  ngOnInit() {
  }



  onClickShowModal(i:ProductFinancialModel){
    this.itemSeleted=i; 
    this.flagShowMenu= true;
  }

  onClickHideMenu(){
    this.flagShowMenu= false;
  } 

  updateItems(item:ProductFinancialModel){
    this.onClickHideMenu();
    this.elementUpdateItems.emit(item);
  }

  deleteItems(id:string){
    this.onClickHideMenu();
    this.idDelete.emit(id);
  }

}
