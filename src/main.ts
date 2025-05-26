import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';

import { importProvidersFrom } from '@angular/core';
import { NzIconModule, NzIconService } from 'ng-zorro-antd/icon';
import { PlusCircleTwoTone, EditTwoTone, DeleteTwoTone } from '@ant-design/icons-angular/icons';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { appConfig } from './app/app.config';

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    ...(appConfig.providers ?? []),
    importProvidersFrom(NzIconModule, NzModalModule)
  ]
}).then(platformRef => {
  const injector = platformRef.injector;
  const iconService = injector.get(NzIconService);
  iconService.addIcon(PlusCircleTwoTone, EditTwoTone, DeleteTwoTone);
}).catch(err => console.error(err));
