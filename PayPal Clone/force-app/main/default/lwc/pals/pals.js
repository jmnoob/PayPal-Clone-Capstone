import { LightningElement } from 'lwc';
import palsData from '@salesforce/apex/PalsHandler.getPalsData';

const col = [
    {
        label: 'Send Money',
        type: 'button', 
        typeAttributes: {  
            label: 'Send Money',  
            name: 'View',  
            title: 'View',  
            disabled: false,  
            value: 'view',  
            iconPosition: 'left'
        }
    },
    {
        label: 'Pal Name',
        type: 'text', 
        fieldName: 'Name'
    }
]

export default class Pals extends LightningElement {


result;
searchName;
coloumns = col;

setName(e){
    this.searchName = e.target.value;

    this.GetPalsData();
}

GetPalsData(){
    palsData({'PalName' : this.searchName}).then(res => {
        if(res){
            
            let paldata = [];
            res.forEach(row =>{
                let pdata = {};
                pdata.Name = row.Pal_Name__r.Name;
                pdata.OwnerId = row.Pal_Name__r.OwnerId;
                paldata.push(pdata);
            })
            this.result = paldata;

        }
    }).catch(err =>{
        this.error=err;
    })
}
//a0E5i000005T5JSEA0
record;
handleRowAction(event){
    this.record = event.detail.row;
    console.log(this.record.Name);
    const modal = this.template.querySelector("c-sendmoney");
    modal.show();
    modal.palname = this.record.Name;
    modal.palid = this.record.OwnerId;//get the owner id of Pal user
    console.log(this.record.OwnerId);   
    modal.isData = true;
}

}