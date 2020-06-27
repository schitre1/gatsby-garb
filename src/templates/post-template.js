import React from 'react';
import { graphql } from 'gatsby'
import Layout from '../components/layout'

export default ({ data: post }) => (
    <Layout>
        <h2>{post.markdownRemark.frontmatter.title}</h2>
        <div dangerouslySetInnerHTML={{ __html: post.markdownRemark.html }}></div>
    </Layout >
)

export const query = graphql`
query PostQuery($slug: String!) {
    markdownRemark(fields: {slug: {eq: $slug}}) {
      html
      frontmatter {
        title
      }
    }
  }`