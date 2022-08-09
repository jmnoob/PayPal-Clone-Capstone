import { api, wire, LightningElement, track } from 'lwc';
import Honda from '@salesforce/resourceUrl/Honda';
import { getRecord } from 'lightning/uiRecordApi';
import getUserInfo from '@salesforce/apex/CarHandler.getUserInfo';
const cityhatchback = 'https://www.rushlane.com/wp-content/uploads/2020/11/2021-honda-city-hatchback-interiors-exteriors-walkaround-1.jpg';
const city = 'https://www.nicepng.com/png/detail/372-3723914_honda-city.png';
const accord = 'https://cdn.motor1.com/images/mgl/X1Nwb/s1/honda-accord.jpg';
const civic = 'https://media.ed.edmunds-media.com/honda/civic/2020/oem/2020_honda_civic_4dr-hatchback_sport-touring_fq_oem_1_815.jpg';
const civicR = 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/01-2021-honda-civic-type-r-limited-edition-1200x900-1599075858.jpg?crop=1.00xw:0.667xh;0,0.181xh&resize=1200:*';
const brio = 'https://d1hv7ee95zft1i.cloudfront.net/custom/car-model-color-photo/gallery/honda-brio-v-carnival-yellow-philippines-606434622cf78.jpg';

const FIELDS = ['Car_Model__c.Car_Models__c'];

export default class CarModelsUi extends LightningElement {


        @api recordId;
        @track isCs
        

        cars;
        carlabel;
        val;

        @wire(getRecord, { recordId: '$recordId', fields: FIELDS })
        wiredRecord({ error, data }) {
        if (error) {
            let message = 'Unknown error';
            if (Array.isArray(error.body)) {
                message = error.body.map(e => e.message).join(', ');
            } else if (typeof error.body.message === 'string') {
                message = error.body.message;
            }
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error loading contact',
                    message,
                    variant: 'error',
                }),
            );
        } else if (data) {
                
             this.val = data;
             this.carl = this.val.fields.Car_Models__c.value;   
            if(this.carl === 'City Hatchback.'){
                this.cars = cityhatchback;
                this.carlabel = this.carl;
            }else if(this.carl === 'City'){
                this.cars = city;
                this.carlabel = this.carl;
            }else if(this.carl === 'All-New Civic'){
                this.cars = civic;
                this.carlabel = this.carl;
            }else if(this.carl === 'Brio'){
                this.cars = brio;
                this.carlabel = this.carl;
            }else if(this.carl === 'Accord'){
                this.cars = accord;
                this.carlabel = this.carl;
            }else if(this.carl === 'Civic Type R'){
                this.cars = civicR;
                this.carlabel = this.carl;
            }

        }
    }

    @wire(getUserInfo,{})
    userData({ error, data }) {
        if(data) {
            if(data.Profile.Name === 'Car Customer') {    
                console.log('this is Car customer')
                this.isCs = true;
            }
        }
        else if(error) {
            // error handling
            console.error(error.body.message);
        }
    }
        handleClick(){
            
        }
    
    
}