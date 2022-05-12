import { TableOverviewComponent } from './table-overview/table-overview.component';
import { ApiService } from './serices/api.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'material';

  dataSource!: MatTableDataSource<any>;
  res: Array<any> = [];


  // @ViewChild(MatSort) sort!: MatSort;

  // @ViewChild(TableOverviewComponent) table!:TableOverviewComponent;

  constructor(
    public dialog: MatDialog,
    private api : ApiService
    ) {}

  ngOnInit(): void {
    this.getAllProducts()
  }

  openDialog() {
    this.dialog.open(DialogComponent, {
      width: '30%'
    }).afterClosed().subscribe(res=>{
      this.getAllProducts();
    })
  }

  getAllProducts(){

    console.log(this.title)
    this.api.getProduct()
      .subscribe({
        next: (res)=>{
          this.res = res;
        },
        error: (err)=>{
          alert('Error while fatching the Recods!!')
        }
      })
  }

}
