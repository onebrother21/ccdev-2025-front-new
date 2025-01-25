import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { SharedModule } from '@shared';
import { MapSimulatorService } from '../map-simulator.service';
import { tap } from 'rxjs';
import { DotLocation } from '../map-simulator.models';

@Component({
  selector: 'app-map-simulator',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './map-simulator.component.html',
  styleUrl: './map-simulator.component.scss'
})

export class MapSimulatorComponent implements OnInit {
  @ViewChild('mapContainer', { static: true }) mapContainer!: ElementRef;
  horizontalStreets: string[] = [];
  verticalStreets: string[] = [];

  gridHeight = 800;
  gridWidth = 800;
  cellHeight = 0;
  cellWidth = 0;

  destination:DotLocation|null = null;
  target:DotLocation|null = null;
  vehicle:DotLocation|null = null;
  shop:DotLocation|null = null;

  constructor(private sim:MapSimulatorService) {}
  ngOnInit(): void {
    this.horizontalStreets = this.sim.getHorizontalStreets();
    this.verticalStreets = this.sim.getVerticalStreets();
    
    this.sim.grid.pipe(tap(o => {
      if(o){
        this.gridHeight = o.gridHeight;
        this.gridWidth = o.gridWidth;
        this.cellHeight = o.cellHeight;
        this.cellWidth = o.cellWidth;
        this.updateGridDimensions();
      }
    })).subscribe();
    this.sim.entities.pipe(tap(o => {
      if(o){
        this.destination = o.destination;
        this.target = o.target;
        this.vehicle = o.vehicle;
        this.shop = o.shop;
      }
    })).subscribe();
  }
  @HostListener('window:resize')
  onResize(): void {this.updateGridDimensions();}

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent): void {
    const rect = this.mapContainer.nativeElement.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const address = this.sim.getNearestAddress(x,y);
    if(address) this.sim.handleDestinationUpdate(this.selectedTool.name as any,{x,y} as DotLocation);
    else console.log('No address recognized.');
  }

  tools = [
    { name: 'destination', icon: 'assets/img/sim-house-2.png' },
    { name: 'destination', icon: 'assets/img/sim-house-1.png' },
    { name: 'shop', icon: 'assets/img/sim-store-2.png' }
  ];

  selectedTool = this.tools[0]; // Default selected tool
  selectTool(tool: { name: string; icon: string }) {
    this.selectedTool = tool;
    console.log(`Selected tool: ${tool.name}`);
  }
  private updateGridDimensions(): void {
    const containerWidth = this.mapContainer.nativeElement.offsetWidth;
    const containerHeight = this.mapContainer.nativeElement.offsetHeight;
    this.sim.setGridDimensions(containerWidth,containerHeight);
  }
}