import { Injectable, Inject } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { uuid } from 'uuidv4';
import { GptService } from 'src/gpt/gpt.service';
import { NewNodeDto } from './dto/newNode.dto';
import { MessageInterface } from 'src/gpt/interfaces';
import axios from 'axios';

@Injectable()
export class LinkedinService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @Inject(GptService) private gptService: GptService,
  ) {}

  async generateSecondNodes(newNodeDto: NewNodeDto) {
    const { sessionId, node } = newNodeDto;
    const messages = (await this.cacheManager.get(
      sessionId,
    )) as MessageInterface[];
    const newMessage = `This is a strict requirement: The scope and domain of the jobs have to be limited to ${node} Domain.
Using the information in your previous response and the data provided to you before, please categorize those job positions into relevant categories.
Use one or more of the following criteria to categorize the job positions:
logical and industrial domains, required skill sets, levels of responsibility, and similarities and characteristics.

You have to give an output in the following JSON format:

{
"name":"<CandidateName>",
"designation":"<Designation>",
"nodes": [ {
    "title":"<Category 1>"
}, 
{
    "title":"<Category 2>"
}, 
{
    "title":<Category 3>"
},
{
    "title":<Category 4>"
} ]
}

This is a strict requirement: You need to generate only 4 different Categories.`;
    console.log(typeof messages);
    console.log(messages);
    messages.push({ role: 'user', content: newMessage });
    console.log(messages);
    const reply = await this.gptService.getGptResponse(messages);
    console.log(reply);
    messages.push({ role: 'assistant', content: reply });
    await this.cacheManager.set(sessionId, messages);
    return reply;
  }

  async getInitialNode(filename: string) {
    console.log(filename);
    const resume = await axios.get(
      `https://3062-136-233-9-98.ngrok-free.app/converter/${filename}`,
    );
    const messages = [
      {
        role: 'user',
        content: `I am going to give you some information about a candidate in an ATS. Tell me what career domains are possible because of which skills, all in a highly structured manner.

Your input will be data in text format, a copy of all the text in their resume

Create a list of job positions that a person with the given profile will be able to transition into. 
The criteria for such a job position are that there needs to be at most a 15% intersection between the skills required for that job position and the skills that the person currently has.
List jobs that don't fall under the same logical and technical domains.
This is a strict requirement: You need to list at least 15 different job positions, with minimal overlap between them.`,
      },
      { role: 'user', content: resume.data },
    ];
    const sessionId = uuid();
    console.log(messages);
    const reply = await this.gptService.getGptResponse(messages);
    messages.push({ role: 'assistant', content: reply });
    console.log(messages);
    await this.cacheManager.set(sessionId, messages);
    console.log((await this.cacheManager.get(sessionId))[0]);
    return { sessionId };
  }
}
