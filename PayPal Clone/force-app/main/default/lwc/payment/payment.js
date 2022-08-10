import { api, LightningElement,track, wire } from 'lwc';
import getBills from '@salesforce/apex/Bills.getPayment';
import updateBills from '@salesforce/apex/Bills.updateBills';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getWalletInfo from '@salesforce/apex/CustomWalletHandler.getWalletInfo';


export default class Payment extends LightningElement {


  
  disabled = false;
  @track error;

  @api amount;
  @api getid;
  @api isPaid;
  @api discount;
  balance;
  
  showModal = false;

  @wire (getWalletInfo)
  wallet({error, data}){
    if(data){
      this.balance = data.balance__c;
      console.log(this.balance);
      console.log(this.amount);
    }else if(error) {
      // error handling
      console.error(error.body.message);
  }
  }
  

  @api errorMessage;

  @api show() {
    this.showModal = true;
  }

  handleDialogClose() {
    this.showModal = false;
  }

  handleClick(){
    console.log(this.amount);

    if(this.isPaid){
      this.dispatchEvent(
        new ShowToastEvent({
            title: 'Success',
            message: 'Bills Already Paid',
            variant: 'success'
        })
      );
    }else if(this.balance < this.amount){
      this.dispatchEvent(
        new ShowToastEvent({
            title: 'Payment Error',
            message: 'Insufficient funds',
            variant: 'error'
        })
     );
     window.open("https://trainngs-dev-ed.lightning.force.com/lightning/n/Wallets");
     //window.location.reload();
    }else if(this.amount >= 5000){ // if bill amount is greater that 5k set the discounted price
      this.amount = this.amount - (this.amount * this.discount / 100);
      this.getUpdateBills();
    }
    else {
          console.log(this.getid);
          this.getUpdateBills();

      }
  }

  getUpdateBills(){
    updateBills({'BillsId': this.getid, 'Amount': this.amount}).then(()=>{
      this.dispatchEvent(
        new ShowToastEvent({
            title: 'Success',
            message: 'Payment Successful',
            variant: 'success'
        })
    );
    }) .catch((error) => {
        this.errorMessage=error;
        console.log('unable to update the record due to'+JSON.stringify(this.errorMessage));
    });

  }



}