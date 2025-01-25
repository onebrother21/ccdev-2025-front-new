import { AppEntity,ScriptModel } from "@types";
import { CommonUtils } from "@utils";
import { CommonState,initializeCommonState } from "../common.state";

export interface AppFeatureState extends CommonState,AppEntity {
  id:string;
  startTime:Date|null;
  scripts:ScriptModel[];
  scriptsLoaded:boolean;
  version:string;
  device:any;
  isMobile:boolean;
  scope:string;
  addr?:any;
}
export const initializeApp = ():AppFeatureState => ({
  ...initializeCommonState(),
  id:CommonUtils.longId(),
  startTime:new Date(),
  scripts:[{name:"stripe",src:"https://js.stripe.com/v3/"}],
  scriptsLoaded:false,
  version:"",
  device:null,
  isMobile:false,
  scope:"",
}) as AppFeatureState;
/*
  //,
  //{name:"creasy-app",src:`${env.apiUrl}/js/creasy-app-v1.js`},
  {name:"j-query",src:"assets/vendor/jquery/jquery.min.js"},
  {name:"bootstrap",src:"assets/vendor/bootstrap/js/bootstrap.bundle.min.js"},
  //{name:"overlay-scrollbars",src:"assets/js/adminlte-overlay-scrollbars.js"},
  //{name:"custom-demo",src:"assets/js/demo.js"},
  //{name:"custom-dash",src:"assets/js/dash.js"},
  {name:"moment",src:"assets/vendor/moment/moment.min.js"},
  {name:"select2",src:"assets/vendor/select2/select2.min.js"},
  {name:"duallistbox",src:"assets/vendor/duallistbox/bootstrap-duallistbox.min.js"},
  {name:"inputmask",src:"assets/vendor/inputmask/inputmask.min.js"},
  {name:"daterangepicker",src:"assets/vendor/daterangepicker/daterangepicker.min.js"},
  {name:"colorpicker",src:"assets/vendor/colorpicker/colorpicker.min.js"},
  {name:"tempus-dominus",src:"assets/vendor/tempus-dominus/tempus-dominus.min.js"},
  //{name:"sweetalert",src:"assets/vendor/sweetalert/sweetalert.min.js"},
*/