import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Idea } from './idea';
import { IdeaService } from './idea.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-idea',
  templateUrl: './idea.component.html',
  styleUrls: ['./idea.component.css']
})
export class IdeaComponent implements OnInit {

  listing: boolean = true;
  editIdea = false;
  createIdea: boolean = false;
  ideaForm!: FormGroup;
  ideas!: Idea[];


  //pagination configuration
  page: number = 1;
  count: number = 0;
  tableSize: number = 4;
  tableSizes: any = [3, 6, 9, 12];

  constructor(private formbuilder: FormBuilder, private ideaService: IdeaService, private toastr: ToastrService) { }

  ngOnInit(): void {

    this.getIdeas();


  }
  addIdea() {
    this.createIdea = false; this.listing = true;
    var idea = this.ideaForm.getRawValue();
    this.ideaService.addIdea(idea).subscribe({
      next: (ideas) => {
        this.toastr.success("Data inserted successfully !!")
        this.getIdeas();
      },
      error: errror => console.log(errror),
    });

  }
  updateIdea() {
    var idea = this.ideaForm.getRawValue();
    console.log(idea);

    this.ideaService.editIdea(idea).subscribe({
      next: (data) => {
        this.toastr.success("Data Edited successfully !!")
        this.getIdeas();
      },
      error: errror => console.log(errror),
    });
    this.editIdea = false;
    this.listing = true;
  }


  deleteIdea(ideaId) {
    this.ideaService.deleteIdea(ideaId).subscribe({
      next: (stories) => {
        this.toastr.success("Data Deleted successfully !!")
        this.getIdeas();
      },
      error: errror => console.log(errror),
    });

  }

  onTableDataChange(event: any) {
    this.page = event;
    this.getIdeas();
  }

  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getIdeas();
  }

  getIdeas() {
    this.ideaService.getIdeas().subscribe({
      next: (ideas) => {
        this.ideas = ideas;
        console.log(ideas);

      },
      error: errror => console.log(errror),
    });
  }

  openCreateForm() {
    this.ideaForm = this.formbuilder.group({
      title: ['', [Validators.required, Validators.maxLength(255)]],
      content: ['', Validators.required],
      completedAt: [''],
      status: ['', [Validators.required]],
    });
    this.listing = false; this.createIdea = true;
  }
  openEditForm(id) {
    var idea = this.ideas.filter((value) => value.id == id);
    console.log(idea);
    this.ideaForm = this.formbuilder.group({
      id: [idea[0]['id']],
      title: [idea[0]['title'], [Validators.required, Validators.maxLength(255)]],
      content: [idea[0]['content'], Validators.required],
      status: [idea[0]['status'], [Validators.required]],
      completedAt: [idea[0]['completedAt']],
    });
    this.listing = false; this.editIdea = true;
  }

}
