// @ts-nocheck
import {format, parseISO} from 'date-fns'
import {allPosts, Post} from 'contentlayer/generated'
import {getMDXComponent} from 'next-contentlayer/hooks'
import {notFound} from "next/navigation";
import styles from "./Article.module.scss";

export const generateStaticParams = async () => allPosts.map((post) => ({slug: post._raw.flattenedPath.split("/")}))

export const generateMetadata = ({params}) => {
  const post = allPosts.find((post: Post) => post._raw.flattenedPath === params.slug.join("/"))
  if (!post) {
    return null;
  }
  return {title: post.title}
}

const PostLayout = ({params}: { params: { slug: string[] } }) => {
  const post = allPosts.find((post) => post._raw.flattenedPath === params.slug.join("/"))
  if (!post) {
    return notFound();
  }
  const Content = getMDXComponent(post.body.code)

  return (
    <section>
      <article>
        <p>
          <time dateTime={post.publishedAt}>
            {format(parseISO(post.publishedAt), 'LLLL d, yyyy')}
          </time>
          &nbsp;by Max van Essen
        </p>
        <h1 className="mb-2">{post.title}</h1>
        {post.summary && (
          <p className="text-xl mt-0 text-slate-700 dark:text-slate-200">
            {post.summary}
          </p>
        )}
        <hr className="my-4" />
        <Content/>
      </article>
    </section>
  )
}

export default PostLayout
