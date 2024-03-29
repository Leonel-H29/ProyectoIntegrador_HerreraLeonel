import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import {
  Storage,
  ref,
  uploadBytes,
  list,
  getDownloadURL,
} from '@angular/fire/storage';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  url: string = '';
  DIR_IMG = environment.DIR_IMG;
  constructor(private storage: Storage) {}
  public uploadImage($event: any, name: string) {
    const file = $event.target.files[0];
    console.log('file: ', file);
    const imgRef = ref(this.storage, this.DIR_IMG + name);
    uploadBytes(imgRef, file)
      .then((response) => {
        this.getImages(name);
        //this.getImages(parseInt(name.substring(0,6)));
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getImages(name: string) {
    const imagesRef = ref(this.storage, this.DIR_IMG);
    list(imagesRef)
      .then(async (response) => {
        for (let item of response.items) {
          if (item.name == name) {
            this.url = await getDownloadURL(item);
            console.log('URL : ', this.url);
          }
        }
      })
      .catch((error) => {
        console.log(error);
        //this.url = 'https://cdn-icons-png.flaticon.com/512/1361/1361728.png';
      });
  }

  fetchImage(img: string): string {
    //console.log(img);
    if (img == null || img.length == 0) {
      //console.log('Sin foto de perfil');
      return 'https://cdn-icons-png.flaticon.com/512/1361/1361728.png';
    }
    return img;
  }
}
