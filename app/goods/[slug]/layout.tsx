import Link from 'next/link'

export default function BlogsLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  return (
    <div className="container mx-auto">
      <div className="pt-8">
        {children}
      </div>
    </div>
  )
}
