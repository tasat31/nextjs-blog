import fs from 'fs'
import matter from 'gray-matter'
import Image from 'next/image'
import Link from 'next/link'

type Post = {
  slug: string
  frontmatter: any
}

export async function getProps() {
  try {
    const files = fs.readdirSync('public/posts')

    const posts: Post[] = files.map((fileName) => {
      const slug = fileName.replace('.md', '')
      const readFile = fs.readFileSync(`public/posts/${fileName}`, 'utf-8')
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
            <Link href={ `/blogs/${slug}` }>
                <Image
                  width={ 650 }
                  height={ 340 }
                  alt={ frontmatter.title }
                  src={ `/${frontmatter.socialImage}`}
                />

              <h1 className="p-4">{ frontmatter.title }</h1>
            </Link>
          </div>
        ))
      }
    </div>
  )
}
