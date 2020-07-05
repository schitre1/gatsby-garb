const path = require('path')
const PostTemplate = path.resolve('./src/templates/post-template.js')
const BlogTemplate = path.resolve('./src/templates/blog-template.js')
const ProductTemplate = path.resolve('./src/templates/product-template.js')
const { createFilePath } = require('gatsby-source-filesystem')
const { create } = require('domain')

//every blog post should have new path
//creates each node in blog from md files, gives it slug value
exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === 'MarkdownRemark') {
    const slug = createFilePath({ node, getNode, basePath: 'posts' })
    createNodeField({
      node,
      name: 'slug',
      value: slug,
    })
  }
}

//creates individual post for each now based on slug value- uses PostTemplate for each post
//also creates /blog/2 etc. pages for hosting multiple posts together
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(`
    query PagesQuery {
        allMarkdownRemark (limit: 1000){
          edges {
            node {
              fields {
                slug
              }
            }
          }
        }
        allContentfulProduct {
          totalCount
          edges {
            node {
              slug
            }
          }
        }
      }`)
  const posts = result.data.allMarkdownRemark.edges
  posts.forEach(({ node: post }) => {
    createPage({
      path: `posts${post.fields.slug}`,
      component: PostTemplate,
      context: {
        slug: post.fields.slug,
      }
    })
  })

  const postsPerPage = 2
  const totalPages = Math.ceil(posts.length / postsPerPage)
  Array.from({ length: totalPages }).forEach((_, index) => {

    const currentPage = index + 1
    const isFirstPage = index === 0
    const isLastPage = currentPage === totalPages

    createPage({
      path: isFirstPage ? '/blog' : `/blog/${currentPage}`,
      component: BlogTemplate,
      context: {
        limit: postsPerPage,
        skip: index * postsPerPage,
        isFirstPage,
        isLastPage,
        currentPage,
        totalPages
      }
    })
  })

  const products = result.data.allContentfulProduct.edges
  products.forEach(({ node: product }) => {
    createPage({
      path: `/products/${product.slug}`,
      component: ProductTemplate,
      context: {
        slug: product.slug
      }
    })
  })
}

exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === "build-html") {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /netlify-identity-widget/,
            use: loaders.null(),
          },
        ],
      },
    })
  }
}