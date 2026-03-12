import { Suspense } from 'react'
import Link from 'next/link'
import PageSection from '@/components/layout/PageSection'
import { Calendar, ArrowLeft, Share2 } from 'lucide-react'
import { contentService } from '@/lib/api/content'

export async function generateMetadata({ params }) {
  try {
    const post = await contentService.getBlogPostBySlug(params.slug)
    if (!post.data) {
      return { title: 'Blog Post Not Found | SPORT' }
    }
    return {
      title: `${post.data.title} | SPORT Blog`,
      description: post.data.excerpt
    }
  } catch (error) {
    return { title: 'Blog Post | SPORT' }
  }
}

async function BlogContent({ slug }) {
  try {
    const response = await contentService.getBlogPostBySlug(slug)
    const post = response.data

    if (!post) {
      return (
        <div className="py-12 text-center">
          <p className="text-heading-md text-neutral-600 mb-6">Blog post not found.</p>
          <Link href="/blog" className="btn btn-outline">
            Back to Blog
          </Link>
        </div>
      )
    }

    return (
      <>
        {/* Header */}
        <div className="mb-12">
          <Link href="/blog" className="inline-flex items-center gap-2 text-body font-medium mb-6 hover:gap-3 transition-all">
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>

          <h1 className="font-display text-display-lg md:text-display-xl font-bold tracking-tight mb-6">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-caption text-neutral-500">
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {new Date(post.publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
            <span>By {post.author}</span>
            <span>
              {post.readingTime || Math.ceil(post.content.split(' ').length / 200)} min read
            </span>
          </div>
        </div>

        {/* Featured Image */}
        {post.image && (
          <div className="mb-12 rounded-lg overflow-hidden aspect-video bg-neutral-200">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Content */}
        <div className="prose prose-lg max-w-none mb-12">
          <div className="text-body text-neutral-700 leading-relaxed whitespace-pre-wrap">
            {post.content}
          </div>
        </div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="py-6 border-t border-neutral-200">
            <div className="flex flex-wrap gap-2">
              {post.tags.map(tag => (
                <Link
                  key={tag}
                  href={`/blog?tag=${tag}`}
                  className="px-3 py-1 bg-neutral-100 text-caption rounded hover:bg-neutral-200 transition-colors"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Share */}
        <div className="py-6 border-t border-neutral-200">
          <div className="flex items-center gap-4">
            <span className="text-body font-medium">Share:</span>
            <button className="hover:opacity-70 transition-opacity" aria-label="Share on Twitter">
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Related Posts */}
        {post.relatedPosts && post.relatedPosts.length > 0 && (
          <div className="mt-16 pt-16 border-t border-neutral-200">
            <h3 className="text-heading-lg font-medium mb-8">Related Articles</h3>
            <div className="grid md:grid-cols-2 gap-8">
              {post.relatedPosts.map(relatedPost => (
                <Link
                  key={relatedPost.id}
                  href={`/blog/${relatedPost.slug}`}
                  className="group block"
                >
                  {relatedPost.image && (
                    <div className="mb-4 rounded-lg overflow-hidden aspect-video bg-neutral-200">
                      <img
                        src={relatedPost.image}
                        alt={relatedPost.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                  )}
                  <h4 className="text-heading-md font-medium group-hover:text-neutral-600 transition-colors mb-2">
                    {relatedPost.title}
                  </h4>
                  <p className="text-caption text-neutral-500">
                    {new Date(relatedPost.publishedAt).toLocaleDateString()}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </>
    )
  } catch (error) {
    console.error('Error fetching blog post:', error)
    return (
      <div className="py-12 text-center">
        <p className="text-heading-md text-neutral-600 mb-6">Unable to load this blog post.</p>
        <Link href="/blog" className="btn btn-outline">
          Back to Blog
        </Link>
      </div>
    )
  }
}

export default function BlogDetailPage({ params }) {
  return (
    <main className="min-h-screen">
      <PageSection className="bg-white">
        <div className="max-w-3xl mx-auto">
          <Suspense fallback={
            <div className="py-12 text-center">
              <div className="animate-pulse">
                <p className="text-neutral-500">Loading blog post...</p>
              </div>
            </div>
          }>
            <BlogContent slug={params.slug} />
          </Suspense>
        </div>
      </PageSection>
    </main>
  )
}
