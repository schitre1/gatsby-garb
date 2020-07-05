import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'

import Layout from '../components/layout'

const ProductTemplate = ({ data: { contentfulProduct } }) => (
    <Layout>
        <div>
            <h2>{contentfulProduct.name} - <span style={{ color: '#ccc' }}>Added on {contentfulProduct.createdAt}</span></h2>
            <p>{contentfulProduct.description}</p>
            <Img fluid={contentfulProduct.image.fluid} />
        </div>
    </Layout>
)

export const query = graphql`
query PageQueryForProducts($slug: String!) {
    contentfulProduct(slug: {eq: $slug}) {
      name
      price
      description
      createdAt(formatString:"MMM Do, YYYY, h:mm:ss a")
      image {
          fluid(maxWidth: 800) {
              ...GatsbyContentfulFluid
          }
      }
    }
  }
`

export default ProductTemplate