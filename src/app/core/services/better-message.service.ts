import { inject, Injectable } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';
import {
  NzMessageContentType,
  NzMessageDataOptions,
  NzMessageRef,
  NzMessageService,
} from 'ng-zorro-antd/message';

@Injectable()
export class BetterMessageService extends NzMessageService {
  private $transoco = inject(TranslocoService);

  override success(
    content: NzMessageContentType,
    options?: NzMessageDataOptions,
  ): NzMessageRef {
    if (typeof content === 'string') {
      content = this.$transoco.translate(content);
    }
    return super.success(content, options);
  }
}
