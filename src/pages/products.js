import React from 'react'
import { graphql, Link } from 'gatsby'
import Img from 'gatsby-image'

import Layout from '../components/layout'

const Products = ({ data: { allContentfulProduct } }) => (
    <Layout>
        <div>
            {allContentfulProduct.edges.map(({ node: product }) => (
                <div key={product.id}>
                    <h2>Garb Products</h2>
                    <Link to={`/products/${product.slug}`}>
                        <h3>
                            {product.name}
                        </h3>
                    </Link>
                    <Img
                        style={{ maxWidth: 600 }}
                        fluid={product.image.fluid}
                    />
                </div>
            ))}
        </div>
    </Layout>
)

export const PageQueryForProducts = graphql`
query PageQueryForAllProducts {
    allContentfulProduct {
      edges {
          node {
              id
              name
              slug
              image {
                  fluid(maxWidth: 800){
                      ...GatsbyContentfulFluid_tracedSVG
                  }
              }
          }
      }
    }
  }
`

export default Products