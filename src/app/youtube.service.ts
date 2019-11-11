import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class YoutubeService {


  apiKey = 'AIzaSyBelsJikONIjyOfVo-QBGbcBU_ZyR07Ifc';

  constructor(public http: HttpClient) { }

  kategoriGetir() {
    return this.http.get('https://www.googleapis.com/youtube/v3/videoCategories?part=snippet&hl=tr&regionCode=TR&key=' + this.apiKey);
  }

  kategoriAdiGetir(id) {
    return this.http.get('https://www.googleapis.com/youtube/v3/videoCategories?part=snippet&hl=tr&id=' + id + '&key=' + this.apiKey);
  }

  videoAra(key) {
    return this.http.get('https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&order=viewCount&locale=tr&regionCode=TR&q=' + key + '&key=' + this.apiKey);
  }

  trendVideoGetir() {
    return this.http.get('https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&locale=tr&maxResults=25&regionCode=TR&fields=items/snippet/title,items/snippet/channelId,items/snippet/thumbnails/medium/url,items/snippet/channelTitle&key=' + this.apiKey);
  }

  kategoriyeGoreVideoGetir(kategoriId) {
    return this.http.get('https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=50&hl=tr_TR&regionCode=TR&videoCategoryId=' + kategoriId + '&key=' + this.apiKey);

  }


}