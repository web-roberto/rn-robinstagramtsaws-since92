/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateCommentByPostId = /* GraphQL */ `
  subscription OnCreateCommentByPostId($postID: ID!) {
    onCreateCommentByPostId(postID: $postID) {
      id
      createdAt
      comment
      userID
      postID
      User {
        id
        name
        email
        bio
        username
        website
        nofPosts
        nofFollowers
        nofFollowings
        image
        Posts {
          nextToken
          startedAt
        }
        Comments {
          nextToken
          startedAt
        }
        Likes {
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
      }
      Post {
        id
        createdAt
        type
        description
        location
        image
        images
        nofLikes
        video
        nofComments
        userID
        User {
          id
          name
          email
          bio
          username
          website
          nofPosts
          nofFollowers
          nofFollowings
          image
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          owner
        }
        Likes {
          nextToken
          startedAt
        }
        Comments {
          nextToken
          startedAt
        }
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
      }
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onCreateLike = /* GraphQL */ `
  subscription OnCreateLike($filter: ModelSubscriptionLikeFilterInput) {
    onCreateLike(filter: $filter) {
      id
      userID
      postID
      User {
        id
        name
        email
        bio
        username
        website
        nofPosts
        nofFollowers
        nofFollowings
        image
        Posts {
          nextToken
          startedAt
        }
        Comments {
          nextToken
          startedAt
        }
        Likes {
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
      }
      Post {
        id
        createdAt
        type
        description
        location
        image
        images
        nofLikes
        video
        nofComments
        userID
        User {
          id
          name
          email
          bio
          username
          website
          nofPosts
          nofFollowers
          nofFollowings
          image
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          owner
        }
        Likes {
          nextToken
          startedAt
        }
        Comments {
          nextToken
          startedAt
        }
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onUpdateLike = /* GraphQL */ `
  subscription OnUpdateLike($filter: ModelSubscriptionLikeFilterInput) {
    onUpdateLike(filter: $filter) {
      id
      userID
      postID
      User {
        id
        name
        email
        bio
        username
        website
        nofPosts
        nofFollowers
        nofFollowings
        image
        Posts {
          nextToken
          startedAt
        }
        Comments {
          nextToken
          startedAt
        }
        Likes {
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
      }
      Post {
        id
        createdAt
        type
        description
        location
        image
        images
        nofLikes
        video
        nofComments
        userID
        User {
          id
          name
          email
          bio
          username
          website
          nofPosts
          nofFollowers
          nofFollowings
          image
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          owner
        }
        Likes {
          nextToken
          startedAt
        }
        Comments {
          nextToken
          startedAt
        }
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onDeleteLike = /* GraphQL */ `
  subscription OnDeleteLike($filter: ModelSubscriptionLikeFilterInput) {
    onDeleteLike(filter: $filter) {
      id
      userID
      postID
      User {
        id
        name
        email
        bio
        username
        website
        nofPosts
        nofFollowers
        nofFollowings
        image
        Posts {
          nextToken
          startedAt
        }
        Comments {
          nextToken
          startedAt
        }
        Likes {
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
      }
      Post {
        id
        createdAt
        type
        description
        location
        image
        images
        nofLikes
        video
        nofComments
        userID
        User {
          id
          name
          email
          bio
          username
          website
          nofPosts
          nofFollowers
          nofFollowings
          image
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          owner
        }
        Likes {
          nextToken
          startedAt
        }
        Comments {
          nextToken
          startedAt
        }
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onCreateComment = /* GraphQL */ `
  subscription OnCreateComment($filter: ModelSubscriptionCommentFilterInput) {
    onCreateComment(filter: $filter) {
      id
      createdAt
      comment
      userID
      postID
      User {
        id
        name
        email
        bio
        username
        website
        nofPosts
        nofFollowers
        nofFollowings
        image
        Posts {
          nextToken
          startedAt
        }
        Comments {
          nextToken
          startedAt
        }
        Likes {
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
      }
      Post {
        id
        createdAt
        type
        description
        location
        image
        images
        nofLikes
        video
        nofComments
        userID
        User {
          id
          name
          email
          bio
          username
          website
          nofPosts
          nofFollowers
          nofFollowings
          image
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          owner
        }
        Likes {
          nextToken
          startedAt
        }
        Comments {
          nextToken
          startedAt
        }
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
      }
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onUpdateComment = /* GraphQL */ `
  subscription OnUpdateComment($filter: ModelSubscriptionCommentFilterInput) {
    onUpdateComment(filter: $filter) {
      id
      createdAt
      comment
      userID
      postID
      User {
        id
        name
        email
        bio
        username
        website
        nofPosts
        nofFollowers
        nofFollowings
        image
        Posts {
          nextToken
          startedAt
        }
        Comments {
          nextToken
          startedAt
        }
        Likes {
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
      }
      Post {
        id
        createdAt
        type
        description
        location
        image
        images
        nofLikes
        video
        nofComments
        userID
        User {
          id
          name
          email
          bio
          username
          website
          nofPosts
          nofFollowers
          nofFollowings
          image
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          owner
        }
        Likes {
          nextToken
          startedAt
        }
        Comments {
          nextToken
          startedAt
        }
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
      }
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onDeleteComment = /* GraphQL */ `
  subscription OnDeleteComment($filter: ModelSubscriptionCommentFilterInput) {
    onDeleteComment(filter: $filter) {
      id
      createdAt
      comment
      userID
      postID
      User {
        id
        name
        email
        bio
        username
        website
        nofPosts
        nofFollowers
        nofFollowings
        image
        Posts {
          nextToken
          startedAt
        }
        Comments {
          nextToken
          startedAt
        }
        Likes {
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
      }
      Post {
        id
        createdAt
        type
        description
        location
        image
        images
        nofLikes
        video
        nofComments
        userID
        User {
          id
          name
          email
          bio
          username
          website
          nofPosts
          nofFollowers
          nofFollowings
          image
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          owner
        }
        Likes {
          nextToken
          startedAt
        }
        Comments {
          nextToken
          startedAt
        }
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
      }
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onCreatePost = /* GraphQL */ `
  subscription OnCreatePost(
    $filter: ModelSubscriptionPostFilterInput
    $owner: String
  ) {
    onCreatePost(filter: $filter, owner: $owner) {
      id
      createdAt
      type
      description
      location
      image
      images
      nofLikes
      video
      nofComments
      userID
      User {
        id
        name
        email
        bio
        username
        website
        nofPosts
        nofFollowers
        nofFollowings
        image
        Posts {
          nextToken
          startedAt
        }
        Comments {
          nextToken
          startedAt
        }
        Likes {
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
      }
      Likes {
        items {
          id
          userID
          postID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      Comments {
        items {
          id
          createdAt
          comment
          userID
          postID
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const onUpdatePost = /* GraphQL */ `
  subscription OnUpdatePost(
    $filter: ModelSubscriptionPostFilterInput
    $owner: String
  ) {
    onUpdatePost(filter: $filter, owner: $owner) {
      id
      createdAt
      type
      description
      location
      image
      images
      nofLikes
      video
      nofComments
      userID
      User {
        id
        name
        email
        bio
        username
        website
        nofPosts
        nofFollowers
        nofFollowings
        image
        Posts {
          nextToken
          startedAt
        }
        Comments {
          nextToken
          startedAt
        }
        Likes {
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
      }
      Likes {
        items {
          id
          userID
          postID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      Comments {
        items {
          id
          createdAt
          comment
          userID
          postID
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const onDeletePost = /* GraphQL */ `
  subscription OnDeletePost(
    $filter: ModelSubscriptionPostFilterInput
    $owner: String
  ) {
    onDeletePost(filter: $filter, owner: $owner) {
      id
      createdAt
      type
      description
      location
      image
      images
      nofLikes
      video
      nofComments
      userID
      User {
        id
        name
        email
        bio
        username
        website
        nofPosts
        nofFollowers
        nofFollowings
        image
        Posts {
          nextToken
          startedAt
        }
        Comments {
          nextToken
          startedAt
        }
        Likes {
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
      }
      Likes {
        items {
          id
          userID
          postID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      Comments {
        items {
          id
          createdAt
          comment
          userID
          postID
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser(
    $filter: ModelSubscriptionUserFilterInput
    $owner: String
  ) {
    onCreateUser(filter: $filter, owner: $owner) {
      id
      name
      email
      bio
      username
      website
      nofPosts
      nofFollowers
      nofFollowings
      image
      Posts {
        items {
          id
          createdAt
          type
          description
          location
          image
          images
          nofLikes
          video
          nofComments
          userID
          updatedAt
          _version
          _deleted
          _lastChangedAt
          owner
        }
        nextToken
        startedAt
      }
      Comments {
        items {
          id
          createdAt
          comment
          userID
          postID
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      Likes {
        items {
          id
          userID
          postID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser(
    $filter: ModelSubscriptionUserFilterInput
    $owner: String
  ) {
    onUpdateUser(filter: $filter, owner: $owner) {
      id
      name
      email
      bio
      username
      website
      nofPosts
      nofFollowers
      nofFollowings
      image
      Posts {
        items {
          id
          createdAt
          type
          description
          location
          image
          images
          nofLikes
          video
          nofComments
          userID
          updatedAt
          _version
          _deleted
          _lastChangedAt
          owner
        }
        nextToken
        startedAt
      }
      Comments {
        items {
          id
          createdAt
          comment
          userID
          postID
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      Likes {
        items {
          id
          userID
          postID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser(
    $filter: ModelSubscriptionUserFilterInput
    $owner: String
  ) {
    onDeleteUser(filter: $filter, owner: $owner) {
      id
      name
      email
      bio
      username
      website
      nofPosts
      nofFollowers
      nofFollowings
      image
      Posts {
        items {
          id
          createdAt
          type
          description
          location
          image
          images
          nofLikes
          video
          nofComments
          userID
          updatedAt
          _version
          _deleted
          _lastChangedAt
          owner
        }
        nextToken
        startedAt
      }
      Comments {
        items {
          id
          createdAt
          comment
          userID
          postID
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      Likes {
        items {
          id
          userID
          postID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
