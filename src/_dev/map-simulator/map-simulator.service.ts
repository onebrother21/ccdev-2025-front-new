import { Injectable } from '@angular/core';
import { StreetAddressDisplay, DotLocation, Directions } from "./map-simulator.models";
import { BehaviorSubject } from 'rxjs';
import { MapSimulatorCalcService } from './map-simulator-calc.service';

type GridSettings = Record<"gridHeight"|"gridWidth"|"gridSize"|"cellWidth"|"cellHeight",number>;
type GridEntities = Record<"destination"|"target"|"vehicle"|"shop",DotLocation|null>;

@Injectable({
  providedIn: 'root'
})
export class MapSimulatorService {
  
  private horizontalStreets = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th'];
  private verticalStreets = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
  
  private grid_:BehaviorSubject<GridSettings> = new BehaviorSubject({
    gridWidth:800,
    gridHeight:800,
    gridSize:11,
    cellHeight:800/11,
    cellWidth:800/11,
  });
  grid = this.grid_.asObservable();
  
  private entities_:BehaviorSubject<GridEntities> = new BehaviorSubject({
    destination:null as any,
    target:null as any,
    vehicle:{x:80,y:60,address:""} as any,
    shop:null as any,
  });
  entities = this.entities_.asObservable();

  constructor(private simCalc:MapSimulatorCalcService) {}

  setEntityLocation(entity:"destination"|"target"|"vehicle"|"shop",p:DotLocation): void {
    const o = this.entities_.getValue();
    this.entities_.next({...o,[entity]:p});
  }

  getHorizontalStreets(): string[] {return this.horizontalStreets;}
  getVerticalStreets(): string[] {return this.verticalStreets;}
  getNearestAddress(x: number,y: number,):StreetAddressDisplay | null {
    const {cellHeight,cellWidth} = this.grid_.getValue();
    const col = Math.round(x / cellWidth);
    const row = Math.round(y / cellHeight);

    // Ensure clicks outside the labeled grid return null
    if (col < 1 || col > 11 || row < 1 || row > 11) {
      return null;
    }

    const horizontalStreet = this.horizontalStreets[row - 1];
    const verticalStreet = this.verticalStreets[col - 1];

    // Address numbers range from 1 to 110
    const xRatio = (x % cellWidth) / cellWidth;
    const yRatio = (y % cellHeight) / cellHeight;
    const hAddressNumber = Math.round((col - 1 + xRatio) * 11) || 1;
    const vAddressNumber = Math.round((row - 1 + yRatio) * 11) || 1;

    // Determine if it's closer to an intersection or grid_ single street
    const isIntersection = Math.abs(x % cellWidth - y % cellHeight) < Math.min(cellWidth,cellHeight) * 0.2;
    if (isIntersection) {
      return {
        streetName: `${verticalStreet} & ${horizontalStreet}`,
        streetType: 'intersection',
        number: vAddressNumber,
      };
    }

    if (Math.abs(x % cellWidth) < Math.abs(y % cellHeight)) {
      return {
        streetName: verticalStreet,
        streetType: 'vertical',
        number: vAddressNumber,
      };
    }
    else {
      return {
        streetName: horizontalStreet,
        streetType: 'horizontal',
        number: hAddressNumber,
      };
    }
  }
  handleDestinationUpdate(k:"destination"|"shop",p:DotLocation){
    const {target,vehicle} = this.entities_.getValue();
    const {gridSize,cellHeight,cellWidth} = this.grid_.getValue();
    const o = {target,vehicle,gridSize,cellHeight,cellWidth} as any;
    this.setEntityLocation(k,p);
    const closest = this.simCalc.getClosestGridlinePt(o,p) as DotLocation;
    setTimeout(() => {
      this.setEntityLocation("target",closest);
      const route = this.simCalc.calculateRoute({...o,target:closest}) as Directions;
      if(route) this.animateVehicleMove(route);
    },500);
  }
  animateVehicleMove(route:Directions): void {
    const {vehicle} = this.entities_.getValue();
    if(vehicle && route){
      const speed = 5; // px/sec
      let currentX = vehicle.x;
      let currentY = vehicle.y;
      route.forEach((step, index) => {
        setTimeout(() => {
          switch(step.direction){
            case 'right':currentX += step.distance;break;
            case 'left':currentX -= step.distance;break;
            case 'down':currentY += step.distance;break;
            case 'up':currentY -= step.distance;break;
            default:break;
          }
          // Update the entity's location
          this.setEntityLocation("vehicle",{x:currentX,y:currentY}as DotLocation);
        },index * 100); // 1-second delay for each move step
      });
    }
  }
  setGridSize(n:number){
    const o = this.grid_.getValue();
    this.grid_.next({
      ...o,
      gridSize:n,
      cellHeight:o.gridHeight/n,
      cellWidth:o.gridWidth/n
    })
  }
  setGridDimensions(w:number,h:number){
    const o = this.grid_.getValue();
    this.grid_.next({
      ...o,
      gridHeight:h,
      gridWidth:w,
      cellHeight:h/o.gridSize,
      cellWidth:w/o.gridSize
    })
  }
}