import { Injectable, Inject } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { uuid } from 'uuidv4';
import { GptService } from 'src/gpt/gpt.service';
import { NewNodeDto } from './dto/newNode.dto';
import { MessageInterface } from 'src/gpt/interfaces';

@Injectable()
export class LinkedinService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @Inject(GptService) private gptService: GptService,
  ) {}

  async handleLinkedinUrl(url: string) {
    const sessionId = uuid();
    // const response = await fetch('http://localhost:5000/linkedinUrl', {
    //   method: 'POST',
    //   body: url,
    // });
    // const data = await response.json();
    const data = `About: I am Harsh Avinash, a computer science engineer with a specialization in data science, I've handled roles of product management and have a reputation of delivering quality work on time. I'm best seen in roles of leadership and have a history of handling responsibility well. 
I'm competitive, curious and humbled to see what the world has to offer, looking forward to new and exciting opportunities.

Experience:

Research Fellow
Indian Institute of Technology, Delhi · Internship

ACM-VIT Chapter
Chairperson

Frontend Developer and Designer
Procial

Product Manager and Data Analyst
Cypherock


EDUCATION:

Vellore Institute of Technology
B. Tech Data Science


SKILLS:
React
LLM
Machine Learning
Solidity
Rust
Next
AWS
Docker
Deep Learning
Tensorflow
Leadership`;
    const messages = [
      {
        role: 'user',
        content:
          'I am going to give you some information about a candidate in an ATS. Tell me what career paths are possible because of which skills, which skills need to be worked on for certain paths, all in a highly structured manner.',
      },
      { role: 'user', content: data },
    ];
    await this.cacheManager.set(sessionId, messages);
    const reply = await this.gptService.getGptResponse(messages);
    console.log(reply);
    messages.push({ role: 'assistant', content: reply });
    return reply;
  }

  async generateNewNode(newNodeDto: NewNodeDto) {
    const { sessionId, node } = newNodeDto;
    const messages = Array<MessageInterface>(
      await this.cacheManager.get(sessionId),
    );
    const newMessage = `Can i get roles in the  ${node} domain?`;
    messages.push({ role: 'user', content: newMessage });
    const reply = await this.gptService.getGptResponse(messages);
    console.log(reply);
    return reply;
  }
}
