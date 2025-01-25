import { Injectable } from '@angular/core';
import { DotLocation } from './map-simulator.models';

type SimParams = {
  target:DotLocation,
  vehicle:DotLocation,
  gridSize:number,
  cellHeight:number,
  cellWidth:number,
};

@Injectable({
  providedIn: 'root'
})
export class MapSimulatorCalcService {
  calculateRoute(o:SimParams) {
    const {vehicle,target} = o;
    const route = [];
    const startPt = this.getClosestGridlinePt(o,vehicle) as DotLocation;
    const leg = this.getDirectionObj([vehicle,startPt]);
    if(leg) route.push(leg);
    let isTarget,prevPt = startPt,nextPt,nextLeg;
    do {
      nextPt = this.getNextIntersectionOrTargetPt(o,prevPt) as DotLocation;
      nextLeg = this.getDirectionObj([prevPt,nextPt]);
      if(nextLeg) route.push(nextLeg);
      isTarget = this.isTarget(target,nextPt);
      prevPt = nextPt;
    }
    while(!isTarget);
    return route;
  }
  isTarget(target:DotLocation,p:DotLocation){return p.x === target?.x && p.y === target?.y;}
  getClosestGridlinePt(o:SimParams,p:DotLocation){
    const {gridSize,cellHeight,cellWidth}  = o;
    // Calculate all vertical and horizontal gridlines
    const verticalGridLines = Array.from({ length: gridSize + 1 }, (_, i) => i * cellWidth);
    const horizontalGridLines = Array.from({ length: gridSize + 1 }, (_, i) => i * cellHeight);
  
    // Find the closest vertical gridline
    const closestVertical = verticalGridLines.reduce((prev, curr) =>
      Math.abs(curr - p.x) < Math.abs(prev - p.x) ? curr : prev
    );
  
    // Find the closest horizontal gridline
    const closestHorizontal = horizontalGridLines.reduce((prev, curr) =>
      Math.abs(curr - p.y) < Math.abs(prev - p.y) ? curr : prev
    );
  
    // Calculate distances
    const dx = Math.abs(closestVertical - p.x);
    const dy = Math.abs(closestHorizontal - p.y);
  
    // Determine the closest point
    let result: { x: number; y: number };
    if (dx < dy || (dx === dy && dx !== 0)) {
      // Vertical gridline is closer or equidistant but priority given to vertical
      result = { x: closestVertical, y: p.y };
    }
    else {
      // Horizontal gridline is closer
      result = { x: p.x, y: closestHorizontal };
    }
    return result;
  }
  getNextIntersectionOrTargetPt(o:SimParams,p:DotLocation) {
    const {cellWidth,cellHeight,target} = o;
    if(!target) return null;
    // Calculate the vehicle's current grid intersection
    const currentGridIntersection = {
      x: Math.round(p.x / cellWidth) * cellWidth,
      y: Math.round(p.y / cellHeight) * cellHeight,
    };
  
    // Determine if the vehicle is exactly at a grid intersection
    const isAtGridIntersection =
      p.x === currentGridIntersection.x &&
      p.y === currentGridIntersection.y;
  
    // Define potential intersections
    const gridIntersections = isAtGridIntersection
      ? [
          { x: currentGridIntersection.x - cellWidth, y: currentGridIntersection.y }, // Left
          { x: currentGridIntersection.x + cellWidth, y: currentGridIntersection.y }, // Right
          { x: currentGridIntersection.x, y: currentGridIntersection.y - cellHeight }, // Up
          { x: currentGridIntersection.x, y: currentGridIntersection.y + cellHeight }, // Down
        ]
      : [
          { x: Math.floor(p.x / cellWidth) * cellWidth, y: Math.floor(p.y / cellHeight) * cellHeight },
          { x: Math.ceil(p.x / cellWidth) * cellWidth, y: Math.floor(p.y / cellHeight) * cellHeight },
          { x: Math.floor(p.x / cellWidth) * cellWidth, y: Math.ceil(p.y / cellHeight) * cellHeight },
          { x: Math.ceil(p.x / cellWidth) * cellWidth, y: Math.ceil(p.y / cellHeight) * cellHeight },
        ];
  
    // Find the intersection closest to the target
    const closestIntersection = gridIntersections.reduce((closest, intersection) => {
      const intersectionToTargetDist = Math.sqrt(
        Math.pow(intersection.x - target.x, 2) + Math.pow(intersection.y - target.y, 2)
      );
  
      const prevClosestIntersectionDist = Math.sqrt(
        Math.pow(closest.x - target.x, 2) + Math.pow(closest.y - target.y, 2)
      );
  
      return intersectionToTargetDist < prevClosestIntersectionDist ? intersection : closest;
    });
    // Find which is closer, the intersection or the target
    const closestIntersectionDist = Math.sqrt(
      Math.pow(closestIntersection.x - p.x, 2) + Math.pow(closestIntersection.y - p.y, 2)
    );
    const targetDist = Math.sqrt(
      Math.pow(target.x - p.x, 2) + Math.pow(target.y - p.y, 2)
    );

    const nextPt = closestIntersectionDist < targetDist ? closestIntersection : target;
    return nextPt;
  }
  getDirectionObj([a,b]:[DotLocation,DotLocation]){
    let currentX = a.x;
    let currentY = a.y;
  
    // Horizontal movement
    switch(true){
      case currentX !== b.x:{
        const direction = currentX < b.x ? 'right' : 'left';
        const distance = Math.abs(b.x - currentX);
        return { direction, distance };
        //currentX = target.x; // Update current position

      }
      case currentY !== b.y:{
        const direction = currentY < b.y ? 'down' : 'up';
        const distance = Math.abs(b.y - currentY);
        return { direction, distance };
        //currentY = target.y; // Update current position
      }
      default:return null;
    }
  }
}