import { Injectable } from '@angular/core';
import { Post } from './post.model';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpClientModule} from '@angular/common/http';
import { AuthService } from '../Auth/auth.service';
import { AuthData } from '../Auth/auth-data.model';
import  jwt_decode  from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private posts: Post[] = [];
  private updatedPosts = new Subject<Post[]>();

  constructor(private http: HttpClient, private authService: AuthService) { }

  getPosts(){
    this.http.get<{message: string, posts: any}>('https://localhost:3000/api/posts')
    .pipe(map((postData) => 
      {
        return postData.posts.map(post => 
          {
            return{
              username : post.username,
              department : post.department,
              date : post.date,
              postContent: post.postContent,
              adminPost: post.adminPost,
              id: post._id
            };
          });
      }))
      .subscribe((changedOrders) => 
      {
        this.posts = changedOrders;
        this.updatedPosts.next([...this.posts]);
      });
  }

  getPostUpdateListener(){
    return this.updatedPosts.asObservable();
  }

  addPost(dateIn: Date, postContentIn: String)
  {
    //getting and decoding the token so we can get user details for the post
    const token : string = this.authService.getToken();

    let decodedToken :AuthData;
    let post: Post;

    //if the user is not authenticated token is undefined
    if(!token)
    {
      post = {id: null, username: '', department: '', date: dateIn, postContent:postContentIn, adminPost: false}
    }
    else
    {
      decodedToken = jwt_decode(token);
      post = {id: null, username: decodedToken.username, department: decodedToken.department, date: dateIn, postContent:postContentIn, adminPost: decodedToken.admin}
    }

    this.http.post<{message: String}>('https://localhost:3000/api/posts', post)
    .subscribe((postRepsonse) => 
    {
      console.log(postRepsonse.message);
      this.posts.push(post);
      this.updatedPosts.next([...this.posts]);
    })
  }

  deletePost(postID : string)
  {
    this.http.delete<{message: String}>('https://localhost:3000/api/posts/' + postID)
        .subscribe((response) => 
        {
          const updatedPostsDel = this.posts.filter(post => post.id !== postID);
          this.posts = updatedPostsDel;
          this.updatedPosts.next([...this.posts]);
          console.log(`Order with ID ${postID} deleted`);
          console.log(' RESPONSE => ' + response.message);
        });
  }

}
