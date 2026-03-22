import React from 'react';
import HeroSection from '../layouts/HeroSection';
import TimelineSection from '../layouts/TimelineSection';
import StorySection from '../layouts/StorySection';
import KeyMomentsSection from '../layouts/KeyMomentsSection';
import VisitStreakSection from '../layouts/VisitStreakSection';
import LeaderboardSection from '../layouts/LeaderboardSection';
import bg from '../assets/images/bg.png';
import StakeSection from '../layouts/StakeSection';


export default function Home() {
  return (
    <div className="min-h-screen text-gray-900 overflow-x-hidden font-body"
    style={{ border: '4px solid black', boxShadow: '8px 8px 0 0 #000' }}
    >
      {/* Fixed Background */}
      <div
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${bg})` }}
      />
      <div className="fixed inset-0 z-0 bg-black/5" />

      {/* Hero */}
      <HeroSection />

      {/* Scrollable Content */}
      <div className="relative z-10 container mx-auto px-4 pb-32 flex flex-col gap-24 md:gap-32 items-center max-w-6xl">
        <TimelineSection/>
        <StorySection />
        <KeyMomentsSection />
        <StakeSection/>
        <VisitStreakSection />
        <LeaderboardSection />
      </div>
    </div>
  );
}