import {defineDocumentType, defineNestedType, makeSource} from 'contentlayer/source-files'
import remarkGfm from 'remark-gfm';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

const computedFields = {
  slug: {
    type: 'string',
    resolve: (doc) => doc._raw.flattenedPath,
  },
  structuredData: {
    type: 'object',
    resolve: (doc) => ({
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: doc.title,
      datePublished: doc.publishedAt,
      dateModified: doc.publishedAt,
      description: doc.summary,
      image: doc.image
        ? `https://www.rever.sh${doc.image}`
        : `https://www.rever.sh/api/og?title=${doc.title}`,
      url: `https://www.rever.sh/posts/${doc._raw.flattenedPath}`,
      author: {
        '@type': 'Person',
        name: 'Max van Essen',
      },
    }),
  },
};


const Tag = defineNestedType(() => ({
  name: 'Tag',
  fields: {
    title: { type: 'string', required: true },
  },
}))

const Category = defineNestedType(() => ({
  name: 'Category',
  fields: {
    title: { type: 'string', required: true },
  },
}))

const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      description: 'The title of the post',
      required: true,
    },
    summary: {
      type: 'string',
      required: true,
    },
    publishedAt: {
      type: 'string',
      required: true,
    },
    categories: {
      type: 'list',
      of: Category,
    },
    tags: {
      type: 'list',
      of: Tag,
    },
  },
  computedFields
}))

export default makeSource({
  disableImportAliasWarning: true,
  contentDirPath: 'content',
  documentTypes: [Post],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypePrettyCode,
        {
          theme: 'slack-dark',
          onVisitLine(node) {
            if (node.children.length === 0) {
              node.children = [{type: 'text', value: ' '}];
            }
          },
          onVisitHighlightedLine(node) {
            node.properties.className.push('line--highlighted');
          },
          onVisitHighlightedWord(node) {
            node.properties.className = ['word--highlighted'];
          },
        },
      ],
      [
        rehypeAutolinkHeadings,
        {
          properties: {
            className: ['anchor'],
          },
        },
      ],
    ],
  }
})
