import { Injectable } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private notification: NzNotificationService) {}

  success(title = 'Successfully', content?: string) {
    this.notification.create('success', title, content as any);
  }

  error(title = 'Error', content?: string) {
    this.notification.create('error', title, content as any);
  }
}
