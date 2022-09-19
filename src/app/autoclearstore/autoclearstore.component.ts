import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MatCarousel, MatCarouselComponent } from '@ngmodule/material-carousel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-autoclearstore',
  templateUrl: './autoclearstore.component.html',
  styleUrls: ['./autoclearstore.component.scss']
})
export class AutoclearstoreComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,private router:Router) {}

    slides = [
  
        {'image': './assets/images/Allen.jpg'}, 
  
        {'image': './assets/images/Campbell.jpg'},
  
        {'image': './assets/images/Scotts.jpg'}  
      ];
}
