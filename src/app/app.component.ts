import SignaturePad  from 'signature_pad';
import { Component, ElementRef, ViewChild } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('canvas', { static: true }) canvas!: ElementRef;
  s_pad!: SignaturePad;
  downloadFormat:string='';

  constructor(){}

  ngOnInit() {
    this.s_pad = new SignaturePad(this.canvas.nativeElement, {
      penColor: 'black',
      backgroundColor:'white'
    });

  }

  clear() {

    //clears the singature pad
    this.s_pad.clear();
  }
  async save() {

    if(this.downloadFormat != '')
    {
        //converting dataURL to blob
        var blob = await fetch(this.s_pad.toDataURL('image/'+this.downloadFormat)).then(data => data.blob());

        //Creating a dynamic anchor tag for image download
        var download=document.createElement('a');
        download.href=window.URL.createObjectURL(blob);
        download.download='Esignature.'+this.downloadFormat;
        download.click();
    }


  }

}
