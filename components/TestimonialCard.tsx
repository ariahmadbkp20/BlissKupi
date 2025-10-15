import React from 'react';
import type { Testimonial } from '../types';
import { StarIcon } from './IconComponents';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
    return (
        <div className="bg-white p-6 rounded-2xl shadow-lg flex flex-col h-full">
            <div className="flex items-center mb-2">
                {Array.from({ length: 5 }).map((_, index) => (
                    <StarIcon
                        key={index}
                        className={`w-5 h-5 ${index < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                    />
                ))}
            </div>
            <p className="text-gray-700 italic flex-grow">"{testimonial.quote}"</p>
            <div className="mt-4">
                <p className="font-bold text-stone-800">{testimonial.name}</p>
                <p className="text-teal-600 text-sm">{testimonial.handle}</p>
            </div>
        </div>
    );
};
