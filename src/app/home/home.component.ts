import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'
import { UrlShortenerService } from '../services/url-shortener.service';
import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule ,CommonModule,RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  originalUrl: string = '';
  expirationDate?: Date | null;
  shortenedUrl: string | null = null;
  constructor(private urlShortenerService: UrlShortenerService, private router: Router) {}
  submitUrl() {
    const requestData = {
      originalUrl: this.originalUrl,
      expirationDate: this.expirationDate ? new Date(this.expirationDate) : new Date(new Date().setMonth(new Date().getMonth() + 6))
    };

    console.log('Submitting:', requestData);

    this.urlShortenerService.shortenUrl(requestData).subscribe({
      next: (response) => {
        console.log('Shortened URL:', response.result);
        this.shortenedUrl = response.result;
      },
      error: (err) => {
        console.error('Error shortening URL:', err);
      }
    });
  }

  copyToClipboard() {
    if (this.shortenedUrl) {
      navigator.clipboard.writeText(this.shortenedUrl).then(() => {
        alert('Shortened URL copied to clipboard!');
      });
    }
  }

}
