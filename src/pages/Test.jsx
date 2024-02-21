import OpenAI from 'openai';
import { useState } from 'react';

export default function Test() {
	const [entries, setEntries] = useState('');
	const [response, setResponse] = useState('');

	const openai = new OpenAI({
		apiKey: import.meta.env.VITE_OPENAI_API_KEY,
		dangerouslyAllowBrowser: true,
	});

	const callOpenAIApi = async () => {
		console.log('calling OpenAI api');
		const response = await openai.chat.completions.create({
			model: 'gpt-3.5-turbo',
			messages: [
				{
					role: 'system',
					content: `I want you to act as a Journal Analyzer life coach for [User], providing personalized feedback on their journal entries over a week. Analyze what is going wrong/right, offer constructive insights, reminders on important dates, and anything else that the user will find useful. Also create an action plan for the user to follow over next week keeping the insights in mind. Format your response like this: Insights: {insights} /n/n Action Plan: /n{action_plan}
                    The tone should be very friendly. Address the user by his name. Avoid {Main_Point: description} format and use paragraphs instead; except for specific action points within the action_plan. You can highlight main words by wrapping them in <b> html tags.`,
				},
				{
					role: 'user',
					content: entries,
				},
			],
			temperature: 0.6,
			max_tokens: 64,
			top_p: 1,
		});
		setResponse(response);
	};

	return (
		<div className="flex flex-col item-start w-3/4">
			<h1 className="text-3xl py-8">Ai Journal</h1>
			<textarea
				placeholder="Enter journal entries:"
				onChange={(e) => setEntries(e.target.value)}
				type="text"
				className="shadow-xl w-full h-96 pb-40"
			/>
			<span className="pt-8" />
			<button
				type="button"
				onClick={callOpenAIApi}
				className="bg-rose-400 p-2  w-24"
			>
				Analyse
			</button>
			<h2 className="pt-12 text-2xl italic">Response</h2>
			<p>{response}</p>
		</div>
	);
}
