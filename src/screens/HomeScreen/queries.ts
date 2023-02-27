
import {gql} from '@apollo/client'

export const postsByDate = gql`
  query PostsByDate(
    $type: String!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    postsByDate(
      type: $type
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        User {
          id 
          name
          username
          image
        }
        Comments(limit:2) {
          items {
            id
            comment
            User {
              id
              name
              username
            }
          }
          nextToken
          startedAt 
        }
        Likes {
          items {
            id
            _deleted
            User {
              id
              username
            }
          }
          nextToken
          startedAt
        }
      }
      nextToken
      startedAt
    }
  }
`;