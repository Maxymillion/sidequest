import Link from 'next/link'
import {compareDesc, format, parseISO} from 'date-fns'
import {allPosts, Post} from 'contentlayer/generated'

function PostCard(post: Post) {
  return (
    <div className="mb-8">
      <Link href={post.slug}>
        <h2 className="text-xl">{post.title}</h2>
      </Link>
      {post.summary && <p>{post.summary}</p>}
      <time dateTime={post.publishedAt}>
        {format(parseISO(post.publishedAt), 'LLLL d, yyyy')}
      </time>
    </div>
  )
}

export default function Home() {
  const posts = allPosts.sort((a, b) => compareDesc(new Date(a.publishedAt), new Date(b.publishedAt)))
  return (
    <div className="prose dark:prose-invert">
      {posts.map((post, idx) => (
        <PostCard key={idx} {...post} />
      ))}
    </div>
  )
}
