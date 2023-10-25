import path from 'path'
import fs from 'fs'
import matter from 'gray-matter'
import Link from 'next/link'

type Post = {
  slug: string
  frontmatter: any
}

async function getPost(slug: string) {
  try {
    /*
      See this document
      https://vercel.com/guides/how-can-i-use-files-in-serverless-functions
    */
    const file = path.join(process.cwd(), 'public/', 'about.md')

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
  const emoji = require('markdown-it-emoji')
  const md = new markdownIt()
  md.use(emoji)

  return (
    <div className='prose'>
      <h1 className='dark:invert'>{post.frontmatter?.title}</h1>
      <div className='dark:invert' dangerouslySetInnerHTML={{ __html: md.render(post.content) }} />
      <div className='text-center'>
        <Link href='/' className='dark:invert'>HOMEに戻る</Link>
      </div>
    </div>
  )
}
