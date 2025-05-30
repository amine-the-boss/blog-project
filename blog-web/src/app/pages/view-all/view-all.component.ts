import { Component } from '@angular/core';
import { PostService } from '../../service/post.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-view-all',
  standalone: false,
  templateUrl: './view-all.component.html',
  styleUrl: './view-all.component.scss'
})
export class ViewAllComponent {

  allPosts:any;
constructor(private postService: PostService,
            private snackBar: MatSnackBar) { }


ngOnInit(): void {
  this.getAllPosts();
}

getAllPosts(): void {
  this.postService.getAllPosts().subscribe({
    next: (res) => {
      console.log(res);
      this.allPosts=res;
    },
    error: () => {
      this.snackBar.open("Something Went Wrong!!!!", "ok");
    }
  });
}
}
