import fs from 'fs'
import matter from 'gray-matter'
import Image from 'next/image'
import Link from 'next/link'
import Tags from '@/components/atoms/tags'

type Post = {
  slug: string
  frontmatter: any
}

async function getProps() {
  try {
    const files = fs.readdirSync('public/movies')

    const posts: Post[] = files.map((fileName) => {
      const slug = fileName.replace('.md', '')
      const readFile = fs.readFileSync(`public/movies/${fileName}`, 'utf-8')
      const { data: frontmatter } = matter(readFile)

      return {
        slug,
        frontmatter
      }
    })

    return posts
  } catch (error) {
    console.error(error)

    return []
  }
}

export default async function Page(){
  const posts = await getProps()


  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg-grid-cols-4 md:p-0 mt-8">
      {
        posts.map(({ slug, frontmatter }) => (
          <div key={ slug } className="border border-gray-200 m-2 rounded-xl shadow-lg overflow-hidden flex flex-col">
            <Link href={ `/movies/${slug}` }>
                <Image
                  width={ 650 }
                  height={ 340 }
                  alt={ frontmatter.title }
                  src={ `/${frontmatter.socialImage}`}
                />

              <h1 className="text-xl pl-4 py-2">{ frontmatter.title }</h1>
              <h3 className='italic pl-6'>{frontmatter?.preamble}</h3>
              <div className='flex justify-end p-2'>
                <Tags tags={frontmatter?.tags} />
              </div>
              <h3 className='text-right p-1'>Created at {frontmatter.createdAt?.toDateString()}</h3>
            </Link>
          </div>
        ))
      }
    </div>
  )
}
