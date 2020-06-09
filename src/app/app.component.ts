import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { NFC, Ndef } from '@ionic-native/nfc/ngx';
import { Plugins, StatusBarStyle } from '@capacitor/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private ndef: Ndef, private nfc: NFC, private platform: Platform) {
    this.initializeApp();
  }

  initializeApp() {
    if (this.platform.is('hybrid')) {
      const { StatusBar, SplashScreen } = Plugins;
      SplashScreen.hide();
      StatusBar.setStyle({ style: StatusBarStyle.Light });

      const listener = this.nfc.addNdefListener(
        () => console.log('added'),
        (err: any) => console.log('failed:', err)
      );
      listener.subscribe(evt => {
        console.log('received ndef message. the tag contains: ', evt.tag);
        console.log('decoded tag id', this.nfc.bytesToHexString(evt.tag.id));
        const message = this.ndef.textRecord('I say hello, hello, hello');
        this.nfc.share([message]);
      });
    }
  }
}
