package com.feedle.feedleapi.Networking;

import com.feedle.feedleapi.Models.User;

public class PostUserRequest extends Request {
    private User user;

    public PostUserRequest(User user) {
        super(RequestType.PostUser);
        this.user = user;
    }

    public User getUser() {
        return user;
    }
}
