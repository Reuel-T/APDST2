import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service'
import { Post } from '../post.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {

  private postSubscription: Subscription

  constructor(public postService : PostService) { }

  posts : Post[] = [];
  
  ngOnInit(): void {
    this.postService.getPosts();
    this.postSubscription = this.postService.getPostUpdateListener()
      .subscribe((posts : Post[]) => 
      {
        this.posts = posts;
        console.log(this.posts);
      })
  }

  deletePost(postID : string)
  {
    this.postService.deletePost(postID);
  }

  ngOnDestroy(){
    this.postSubscription.unsubscribe();
  }

}
