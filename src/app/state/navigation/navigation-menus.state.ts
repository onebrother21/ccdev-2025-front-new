export const NAV_MENUS = {
  "ui-header":{
    items:[
      {label:"colorcoded",url:"/"},
      {label:"contact",url:'/en/contact'},
      {label:"about",url:'/en/about'},
      {label:"help",url:'/en/help'},
    ]
  },
  "ui-main":{
    items:[
      {label:"Dashboard",url:"/en/pi-mia",icon:"fas fa-tachometer-alt"},
      {label:"Cases",url:"/en/pi-mia/cases",icon:"fas fa-briefcase"},
      {label:"Fyrewyre",url:"/en/fyre",icon:"fas fa-fire"},
      {label:"JPMoney",url:"/en/jpmoney",icon:"fas fa-chart-line"},
      {label:"Help",url:"/en/help",icon:"fas fa-question"},
    ]
  },
  "left-sidebar":{
    items:[
      {label: 'Dashboard',icon: 'fas fa-tachometer-alt',url: '/en/pi-mia'},
      {label: 'Fyrewyre',icon: 'fas fa-fire',url: '/en/fyre'},
      {label: 'Authentication',icon: 'fas fa-user',url: '/abc123/signin'},
      {label: 'About Us',icon: 'fas fa-envelope',url: '/en/about'},
      {label: 'Contact Us',icon: 'fas fa-envelope',url: '/en/contact'},
    ]
  },
  "user-profile-main":{
    items: [
      {label:"Activity"},
      {label:"Timeline"},
      {label:"Edit Profile"},
    ]
  },
  "help":{
    items:[
      {url:"/en/about",classes:"btn btn-block btn-primary",icon:"fa fa-handshake",label:"About Us"},
      {url:"/en/help/faq",classes:"btn btn-block btn-primary",icon:"fa fa-list",label:"FAQ"},
      {url:"/en/help/bugs",classes:"btn btn-block btn-primary",icon:"fa fa-list",label:"Bugs & Improvements"},
      {url:"/en/help/bugs",classes:"btn btn-block btn-primary",icon:"fa fa-bug",label:"SR Queue"},
      {url:"/en/help/new",classes:"btn btn-block btn-primary",icon:"fa fa-envelope",label:"Contact Us"},
      {url:"/en/help/new",classes:"btn btn-block btn-primary",icon:"fa fa-paper-plane",label:"Submit SR"},
    ]
  },
  "jpmoney-home-tabs":{
    items:[
      {label:"Activity",url:"/en/jpmoney/hm/myActivity",icon:"fas fa-list"},
      {label:"Plans",url:"/en/jpmoney/hm/myPlans",icon:"fas fa-briefcase"},
      {label:"Venues",url:"/en/jpmoney/hm/venues",icon:"fas fa-list"},
      //{label:"Edit Case",url:"/en/pi-mia/hm/tabs/recent",icon:"fas fa-edit"},
    ]
  },
  "jpmoney-home-tools":{
    items:[
      {label:"New Plan",icon:"fas fa-pencil-ruler",classes:"bg-primary",url:"/en/jpmoney/new/plan"},
      {label:"New Entry",icon:"fas fa-clipboard-list",classes:"bg-primary",url:"/en/jpmoney/new/entry"},
      {label:"New Venue",icon:"fas fa-store-alt",classes:"bg-primary",url:"/en/jpmoney/new/venue"},
      {label:"Preferences",icon:"fas fa-cog",classes:"bg-primary",url:"/en/jpmoney/settings"},
    ],
  },
  "pi-mia-home-tools":{
    items:[
      {label:"New Trip",icon:"fas fa-car",classes:"bg-primary",text:"1h 5m",url:"/en/pi-mia/hm"},
      {label:"New Case",icon:"fas fa-briefcase",classes:"bg-primary",url:"/en/pi-mia/hm/editors/case"},
      {label:"New Client",icon:"fas fa-file-alt",classes:"bg-primary",url:"/en/pi-mia/hm/editors/client"},
      {label:"New File",icon:"fas fa-file-alt",classes:"bg-primary",url:"/en/pi-mia/hm/editors/file"},
      {label:"Add Attempt",icon:"fas fa-map-marked-alt",classes:"bg-primary",url:"/en/pi-mia/hm/editors/attempt"},
      {label:"Add Contact",icon:"fas fa-user-circle",classes:"bg-primary",url:"/en/pi-mia/hm/editors/contact"},
      {label:"Add Note",icon:"fas fa-edit",classes:"bg-primary",url:"/en/pi-mia/hm/editors/note"},
      {label:"Add Image",icon:"fas fa-camera",classes:"bg-primary",url:"/en/pi-mia/hm/editors/image"},
    ],
  },
  "pi-mia-home-tabs":{
    items:[
      {label:"Activity",url:"/en/pi-mia/hm/tabs/activity",icon:"fas fa-list"},
      {label:"Cases",url:"/en/pi-mia/hm/tabs/recent",icon:"fas fa-briefcase"},
      {label:"Edit Case",url:"/en/pi-mia/hm/tabs/recent",icon:"fas fa-edit"},
      //{label:"Summaries",url:"/en/pi-mia/dash/summaries",icon:"fas fa-comment"},
      //{label:"Invoices",url:"/en/pi-mia/dash/invoices",icon:"fas fa-dollar-sign"},
    ]
  },
  "pi-mia-case-editor":{
    items:[
      {url:"/en/pi-mia/hm/editors/case/target",classes:"btn btn-block",icon:"fa fa-plus",label:"Add Case Target"},
      {url:"/en/pi-mia/hm/editors/case/client",classes:"btn btn-block",icon:"fa fa-plus",label:"Select Case Client"},
      {url:"/en/pi-mia/hm/editors/case/details",classes:"btn btn-block",icon:"fa fa-plus",label:"Add Case Details"},
      {url:"/en/pi-mia/hm/editors/case/info",classes:"btn btn-block",icon:"fa fa-plus",label:"Add Case Info"},
      {url:"/en/pi-mia/hm",classes:"btn btn-block",icon:"fa fa-times",label:"Cancel & Reset Case",action:"cancelAndReset"},
      {url:"/en/pi-mia/hm/editors/case/confirm",classes:"btn btn-block",icon:"fa fa-check",label:"Review & Submit Case"},
    ]
  },
  "pi-mia-case-target-editor":{
    items:[
      {url:"/en/pi-mia/hm/editors/case/target/name",classes:"btn btn-block",icon:"fa fa-plus",label:"Add Target Name"},
      {url:"/en/pi-mia/hm/editors/case/target/idn",classes:"btn btn-block",icon:"fa fa-plus",label:"Add Target ID Info"},
      {url:"/en/pi-mia/hm/editors/case/target/demo",classes:"btn btn-block",icon:"fa fa-plus",label:"Add Target Demographics"},
      {url:"/en/pi-mia/hm/editors/case/target/misc",classes:"btn btn-block",icon:"fa fa-plus",label:"Add Target Misc Info"},
      {url:"/en/pi-mia/hm/editors/case/target/addr",classes:"btn btn-block",icon:"fa fa-plus",label:"Add Target Address"},
      {url:"/en/pi-mia/hm/editors/case/target/phn",classes:"btn btn-block",icon:"fa fa-plus",label:"Add Target Phone"},
      {url:"/en/pi-mia/hm/editors/case/target/email",classes:"btn btn-block",icon:"fa fa-plus",label:"Add Target Email"},
      {url:"/en/pi-mia/hm/editors/case/target/sm",classes:"btn btn-block",icon:"fa fa-plus",label:"Add Target SM"},
      {url:"/en/pi-mia/hm/editors/case",classes:"btn btn-block",icon:"fa fa-arrow-left",label:"Save & Go Back"},
    ]
  },
  "swift-budget-main":{
    items:[
      { label: "list",url:"/en/swift/budgets/id/main/list" },
      { label: "chart",url:"/en/swift/budgets/id/main/chart" },
      { label: "bars",url:"/en/swift/budgets/id/main/bars" },
      { label: "table",url:"/en/swift/budgets/id/main/table" },
      { label: "calendar",url:"/en/swift/budgets/id/main/calendar" },
      { label: "snapshot",url:"/en/swift/budgets/id/main/snapshot" },
      { label: "timeline",url:"/en/swift/budgets/id/main/timeline" },
    ]
  }
};