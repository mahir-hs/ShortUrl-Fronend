import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UrlShortenerService } from '../services/url-shortener.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-redirect',
  standalone: true,
  imports: [],
  templateUrl: './redirect.component.html',
  styleUrl: './redirect.component.scss'
})
export class RedirectComponent {
 constructor(
    private route: ActivatedRoute,
    private router: Router,
   private urlShortenerService: UrlShortenerService,
    @Inject(PLATFORM_ID) private platformId: any
  ) {}

  ngOnInit() {

    const shortUrl = this.route.snapshot.paramMap.get('shortUrl');

    if (shortUrl) {
      this.urlShortenerService.getOriginalUrl(shortUrl).subscribe({
        next: (response) => {
          if (isPlatformBrowser(this.platformId)) {
            window.location.href = response.result; 
          } else {
            this.router.navigateByUrl(response.result); 
          }
        },
        error: (err) => {
          console.error('Invalid short URL:', err);
          this.router.navigate(['/']);
        }
      });
    }
  }
}
