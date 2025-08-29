"use client"

import { useState } from 'react';
import { ThumbsUp, Flag, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { QAItem } from './types';
import { submitQuestion, voteHelpful } from '@/lib/commerce';

interface QAProps {
  qa: QAItem[];
  productId: string;
  title?: string;
}

export default function QA({ qa, productId, title = "Questions & Answers" }: QAProps) {
  const [showQuestionDialog, setShowQuestionDialog] = useState(false);
  const [questionText, setQuestionText] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [votedItems, setVotedItems] = useState<Set<string>>(new Set());

  const handleSubmitQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!questionText.trim()) return;

    setIsSubmitting(true);
    try {
      await submitQuestion(productId, questionText, authorName || undefined);
      
      // Fire GA4 event
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'qa_ask_question', {
          product_id: productId,
          question_length: questionText.length
        });
      }

      setQuestionText('');
      setAuthorName('');
      setShowQuestionDialog(false);
      
      // Show success message (would implement with toast)
      console.log('Question submitted successfully!');
    } catch (error) {
      console.error('Failed to submit question:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVoteHelpful = async (qaId: string) => {
    if (votedItems.has(qaId)) return;

    try {
      await voteHelpful('qa', qaId);
      setVotedItems(prev => new Set([...prev, qaId]));
      
      // Fire GA4 event
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'helpful_vote', {
          item_type: 'qa',
          item_id: qaId
        });
      }
    } catch (error) {
      console.error('Failed to vote helpful:', error);
    }
  };

  const handleReport = (qaId: string) => {
    // Show toast message
    console.log('Thanks, we\'ll review this.');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <section id="qa" className="py-12 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Q&A Content */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
              
              <Dialog open={showQuestionDialog} onOpenChange={setShowQuestionDialog}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    Ask a Question
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Ask a Question</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleSubmitQuestion} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Your Question *
                      </label>
                      <textarea
                        value={questionText}
                        onChange={(e) => setQuestionText(e.target.value)}
                        className="w-full h-24 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                        placeholder="What would you like to know about this product?"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Your Name (optional)
                      </label>
                      <Input
                        value={authorName}
                        onChange={(e) => setAuthorName(e.target.value)}
                        placeholder="Enter your name"
                      />
                    </div>
                    <div className="flex gap-2 pt-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setShowQuestionDialog(false)}
                        className="flex-1"
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        disabled={isSubmitting || !questionText.trim()}
                        className="flex-1"
                      >
                        {isSubmitting ? 'Submitting...' : 'Submit Question'}
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            {/* Q&A Accordion */}
            <div className="bg-white rounded-lg border border-gray-200">
              {qa.length > 0 ? (
                <Accordion type="single" collapsible className="w-full">
                  {qa.map((item, index) => (
                    <AccordionItem key={item.id} value={item.id} className="px-6">
                      <AccordionTrigger className="text-left hover:no-underline">
                        <span className="font-medium text-gray-900 pr-4">
                          {item.question}
                        </span>
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-600">
                        {item.answer ? (
                          <div className="space-y-4">
                            <p className="leading-relaxed">{item.answer}</p>
                            
                            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                              <div className="text-sm text-gray-500">
                                {item.author && (
                                  <span>Answered by {item.author} • </span>
                                )}
                                {formatDate(item.createdAt)}
                              </div>
                              
                              <div className="flex items-center gap-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleVoteHelpful(item.id)}
                                  disabled={votedItems.has(item.id)}
                                  className="flex items-center gap-1 text-gray-500 hover:text-primary"
                                >
                                  <ThumbsUp className="h-3 w-3" />
                                  Helpful ({item.helpfulCount || 0})
                                </Button>
                                
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleReport(item.id)}
                                  className="flex items-center gap-1 text-gray-500 hover:text-red-600"
                                >
                                  <Flag className="h-3 w-3" />
                                  Report
                                </Button>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="text-gray-500 italic">
                            This question is pending an answer from our experts.
                          </div>
                        )}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              ) : (
                <div className="p-8 text-center text-gray-500">
                  <MessageSquare className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>No questions yet. Be the first to ask!</p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-8">
              <h3 className="font-semibold text-gray-900 mb-4">Need Help?</h3>
              <div className="space-y-4 text-sm">
                <div>
                  <p className="text-gray-600 mb-2">
                    Can't find what you're looking for? Our seed specialists are here to help.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-600">
                    <span>📞</span>
                    <span>1-800-SEED-123</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <span>✉️</span>
                    <span>support@naturesseed.com</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <span>💬</span>
                    <span>Live Chat Available</span>
                  </div>
                </div>
                
                <Button variant="outline" size="sm" className="w-full mt-4">
                  Contact Support
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
