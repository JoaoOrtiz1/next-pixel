import { Injectable, inject } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable, forkJoin, from, map, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FireStorageService {

  private storage: AngularFireStorage = inject(AngularFireStorage);

  getFilesInFolder(folderPath: string, path?:boolean): Observable<string[]> {
    const ref = this.storage.ref(folderPath);
    return ref.listAll().pipe(
      switchMap((result: any) => {
        const downloadURLPromises: Promise<string>[] = [];
        result.items.forEach((item: any) => {
          const fileDetails: any = {
            url: '',
            path: item._delegate._location.path, // Adiciona o caminho ao objeto
          };
          if(path){
            downloadURLPromises.push(
              item.getDownloadURL().then((url: any) => {
                fileDetails.url = url;
                return fileDetails;
              })
            );
          }else{
            downloadURLPromises.push(item.getDownloadURL());
          }
        });
        return from(Promise.all(downloadURLPromises));
      })
    );
  }

  deleteFilesInFolder(folderPath: string): Observable<string[]> {
    const ref = this.storage.ref(folderPath);
    return ref.listAll().pipe(
      switchMap((result: any) => {
        const deleteObservables: Observable<string>[] = [];
        if (result.items.length === 0) {
          return of([]);
        }
        for(let i = 0; i < result.items.length; i++){
          deleteObservables.push(from(result.items[i].delete()) as Observable<string>);
        }
        // result.items.forEach((item: any) => {
        //   deleteObservables.push(from(item.delete()) as Observable<string>);
        // });
        return forkJoin(deleteObservables);
      })
    );
  }

  deleteFile(folderPaths: string[]): Observable<string[]>{
    folderPaths.forEach((folder: string) => {
      const ref = this.storage.ref(folder);
      return ref.delete();
    })
    return forkJoin(folderPaths);
  }
}
