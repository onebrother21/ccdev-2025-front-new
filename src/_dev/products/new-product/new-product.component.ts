import { Component } from '@angular/core';
import { SharedModule } from '@shared';
import { AppWindowService } from 'core';
import Stepper from 'bs-stepper';
import { NewProductAboutComponent } from './new-product-about';

@Component({
  selector: 'app-new-product',
  standalone: true,
  imports: [SharedModule,NewProductAboutComponent],
  templateUrl: './new-product.component.html',
  styleUrl: './new-product.component.scss'
})
export class NewProductComponent {
  activeStep = 0;
  stepValue = 15;
  stepper:Stepper|null = null;
  stepperOpts = [
    {val:"about",label:"About",iconClass:"icon-single-02",active:true},
    {val:"account",label:"Account",iconClass:"icon-settings-gear-63",active:false},
    {val:"address",label:"Address",iconClass:"icon-delivery-fast",active:false}
  ];
  constructor(private win:AppWindowService){}
  ngAfterViewInit(){
    if(this.win.get()) {
      console.log("yep")
      const el = document.getElementById("orderWizard");
      if(el){
        this.stepper = new Stepper(el,{
          linear: true,
          animation: true,
          selectors: {
            steps: '.step',
            trigger: '.step-trigger',
            stepper: '.bs-stepper'
          }
        });
        el.addEventListener('show.bs-stepper',(event) => {
          const i = (event as any).detail.indexStep;
          this.activeStep = i;
          i == 0?this.stepValue = 15:
          i == 1?this.stepValue = 50:
          i == 2?this.stepValue = 85:
          null;
          //console.warn('show.bs-stepper',)
        })
        el.addEventListener('shown.bs-stepper',(event) => {
          //console.warn('shown.bs-stepper', event)
        });
      }
    }
  }
  stepNext() {
    this.stepper?.next();
  }

  stepPrev() {
    this.stepper?.previous(); 
  }
}
