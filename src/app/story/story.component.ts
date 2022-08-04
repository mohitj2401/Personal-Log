import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.css']
})
export class StoryComponent implements OnInit {

  listing: boolean = false;
  createStory: boolean = true;
  // public editor = ClassicEditor;
  storyForm!: FormGroup;
  constructor(private formbuilder: FormBuilder) { }

  ngOnInit(): void {
    this.storyForm = this.formbuilder.group({
      title: ['', [Validators.required, Validators.minLength(255)]],
      content: ['', Validators.required],
      date: ['', [Validators.required]],
    });
  }
  addStory() {


  }
}
