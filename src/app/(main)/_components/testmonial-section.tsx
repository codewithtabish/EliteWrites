/** @format */

import { BlurFade } from '@/components/magicui/blur-fade';
import Marquee from '@/components/ui/marquee';
// import { Marquee } from '@/components/magicui/marquee';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const ReviewCard = ({
  imageURL,
  company,
  position,
  content,
  author,
}: {
  imageURL: string;
  company: string;
  position: string;
  content: string;
  author: string;
}) => {
  return (
    <figure
      className={cn(
        'relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4',
        // Light styles
        'border-gray-200/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]',
        // Dark styles
        'dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]'
      )}
    >
      <div className='flex flex-row items-center gap-2'>
        <Image
          className='rounded-full'
          width={32}
          height={32}
          alt='Profile picture'
          src={"https://gravatar.com/avatar/1c8e8a6e8d1fe52b782b280909abeb38?s=200&d=robohash&r=x"}
        />
        <div className='flex flex-col'>
          <figcaption className='text-sm font-medium dark:text-white'>
            {author}
          </figcaption>
          <p className='text-xs font-medium dark:text-white/40'>{position}</p>
        </div>
      </div>
      <blockquote className='mt-2 text-[12px]'>{content}</blockquote>
    </figure>
  );
};

export default function FeedbackList({ feedbacks }: { feedbacks: any[] }) {
  if (!feedbacks || feedbacks.length === 0) return null; // Ensure feedbacks exist

  const firstRow = feedbacks.slice(0, Math.ceil(feedbacks.length / 2));
  const secondRow = feedbacks.slice(Math.ceil(feedbacks.length / 2));
  const BLUR_FADE_DELAY = 0.04;

  return (
    <div className='relative flex h-[500px] md:max-w-5xl mx-auto flex-col items-center justify-center overflow-hidden'>
      <BlurFade delay={BLUR_FADE_DELAY * 5}>
        <h2 className='text-xl font-bold my-4'>What Our Clients Say</h2>
      </BlurFade>

      <Marquee className='animate-marquee' pauseOnHover repeat={10} >
        {firstRow.map((review, index) => (
          <ReviewCard key={review.username || review.author || index} {...review} />
        ))}
      </Marquee>

      <Marquee className='animate-marquee-reverse' pauseOnHover repeat={10}
      >
        {secondRow.map((review, index) => (
          <ReviewCard key={review.username || review.author || index} {...review} />
        ))}
      </Marquee>

      {/* Left Gradient */}
      <div className='pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-[#020817] via-[#020817]/70 to-transparent'></div>

      {/* Right Gradient */}
      <div className='pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-[#020817] via-[#020817]/70 to-transparent'></div>
    </div>
  );
}
