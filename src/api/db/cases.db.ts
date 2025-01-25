import { Case, CaseType } from "../models";

export const CASES:CaseType[] = [
  {
    _id:"7f07a7ee2f8a3d2b5f6f3a4f29f3c001",
    reqNo:"11011",
    title:"proof of insurance",
    desc:"attain proof of auto insurance from household member",
    status:{name:"in-progress",time:"2023-11-17T19:36:00Z"},
    creator:{
      username:"jackswift",
      fullname:"jack p",
      email:"jack.swift@gmail.com",
      _id: "7f07a7ee2f8a3d2b5f6f3a4f29f3b286",
      img:'assets/img/user1-128x128.jpg',
      loc:"//Spring//TX//USA",
    },
    createdAt:"2023-11-16T19:36:00Z",
    published:"2023-11-16T19:36:00Z",
    dueBy:"2023-11-27T19:36:00Z",
    startingBid:2000,
    isHot:true,
    rush:true,
    client:{
      fullname:"Hardessey LLP",
      email:"service.one@gmail.com",
      username:"Hardessey",
      img:"",
      //phn:"+1-222-222-2222",
      loc:"123 Scary Ln//Houston//TX/77001/USA",
      _id:"s0me-user-id-11",
      //type:"biz",
    },
    admin:{
      username:"jackswift",
      fullname:"jack p",
      email:"jack.swift@gmail.com",
      _id: "7f07a7ee2f8a3d2b5f6f3a4f29f3b286",
      img:'assets/img/user1-128x128.jpg',
      loc:"123 Scary Ln//Houston//TX/77001/USA",
    },
    target:{
      name:"Jerry Terry",
      dob:"2022-06-21T19:36:00Z",
      addrs:[
        {str:"123 Scary Ln//Houston//TX/77001/USA"},
        {str:"156 WonderfulDr//Houston//TX/77041/USA"}
      ],
      phns:["+1-222-222-2222","+1-222-232-2424"],
      emails:[
        "service.one@gmail.com",
        "service.two@gmail.com"
      ]
    },
    info:{
      signatureReq:false,
      //firstOrigDate:"2009-11-16T19:36:00Z",
      //lastOrigDate:"2011-11-16T19:36:00Z",
    }
  },{
    _id:"7f07a7ee2f8a3d2b5f6f3a4f29f3c002",
    reqNo:"11012",
    title:"adoption subpeona",
    desc:"serve adoption subpeona",
    creator:{
      username:"jackswift",
      fullname:"jack p",
      email:"jack.swift@gmail.com",
      _id: "7f07a7ee2f8a3d2b5f6f3a4f29f3b286",
      img:'assets/img/user1-128x128.jpg',
      loc:"123 Scary Ln//Houston//TX/77001/USA",
    },
    createdAt:"2023-11-16T19:36:00Z",
    published:"2023-11-16T19:36:00Z",
    dueBy:"2023-11-27T19:36:00Z",
    status:{name:"completed",time:"2023-11-17T19:36:00Z"},
    isHot:true,
    rush:true,
    client:{
      fullname:"Hardessey LLP",
      username:"Hardessey",
      email:"service.one@gmail.com",
      //phn:"+1-222-222-2222",
      loc:"123 Scary Ln//Houston//TX/77001/USA",
      _id:"s0me-user-id-11",
      img:""
      //type:"biz",
    },
    admin:{
      username:"jackswift",
      fullname:"jack p",
      email:"jack.swift@gmail.com",
      _id: "7f07a7ee2f8a3d2b5f6f3a4f29f3b286",
      img:'assets/img/user1-128x128.jpg',
      loc:"123 Scary Ln//Houston//TX/77001/USA",
    },
    target:{
      name:"Natasha Boris",
      dob:"2022-06-21T19:36:00Z",
      addrs:[{str:"56 Scary Ln//Houston//TX/77001/USA"},{str:"156 WonderfulDr//Houston//TX/77041/USA"}],
      phns:["+1-222-222-2222","+1-222-232-2424"],
      emails:["service.one@gmail.com","service.two@gmail.com"]
    },
    info:{
      signatureReq:false,
    },
    startingBid:2000,
  },
    /*
    activity:[
      {
        id:"note-1",
        type:"note",
        name:"testadminjack",
        msg:"Et harum quidem rerum facilis est et expedita distinctio",
        time:"2022-06-21T19:36:00Z"
      },{
        id:"note-2",
        type:"note",
        name:"miabia",
        msg:"Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit",
        time:"2022-06-21T19:46:00Z"
      },{
        id:"note-3",
        type:"note",
        name:"testadminjack",
        msg:"non recusandae. Itaque earum rerum hic tenetur a sapiente delectus",
        time:"2022-06-21T19:56:00Z"
      },{
        id:"attempt-1",
        type:"attempt",
        name:"attempt 1",
        time:"2022-06-21T19:56:00Z",
        start:"2022-06-21T19:56:00Z",
        end:"2022-06-21T19:56:00Z",
        legs:[
          {
            id:"leg-1",
            name:"leg 1",
            type:"leg",
            time:"2022-06-21T19:56:00Z",
            stops:[
              {
                type:"stop",
                loc:{str:"123 Scary Ln///Houston/TX/77001/USA"},
                time:"2022-06-21T19:36:00Z",
                name:"stop 1",
                id:"stop-1"
              },{
                type:"stop",
                loc:{str:"123 Scary Ln///Houston/TX/77001/USA"},
                time:"2022-06-21T19:36:00Z",
                name:"stop 1",
                id:"stop-1"
              }
            ]
          },{
            id:"leg-2",
            name:"leg 2",
            type:"leg",
            time:"2022-06-21T19:56:00Z",
            stops:[
              {
                type:"stop",
                loc:{str:"123 Scary Ln///Houston/TX/77001/USA"},
                time:"2022-06-21T19:36:00Z",
                name:"stop-2",
                id:"stop-2"
              },{
                type:"stop",
                loc:{str:"123 Scary Ln///Houston/TX/77001/USA"},
                time:"2022-06-21T19:36:00Z",
                name:"stop 3",
                id:"stop-3"
              },
            ]
          },
        ],
      },{
        id:"contact-1",
        type:"contact",
        type_:"ftf",
        name:"Janice Terry",
        rel:"cousin",
        time:"2022-06-21T19:36:00Z",
        info:"Et vel hinc partem voluptaria",
      },{
        id:"contact-2",
        type:"contact",
        type_:"phn",
        name:"Jerry Terry",
        rel:"_target_",
        time:"2022-06-21T19:36:00Z",
        info:"At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium"
        +" voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate"
        +" non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.",
      },{
        id:"contact-3",
        type:"contact",
        type_:"ftf",
        name:"Jerry Terry",
        rel:"_target_",
        time:"2022-06-21T19:36:00Z",
        info:"Lorem ipsum dolor sit amet, et vel hinc partem voluptaria",
      },
      {name:"Audio1",size:20,time:"2023-11-18T19:36:00Z",ext:"wav",type:"clip",id:"clip 1"},
      {name:"Audio2",size:21,time:"2023-11-18T19:45:00Z",ext:"aud",type:"clip",id:"clip 2"},
      {name:"Jonnhy_5_Pic",size:20,time:"2023-11-18T19:36:00Z",ext:"png",type:"img",id:"img 1"},
      {name:"Jonnhy_6_Driving_Record_2023",size:21,time:"2023-11-18T19:45:00Z",ext:"docx",type:"doc",id:"doc 1"},
      {name:"Jonnhy_6_Insurance_Card",size:22,time:"2023-11-18T21:36:00Z",ext:"pdf",type:"doc",id:"doc 2"},
    ] as Case["activity"],
     
    invoice:{
      summary:"all that shit",
      amt:345.56,
      breakdown:{mileage:9,field:100,tax:18,doc:200,misc:18.56},
      sent:"2022-10-03T19:36:00Z",
      paid:"2022-10-05T19:36:00Z",
    },
    */
    /*
    bids:[
      {name:"Jonnhy 5",amt:2050,ts:"2023-11-18T19:36:00Z",loc:"Houston, TX"},
      {name:"Jonnhy 6",amt:2130,ts:"2023-11-18T19:45:00Z",loc:"Atlanta, GA"},
      {name:"Jonnhy 7",amt:2250,ts:"2023-11-18T21:36:00Z",loc:"Dallas, TX"},
    ],
    services:{
      field:{
        amt:345.56,
        status:"paid",
        ts:"2023-11-17T19:36:00Z",
        code:"ABCDASD3",
        method:"VISA",
      },
      doc:{
        amt:345.56,
        status:"paid",
        ts:"2023-11-17T19:36:00Z",
        code:"ABCDASD3",
        method:"VISA",
      },
      trans:{},
    },
    activityLog:[
      {user:"Hardessey LLP",action:"submitted",type:"case",time:"2022-06-21T19:36:00Z",item:"case-0"},
      {user:"testadminjack",action:"submitted",type:"bid",time:"2022-06-21T19:46:00Z",item:"case-0"},
      {user:"sysadmin",action:"closed",type:"bid",time:"2022-06-21T20:36:00Z",item:"case-0"},
      {user:"sysadmin",action:"assigned to",info:"testadminjack",type:"case",time:"2022-06-21T20:39:00Z",item:"case-0"},
      {user:"testadminjack",action:"added",type:"note",time:"2022-06-21T20:56:00Z",item:"note-1"},
      {user:"testadminjack",action:"added",type:"contact",time:"2022-06-21T21:16:00Z",item:"contact-1"},
      {user:"testadminjack",action:"added",type:"attempt",time:"2022-06-21T21:26:00Z",item:"attempt-1"},
      {user:"testadminjack",action:"added",type:"contact",time:"2022-06-21T21:36:00Z",item:"contact-2"},
      {user:"miabia",action:"added",type:"note",time:"2022-06-21T21:46:00Z",item:"note-2"},
      {user:"testadminjack",action:"added",type:"note",time:"2022-06-21T22:56:00Z",item:"note-3"},
    ],
  },{
    id:"s0me-case-id-3",
    reqNo:"11013",
    title:"accident investigation",
    desc:"investigate accident and get answers",
    created:"2023-11-16T19:36:00Z",
    published:"2023-11-16T19:36:00Z",
    dueOn:"2023-11-27T19:36:00Z",
    status:{name:"new",time:"2023-11-17T19:36:00Z"},
    isHot:true,
    rush:true,
    client:{
      name:"Hardessey LLP",
      email:"service.one@gmail.com",
      phn:"+1-222-222-2222",
      addr:"123 Scary Ln, Houston, TX 77001",
      id:"s0me-user-id-11",
      type:"biz",
    },
    target:{
      name:"Jamie Diamond",
      dob:"2022-06-21T19:36:00Z",
      addrs:[{str:"56 Scary Ln///Houston/TX/77001/USA"},{str:"156 WonderfulDr///Houston/TX/77041/USA"}],
      phns:["+1-222-222-2222","+1-222-232-2424"],
      emails:["service.one@gmail.com","service.two@gmail.com"]
    },
    info:{
      signatureReq:false,
      type:"digital text",
      size:101,
      sizeUnit:"gb",
      numOfEntries:1470,
      avgEntryLength:"166 lines of char",
      avgEntrySize:50,
      avgEntrySizeUnit:"mb",
      composition:"collection of university student written essay on various topics",
      source:"first year university students",
      //firstOrigDate:"2009-11-16T19:36:00Z",
      //lastOrigDate:"2011-11-16T19:36:00Z",
    },
    activity:[
      {
        id:"note-1",
        type:"note",
        name:"testadminjack",
        msg:"Et harum quidem rerum facilis est et expedita distinctio",
        time:"2022-06-21T19:36:00Z"
      },{
        id:"note-2",
        type:"note",
        name:"miabia",
        msg:"Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit",
        time:"2022-06-21T19:46:00Z"
      },{
        id:"note-3",
        type:"note",
        name:"testadminjack",
        msg:"non recusandae. Itaque earum rerum hic tenetur a sapiente delectus",
        time:"2022-06-21T19:56:00Z"
      },{
        id:"attempt-1",
        type:"attempt",
        name:"attempt 1",
        time:"2022-06-21T19:56:00Z",
        start:"2022-06-21T19:56:00Z",
        end:"2022-06-21T19:56:00Z",
        legs:[
          {
            id:"leg-1",
            name:"leg 1",
            type:"leg",
            time:"2022-06-21T19:56:00Z",
            stops:[
              {
                type:"stop",
                loc:{str:"123 Scary Ln///Houston/TX/77001/USA"},
                time:"2022-06-21T19:36:00Z",
                name:"stop 1",
                id:"stop-1"
              },{
                type:"stop",
                loc:{str:"123 Scary Ln///Houston/TX/77001/USA"},
                time:"2022-06-21T19:36:00Z",
                name:"stop 1",
                id:"stop-1"
              }
            ]
          },{
            id:"leg-2",
            name:"leg 2",
            type:"leg",
            time:"2022-06-21T19:56:00Z",
            stops:[
              {
                type:"stop",
                loc:{str:"123 Scary Ln///Houston/TX/77001/USA"},
                time:"2022-06-21T19:36:00Z",
                name:"stop-2",
                id:"stop-2"
              },{
                type:"stop",
                loc:{str:"123 Scary Ln///Houston/TX/77001/USA"},
                time:"2022-06-21T19:36:00Z",
                name:"stop 3",
                id:"stop-3"
              },
            ]
          },
        ],
      },{
        id:"contact-1",
        type:"contact",
        type_:"ftf",
        name:"Janice Terry",
        rel:"cousin",
        time:"2022-06-21T19:36:00Z",
        info:"Et vel hinc partem voluptaria",
      },{
        id:"contact-2",
        type:"contact",
        type_:"phn",
        name:"Jerry Terry",
        rel:"_target_",
        time:"2022-06-21T19:36:00Z",
        info:"At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium"
        +" voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate"
        +" non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.",
      },{
        id:"contact-3",
        type:"contact",
        type_:"ftf",
        name:"Jerry Terry",
        rel:"_target_",
        time:"2022-06-21T19:36:00Z",
        info:"Lorem ipsum dolor sit amet, et vel hinc partem voluptaria",
      },
      {name:"Audio1",size:20,time:"2023-11-18T19:36:00Z",ext:"wav",type:"clip",id:"clip 1"},
      {name:"Audio2",size:21,time:"2023-11-18T19:45:00Z",ext:"aud",type:"clip",id:"clip 2"},
      {name:"Jonnhy_5_Pic",size:20,time:"2023-11-18T19:36:00Z",ext:"png",type:"img",id:"img 1"},
      {name:"Jonnhy_6_Driving_Record_2023",size:21,time:"2023-11-18T19:45:00Z",ext:"docx",type:"doc",id:"doc 1"},
      {name:"Jonnhy_6_Insurance_Card",size:22,time:"2023-11-18T21:36:00Z",ext:"pdf",type:"doc",id:"doc 2"},
    ] as Case["activity"],
    invoice:{
      summary:"all that shit",
      amt:345.56,
      breakdown:{mileage:9,field:100,tax:18,doc:200,misc:18.56},
      sent:"2022-10-03T19:36:00Z",
      paid:"2022-10-05T19:36:00Z",
    },
    startingBid:2000,
    bids:[
      {name:"Jonnhy 5",amt:2050,ts:"2023-11-18T19:36:00Z",loc:"Houston, TX"},
      {name:"Jonnhy 6",amt:2130,ts:"2023-11-18T19:45:00Z",loc:"Atlanta, GA"},
      {name:"Jonnhy 7",amt:2250,ts:"2023-11-18T21:36:00Z",loc:"Dallas, TX"},
    ],
    services:{
      field:{
        amt:345.56,
        status:"paid",
        ts:"2023-11-17T19:36:00Z",
        code:"ABCDASD3",
        method:"VISA",
      },
      doc:{
        amt:345.56,
        status:"paid",
        ts:"2023-11-17T19:36:00Z",
        code:"ABCDASD3",
        method:"VISA",
      },
      trans:{},
    },
    activityLog:[
      {user:"Hardessey LLP",action:"submitted",type:"case",time:"2022-06-21T19:36:00Z",item:"case-0"},
      {user:"testadminjack",action:"submitted",type:"bid",time:"2022-06-21T19:46:00Z",item:"case-0"},
      {user:"sysadmin",action:"closed",type:"bid",time:"2022-06-21T20:36:00Z",item:"case-0"},
      {user:"sysadmin",action:"assigned to",info:"testadminjack",type:"case",time:"2022-06-21T20:39:00Z",item:"case-0"},
      {user:"testadminjack",action:"added",type:"note",time:"2022-06-21T20:56:00Z",item:"note-1"},
      {user:"testadminjack",action:"added",type:"contact",time:"2022-06-21T21:16:00Z",item:"contact-1"},
      {user:"testadminjack",action:"added",type:"attempt",time:"2022-06-21T21:26:00Z",item:"attempt-1"},
      {user:"testadminjack",action:"added",type:"contact",time:"2022-06-21T21:36:00Z",item:"contact-2"},
      {user:"miabia",action:"added",type:"note",time:"2022-06-21T21:46:00Z",item:"note-2"},
      {user:"testadminjack",action:"added",type:"note",time:"2022-06-21T22:56:00Z",item:"note-3"},
    ],
  }
    */
];