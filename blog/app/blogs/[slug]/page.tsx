import fs from 'fs'
import matter from 'gray-matter'
import Image from 'next/image'

type Post = {
  slug: string
  frontmatter: any
}

export async function getPost(slug: string) {
  try {
    const fileName = fs.readFileSync(`public/posts/${slug}.md`, 'utf-8')
    const { data: frontmatter, content } = matter(fileName);

    return {
      frontmatter,
      content
    }

  } catch (error) {
    console.error(error)

    return {}
  }
}

export default async function Page({ params: { slug } }: { params: { slug: string } }) {
  const post = await getPost(slug)

  const markdownIt = require('markdown-it')
  const md = new markdownIt()

  return (
    <div className='prose'>
      <h1 className='dark:invert'>{post.frontmatter?.title}</h1>
      <div className="flex flex-col">
        <Image
          width={ 650 }
          height={ 340 }
          alt={ post.frontmatter?.title }
          src={ `/${post.frontmatter?.socialImage}`}
        />
        <h3 className='italic pl-6'>--- {post.frontmatter?.preamble}</h3>
        <h3 className='text-right'>Created at {post.frontmatter?.createdAt.toDateString()}</h3>
      </div>
      <div className='dark:invert' dangerouslySetInnerHTML={{ __html: md.render(post.content) }} />
    </div>
  )
}
