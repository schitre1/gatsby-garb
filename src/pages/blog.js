import React from 'react'
import { StaticQuery, graphql } from 'gatsby'

import Layout from '../components/layout'

const getMarkdownPosts = graphql`
query MarkdownQuery{
    allMarkdownRemark {
      totalCount
      edges {
        node {
          id 
          frontmatter {
            date
            title
          }
          excerpt
        }
      }
    }
  }
`

export default () => (
    <Layout>
        <div>
            <h1 style={{ display: 'inlineBlock', borderBottom: '1 px solid' }}>Gatsby Garb blog</h1>
            <StaticQuery
                query={getMarkdownPosts}
                render={data => (
                    <>
                        <h4>{data.allMarkdownRemark.totalCount} Posts</h4>
                        {data.allMarkdownRemark.edges.map(({ node }) => (
                            <div key={node.id}>
                                <h3>{node.frontmatter.title} - {node.frontmatter.date}</h3>
                                <p>{node.excerpt}</p>
                            </div>
                        ))}
                    </>
                )}
            />
        </div>
    </Layout>
)