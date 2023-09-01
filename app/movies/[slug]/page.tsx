import path from 'path'
import fs from 'fs'
import matter from 'gray-matter'
import Image from 'next/image'
import Link from 'next/link'
import Tags from '@/components/atoms/tags'

type Post = {
  slug: string
  frontmatter: any
}

async function getPost(slug: string) {
  try {
    const file = path.join(process.cwd(), 'public/movies/', `${slug}.md`)

    const fileName = fs.readFileSync(file, 'utf-8')
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
        <Link href='/movies' className='dark:invert'>一覧に戻る</Link>
      </div>
    </div>
  )
}
