import { Injectable } from '@angular/core';
import { HammerGestureConfig } from '@angular/platform-browser';
//import * as Hammer from 'hammerjs';

@Injectable()
export class AppHammerConfig extends HammerGestureConfig {
  /*
  override overrides = <any>{
    tap:{
      threshold:50,
      posTreshold:2,
      time:2000
    },
    swipe:{
      direction:Hammer.DIRECTION_ALL
    },
    pan: {
      direction: Hammer.DIRECTION_ALL,
      threshold: 5
    }
  };
  */
}

/*
  override buildHammer(element:HTMLElement) {
    const recognizers = [];
    if (element.hasAttribute('data-hammer-pan')) {
      recognizers.push([Hammer.Pan]);
    }
    if (element.hasAttribute('data-hammer-pan-x')) {
      recognizers.push([Hammer.Pan, {direction: Hammer.DIRECTION_HORIZONTAL}]);
    }
    if (element.hasAttribute('data-hammer-tap')) {
      recognizers.push([Hammer.Tap]);
    }
    if (element.hasAttribute('data-hammer-pinch')) {
      recognizers.push([Hammer.Pinch]);
    }
    if (element.hasAttribute('data-hammer-rotate')) {
      recognizers.push([Hammer.Rotate]);
    }
    if (element.hasAttribute('data-hammer-press')) {
      recognizers.push([Hammer.Press]);
    }
    if (element.hasAttribute('data-hammer-swipe')) {
      recognizers.push([Hammer.Swipe]);
    }
    const hammerconfig = {
      recognizers: recognizers as RecognizerTuple[],
      touchAction: 'auto'
    };
    const hammer = new Hammer.Manager(element,hammerconfig);
    return hammer;
  }
*/