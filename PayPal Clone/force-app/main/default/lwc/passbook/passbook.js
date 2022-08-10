import { LightningElement, wire } from 'lwc';
import getPassbook from '@salesforce/apex/PassbookHandler.getPassbookInfo';

const column = [
    {
        label: 'Vendor Name',
        fieldName: 'Name'     
    },
    {
        label: 'Amount',
        fieldName: 'amount__c'     
    },
    {
        label: 'Expense Desc.',
        fieldName: 'expense_description__c'     
    },
    {
        label: 'Comments',
        fieldName: 'comment__c'     
    },
    {
        label: 'Date Time',
        fieldName: 'datetime__c'     
    },
    {
        label: 'Flagged',
        fieldName: 'Flagged__c'     
    }
];

export default class Passbook extends LightningElement {

    pbcolumn = column;
    @wire (getPassbook) passbook;
    
}