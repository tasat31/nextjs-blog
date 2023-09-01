import Link from 'next/link'

export default function BlogsLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  return (
    <section>
      {/* Include shared UI here e.g. a header or sidebar */}
      <nav className="flex items-center flex-wrap justify-around bg-gray-900 p-3">
        <Link href="/">
          <span className="text-2xl text-white font-bold uppercase tracking-wide">
            Home
          </span>
        </Link>

        <Link href="/blogs">
          <span className="text-2xl text-white font-bold uppercase tracking-wide">
            Blogs
          </span>
        </Link>

        <Link href="/movies">
          <span className="text-2xl text-white font-bold uppercase tracking-wide">
            Movies
          </span>
        </Link>

        <Link href="/characters">
          <span className="text-2xl text-white font-bold uppercase tracking-wide">
            Characters
          </span>
        </Link>

        <Link href="/goods">
          <span className="text-2xl text-white font-bold uppercase tracking-wide">
            Goods
          </span>
        </Link>

      </nav>

      {children}
    </section>
  )
}
