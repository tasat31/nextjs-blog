import fs from 'fs'
import matter from 'gray-matter'
import Image from 'next/image'
import Link from 'next/link'
import Tags from '@/components/atoms/tags'

type Post = {
  frontmatter: {
    title: string
    socialImage: string
    preamble: string
    tags: string[]
    createdAt: Date
    conclusion: string
    stampImage: string
  }
  content: string
}

async function getPost(slug: string): Promise<Post> {
  try {
    const fileName = fs.readFileSync(`public/posts/${slug}.md`, 'utf-8')
    const { data: frontmatter, content } = matter(fileName);

    return {
      frontmatter: {
        title: frontmatter.title,
        socialImage: frontmatter.socialImage,
        preamble: frontmatter.preamble,
        tags: frontmatter.tags,
        createdAt: frontmatter.createdAt,
        conclusion: frontmatter.conclusion,
        stampImage: frontmatter.stampImage
      },
      content
    }

  } catch (error) {
    console.error(error)
    return {
      frontmatter: {
        title: '',
        socialImage: '',
        preamble: '',
        tags: [],
        createdAt: new Date(),
        conclusion: '',
        stampImage: ''
      },
      content: ''
    }
  }
}

export default async function Page({ params: { slug } }: { params: { slug: string } }) {
  const post: Post = await getPost(slug)

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
        <div className='flex justify-end p-2'>
          <Tags tags={post.frontmatter?.tags} />
        </div>
        <h3 className='text-right'>Created at {post.frontmatter?.createdAt.toDateString()}</h3>
      </div>
      <div className='dark:invert' dangerouslySetInnerHTML={{ __html: md.render(post.content) }} />
      <div className='flex justify-between'>
        <h2 className='dark:invert pl-4'>{post.frontmatter?.conclusion}</h2>
        <div className='pr-6'>
          <Image
            width={ 160 }
            height={ 160 }
            alt={ post.frontmatter?.title }
            src={ `/${post.frontmatter?.stampImage}`}
          />
        </div>
      </div>
      <div className='text-center'>
        <Link href='/blogs' className='dark:invert'>一覧に戻る</Link>
      </div>
    </div>
  )
}
