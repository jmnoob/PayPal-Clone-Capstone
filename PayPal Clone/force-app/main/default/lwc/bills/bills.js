import { LightningElement, track, wire } from 'lwc';
import getBills from '@salesforce/apex/Bills.getDataFromBills';
import getUserInfo from '@salesforce/apex/AdminHandler.getUserInfo';
import getCancel from '@salesforce/apex/AdminHandler.updateMyWallet';
import getAdmin from '@salesforce/apex/AdminHandler.forAdminBills';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

const column = [
    {   
        label: 'Pay',
        type: 'button', typeAttributes: {  
        label: 'Pay',  
        name: 'View',  
        title: 'View',  
        disabled: false,  
        value: 'view',  
        iconPosition: 'left'  
    }},
      {
        label: 'Bill Number',
        fieldName: 'Name'
    },
    {
        label: 'Amount',
        fieldName: 'amount__c',
        type: 'currency'
    },
    {
        label: 'Category',
        fieldName: 'category__c'
    },
    {
        label: 'Paid',
        fieldName: 'paid__c',
        sortable: true
    },
    {
        label: 'Pay Before',
        fieldName: 'pay_before__c'
    },
    {
        label: 'Successful',
        fieldName: 'successful__c'
    },
    {
        label: 'Offer Applied',
        fieldName: 'offer_applied__c',
        
    },
    {
        label: 'Flagged',
        fieldName: 'Flagged__c'
    }
]
const admcolumn = [
    {   
        label: 'Cancel',
        type: 'button', typeAttributes: {  
        label: 'Cancel',  
        name: 'View',  
        title: 'View',  
        disabled: false,  
        value: 'view',  
        iconPosition: 'center'  
    }},
      {
        label: 'Bill Number',
        fieldName: 'Name'
    },
    {
        label: 'Amount',
        fieldName: 'amount__c',
        type: 'currency'
    },
    {
        label: 'Category',
        fieldName: 'category__c'
    },
    {
        label: 'Paid',
        fieldName: 'paid__c',
        sortable: true
    },
    {
        label: 'Pay Before',
        fieldName: 'pay_before__c'
    },
    {
        label: 'User Id',
        fieldName: 'for_user__c',
    },
    {
        label: 'Successful',
        fieldName: 'successful__c'
    },
    {
        label: 'Offer Applied',
        fieldName: 'offer_applied__c',
        
    },
    {
        label: 'Flagged',
        fieldName: 'Flagged__c'
    }
]


export default class Bills extends LightningElement {

    isUser = false;
    isAdmin = false;
    admData;

  columns = column;
  s = admcolumn;

    @wire(getUserInfo)
    userinfo({error, data}){
        console.log(data);
        if(data){
                getAdmin().then(res=>{
                    this.admData = res;
                    console.log(this.admData);
                    this.isAdmin = true;
                    this.isUser = false;
                })
                
        }else if(!data){
            console.log(data);
            this.isUser = true;
        }else if(error) {
            // error handling
            console.error(error.body.message);
        }
    }
  
    @wire (getBills) bills;

    

 


  record;
  handleRowAction(event){
    this.record = event.detail.row;
    console.log(this.record.Id);
    const modal = this.template.querySelector("c-payment");
    modal.show();
    modal.getid = this.record.Id;
    modal.amount = this.record.amount__c;
    modal.isPaid = this.record.paid__c;
    modal.discount = this.record.offer_applied__c;
  }


  cancelRecs;
  cancelAmt;
  cancelId;
  cancelisPaid;
  cancelName;
  handleCancelAction(event){
    this.cancelRecs = event.detail.row;
    this.cancelAmt = this.cancelRecs.amount__c;
    this.cancelId = this.cancelRecs.Id;
    this.cancelisPaid = this.cancelRecs.paid__c;
    this.cancelName = this.cancelRecs.for_user__c;
    getCancel({'Amount' : this.cancelAmt, 'ThisBillId' : this.cancelId, 'isPaid': this.cancelisPaid, 'userName': this.cancelName}).then(res=>{
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Success',
                message: 'Bills Cancelled',
                variant: 'success'
            })
          );
    }).catch((error) => {
        this.errorMessage=error;
        console.log('unable to update the record due to'+JSON.stringify(this.errorMessage));
    });
  }


}