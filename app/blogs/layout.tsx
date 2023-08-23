import Link from 'next/link'

export default function BlogsLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  return (
    <section>
      {/* Include shared UI here e.g. a header or sidebar */}
      <nav className="flex items-center flex-wrap bg-gray-900 p-3">
        <Link href="/">
          <span className="text-xl text-white font-bold uppercase tracking-wide">
            Blog: 空からおちこぼれたStory
          </span>
        </Link>
      </nav>

      {children}
    </section>
  )
}
