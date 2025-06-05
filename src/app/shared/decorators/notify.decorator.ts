import { catchError, Observable, of, tap } from 'rxjs';
import { InjectorHelper } from '../../core/injector.helper';
import { NzNotificationService } from 'ng-zorro-antd/notification';

export function Notify(successMessage: string, errorMessage: string) {
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      const result: Observable<any> = originalMethod.apply(this, args);

      // Retrieve NotificationService using Injector at runtime
      const notificationService = InjectorHelper.injector.get(
        NzNotificationService,
      );

      return result
        .pipe(
          tap(() => {
            notificationService.create('success', successMessage, '');
          }),
          catchError((error) => {
            console.log(error);

            notificationService.create('error', errorMessage, '');
            return of(error); // Return observable to keep the stream alive
          }),
        )
        .subscribe();
    };

    return descriptor;
  };
}
