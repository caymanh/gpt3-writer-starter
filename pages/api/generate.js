import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const basePromptPrefix = `
Write me an eye-catching and engaging Tinder profile description that will make me stand out and increase my chances of matching with the most popular users. The profile description should showcase a fun, outgoing and charismatic personality. The profile description should sound natural and not robotic. The profile description should exclude mentioning name, gender, age, and sexual orientation. The profile description should include some facts from "About Me."

About Me:
`;
const generateAction = async (req, res) => {
  // Run first prompt
  // console.log(`API: ${basePromptPrefix}${req.body.userInput}`);

  const baseCompletion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `${basePromptPrefix}${req.body.userInput}\n`,
    temperature: 0.8,
    max_tokens: 1250,
  });

  const basePromptOutput = baseCompletion.data.choices.pop();

  res.status(200).json({ output: basePromptOutput });
};

export default generateAction;
