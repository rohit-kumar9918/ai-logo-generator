import React, { useEffect, useState } from 'react';
import HeadingDescription from './HeadingDescription';
import Lookup from '@/app/_data/Lookup';
import axios from 'axios';
import Prompt from '@/app/_data/Prompt';
import { Loader2Icon, RefreshCw } from 'lucide-react';

function LogoIdea({ formData, onHandleInputChange }) {
  const [ideas, setIdeas] = useState();
  const [loading, setLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState(formData?.idea);
  const [error, setError] = useState(null); // Added for error display

  useEffect(() => {
    generateLogoDesignIdea();
  }, [JSON.stringify({
    designTitle: formData?.design?.title,
    title: formData?.title,
    desc: formData?.desc,
    designPrompt: formData?.design?.prompt,
  })]);

  const generateLogoDesignIdea = async () => {
    setLoading(true);
    setError(null); // Clear previous errors
    const PROMPT = Prompt.DESIGN_IDEA_PROMPT
      .replace('{logoType}', formData?.design?.title || '')
      .replace('{logoTitle}', formData?.title || '')
      .replace('{logoDesc}', formData?.desc || '')
      .replace('{logoPrompt}', formData?.design?.prompt || '');

    try {
      const result = await axios.post('/api/ai-design-ideas', { prompt: PROMPT });
      setIdeas(result.data.ideas);
      setSelectedOption('Let AI Select the best idea');
      onHandleInputChange('Let AI Select the best idea');
    } catch (error) {
      console.error('Error generating ideas:', error);
      setError(error.response?.status === 404 
        ? 'API endpoint not found. Please check the server configuration.'
        : 'Failed to generate logo ideas. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='my-10'>
      <HeadingDescription
        title={Lookup.LogoIdeaTitle}
        description={Lookup.LogoIdeaDesc}
      />
      <div className='flex items-center justify-center'>
        {loading && <Loader2Icon className='animate-spin my-10' />}
      </div>
      {error && (
        <div className='text-red-500 text-center my-4'>
          {error}
        </div>
      )}
      <div className='flex flex-wrap gap-3 mt-6'>
        {ideas && ideas.map((item, index) => (
          <h2
            key={index}
            onClick={() => {
              setSelectedOption(item);
              onHandleInputChange(item);
            }}
            className={`p-2 rounded-full border px-3 cursor-pointer hover:border-primary ${selectedOption === item && 'border-primary'}`}
          >
            {item}
          </h2>
        ))}
        <h2
          onClick={() => {
            setSelectedOption('Let AI Select the best idea');
            onHandleInputChange('Let AI Select the best idea');
          }}
          className={`p-2 rounded-full border px-3 cursor-pointer hover:border-primary ${selectedOption === 'Let AI Select the best idea' && 'border-primary'}`}
        >
          Let AI Select the best idea
        </h2>
      </div>
      <div className='mt-4 flex justify-center'>
        <button
          onClick={generateLogoDesignIdea}
          disabled={loading}
          className='flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark disabled:opacity-50'
        >
          <RefreshCw size={16} />
          Regenerate Ideas
        </button>
      </div>
    </div>
  );
}

export default LogoIdea;