import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

freshnessList = ["Brand New", "Second Hand", "Refurbished", "Upcoming"]  
productForm !: FormGroup;
actionBtn : string = "Save"
constructor(private formBuilder : FormBuilder, private api : ApiService,
   @Inject(MAT_DIALOG_DATA) public editData : any,
   private dialogRef : MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      ProductName : ['',Validators.required],
      Category : ['',Validators.required],
      Freshness : ['',Validators.required],
      Price : ['',Validators.required],
      Comment : ['',Validators.required],
      Date : ['',Validators.required],
    });

    if(this.editData){
      this.actionBtn = "Update";
      this.productForm.controls['ProductName'].setValue(this.editData.ProductName);
      this.productForm.controls['Category'].setValue(this.editData.Category);
      this.productForm.controls['Freshness'].setValue(this.editData.Freshness);
      this.productForm.controls['Price'].setValue(this.editData.Price);
      this.productForm.controls['Comment'].setValue(this.editData.Comment);
      this.productForm.controls['Date'].setValue(this.editData.Date);
    }

}
  addProduct(){
 if(!this.editData){
  if(this.productForm.valid){
    this.api.postProduct(this.productForm.value)
    .subscribe({
      next:(res)=>{
        alert("Product added successfully");
        this.productForm.reset();
        this.dialogRef.close('save');
      },
      error:()=>{
        alert("Error while adding the product")
      }
    })
  }
 }else{
  this.updateProduct()
 }
}
updateProduct(){
  this.api.putProduct(this.productForm.value,this.editData.id)
  .subscribe({
next:(res)=>{
  alert("Product updated Successfully ! ");
  this.productForm.reset();
  this.dialogRef.close('update');
},
error:()=>{
  alert("Error while updating the record !!!");
}
  })
}

}
