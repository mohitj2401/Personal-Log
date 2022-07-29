import { DiaryComponent } from './diary/diary.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { IdeaComponent } from './idea/idea.component';
import { StoryComponent } from './story/story.component';



const appRoutes: Routes = [

  { path: "", component: HomeComponent },

  { path: "ideas", component: IdeaComponent },
  { path: "stories", component: StoryComponent },
  { path: "diary", component: DiaryComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
