import { inject, Injectable } from '@angular/core';
import { Firestore, collection } from '@angular/fire/firestore';
import { onSnapshot } from 'firebase/firestore';
import { Note } from '../interfaces/note.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteListService {

  notes: Note[] = [];
  trashNotes: Note[] = [];
  
  unsubNotesList;
  unsubTrashList;

  firestore: Firestore = inject(Firestore);

  constructor() { 
    this.unsubNotesList = this.subNotesList();
    this.unsubTrashList = this.subTrashList();
  }

  ngOnDestroy() {
    this.unsubNotesList();
  }

  setNoteObject(obj: any, id: string): Note {
    return {
      id: id,
      type: obj.type || "note",
      title: obj.title || "",
      content: obj.content || "",
      marked: obj.marked || false
    };
  }

  subNotesList() {
    return onSnapshot(this.getNotes(), (notes) => {
      this.notes = [];
      notes.forEach(element => {
        this.notes.push(this.setNoteObject(element.data(), element.id));
      });
    });
  }

  subTrashList() {
    return onSnapshot(this.getTrashNotes(), (trash) => {
      this.trashNotes = [];
      trash.forEach(element => {
        this.trashNotes.push(this.setNoteObject(element.data(), element.id));
      });
    });
  }


  getNotes() {
    return collection(this.firestore, 'notes');
  }

  getTrashNotes() {
    return collection(this.firestore, 'trash');
  }

}
