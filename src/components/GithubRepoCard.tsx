import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { FiStar, FiGitBranch, FiEye, FiCopy, FiCheck, FiGithub, FiChevronLeft, FiChevronRight, FiExternalLink } from 'react-icons/fi';
import { VscIssues } from 'react-icons/vsc';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface GithubRepoCardProps {
  username: string;
  repo?: string;
  className?: string;
}

interface RepoData {
  name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  watchers_count: number;
  open_issues_count: number;
  updated_at: string;
  language: string;
  topics: string[];
  clone_url: string;
  owner: {
    avatar_url: string;
    login: string;
  };
  html_url: string;
}

export default function GithubRepoCard({ username, repo, className = '' }: GithubRepoCardProps) {
  const [repos, setRepos] = useState<RepoData[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  // Start with a flat line, it will animate to the real data
  const [chartPoints, setChartPoints] = useState<string>("0,40 200,40");

  const cardRef = useRef<HTMLDivElement>(null);
  
  // Framer motion values for 3D tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 200, mass: 0.5 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [7, -7]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-7, 7]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mouseX.set(x / rect.width - 0.5);
    mouseY.set(y / rect.height - 0.5);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  // Fetch all public repos
  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const res = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=15`);
        if (res.ok) {
          const json = await res.json();
          // Filter out forks for better portfolio presentation
          const publicRepos = json.filter((r: any) => !r.fork);
          setRepos(publicRepos);
          
          // Set initial index if repo prop was provided
          if (repo) {
            const idx = publicRepos.findIndex((r: RepoData) => r.name === repo);
            if (idx !== -1) setCurrentIndex(idx);
          }
        }
      } catch (error) {
        console.error('Failed to fetch repos:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchRepos();
  }, [username, repo]);

  // Fetch real commit activity when the selected repo changes
  useEffect(() => {
    const fetchActivity = async () => {
      if (repos.length === 0) return;
      const currentRepo = repos[currentIndex];
      
      try {
        const res = await fetch(`https://api.github.com/repos/${username}/${currentRepo.name}/stats/commit_activity`);
        if (res.ok) {
          const stats = await res.json();
          if (Array.isArray(stats) && stats.length > 0) {
            // Get the last 12 weeks of data
            const last12Weeks = stats.slice(-12);
            const max = Math.max(...last12Weeks.map((w: any) => w.total), 1);
            
            // Map the data into SVG coordinates
            const points = last12Weeks.map((week: any, index: number) => {
              const x = (index / (last12Weeks.length - 1)) * 200;
              const y = 40 - (week.total / max) * 40;
              return `${x.toFixed(1)},${y.toFixed(1)}`;
            }).join(' ');
            
            setChartPoints(points);
            return;
          }
        }
      } catch (error) {
        console.error('Failed to fetch commit activity:', error);
      }
      // Fallback to flatline if no data available or API fails
      setChartPoints("0,40 200,40");
    };
    
    fetchActivity();
  }, [currentIndex, repos, username]);


  // Auto-cycle through repos
  useEffect(() => {
    if (repos.length <= 1 || isHovered) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % repos.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [repos.length, isHovered]);

  const handleCopy = (e: React.MouseEvent, cloneUrl: string) => {
    e.preventDefault();
    navigator.clipboard.writeText(`git clone ${cloneUrl}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading || repos.length === 0) {
    return (
      <div className={`w-full h-96 rounded-2xl border border-borders bg-surface/50 animate-pulse ${className}`} />
    );
  }

  const data = repos[currentIndex];

  // Format date relative
  const getRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    if (days < 30) return `${days} days ago`;
    const months = Math.floor(days / 30);
    if (months < 12) return `${months} month${months > 1 ? 's' : ''} ago`;
    return `${Math.floor(months / 12)} year${Math.floor(months / 12) > 1 ? 's' : ''} ago`;
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      className={`relative w-full max-w-lg p-6 rounded-2xl border border-borders bg-surface/80 backdrop-blur-xl group hover:border-acid/30 transition-colors duration-500 shadow-2xl shadow-void ${className}`}
    >
      {/* Dynamic Glare Background */}
      <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none" style={{ transform: 'translateZ(0px)' }}>
         <div className="absolute inset-0 bg-gradient-to-tr from-acid/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      </div>
      
      <div className="relative flex flex-col h-full space-y-6" style={{ transform: 'translateZ(40px)' }}>
        
        {/* TOP: Header (Path + Dropdown + Controls) */}
        <div className="flex justify-between items-start w-full">
          <div className="flex items-center gap-2 text-sm text-smoke font-mono flex-wrap flex-1 mr-4">
            <FiGithub className="text-acid shrink-0" />
            <span className="hover:text-bone transition-colors cursor-pointer hidden sm:inline">{data.owner.login}</span>
            <span className="hidden sm:inline">/</span>
            
            {/* Repo Selection Dropdown using shadcn/ui Select */}
            <div className="flex-1 max-w-[200px]">
              <Select 
                value={currentIndex.toString()} 
                onValueChange={(val) => setCurrentIndex(Number(val))}
              >
                <SelectTrigger className="h-7 px-2 text-xs border-borders bg-void/50 text-acid font-bold hover:bg-void transition-colors focus:ring-1 focus:ring-acid focus:ring-offset-0">
                  <SelectValue placeholder="Select a repository" />
                </SelectTrigger>
                <SelectContent className="bg-void border-borders max-h-[300px]">
                  {repos.map((r, idx) => (
                    <SelectItem 
                      key={r.name} 
                      value={idx.toString()} 
                      className="text-bone focus:bg-acid/20 focus:text-acid cursor-pointer text-xs"
                    >
                      {r.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="flex items-center gap-1 mr-2 bg-void/50 rounded-lg ring-1 ring-borders p-1">
              <button 
                onClick={() => setCurrentIndex((prev) => (prev - 1 + repos.length) % repos.length)}
                className="p-1 rounded text-ash hover:text-acid hover:bg-void transition-colors"
                title="Previous Repository"
              >
                <FiChevronLeft size={16} />
              </button>
              <div className="w-[1px] h-4 bg-borders" />
              <button 
                onClick={() => setCurrentIndex((prev) => (prev + 1) % repos.length)}
                className="p-1 rounded text-ash hover:text-acid hover:bg-void transition-colors"
                title="Next Repository"
              >
                <FiChevronRight size={16} />
              </button>
            </div>
            <a href={data.html_url} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-lg bg-void/50 text-ash hover:text-acid hover:bg-void transition-colors ring-1 ring-borders" title="Open in GitHub">
              <FiExternalLink size={16} />
            </a>
          </div>
        </div>

        {/* PROFILE BLOCK */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={data.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col gap-4"
          >
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="h-14 w-14 rounded-full overflow-hidden ring-2 ring-borders bg-void">
                  <img src={data.owner.avatar_url} alt={data.owner.login} className="w-full h-full object-cover" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-acid ring-2 ring-surface" />
              </div>
              <div className="flex flex-col">
                <h3 className="text-2xl font-bold font-display text-bone">{data.name}</h3>
                <div className="flex items-center gap-3 mt-1">
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-mono text-acid bg-acid/10 ring-1 ring-acid/20 uppercase tracking-wider">
                    Public
                  </span>
                  <span className="text-xs font-mono text-smoke">
                    Updated {getRelativeTime(data.updated_at)}
                  </span>
                </div>
              </div>
            </div>

            {/* DESCRIPTION */}
            <p className="text-sm text-ash leading-relaxed max-w-[90%] min-h-[40px]">
              {data.description || 'No description provided for this repository.'}
            </p>

            {/* ACTIVITY CHART */}
            <div className="flex flex-col space-y-2 pt-2">
              <div className="flex justify-between items-center text-xs font-mono text-smoke">
                <div className="flex items-center gap-2">
                  <span className="text-acid uppercase">Repository Commit Activity</span>
                  <div className="w-1.5 h-1.5 rounded-full bg-acid animate-ping" />
                </div>
                <span>Last 12 weeks</span>
              </div>
              <div className="h-20 w-full rounded-xl bg-void/80 border border-borders relative overflow-hidden flex items-end">
                <svg viewBox="0 0 200 40" preserveAspectRatio="none" className="w-full h-full opacity-80">
                  <defs>
                    <linearGradient id="chart-grad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#C5FF00" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#C5FF00" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  
                  {/* Dynamic path based on fetched activity */}
                  <motion.path
                    d={`M0,40 L${chartPoints} L200,40 Z`}
                    fill="url(#chart-grad)"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                  />
                  
                  {/* Dynamic line based on fetched activity */}
                  <motion.polyline
                    points={chartPoints}
                    fill="none"
                    stroke="#C5FF00"
                    strokeWidth="2"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                  />
                </svg>
                <div className="absolute bottom-0 w-full h-[1px] bg-borders/50" />
              </div>
            </div>

            {/* STATS GRID */}
            <div className="grid grid-cols-4 gap-3">
              {[
                { label: 'Stars', value: data.stargazers_count, icon: FiStar },
                { label: 'Forks', value: data.forks_count, icon: FiGitBranch },
                { label: 'Watchers', value: data.watchers_count, icon: FiEye },
                { label: 'Issues', value: data.open_issues_count, icon: VscIssues },
              ].map((stat, idx) => (
                <div key={idx} className="flex flex-col items-center justify-center p-3 rounded-xl bg-void border border-borders hover:border-acid/30 transition-colors group/stat">
                  <stat.icon className="text-smoke mb-2 group-hover/stat:text-acid transition-colors" size={16} />
                  <span className="font-display font-bold text-bone text-lg leading-none mb-1">
                    {stat.value.toLocaleString()}
                  </span>
                  <span className="text-[10px] font-mono text-smoke uppercase tracking-wider">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>

            {/* BOTTOM BAR: Language, Tags, Clone */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-borders">
              <div className="flex items-center gap-4">
                {/* Language */}
                {data.language && (
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-acid" />
                    <span className="text-sm font-bold text-bone">{data.language}</span>
                  </div>
                )}
                
                {/* Topic Tags */}
                <div className="flex items-center gap-2">
                  {data.topics && data.topics.slice(0, 3).map(topic => (
                    <span key={topic} className="px-2.5 py-1 rounded-md text-[10px] font-mono text-smoke bg-void border border-borders hover:border-acid/40 transition-colors">
                      {topic}
                    </span>
                  ))}
                  {data.topics && data.topics.length > 3 && (
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-mono text-acid bg-acid/5 border border-acid/20">
                      +{data.topics.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              {/* Clone Button */}
              <button
                onClick={(e) => handleCopy(e, data.clone_url)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-bone text-void font-bold text-sm hover:bg-acid transition-colors focus:outline-none focus:ring-2 focus:ring-acid focus:ring-offset-2 focus:ring-offset-surface shrink-0"
              >
                <AnimatePresence mode="wait">
                  {copied ? (
                    <motion.div key="check" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }}>
                      <FiCheck size={16} />
                    </motion.div>
                  ) : (
                    <motion.div key="copy" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }}>
                      <FiCopy size={16} />
                    </motion.div>
                  )}
                </AnimatePresence>
                <span>{copied ? 'Copied' : 'Clone'}</span>
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
