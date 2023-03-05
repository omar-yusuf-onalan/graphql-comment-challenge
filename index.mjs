import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { users, posts, comments } from './data.js';

// The GraphQL schema
const typeDefs = `#graphql
   type User {
    id: ID!
    fullName: String!
    posts:[Post!]!
    comments: [Comment!]!
  }
  type Post {
    id: ID!
    title: String!
    user_id: ID!
    user: User!
    comments: [Comment!]!
  }
  type Comment {
    id: ID!
    text: String!
    post_id: ID!
    user: User!
    post: Post!
  }
  type Query {
    users: [User!]!
    user(id: ID!): User!
    posts: [Post!]!
    post(id: ID!): Post!
    comments: [Comment!]!
    comment(id: ID!): Comment!
  }
`;

const resolvers = {
    Query: {
        //Get All Users
        users: () => users,

        //Get Single User by ID
        user: (parent, args) => {
            const user = users.find((user) => user.id === args.id);

            if (!user) {
                throw 'User not found';
            }

            return user;
        },
        posts: () => posts,
        post: (parent, args) => posts.find((post) => post.id === args.id),

        comments: () => comments,
        comment: (parent, args) => comments.find((comment) => comment.id === args.id),
    },

    User: {
        posts: (parent) => posts.filter((post) => post.user_id === parent.id),
        comments: (parent) => comments.filter((comment) => comment.user_id === parent.id),
    },
    Post: {
        user: (parent) => users.find((user) => user.id === parent.user_id),
        comments: (parent) => comments.filter((comment) => comment.post_id === parent.id),
    },
    Comment: {
        user: (parent) => users.find((user) => user.id === parent.user_id),
        post: (parent) => posts.find((post) => post.id === parent.post_id),
    },
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

const { url } = await startStandaloneServer(server);
console.log(`🚀 Server ready at ${url}`);
