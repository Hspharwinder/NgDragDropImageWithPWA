import { Component } from '@angular/core';
import { NgxFileDropEntry, FileSystemFileEntry } from 'ngx-file-drop';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PwaDragDrop';
  constructor() { }
  public imgUrl;
  public filesStore:NgxFileDropEntry[]=[]; 

  public dropped(files: NgxFileDropEntry[]){
       
    this.filesStore = files; // fileStore using in DOM 

    var reader = new FileReader(); // for reading file
    for(const droppedFile of files){
      // Is it a file?
      if(droppedFile.fileEntry.isFile){
        let fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file:File) => {
          // Here you can access the real file
          console.log(droppedFile.relativePath, file);
          //Code for reading File
          reader.readAsDataURL(file);
            reader.onload = () => {
                this.imgUrl = reader.result;
            };
        });
      }else{
          // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }
  public fileOver(event){
    console.log(event);
  }
  public fileLeave(event){
    console.log(event);
  }
}
