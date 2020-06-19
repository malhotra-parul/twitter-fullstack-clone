let schema = {
    "tweets" : [{
        handle: "user",
        createdAt: "new Date().toISOString()",
        content: "content of tweet",
        likes: 10,
        comments: 20
    }],

    "users": [
        {
            userId: "frfgr",
            email: "",
            handle: "",
            createdAt: "",
            imageUrl: "",
            bio: "",
            website: "",
            location: ""
        }
    ]
};

const user_details = {
    credentials: {
        userId: "frfgr",
        email: "",
        handle: "",
        createdAt: "",
        imageUrl: "",
        bio: "",
        website: "",
        location: ""
    },
    likes: [
        { userHandle: "user",
          screamId: ""
        },
        { userHandle: "user",
          screamId: ""
        }
    ]
}