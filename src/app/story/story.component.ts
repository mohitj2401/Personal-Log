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

  openForm: boolean = false;
  storyForm!: FormGroup;
  stories!: Story[];
  editButton=false;
  addButton=true;
  successMessage: String = "ss";
  errorMessage!: String;


  //pagination configuration
  page: number = 1;
  count: number = 0;
  tableSize: number = 4;
  tableSizes: any = [3, 6, 9, 12];

  constructor(private formbuilder: FormBuilder, private storyService: StoryService, private toastr: ToastrService) { }

  ngOnInit(): void {

    this.getStories();


  }
  addStory() {
     var story = this.storyForm.getRawValue();
    this.storyService.addStories(story).subscribe({
      next: (stories) => {

        this.toastr.success("Data inserted successfully !!")
        this.getStories();
      },
      error: errror => console.log(errror),
    });
    this.openForm = false; this.listing = true
  }

  editStoryFun() {

    var story = this.storyForm.getRawValue();
    this.storyService.editStories(story).subscribe({
      next: (stories) => {

        this.toastr.success("Data Edited successfully !!")
        // this.stories.push(story);
        this.getStories();
      },
      error: errror => console.log(errror),
    });
    this.openForm = false;
    this.listing = true;
  }
  deleteStory(storyId) {


    this.storyService.deleteStory(storyId).subscribe({
      next: (stories) => {
        this.toastr.success("Data Deleted successfully !!")
        this.getStories();
      },
      error: errror => console.log(errror),
    });

  }
  onTableDataChange(event: any) {
    this.page = event;
    this.getStories();
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getStories();
  }
  getStories() {

    this.storyService.getStories().subscribe({
      next: (stories) => {
        this.stories = stories;
      },
      error: errror => console.log(errror),
    });
  }

  openCreateForm() {
    this.editButton=false;

    this.storyForm = this.formbuilder.group({
      title: ['', [Validators.required, Validators.maxLength(255)]],
      content: ['', Validators.required],

    });
    this.listing = false; this.openForm = true;
  }
  openEditForm(id) {
    this.editButton=true;

    var story = this.stories.filter((value) => value.id == id);

    this.storyForm = this.formbuilder.group({
      id: [story[0]['id']],
      title: [story[0]['title'], [Validators.required, Validators.maxLength(255)]],
      content: [story[0]['content'], Validators.required],

    });
    this.listing = false; this.openForm = true;
  }
}
