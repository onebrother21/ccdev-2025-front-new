import { PostType } from "api/models";

export const POSTS:PostType[] = [
  {
    status:{
      name:"new",
      time:"2024-07-23T01:38:48.322Z"
    },
    _id:"7f07a7ee2f8a3d2b5f6f3a4f29f3b287",
    type:"user-timeline",
    creator:{
      username:"jackswift",
      fullname:"jack p",
      email:"jack.swift@gmail.com",
      _id: "7f07a7ee2f8a3d2b5f6f3a4f29f3b286",
      img:'assets/img/user1-128x128.jpg',
      loc:"Spring, TX",
    },
    createdAt:"2024-07-23T01:38:48.322Z",
    published:"2024-07-23T01:38:48.322Z",
    title:"posted a new note",
    content:'Lorem ipsum represents a long-held tradition for designers...',
    shares:12,
    likes:34,
    images: [
      'assets/img/photo1.png',
      'assets/img/photo2.png',
      //'assets/img/photo3.jpg',
      //'assets/img/photo4.jpg',
      //'assets/img/photo1.png'
    ],
    /*
    activity:[
      {
        createdAt:"2024-07-23T01:38:48.322Z",
        user:"7f07a7ee2f8a3d2b5f6f3a4f29f3c133",
        type:'submit',
      },{
        createdAt:"2024-07-23T01:38:48.322Z",
        user:"7f07a7ee2f8a3d2b5f6f3a4f29f3c134",
        type:'comment',
        ref:{id:"7f07a7ee2f8a3d2b5f6f3a4f29f3c134",model:"comment"},
        text:'Great post!'
      },{
        createdAt:"2024-07-23T01:38:48.322Z",
        user:"7f07a7ee2f8a3d2b5f6f3a4f29f3c135",
        type:'comment',
        ref:{id:"7f07a7ee2f8a3d2b5f6f3a4f29f3c134",model:"comment"},
        text:'Great post!'
      }
    ]
      */
  },
  /*{
    status: {
      name: "posted",
      time: "2024-07-23T01:38:48.322Z"
    },
    qid: "7f07a7ee2f8a3d2b5f6f3a4f29f3b273",
    id: "7f07a7ee2f8a3d2b5f6f3a4f29f3b273",
    type:"user-activity",
    createdAt:"2022-06-21T19:36:00Z",
    user:{
      id:"7f07a7ee2f8a3d2b5f6f3a4f29f3c134",
      img: 'assets/img/user7-128x128.jpg',
      fullname: 'Sarah Ross',
      username:"sross"
    },
    userAction:'sent you a message',
    published: '3 days ago',
    text: 'Lorem ipsum represents a long-held tradition for designers...',
    shares: 5,
    likes: 20
  },{
    status: {
      name: "posted",
      time: "2024-07-23T01:38:48.322Z"
    },
    qid: "7f07a7ee2f8a3d2b5f6f3a4f29f3b280",
    id: "7f07a7ee2f8a3d2b5f6f3a4f29f3b280",
    createdAt:"2022-06-21T19:36:00Z",
    type:"user-activity",
    user:{
      id:"7f07a7ee2f8a3d2b5f6f3a4f29f3c135",
      img: 'assets/img/user6-128x128.jpg',
      fullname: 'Adam Jones',
      username:"awarlock27"
    },
    userAction:'posted 5 photos',
    published: '5 days ago',
    text: '',
    images: [
      'assets/img/photo1.png',
      'assets/img/photo2.png',
      //'assets/img/photo3.jpg',
      //'assets/img/photo4.jpg',
      //'assets/img/photo1.png'
    ],
    shares: 8,
    likes: 45,
    comments: [
      { user: 'Charlie', text: 'Awesome photos!' }
    ]
  },{
    status: {
      name: "posted",
      time: "2024-07-23T01:38:48.322Z"
    },
    qid: "7f07a7ee2f8a3d2b5f6f3a4f29f3b281",
    id: "7f07a7ee2f8a3d2b5f6f3a4f29f3b281",
    createdAt:'2024-07-27T01:38:48.322Z',
    published:'2024-07-27T01:38:48.322Z',
    type:"pi-mia-activity",
    icon: 'fas fa-clipboard bg-secondary',
    user: {username:'SysAdmn'},
    userAction: 'transcribed a voice clip',
    text: 'Take me to your leader! Switzerland is small and neutral! We are more like Germany, ambitious and misunderstood!',
    options: ['Play','Delete'],
    ref:{type:"note",id:"7f07a7ee2f8a3d2b5f6f3a4f29f3b281"},
  },{
    status: {
      name: "posted",
      time: "2024-07-23T01:38:48.322Z"
    },
    qid: "7f07a7ee2f8a3d2b5f6f3a4f29f3b282",
    id: "7f07a7ee2f8a3d2b5f6f3a4f29f3b282",
    createdAt:'2024-07-27T01:38:48.322Z',
    published:'2024-07-27T01:38:48.322Z',
    type:"pi-mia-activity",
    icon: 'fas fa-microphone bg-primary',
    user:{
      img: 'assets/img/avatar4.png',
      username:"jackswift",
      fullname:'Jack Swift',
      location:'Houston, TX',
    },
    userAction: 'added a voice clip',
    options: ['Play','Delete']
  },{
    status: {
      name: "posted",
      time: "2024-07-23T01:38:48.322Z"
    },
    qid: "7f07a7ee2f8a3d2b5f6f3a4f29f3b283",
    id: "7f07a7ee2f8a3d2b5f6f3a4f29f3b283",
    createdAt:'2024-07-27T01:38:48.322Z',
    published:'2024-07-27T01:38:48.322Z',
    type:"pi-mia-activity",
    icon: 'fas fa-user bg-primary',
    user:{
      img: 'assets/img/avatar4.png',
      username:"jackswift",
      fullname:'Jack Swift',
      location:'Houston, TX',
    },
    userAction:'made a contact',
    text: 'Sarah Young - Neighbor',
  },{
    status: {
      name: "posted",
      time: "2024-07-23T01:38:48.322Z"
    },
    qid: "7f07a7ee2f8a3d2b5f6f3a4f29f3b284",
    id: "7f07a7ee2f8a3d2b5f6f3a4f29f3b284",
    createdAt:'2024-07-27T01:38:48.322Z',
    published:'2024-07-27T01:38:48.322Z',
    type:"pi-mia-activity",
    icon: 'fas fa-clipboard bg-primary',
    user:{
      img: 'assets/img/avatar4.png',
      username:"jackswift",
      fullname:'Jack Swift',
      location:'Houston, TX',
    },
    userAction: 'added a note',
    text: 'Get out the Target',
    options: ['Edit','Delete']
  },{
    status: {
      name: "posted",
      time: "2024-07-23T01:38:48.322Z"
    },
    qid: "7f07a7ee2f8a3d2b5f6f3a4f29f3b285",
    id: "7f07a7ee2f8a3d2b5f6f3a4f29f3b285",
    createdAt:'2024-07-27T01:38:48.322Z',
    published:'2024-07-27T01:38:48.322Z',
    type:"pi-mia-activity",
    icon: 'fas fa-camera bg-purple',
    user:{
      img: 'assets/img/avatar4.png',
      username:"jackswift",
      fullname:'Jack Swift',
      location:'Houston, TX',
    },
    userAction: 'uploaded new photos',
    images: [
      'assets/img/user1-128x128.jpg',
      'assets/img/user4-128x128.jpg',
    ]
  },{
    status: {
      name: "posted",
      time: "2024-07-23T01:38:48.322Z"
    },
    qid: "7f07a7ee2f8a3d2b5f6f3a4f29f3b286",
    id: "7f07a7ee2f8a3d2b5f6f3a4f29f3b286",
    createdAt:'2024-07-27T01:38:48.322Z',
    published:'2024-07-27T01:38:48.322Z',
    type:"pi-mia-activity",
    icon:"fa fa-map-marked bg-info",
    user:{username:'SysAdmn'},
    userAction: 'computed a leg',
    text:"From Home to 7898 Sunshine - 13 mi",
  },{
    status: {
      name: "posted",
      time: "2024-07-23T01:38:48.322Z"
    },
    qid: "7f07a7ee2f8a3d2b5f6f3a4f29f3b287",
    id: "7f07a7ee2f8a3d2b5f6f3a4f29f3b287",
    createdAt:'2024-07-27T01:38:48.322Z',
    published:'2024-07-27T01:38:48.322Z',
    type:"pi-mia-activity",
    icon:"fa fa-map-marker bg-primary",
    user:{
      img: 'assets/img/avatar4.png',
      username:"jackswift",
      fullname:'Jack Swift',
      location:'Houston, TX',
    },
    userAction: 'added a stop',
    text:"7898 Sunshine, Ipsilani, MI 6060672.8889292, 83.27282929",
  },{
    status: {
      name: "posted",
      time: "2024-07-23T01:38:48.322Z"
    },
    qid: "7f07a7ee2f8a3d2b5f6f3a4f29f3b288",
    id: "7f07a7ee2f8a3d2b5f6f3a4f29f3b288",
    createdAt:'2024-07-27T01:38:48.322Z',
    published:'2024-07-27T01:38:48.322Z',
    type:"pi-mia-activity",
    icon:"fa fa-car bg-success",
    user:{
      img: 'assets/img/avatar4.png',
      username:"jackswift",
      fullname:'Jack Swift',
      location:'Houston, TX',
    },
    userAction: 'started a work trip',
  },{
    status: {
      name: "posted",
      time: "2024-07-23T01:38:48.322Z"
    },
    qid: "7f07a7ee2f8a3d2b5f6f3a4f29f3b288",
    id: "7f07a7ee2f8a3d2b5f6f3a4f29f3b288",
    createdAt:'2024-07-27T01:38:48.322Z',
    published:'2024-07-27T01:38:48.322Z',
    type:"pi-mia-activity",
    icon: 'fas fa-camera bg-purple',
    user:{
      username:"minalee",
      fullname:'Mina Lee',
      location:"New York, NY"
    },
    userAction: 'uploaded new photos',
    images: [
      'https://placehold.it/150x100',
      'https://placehold.it/150x100',
      'https://placehold.it/150x100',
      'https://placehold.it/150x100'
    ]
  },{
    status: {
      name: "posted",
      time: "2024-07-23T01:38:48.322Z"
    },
    qid: "7f07a7ee2f8a3d2b5f6f3a4f29f3b331",
    id: "7f07a7ee2f8a3d2b5f6f3a4f29f3b331",
    createdAt:'2024-07-27T01:38:48.322Z',
    published:'2024-07-27T01:38:48.322Z',
    type:"user-timeline",
    icon: 'fas fa-envelope bg-primary',
    user:{username:'Support Team'},
    userAction: 'sent you an email',
    text: 'Etsy doostang zoodles disqus groupon greplin oooj voxy zoodles...',
    options: ['Read more', 'Delete']
  },{
    status: {
      name: "posted",
      time: "2024-07-23T01:38:48.322Z"
    },
    qid: "7f07a7ee2f8a3d2b5f6f3a4f29f3b332",
    id: "7f07a7ee2f8a3d2b5f6f3a4f29f3b332",
    createdAt:'2024-07-27T01:38:48.322Z',
    published:'2024-07-27T01:38:48.322Z',
    type:"user-timeline",
    icon: 'fas fa-user bg-info',
    user:{username:'Sarah Young'},
    userAction: 'accepted your friend request',
  },{
    status: {
      name: "posted",
      time: "2024-07-23T01:38:48.322Z"
    },
    qid: "7f07a7ee2f8a3d2b5f6f3a4f29f3b333",
    id: "7f07a7ee2f8a3d2b5f6f3a4f29f3b333",
    createdAt:'2024-07-27T01:38:48.322Z',
    published:'2024-07-27T01:38:48.322Z',
    type:"user-timeline",
    icon: 'fas fa-comments bg-warning',
    user:{username:'Jay White'},
    userAction: 'commented on your post',
    text: 'Take me to your leader! Switzerland is small and neutral! We are more like Germany, ambitious and misunderstood!',
    options: ['View comment']
  },{
    status: {
      name: "posted",
      time: "2024-07-23T01:38:48.322Z"
    },
    qid: "7f07a7ee2f8a3d2b5f6f3a4f29f3b333",
    id: "7f07a7ee2f8a3d2b5f6f3a4f29f3b333",
    createdAt:'2024-07-29T15:38:48.322Z',
    published:'2024-07-29T15:38:48.322Z',
    type:"user-timeline",
    user:{username:'jackswift'},
    userAction: 'commented on your post',
    text: 'Take me to your leader! Switzerland is small and neutral! We are more like Germany, ambitious and misunderstood!',
    options: ['View comment']
  }
    */
];