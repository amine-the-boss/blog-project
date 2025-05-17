  import { Component } from '@angular/core';
  import { MatSnackBar } from '@angular/material/snack-bar';
  import { ActivatedRoute } from '@angular/router';
  import { PostService } from '../../service/post.service';
  import { FormBuilder, FormGroup, Validators } from '@angular/forms';
  import { CommentService } from '../../service/comment.service';

  @Component({
    selector: 'app-view-post',
    standalone: false,
    templateUrl: './view-post.component.html',
    styleUrl: './view-post.component.scss'
  })
  export class ViewPostComponent {
  postId: any;
    //postId = this.activatedRoute.snapshot.params['id'];

    postData:any;
    comments: any[] = [];


    commentForm!:FormGroup;



  constructor(private postService: PostService,
              private activatedRoute: ActivatedRoute,
              private matSnackBar: MatSnackBar,
              private fb: FormBuilder,
              private commentService:CommentService ) {}

  ngOnInit() {
    this.postId = this.activatedRoute.snapshot.params['id'];
    console.log(this.postId);
    this.getPostById();

    this.commentForm=this.fb.group({
      postedBy:[null,Validators.required],
      content: [null,Validators.required]
    })
  }

  publishComment() {
    const postedBy = this.commentForm.get('postedBy')?.value;
    const content = this.commentForm.get('content')?.value;

    this.commentService.createComment(this.postId, postedBy, content).subscribe(res => {
      this.matSnackBar.open("Comment Published Successfully", "Ok");

      this.getCommentsByPost();

      this.commentForm.reset();

    }, error => {
      this.matSnackBar.open("Something Went Wrongg!!!!!", "Ok");
    });
  }

  getCommentsByPost() {
  this.commentService.getAllCommentsByPost(this.postId).subscribe(res => {
    this.comments = res;
  }, error => {
    this.matSnackBar.open("Something Went Wrong!!", "Ok")
  });
}

  getPostById() {
    this.postService.getPostById(this.postId).subscribe(res => {
      this.postData = res;
      console.log(res);
      this.getCommentsByPost();
    }, error => {
      this.matSnackBar.open("Something Went Wrong!!!!!", "Ok")
    });
  }

  likePost() {
    this.postService.likePost(this.postId).subscribe((response) => {
      this.matSnackBar.open("Post Liked Successfully", "Ok");
      this.getPostById();
    }, (error) => {
      this.matSnackBar.open("Something Went Wrong!!!!!", "Ok");
    });
  }   

  }
