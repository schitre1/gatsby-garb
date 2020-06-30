import React from 'react'
import { graphql, Link } from 'gatsby'

import Layout from '../components/layout'

export default ({ data, pageContext }) => {
  const { currentPage, isFirstPage, isLastPage, totalPages } = pageContext
  const nextPage = `/blog/${String(currentPage + 1)}`
  const prevPage = currentPage - 1 === 1 ? `/blog` : `/blog/${String(currentPage - 1)}`
  return (
    <Layout>
      <div>
        <h1 style={{ display: 'inlineBlock', borderBottom: '1 px solid' }}>Gatsby Garb blog</h1>
        <>
          <h4>{data.allMarkdownRemark.totalCount} Posts</h4>
          {data.allMarkdownRemark.edges.map(({ node }) => (
            <div key={node.id}>
              <h3><Link to={`/posts${node.fields.slug}`}>{node.frontmatter.title}</Link> - {node.frontmatter.date}</h3>
              <p>{node.excerpt}</p>
            </div>
          ))}
        </>
        <div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
            maxWidth: 300,
            margin: '0 auto'
          }}>
            {!isFirstPage && (
              <Link to={prevPage} rel="prev">
                Prev Page
              </Link>
            )}
            {Array.from({ length: totalPages }, (_, index) => (
              <Link key={index} to={`/blog/${index === 0 ? "" : index + 1}`}>
                {index + 1}
              </Link>
            ))}
            {!isLastPage && (
              <Link to={nextPage} rel="next">
                Next Page
              </Link>
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
query MarkdownQuery($skip: Int!, $limit: Int!){
  allMarkdownRemark (
    skip: $skip,
    limit: $limit
  ){
    totalCount
    edges {
      node {
        fields {
          slug
        }
        id 
        frontmatter {
          date
          title
        }
        excerpt
      }
    }
  }
}`