"use client"

import { useState } from 'react';
import { Star, ThumbsUp, Flag, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { Review } from './types';
import { submitReview, voteHelpful } from '@/lib/commerce';

interface ReviewsProps {
  reviews: Review[];
  productId: string;
  rating: { average: number; count: number; recommendPct?: number };
  title?: string;
}

export default function Reviews({ reviews, productId, rating, title = "Reviews" }: ReviewsProps) {
  const [showReviewDialog, setShowReviewDialog] = useState(false);
  const [filterRating, setFilterRating] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('recent');
  const [votedReviews, setVotedReviews] = useState<Set<string>>(new Set());
  
  // Review form state
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewBody, setReviewBody] = useState('');
  const [reviewAuthor, setReviewAuthor] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Calculate rating distribution
  const ratingDistribution = [5, 4, 3, 2, 1].map(stars => {
    const count = reviews.filter(r => r.rating === stars).length;
    const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
    return { stars, count, percentage };
  });

  // Filter and sort reviews
  const filteredReviews = reviews
    .filter(review => filterRating === 'all' || review.rating.toString() === filterRating)
    .sort((a, b) => {
      if (sortBy === 'recent') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      } else if (sortBy === 'helpful') {
        return (b.helpfulCount || 0) - (a.helpfulCount || 0);
      }
      return 0;
    });

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewTitle.trim() || !reviewBody.trim() || !reviewAuthor.trim()) return;

    setIsSubmitting(true);
    try {
      await submitReview(productId, {
        rating: reviewRating,
        title: reviewTitle,
        body: reviewBody,
        author: reviewAuthor
      });

      // Fire GA4 event
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'submit_review', {
          product_id: productId,
          rating: reviewRating
        });
      }

      // Reset form
      setReviewRating(5);
      setReviewTitle('');
      setReviewBody('');
      setReviewAuthor('');
      setShowReviewDialog(false);
      
      console.log('Review submitted successfully!');
    } catch (error) {
      console.error('Failed to submit review:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVoteHelpful = async (reviewId: string) => {
    if (votedReviews.has(reviewId)) return;

    try {
      await voteHelpful('review', reviewId);
      setVotedReviews(prev => new Set([...prev, reviewId]));
      
      // Fire GA4 event
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'helpful_vote', {
          item_type: 'review',
          item_id: reviewId
        });
      }
    } catch (error) {
      console.error('Failed to vote helpful:', error);
    }
  };

  const renderStars = (rating: number, size: 'sm' | 'md' | 'lg' = 'sm') => {
    const sizeClass = size === 'lg' ? 'h-6 w-6' : size === 'md' ? 'h-5 w-5' : 'h-4 w-4';
    
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={cn(
          sizeClass,
          i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
        )}
      />
    ));
  };

  const renderInteractiveStars = (currentRating: number, onRatingChange: (rating: number) => void) => {
    return Array.from({ length: 5 }, (_, i) => (
      <button
        key={i}
        type="button"
        onClick={() => onRatingChange(i + 1)}
        className="focus:outline-none"
      >
        <Star
          className={cn(
            "h-6 w-6 transition-colors",
            i < currentRating ? "fill-yellow-400 text-yellow-400" : "text-gray-300 hover:text-yellow-200"
          )}
        />
      </button>
    ));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <section id="reviews" className="py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
          
          <Dialog open={showReviewDialog} onOpenChange={setShowReviewDialog}>
            <DialogTrigger asChild>
              <Button variant="outline">Write a Review</Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>Write a Review</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmitReview} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Rating *</label>
                  <div className="flex gap-1">
                    {renderInteractiveStars(reviewRating, setReviewRating)}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Review Title *</label>
                  <Input
                    value={reviewTitle}
                    onChange={(e) => setReviewTitle(e.target.value)}
                    placeholder="Summarize your experience"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Review *</label>
                  <textarea
                    value={reviewBody}
                    onChange={(e) => setReviewBody(e.target.value)}
                    className="w-full h-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                    placeholder="Tell others about your experience with this product"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Your Name *</label>
                  <Input
                    value={reviewAuthor}
                    onChange={(e) => setReviewAuthor(e.target.value)}
                    placeholder="Enter your name"
                    required
                  />
                </div>
                
                <div className="flex gap-2 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowReviewDialog(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Review'}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Rating Summary */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Overall Rating */}
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                <span className="text-4xl font-bold text-gray-900">{rating.average}</span>
                <div className="flex items-center">
                  {renderStars(rating.average, 'lg')}
                </div>
              </div>
              <p className="text-gray-600 mb-2">Based on {rating.count} reviews</p>
              {rating.recommendPct && (
                <p className="text-sm text-gray-600">
                  {rating.recommendPct}% of customers recommend this product
                </p>
              )}
            </div>

            {/* Rating Distribution */}
            <div className="space-y-2">
              {ratingDistribution.map(({ stars, count, percentage }) => (
                <div key={stars} className="flex items-center gap-2 text-sm">
                  <span className="w-8 text-right">{stars}</span>
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-yellow-400 h-2 rounded-full transition-all"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="w-8 text-gray-600">{count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-500" />
            <span className="text-sm font-medium">Filter by rating:</span>
            <Select value={filterRating} onValueChange={setFilterRating}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Stars</SelectItem>
                <SelectItem value="5">5 Stars</SelectItem>
                <SelectItem value="4">4 Stars</SelectItem>
                <SelectItem value="3">3 Stars</SelectItem>
                <SelectItem value="2">2 Stars</SelectItem>
                <SelectItem value="1">1 Star</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Sort by:</span>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-36">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Most Recent</SelectItem>
                <SelectItem value="helpful">Most Helpful</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Reviews List */}
        <div className="space-y-6">
          {filteredReviews.length > 0 ? (
            filteredReviews.map((review) => (
              <div key={review.id} className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      {renderStars(review.rating)}
                      {review.verified && (
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded">
                          Verified Purchase
                        </span>
                      )}
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-1">{review.title}</h4>
                    <p className="text-sm text-gray-600">
                      By {review.author} • {formatDate(review.createdAt)}
                    </p>
                  </div>
                </div>

                <p className="text-gray-700 leading-relaxed mb-4">{review.body}</p>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleVoteHelpful(review.id)}
                      disabled={votedReviews.has(review.id)}
                      className="flex items-center gap-1 text-gray-500 hover:text-primary"
                    >
                      <ThumbsUp className="h-3 w-3" />
                      Helpful ({review.helpfulCount || 0})
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex items-center gap-1 text-gray-500 hover:text-red-600"
                    >
                      <Flag className="h-3 w-3" />
                      Report
                    </Button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 text-gray-500">
              <p>No reviews match your current filters.</p>
              <Button
                variant="link"
                onClick={() => {
                  setFilterRating('all');
                  setSortBy('recent');
                }}
                className="mt-2"
              >
                Clear filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
