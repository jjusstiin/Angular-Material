import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from './../serices/api.service';
import { Component, OnInit, Injectable, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { inject } from '@angular/core/testing';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  freshnessList = ["Brand New", "Second Hand", "Refurbished"];
  productForm!: FormGroup;
  actionBtn: string = "Save";

  constructor(
    private formBuilder : FormBuilder,
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private matDialogRef: MatDialogRef<DialogComponent> //為了在component裡接收dialog功能
    ) { }

  ngOnInit(): void {
    this.getFormBuilder();

    if(this.editData){
      this.actionBtn = "Update";
      this.productForm.controls['productName'].setValue(this.editData.productName);
      this.productForm.controls['category'].setValue(this.editData.category);
      this.productForm.controls['date'].setValue(this.editData.date);
      this.productForm.controls['freshness'].setValue(this.editData.freshness);
      this.productForm.controls['price'].setValue(this.editData.price);
      this.productForm.controls['comment'].setValue(this.editData.comment);
    }

  }

  getFormBuilder(){
    this.productForm = this.formBuilder.group({
      productName: ['', Validators.required],
      category:  ['', Validators.required],
      freshness: ['', Validators.required],
      price: ['', Validators.required],
      comment: ['', Validators.required],
      date: ['', Validators.required]
    })
  }

  addProduct(){
    if(!this.editData){
      if(this.productForm.valid){ //有沒有填完
        this.api.postProduct(this.productForm.value)
          .subscribe({  //因為 api 外包 這個有點像then
            next: (res)=>{
              console.log(res);

              alert('product added successfully');
              this.productForm.reset();
              this.matDialogRef.close();
            },
            error:()=>{
              alert("Error while adding the product")
            }
          })
      }else{
        alert("Something Empty");
      }
    }else{
      this.updateProduct();
    }
  }

  updateProduct(){
    this.api.putProduct(this.productForm.value, this.editData.id)
      .subscribe({
        next: (res)=>{
          alert("Product Updated Successfully");
          this.productForm.reset();
          this.matDialogRef.close();
        },
        error: (err)=>{
          alert("Error while updating the record!!")
        }
      })

  }

}
