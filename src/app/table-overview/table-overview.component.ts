import { DialogComponent } from './../dialog/dialog.component';
import { Component, OnInit, AfterViewInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from '../serices/api.service';
import { Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-table-overview',
  templateUrl: './table-overview.component.html',
  styleUrls: ['./table-overview.component.scss']
})
export class TableOverviewComponent implements OnInit {
  displayedColumns: string[] = ['productName', 'category', 'date', 'feshness', 'price', 'comment', 'action'];

  dataSource!: MatTableDataSource<any>;

  private _data:Array<any> = [];

  @Input()
  get data(){
    return this._data;
  }
  set data(value){
    this._data = value;
    this.dataSource = new MatTableDataSource(value);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }


  // @Input() sort!: any;

  @Output() afterSave: EventEmitter<any> = new EventEmitter();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  // @Input() paginator!: any;

  constructor(
    private api: ApiService,
    private dialog: MatDialog
    ) { }

  ngOnInit(): void {

  }

  editProduct(row: any){

    this.dialog.open(DialogComponent,{
      width: '30%',
      data:row
    })
    .afterClosed().subscribe(res=>{
      this.afterSave.emit();
    })

  }

  applyFilter(event: Event) {
    console.log(this.dataSource.paginator);
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteProduct(id: number){
    console.log(id);

    this.api.deleteProduct(id)
      .subscribe({
        next: (res)=>{
          alert('Delete Product Successfully!!')
          this.afterSave.emit();
        },
        error: (err)=>[
          alert('Error while deleting the product')
        ]
      })
  }

}
