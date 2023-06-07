import CareerGraph from '@/components/CareerGraph';

const data = {
  sessionId: '123',
  title: 'Anirudh Mishra',
  description: 'Student',
  nodes: [
    {
      title: 'Technical',
      description: 'lorem',
      nodes: [
        {
          title: 'Database Developer',
          description: 'lorem',
        },
        {
          title: 'Software Developer',
          description: 'lorem',
        },
        {
          title: 'Frontend Developer',
          description: 'lorem',
        },
      ],
    },
    {
      title: 'Management',
      description: 'lorem',
    },
    {
      title: 'Analyst',
      description: 'lorem',
    },
  ],
};

export default function Home() {
  return (
    <main className="flex min-h-screen flex-row items-center">
      <CareerGraph data={data} />
    </main>
  );
}
