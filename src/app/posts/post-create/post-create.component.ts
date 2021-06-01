import { Component, OnInit, SecurityContext } from '@angular/core';
import { NgForm } from '@angular/forms'
import { PostService } from '../post.service'
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent implements OnInit {
  
  constructor(public postService : PostService, protected sanitizer: DomSanitizer) { }

  //error message for if the user attempts to submit an empty post
  //the field is marked as required, and has a max character limit of 500
  postError :string = 'Post cannot be empty';

  ngOnInit(): void {
  }

  onSubmitPost(PostForm: NgForm)
  {
    if(PostForm.invalid)
    {
      return;
    }else
    { 
      console.log();
      //sanitizes the entred post and passes it to the service to be added
      this.postService.addPost(new Date(), this.sanitizer.sanitize(SecurityContext.HTML, PostForm.value.enteredPost));
    }
  }
}
