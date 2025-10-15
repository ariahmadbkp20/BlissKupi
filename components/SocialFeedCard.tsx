import React from 'react';
import type { SocialPost } from '../types';
import { InstagramIcon, TiktokIcon, HeartIcon, ChatBubbleIcon } from './IconComponents';

interface SocialFeedCardProps {
  post: SocialPost;
}

const formatNumber = (num: number) => {
  if (num >= 10000) {
    return (num / 1000).toFixed(1) + 'k';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'k';
  }
  return num.toString();
};

export const SocialFeedCard: React.FC<SocialFeedCardProps> = ({ post }) => {
  return (
    <a href={post.url} target="_blank" rel="noopener noreferrer" className="block group relative rounded-2xl overflow-hidden shadow-lg aspect-square">
      <img src={post.imageUrl} alt={post.caption} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="absolute inset-0 p-4 flex flex-col justify-between text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div>
          {post.platform === 'instagram' ? 
            <InstagramIcon className="w-7 h-7" /> : 
            <TiktokIcon className="w-7 h-7" />
          }
        </div>
        <div>
          <p className="text-sm font-medium line-clamp-2">{post.caption}</p>
          <div className="flex items-center space-x-4 mt-2 text-sm font-bold">
            <div className="flex items-center gap-1.5">
              <HeartIcon className="w-5 h-5"/>
              <span>{formatNumber(post.likes)}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ChatBubbleIcon className="w-5 h-5"/>
              <span>{formatNumber(post.comments)}</span>
            </div>
          </div>
        </div>
      </div>
    </a>
  );
};
