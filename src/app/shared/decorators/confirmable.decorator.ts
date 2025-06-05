import { TranslocoService } from '@jsverse/transloco';
import { NzModalService } from 'ng-zorro-antd/modal';
import { InjectorHelper } from '../../core/injector.helper';

export function Confirmable(
  confirmText = 'Are you sure that you want to proceed?',
  extraContent?: string,
) {
  return (
    target: object,
    propertyName: string,
    descriptor: PropertyDescriptor,
  ) => {
    // Store Original Method Implemetation
    const originalMethod = descriptor.value;
    const $modal = InjectorHelper.injector.get(NzModalService);
    const $translate = InjectorHelper.injector.get(TranslocoService);

    // Now, over-write the original method
    descriptor.value = function (...args: any[]) {
      console.log(args);

      $modal.confirm({
        nzTitle: $translate.translate(confirmText),
        nzContent: extraContent
          ? $translate.translate(extraContent)
          : undefined,
        nzOkText: $translate.translate('yes'),
        nzCancelText: $translate.translate('no'),
        nzOnOk: () => {
          // Call original function
          const result = originalMethod.apply(this, args);
          // Execute custom logic
          console.log(`-- ${propertyName}() returned: `, result);
          return result;
        },
        nzOnCancel: () => {
          console.log('Cancel');
          return;
        },
      });
    };
    return descriptor;
  };
}
