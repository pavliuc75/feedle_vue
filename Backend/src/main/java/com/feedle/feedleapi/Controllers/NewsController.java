package com.feedle.feedleapi.Controllers;

import com.feedle.feedleapi.Models.Comment;
import com.feedle.feedleapi.Models.Post;
import com.feedle.feedleapi.Models.PostReaction;
import com.feedle.feedleapi.Services.NewsService;
import com.feedle.feedleapi.Services.NewsServiceManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "http://localhost:8080/", maxAge = 3600)
@RestController
@RequestMapping("/feedle")// localhost:port/feedle
public class NewsController {
    private NewsService newsService;

    @Autowired
    public NewsController(NewsService newsService) {
        this.newsService = newsService;
    } //dependecny injection

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurerAdapter() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**").allowedOrigins("*");
            }
        };
    }

    //@CrossOrigin(origins = "http://localhost:5002")
    @GetMapping("/posts")
    List<Post> GetPosts() {
        return newsService.getAllPost();
    }

    @GetMapping("/posts/authorized")
    List<Post> GetPostsForUser(@RequestParam int id) {
        ;
        return newsService.getPostForUser(id);
    }


    @PostMapping("/posts")
    @ResponseStatus(HttpStatus.CREATED)
    void CreatePost(@RequestBody Post post) {
        newsService.addPost(post);
    }

    @DeleteMapping("/posts")
    @ResponseStatus(HttpStatus.OK)
    void DeletePostById(@RequestParam int id) {
        newsService.removePost(id);
    }

    @PatchMapping("/posts")
    @ResponseStatus(HttpStatus.OK)
    void UpdatePost(@RequestBody Post post) {
        newsService.updatePost(post);
    }

    @PostMapping("/posts/comment")
    void AddComment(@RequestParam int Id, @RequestBody Comment comment) {
        newsService.addCommentToPost(Id, comment);
    }

    @DeleteMapping("/posts/comment")
    boolean DeleteComment(@RequestParam int commentId, @RequestParam int postId) {
        return newsService.deleteComment(commentId, postId);
    }

    @PostMapping("posts/reaction")
    boolean MakeReaction(@RequestBody PostReaction postReaction) {
        return newsService.makePostReaction(postReaction);
    }

    @DeleteMapping("posts/reaction")
    boolean DeletePostReaction(@RequestParam int postReactionId) {
        return newsService.deletePostReaction(postReactionId);
    }

    @PatchMapping("posts/reaction")
    boolean UpdatePostReaction(@RequestBody PostReaction postReaction) {
        return newsService.updatePostReaction(postReaction);
    }

    @GetMapping("postsById")
    Post getPostById(@RequestParam int postId) {
        System.out.println(postId);
        return newsService.getPostById(postId);
    }
}
