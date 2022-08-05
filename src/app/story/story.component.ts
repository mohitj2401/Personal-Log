import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Story } from './story';
import { StoryService } from './story.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.css']
})
export class StoryComponent implements OnInit {


  listing: boolean = true;
  createStory: boolean = false;
  storyForm!: FormGroup;
  stories!: Story[];
  successMessage: String = "ss";
  errorMessage!: String;

  constructor(private formbuilder: FormBuilder, private storyService: StoryService, private toastr: ToastrService) { }

  ngOnInit(): void {

    this.getStories();
    this.storyForm = this.formbuilder.group({
      title: ['', [Validators.required, Validators.minLength(255)]],
      content: ['', Validators.required],
      created_at: ['', [Validators.required]],
    });

  }
  addStory() {
    var story = this.storyForm.getRawValue();
    this.storyService.addStories(story).subscribe({
      next: (stories) => {

        this.toastr.success("Data inserted successfully !!")
        this.stories.push(story);
      },
      error: errror => console.log(errror),
    });

  }

  getStories() {

    this.storyService.getStories().subscribe({
      next: (stories) => {

        this.stories = stories;
      },
      error: errror => console.log(errror),
    });
  }
}
