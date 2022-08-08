import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Diary } from './diary';
import { DiaryService } from './diary.service';

@Component({
  selector: 'app-diary',
  templateUrl: './diary.component.html',
  styleUrls: ['./diary.component.css']
})
export class DiaryComponent implements OnInit {

  listing: boolean = true;


  diaryForm!: FormGroup;
  diaries!: Diary[];
  editButton=false;
  formTitle:String="";


  //pagination configuration
  page: number = 1;
  count: number = 0;
  tableSize: number = 4;
  tableSizes: any = [3, 6, 9, 12];

  constructor(private formbuilder: FormBuilder, private diaryService: DiaryService, private toastr: ToastrService) { }

  ngOnInit(): void {

    this.getDiaries();


  }
  addStory() {
     var diary = this.diaryForm.getRawValue();
    this.diaryService.addDiary(diary).subscribe({
      next: (diaries) => {

        this.toastr.success("Data inserted successfully !!")
        this.diaries.push(diary);
      },
      error: errror => console.log(errror),
    });
    this.listing = true;
  }

 updateDiary() {

    var diary = this.diaryForm.getRawValue();
    this.diaryService.editDiary(diary).subscribe({
      next: (diaries) => {
        this.toastr.success("Data Edited successfully !!")
        this.getDiaries();
      },
      error: errror => console.log(errror),
    });
    this.listing = true;
  }
  deleteStory(diaryId) {


    this.diaryService.deleteDiary(diaryId).subscribe({
      next: (diaries) => {
        this.toastr.success("Data Deleted successfully !!")
        this.getDiaries();
      },
      error: errror => console.log(errror),
    });

  }
  onTableDataChange(event: any) {
    this.page = event;
    this.getDiaries();
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getDiaries();
  }
  getDiaries() {

    this.diaryService.getDiary().subscribe({
      next: (diaries) => {
        console.log(diaries);

        this.diaries = diaries;
      },
      error: errror => console.log(errror),
    });
  }

  openCreateForm() {
    this.formTitle="Add Todays Log";
    this.editButton=false;

    this.diaryForm = this.formbuilder.group({
      title: ['', [Validators.required, Validators.maxLength(255)]],
      content: ['', Validators.required],

    });
    this.listing = false;
  }
  openEditForm(id) {
    this.formTitle="Edit Log";

    this.editButton=true;

    var diary = this.diaries.filter((value) => value.id == id);

    this.diaryForm = this.formbuilder.group({
      id: [diary[0]['id']],
      title: [diary[0]['title'], [Validators.required, Validators.maxLength(255)]],
      content: [diary[0]['content'], Validators.required],

    });
    this.listing = false;
  }

}
