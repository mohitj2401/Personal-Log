import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Story } from './story';
import { StoryService } from './story.service';


@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.css']
})
export class StoryComponent implements OnInit {

  listing: boolean = false;
  createStory: boolean = true;
  storyForm!: FormGroup;
  stories!: Story[];

  constructor(private formbuilder: FormBuilder, private storyService: StoryService) { }

  ngOnInit(): void {
    this.getStories();
    this.storyForm = this.formbuilder.group({
      title: ['', [Validators.required, Validators.minLength(255)]],
      content: ['', Validators.required],
      date: ['', [Validators.required]],
    });

  }
  addStory() {


  }
  getStories() {
    this.storyService.getStories().subscribe({
      next: (stories) => {
        console.log(stories);
        this.stories = stories;
      },
      error: errror => console.log(errror),
    });
  }
}
