import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AlertHelper {
  private alertEl: HTMLDivElement | null = null;

  show(
    message: string,
    type: 'success' | 'error' = 'error',
    delay = 2000,
    duration = 3000
  ) {
    // Remove existing alert
    if (this.alertEl) {
      this.alertEl.remove();
    }

    setTimeout(() => {
      this.alertEl = document.createElement('div');
      this.alertEl.innerText = message;

      this.alertEl.style.position = 'fixed';
      this.alertEl.style.top = '20px';
      this.alertEl.style.right = '20px';
      this.alertEl.style.padding = '14px 18px';
      this.alertEl.style.borderRadius = '8px';
      this.alertEl.style.color = '#fff';
      this.alertEl.style.fontSize = '14px';
      this.alertEl.style.boxShadow = '0 10px 25px rgba(0,0,0,.15)';
      this.alertEl.style.zIndex = '9999';
      this.alertEl.style.background =
        type === 'success' ? '#10b981' : '#ef4444';

      document.body.appendChild(this.alertEl);

      setTimeout(() => {
        this.alertEl?.remove();
        this.alertEl = null;
      }, duration);

    }, delay);
  }
}
