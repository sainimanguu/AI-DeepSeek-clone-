import React, { useState } from 'react'
import { FileText, Sparkles } from 'lucide-react'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useAuth } from '@clerk/clerk-react';
import Markdown from 'react-markdown';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const ReviewResume = () => {

    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [content, setContent] = useState('');

    const { getToken } = useAuth();

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        if (!file) {
            toast.error("Please upload a resume in PDF first.");
            return;
        }

        if (file.size > 10 * 1024 * 1024) {
            toast.error("File exceeds 10MB limit.");
            return;
        }

        try {
            setLoading(true);
            setContent('');
            const formData = new FormData();
            formData.append('resume', file);

            const token = await getToken();

            const { data } = await axios.post(
                '/api/ai/resume-review',
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (data.success) {
                setContent(data.content);
                toast.success("Resume reviewed successfully!");
            } else {
                toast.error(data.message || "Something went wrong.");
            }

        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-slate-700'>

            {/* Upload Section */}
            <form onSubmit={onSubmitHandler} className='w-full p-4 max-w-lg bg-white rounded-lg border border-gray-200'>
                <div className='flex items-center gap-3'>
                    <Sparkles className='w-6 text-[#00DA83]' />
                    <h1 className='text-xl font-semibold'>Review Resume</h1>
                </div>

                <p className='mt-6 text-sm font-medium'>Upload Resume</p>

                <input
                    onChange={(e) => setFile(e.target.files[0])}
                    type="file"
                    accept='application/pdf'
                    className='w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300 text-gray-600'
                    required
                />

                <p className='text-xs text-gray-500 font-light mt-1'>Supports PDF resumes only (max 10MB).</p>

                <button
                    type='submit'
                    disabled={loading}
                    className={`w-full flex justify-center items-center gap-2 bg-linear-to-r from-[#00DA83] to-[#009BB3] text-white px-4 py-2 mt-6 text-sm rounded-lg transition-all ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90 cursor-pointer '}`}
                >
                    {loading ? (
                        <span className='w-4 h-4 my-1 rounded-full border-2 border-t-transparent border-white animate-spin'></span>
                    ) : (
                        <FileText className='w-5' />
                    )}
                    {loading ? "Analyzing..." : "Review Resume"}
                </button>
            </form>

            {/* Result Section */}
            <div className='w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-96 max-h-[600px]'>
                <div className='flex items-center gap-3'>
                    <FileText className='w-5 h-5 text-[#00DA83]' />
                    <h1 className='text-xl font-semibold'>Analysis Result</h1>
                </div>

                {!content ? (
                    <div className='flex-1 flex justify-center items-center'>
                        <div className='text-sm flex flex-col items-center gap-5 text-gray-400'>
                            <FileText className='w-9 h-9' />
                            <p>Upload your resume and press “Review Resume” to get started.</p>
                        </div>
                    </div>
                ) : (
                    <div className='mt-3 h-full overflow-y-scroll text-sm text-slate-600'>
                        <div className='reset-tw prose'>
                            <Markdown>{content}</Markdown>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ReviewResume;
