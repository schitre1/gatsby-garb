import React from 'react'
import { graphql, Link } from 'gatsby'
import Img from 'gatsby-image'
import netlifyIdentity from 'netlify-identity-widget'

import Layout from '../components/layout'

class Products extends React.Component {
    state = {
        products: []
    }
    componentDidMount() {
        this.getProducts()
        netlifyIdentity.on('login', user => this.getProducts(user))
        netlifyIdentity.on('logout', user => this.getProducts())

    }

    getProducts = (user) => {
        console.log('Current user', user)
        const allProducts = this.props.data.allContentfulProduct.edges
        let filteredProducts = user ?
            allProducts : allProducts.filter(({ node: product }) => {
                console.log(product)
                return !product.private
            })

        console.log(filteredProducts[0])
        this.setState({ products: filteredProducts })
    }

    render() {
        const { products } = this.state
        return (
            <Layout>
                <div>
                    {products.map(({ node: product }) => (
                        <div key={product.id}>
                            <h2>Garb Products</h2>
                            <Link to={`/products/${product.slug}`} style={{ textDecoration: 'none', color: '#551aa3' }}>
                                <h3>
                                    {product.name} .{' '}<span style={{ fontSize: '1.2rem', fontWeight: 300, color: '#f60' }}>$ {product.price}</span>
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
    }
}

export const PageQueryForProducts = graphql`
query PageQueryForAllProducts {
    allContentfulProduct {
      edges {
          node {
              id
              name
              slug
              price
              private
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