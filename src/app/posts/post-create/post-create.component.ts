import { Component, Sanitizer, OnInit, SecurityContext } from '@angular/core';
import { NgForm } from '@angular/forms'
import { Subscription } from 'rxjs';
import { PostService } from '../post.service'
import { DomSanitizer } from '@angular/platform-browser';
import { Post } from '../post.model';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent implements OnInit {
  
  constructor(public postService : PostService, protected sanitizer: DomSanitizer) { }

  postError :string = 'Post cannot be empty';

  ngOnInit(): void {
  }

  onSubmitOrder(PostForm: NgForm)
  {
    if(PostForm.invalid)
    {
      return;
    }else
    { 
      console.log( PostForm.value.enteredPost);
      console.log(this.sanitizer.sanitize(SecurityContext.HTML, PostForm.value.enteredPost));
      this.postService.addPost(new Date(), PostForm.value.enteredPost);
    }
  }

}
