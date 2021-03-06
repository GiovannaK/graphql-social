import React, { useContext } from 'react'
import { useQuery } from '@apollo/client'
import gql from 'graphql-tag';
import { Grid, Transition } from 'semantic-ui-react';
import { PostCard } from '../../components/PostCard';
import { AuthContext } from '../../context/auth';
import { PostForm } from '../../components/PostForm';

export const Home = () => {
    const { loading, data: { getPosts: posts } = {} } = useQuery(FETCH_POSTS_QUERY)
    const {user} = useContext(AuthContext);

    return (
        <Grid columns={3}>
      <Grid.Row className="page-title">
        <h1>Recent Posts</h1>
      </Grid.Row>
      <Grid.Row>
        {user && (
          <Grid.Column>
            <PostForm />
          </Grid.Column>
        )}
        {loading ? (
          <h1>Loading posts..</h1>
        ) : (
          <Transition.Group>
            {posts &&
              posts.map((post) => (
                <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
                  <PostCard post={post} />
                </Grid.Column>
              ))}
          </Transition.Group>
        )}
      </Grid.Row>
    </Grid>
    )
}

const FETCH_POSTS_QUERY = gql`
    {
        getPosts{
        id body createdAt username likeCount
        likes{
            username
        }
        commentCount
        comments{
            username
            id
            createdAt
            body
        }
    }
    }
`
