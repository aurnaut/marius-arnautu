import React from "react";
import { graphql, Link } from "gatsby";

import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'

TimeAgo.addLocale(en);
const timeAgo = new TimeAgo('en-GB');

// Articles live on the blog, every other type gets its own projects category
export const typePath = type => (type === 'article' ? '/blog' : `/projects/${type}`);

export const TypeLink = ({ type }) => (
  <Link to={typePath(type)} className={`post-list__type ${type}`}>{type}</Link>
);

export const TypeLinks = ({ types }) => (
  <span className="post-list__types">
    {types.map(type => <TypeLink key={type} type={type} />)}
  </span>
);

const PostList = ({ posts }) => (
  <div className="post-list">
    {posts.map(post => (
      <div key={post.node.id} className="post-list__item">
        <div className="post-list__content">
          <div className="post-list__meta">
            <TypeLinks types={post.node.frontmatter.type} />
            <span className="post-list__separator" aria-hidden="true">·</span>
            <span className="post-list__date">
              {post.node.frontmatter.period || `Added ${timeAgo.format(new Date(post.node.frontmatter.date))}`}
            </span>
          </div>
          <h2 className="post-list__title">
            <Link to={post.node.fields.slug}>
              {post.node.frontmatter.title}
            </Link>
          </h2>

          <div className="post-list__excerpt">
            <p>{post.node.frontmatter.summary || post.node.excerpt}</p>
          </div>
        </div>
      </div>
    ))}
  </div>
);

export default PostList;

export const query = graphql`
  fragment PostListItem on MarkdownRemark {
    id
    excerpt(pruneLength: 250)
    fields {
      slug
    }
    frontmatter {
      date(formatString: "MMMM DD, YYYY")
      type
      title
      summary
      period
    }
  }
`;
