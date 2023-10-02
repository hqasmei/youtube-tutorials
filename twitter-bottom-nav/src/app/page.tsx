import HomeFeed from '@/components/home/home-feed';

export default function Home() {
  return (
    <div className="flex flex-col pt-4 sm:ml-[120px] md:ml-[250px] sm:border-r sm:border-zinc-700 pb-20 h-full">
      <HomeFeed />
    </div>
  );
}
