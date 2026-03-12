import { Suspense } from 'react'
import Link from 'next/link'
import PageHeader from '@/components/layout/PageHeader'
import PageSection from '@/components/layout/PageSection'
import EmptyState from '@/components/ui/EmptyState'
import ErrorState from '@/components/ui/ErrorState'
import SkeletonLoader from '@/components/ui/SkeletonLoader'
import Badge from '@/components/ui/Badge'
import { Calendar, ArrowRight, BookOpen, TrendingUp } from 'lucide-react'
import { contentService } from '@/lib/api/content'

export const metadata = {
  title: "Athletic Performance Blog | Training Tips & Stories | SPORT",
  description: "Read the latest articles about athletic performance, training tips, product reviews, and inspiring stories from the SPORT community.",
  keywords: "athletic training, performance tips, sports blog, fitness articles"
}

async function BlogPosts() {
  try {
    const response = await contentService.getBlogPosts({ limit: 12 })
    const posts = response.data || []

    if (posts.length === 0) {
      return (
        <EmptyState
          icon={BookOpen}
          title="No posts yet"
          description="We're working on exciting content. Check back soon for training tips, athlete stories, and performance insights."
          cta="Browse Products"
          href="/products"
        />
      )
    }

    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
        {posts.map(post => (
          <article key={post.id} className="group">
            {/* Featured Image */}
            {post.image && (
              <Link href={`/blog/${post.slug}`} className="block mb-6 overflow-hidden rounded-lg aspect-[16/10] bg-neutral-200">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </Link>
            )}

            {/* Content */}
            <div className="space-y-4">
              {post.category && (
                <Badge variant="outline" size="sm">
                  {post.category}
                </Badge>
              )}
              
              <div className="flex items-center gap-4 text-caption text-neutral-500">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
                {post.author && <span>• {post.author}</span>}
              </div>

              <Link href={`/blog/${post.slug}`}>
                <h3 className="text-heading-lg font-semibold group-hover:text-accent-primary transition-colors leading-tight">
                  {post.title}
                </h3>
              </Link>

              <p className="text-body text-neutral-600 leading-relaxed line-clamp-3">
                {post.excerpt}
              </p>

              <Link
                href={`/blog/${post.slug}`}
                className="inline-flex items-center gap-2 text-body font-medium text-neutral-900 group-hover:gap-3 group-hover:text-accent-primary transition-all"
              >
                Read Article
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    )
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    return (
      <ErrorState
        title="Unable to load articles"
        message="We're having trouble loading our blog posts. Please try again in a moment."
        onRetry={() => window.location.reload()}
      />
    )
  }
}

export default function BlogPage() {
  return (
    <main className="min-h-screen">
      <PageHeader
        title="Stories from the Field"
        description="Training insights, athlete stories, and performance tips from the SPORT community. Expert advice to help you reach your goals."
        breadcrumbs={['Home', 'Resources', 'Blog']}
      />

      <PageSection className="bg-white">
        <Suspense fallback={<SkeletonLoader type="blog-card" count={6} />}>
          <BlogPosts />
        </Suspense>
      </PageSection>
    </main>
  )
}
