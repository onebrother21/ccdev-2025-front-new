import { Component, OnInit, Input,ElementRef, OnDestroy, PLATFORM_ID, Inject, inject, NgZone, ApplicationRef } from "@angular/core";
import { ROUTES } from "../sidebar/sidebar.component";
import { CommonModule, isPlatformBrowser, Location } from "@angular/common";
import { Router, RouterLink } from "@angular/router";
import { NgbDropdownModule,NgbModal,NgbModalRef,ModalDismissReasons, NgbCollapse } from '@ng-bootstrap/ng-bootstrap';
import { AppWindowService } from "core";
import { ModalComponent } from "app/shared/components/modal";
import { UserJson } from "@state";
import { Subscription, tap } from "rxjs";
import { ImageComponent } from "../image";

@Component({
  selector: "app-navbar",
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    NgbCollapse,
    NgbDropdownModule,
    ImageComponent,
  ],
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent implements OnInit, OnDestroy {
  private subs$:Subscription[] = [];
  ngOnDestroy(){
    this.subs$.forEach(s => s.unsubscribe());
    if(this.win.get()) window.removeEventListener("resize",this.updateColor);
  }
  @Input() user:UserJson|null = null;
  
  private listTitles: any[] = [];
  location: Location;
  mobile_menu_visible: any = 0;
  private toggleButton: any;
  private sidebarVisible: boolean;
  public isCollapsed = true;
  closeResult: string = "";
  win = inject(AppWindowService);

  modalReference:NgbModalRef = {} as any;
  config = {
    windowClass: 'modal-search',
    backdrop: 'static',
    keyboard: false,
    animated: true,
    //ignoreBackdropClick: true,
    initialState: {
      data1: 'new-user',
      username: 'test'
    }
  };
  constructor(
    location: Location,
    private element: ElementRef,
    private router: Router,
    private modalService: NgbModal,
    private appRef: ApplicationRef
  ) {
    this.location = location;
    this.sidebarVisible = false;
  }
  // function that adds color white/transparent to the navbar on resize (this is for the collapse)
  ngOnInit() {
    if(!this.win.get()) return;
    window.addEventListener("resize", this.updateColor);
    this.listTitles = ROUTES.filter(listTitle => listTitle);
    const navbar: HTMLElement = this.element.nativeElement;
    this.toggleButton = navbar.getElementsByClassName("navbar-toggler")[0];
    this.subs$.push(
      this.router.events.pipe(tap(event => {
        this.sidebarClose();
        const $layer: any = document.getElementsByClassName("close-layer")[0];
        if ($layer) {
          $layer.remove();
          this.mobile_menu_visible = 0;
        }
      })).subscribe(),
    );
  }
  updateColor() {
    if(this.win.get()){
      const navbar = document.getElementsByClassName('navbar')[0];
      if (window.innerWidth < 993 && !this.isCollapsed) {
        navbar.classList.add('bg-white');
        navbar.classList.remove('navbar-transparent');
      }
      else {
        navbar.classList.remove('bg-white');
        navbar.classList.add('navbar-transparent');
      }
    }
  }
  collapse() {
    this.isCollapsed = !this.isCollapsed;
    const navbar = document.getElementsByTagName("nav")[0];
    if (!this.isCollapsed) {
      navbar.classList.remove("navbar-transparent");
      navbar.classList.add("bg-white");
    }
    else {
      navbar.classList.add("navbar-transparent");
      navbar.classList.remove("bg-white");
    }
  }
  sidebarOpen() {
    const toggleButton = this.toggleButton;
    const mainPanel = <HTMLElement>(document.getElementsByClassName("main-panel")[0]);
    const html = document.getElementsByTagName("html")[0];
    if (window.innerWidth < 991) {mainPanel.style.position = "fixed";}
    setTimeout(() =>  {toggleButton.classList.add("toggled");}, 500);
    html.classList.add("nav-open");
    this.sidebarVisible = true;
  }
  sidebarClose() {
    const html = document.getElementsByTagName("html")[0];
    this.toggleButton.classList.remove("toggled");
    const mainPanel = <HTMLElement>(document.getElementsByClassName("main-panel")[0]);
    if (window.innerWidth < 991) {setTimeout(() =>  {mainPanel.style.position = "";}, 500);}
    this.sidebarVisible = false;
    html.classList.remove("nav-open");
  }
  sidebarToggle() {
    // const toggleButton = this.toggleButton;
    const html = document.getElementsByTagName('html')[0];
    const $toggle = document.getElementsByClassName("navbar-toggler")[0];
    const $layer = document.createElement("div");

    if (this.sidebarVisible === false) {this.sidebarOpen();}
    else {this.sidebarClose();}

    if (this.mobile_menu_visible == 1) {
      // $('html').removeClass('nav-open');
      html.classList.remove("nav-open");
      if ($layer) {$layer.remove();}
      setTimeout(() =>  {$toggle.classList.remove("toggled");}, 400);
      this.mobile_menu_visible = 0;
    }
    else {
      setTimeout(() =>  {$toggle.classList.add("toggled");}, 430);
      $layer.setAttribute("class", "close-layer");
      if (html.querySelectorAll(".main-panel")) {
        document.getElementsByClassName("main-panel")[0].appendChild($layer);
      }
      else if (html.classList.contains("off-canvas-sidebar")) {
        document.getElementsByClassName("wrapper-full-page")[0].appendChild($layer);
      }
      setTimeout(() =>  {$layer.classList.add("visible");}, 100);
      const onclick =() =>  {
        //asign a function
        html.classList.remove("nav-open");
        this.mobile_menu_visible = 0;
        $layer.classList.remove("visible");
        setTimeout(() =>  {
          $layer.remove();
          $toggle.classList.remove("toggled");
        }, 400);
      };
      $layer.onclick = onclick.bind(this);
      html.classList.add("nav-open");
      this.mobile_menu_visible = 1;
    }
  }
  getTitle() {
    let titlee = this.location.prepareExternalUrl(this.location.path());
    if (titlee.charAt(0) === "#") {titlee = titlee.slice(1);}
    for (let item = 0; item < this.listTitles.length; item++) {
      if (titlee.includes(this.listTitles[item].path)) {
        return this.listTitles[item].title;
      }
    }
    return "Dashboard";
  }
  openSearchModal(){
      this.modalReference = this.modalService.open(ModalComponent,this.config as any);
      this.appRef.tick();
      this.modalReference.componentInstance.user = this.user;
      this.modalReference.result.then((result) => {
        if (result) {
          console.log(result);
        }
      });
      /*
      this.modalReference.componentInstance.passEntry.subscribe((receivedEntry:any) => {
        console.log(receivedEntry);
      });
      */
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    }
    else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    }
    else {
      return  `with: ${reason}`;
    }
  }
}
