import { Component } from '@angular/core';
import { YoutubeService } from '../youtube.service';
import { AlertController } from '@ionic/angular';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  kategoriler: any;

  kategori: any;

  videolar: any;

  bayrak: boolean = false;

  trend: boolean = false;

  arama: boolean = false;

  arananKelime: string;

  secilenKategori: any;

  kategoriAdi: any;

  kategoriTitle: boolean = false;

  constructor(public servis: YoutubeService, public alertController: AlertController) {

    this.kategoriOlustur();
    this.trendVideoGoster();
    this.arananKelime;
    console.log(this.kategoriTitle);
  }

  kategoriOlustur() {
    this.servis.kategoriGetir().subscribe(sonuc => {
      this.kategoriler = sonuc['items'];
    }, error => {
      console.log(error);
    });
  }

  kategoriyeGoreVideoGetir(id) {
    this.arama = false;
    this.kategoriTitle = true;
    this.trend = false;
    this.servis.kategoriyeGoreVideoGetir(id).subscribe(sonuc => {
      this.videolar = sonuc['items'];
      this.bayrak = false;
    }, error => {
      console.log(error);
    });

    this.servis.kategoriAdiGetir(id).subscribe(sonuc => {
      this.kategoriAdi = sonuc['items'][0]['snippet']['title'];
      return document.getElementById("kategoriTitle").innerHTML = this.kategoriAdi;
    }, error => {
      console.log(error);
    });
  }
  trendVideoGoster() {
    this.kategoriTitle = false;
    this.arama = false;
    this.trend = true;
    this.servis.trendVideoGetir().subscribe(sonuc => {
      this.videolar = sonuc['items'];
    }, error => {
      console.log(error);
    });
  }
  videoAra(key) {
    this.kategoriTitle = false;
    this.arama = true;
    this.servis.videoAra(key).subscribe(sonuc => {
      this.videolar = sonuc['items'];
      this.bayrak = false;
    }, error => {
      console.log(error);
    });
  }

  anahtarKelime(value) {
    return this.arananKelime = value;
  }

  izle(vid) {

    if (this.bayrak) {
      window.open('https://www.youtube.com/watch?v=' + vid.id.videoId);
    } else {
      window.open('https://www.youtube.com/watch?v=' + vid.id);
    }

  }

  async promptSearch() {
    const alert = await this.alertController.create({
      header: 'Video Ara',
      inputs: [
        {
          name: 'anahtar',
          type: 'text',
          placeholder: 'Anahtar kelime giriniz'
        }
      ],
      buttons: [
        {
          text: 'Vazgeç',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
          }
        }, {
          text: 'Tamam',
          handler: (value) => {
            this.videoAra(JSON.stringify(value.anahtar));
            this.anahtarKelime(JSON.stringify(value.anahtar));
            this.trend = false;
          }
        }
      ]
    });

    await alert.present();
  }

}
