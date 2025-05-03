import { Button } from '@/components/ui/button';
import { UseChatHelpers } from '@ai-sdk/react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { useState } from 'react';

type ChatSuggestionProps = {
  onSelect: UseChatHelpers['append'];
};

export interface SuggestedActionType {
  title: string;
  label: string;
  action: string;
}

const suggestedActions: SuggestedActionType[] = [
  {
    title: 'Write code to',
    label: 'implement binary search',
    action:
      'Write a complete function in the programming language of your choice that implements binary search on a sorted array of integers and returns the index of the target element, or -1 if not found.',
  },
  {
    title: 'Explain how',
    label: 'AI models like ChatGPT work',
    action:
      'Explain in detail how AI language models like ChatGPT work, including the concept of transformers, training data, tokenization, and how they generate human-like text.',
  },
  {
    title: 'Generate ideas',
    label: 'for a YouTube channel',
    action:
      'Generate 10 creative and unique YouTube channel content ideas based on trending topics in 2025, including suggested titles and target audience.',
  },
  {
    title: 'Suggest AI tools',
    label: 'for productivity',
    action:
      'List and describe 5 AI tools that can help boost productivity for professionals or students, including their key features and best use cases.',
  },
  {
    title: 'What is the weather',
    label: 'in Paris?',
    action:
      'Check and provide the current weather conditions in Paris, France, including temperature, humidity, and chance of rain.',
  },
  {
    title: 'Help me to draft out',
    label: 'a gym plan',
    action:
      'Create a weekly gym workout plan for a beginner looking to build muscle and improve endurance, including specific exercises for each day and rest periods.',
  },
  {
    title: 'Summarize this article',
    label: 'about climate change',
    action:
      'Read and summarize the main points of the given article about climate change, highlighting key facts, causes, and proposed solutions.',
  },
  {
    title: 'Explain the concept of',
    label: 'blockchain technology',
    action:
      'Explain blockchain technology in simple terms, including how it works, its components (like blocks and miners), and real-world use cases.',
  },
  {
    title: 'Generate a meal plan',
    label: 'for weight loss',
    action:
      'Create a 7-day meal plan for someone trying to lose weight, including calorie counts and balanced meals for breakfast, lunch, and dinner.',
  },
  {
    title: 'Help me prepare',
    label: 'for a job interview',
    action:
      'Provide a list of common job interview questions and tips on how to answer them effectively, including body language and dress code recommendations.',
  },
  {
    title: 'Create a study schedule',
    label: 'for final exams',
    action:
      'Generate a detailed study schedule for preparing for final exams over the next 4 weeks, balancing study time, breaks, and revision days.',
  },
  {
    title: 'Write a cover letter',
    label: 'for a software developer role',
    action:
      'Write a professional cover letter tailored for a junior software developer position, including an introduction, experience highlights, and motivation for applying.',
  },
];

export function ChatSuggestions({ onSelect }: ChatSuggestionProps) {
  const [showAllSuggestions, setShowAllSuggestions] = useState(false);

  const suggestions = suggestedActions.slice(
    0,
    showAllSuggestions ? suggestedActions.length : 5
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className='w-full flex flex-col items-center gap-3 py-6'
    >
      <div className='flex items-center gap-2 text-sm text-muted-foreground mb-1'>
        <Sparkles className='h-4 w-4' />
        <span>Try asking</span>
      </div>
      <div className='flex flex-wrap justify-center gap-2'>
        {suggestions.map((suggestion, i) => (
          <motion.div
            key={suggestion.title}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            className='w-full sm:w-fit'
          >
            <Button
              variant='outline'
              size='sm'
              className='hover:bg-accent/50 text-sm py-2 px-4 h-auto transition-all duration-300 hover:scale-105 border-border/50 rounded-xl w-full'
              onClick={() =>
                onSelect({
                  role: 'user',
                  content: suggestion.action,
                })
              }
            >
              {suggestion.title + ' ' + suggestion.label}
            </Button>
          </motion.div>
        ))}
      </div>
      {suggestedActions.length > 5 && (
        <Button
          variant='ghost'
          size='sm'
          className='text-muted-foreground'
          onClick={() => setShowAllSuggestions((prev) => !prev)}
        >
          {showAllSuggestions ? 'Show less' : 'Show more'}
        </Button>
      )}
    </motion.div>
  );
}
