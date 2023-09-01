import fs from 'fs'
import matter from 'gray-matter'
import Image from 'next/image'
import Link from 'next/link'
import Tags from '@/components/atoms/tags'

export default async function Page({ params: { slug } }: { params: { slug: string } }) {

  const fileName = fs.readFileSync(`public/posts/${slug}.md`, 'utf-8')
  const { data: frontmatter, content } = matter(fileName)

  const markdownIt = require('markdown-it')
  const md = new markdownIt()

  return (
    <div className='prose'>
      <h1 className='dark:invert'>{frontmatter?.title}</h1>
      <div className="flex flex-col">
        <Image
          width={ 650 }
          height={ 340 }
          alt={ frontmatter?.title }
          src={ `/${frontmatter?.socialImage}`}
        />
        <h3 className='italic pl-6'>--- {frontmatter?.preamble}</h3>
        <div className='flex justify-end p-2'>
          <Tags tags={frontmatter?.tags} />
        </div>
        <h3 className='text-right'>Created at {frontmatter?.createdAt.toDateString()}</h3>
      </div>
      <div className='dark:invert' dangerouslySetInnerHTML={{ __html: md.render(content) }} />
      <div className='flex justify-between'>
        <h2 className='dark:invert pl-4'>{frontmatter?.conclusion}</h2>
        <div className='pr-6'>
          <Image
            width={ 160 }
            height={ 160 }
            alt={ frontmatter?.title }
            src={ `/${frontmatter?.stampImage}`}
          />
        </div>
      </div>
      <div className='text-center'>
        <Link href='/blogs' className='dark:invert'>一覧に戻る</Link>
      </div>
    </div>
  )
}
