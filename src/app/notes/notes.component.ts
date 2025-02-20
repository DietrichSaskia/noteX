import { Component, Input } from '@angular/core';
import { NoteListService } from '../firebase-service/note-list.service';
import { Note } from '../interfaces/note.interface';

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.scss'
})
export class NotesComponent {
  @Input() note: Note | undefined;
  noteList: Note[] = [];

  favFilter: "all" | "fav" = "all";
  trashFilter: "notes" | "trash" = "notes";

  constructor(private noteService: NoteListService) {
    this.noteList = this.getList();
  }

  getList(): Note[] {
    return this.noteService.notes;
  }
}
