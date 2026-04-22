import React from 'react';
import { Users, Target, ShieldCheck, MapPin } from 'lucide-react';

const About = () => {
  const stats = [
    { label: "Tickets Resolved", value: "500+" },
    { label: "Bhopal Localities", value: "25+" },
    { label: "Expert Sathis", value: "10+" },
    { label: "Customer Rating", value: "4.9/5" },
  ];

  const projects = [
    {
      title: "Smart Home CCTV Setup",
      location: "Gulmohar, Bhopal",
      img: "https://images.unsplash.com/photo-1557597774-9d2739f85a94?auto=format&fit=crop&q=80&w=400",
      category: "Security"
    },
    {
      title: "Custom E-commerce Site",
      location: "MP Nagar Zone-II",
      img: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=400",
      category: "Web Dev"
    },
    {
      title: "Office Network Overhaul",
      location: "Indrapuri",
      img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=400",
      category: "Networking"
    },
    {
      title: "Gaming PC Restoration",
      location: "Arera Colony",
      img: "https://images.unsplash.com/photo-1587202392491-e0e0c8269992?auto=format&fit=crop&q=80&w=400",
      category: "Hardware"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* 1. The Story Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-6">
          <h2 className="text-sm font-bold text-orange-500 uppercase tracking-widest">Our Story</h2>
          <h1 className="text-4xl md:text-5xl font-black text-[#003366] leading-tight">
            Born in Bhopal, <br />
            Built for <span className="text-orange-500">Trust.</span>
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            TechSathi was founded with a simple mission: to eliminate the struggle of traditional IT repair. We realized that people in Bhopal were tired of carrying heavy machines to crowded markets only to get unreliable service.
          </p>
          <p className="text-lg text-slate-600 leading-relaxed">
            By combining **L2/L3 engineering expertise** with doorstep convenience, we've created a service that treats your technology with the same care a "Sathi" (friend) would.
          </p>
          
          <div className="flex gap-4 pt-4">
            <div className="flex flex-col">
              <span className="text-3xl font-black text-[#003366]">2026</span>
              <span className="text-sm text-slate-400 font-bold uppercase">Launched</span>
            </div>
            <div className="w-[2px] bg-slate-100 mx-4"></div>
            <p className="text-sm text-slate-500 italic max-w-[200px]">
              "Making Bhopal digitally stronger, one home at a time."
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat, i) => (
            <div key={i} className="bg-slate-50 p-8 rounded-[2rem] text-center group hover:bg-[#003366] transition-all duration-500">
              <h3 className="text-3xl font-black text-orange-500 mb-1">{stat.value}</h3>
              <p className="text-sm font-bold text-slate-500 group-hover:text-white transition-colors uppercase tracking-tight">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 2. Project Gallery Section */}
      <section className="bg-slate-50 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div className="space-y-2">
              <h2 className="text-3xl font-black text-[#003366]">Project Gallery</h2>
              <p className="text-slate-500 font-medium">Real work for real clients in Bhopal</p>
            </div>
            <button className="hidden md:block text-orange-500 font-bold hover:underline">
              View All Projects →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {projects.map((project, i) => (
              <div key={i} className="group relative overflow-hidden rounded-[2rem] bg-white shadow-sm border border-slate-100">
                <img 
                  src={project.img} 
                  alt={project.title} 
                  className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#003366] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                  <span className="text-orange-400 text-[10px] font-bold uppercase tracking-widest mb-1">
                    {project.category}
                  </span>
                  <h4 className="text-white font-bold text-lg leading-tight">{project.title}</h4>
                  <p className="text-white/70 text-xs mt-2 flex items-center gap-1">
                    <MapPin size={12} /> {project.location}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Core Values */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid md:grid-cols-3 gap-12">
          <div className="space-y-4">
            <Users className="text-orange-500" size={40} />
            <h3 className="text-xl font-bold text-[#003366]">Community First</h3>
            <p className="text-slate-500">We prioritize Bhopal's local needs and provide special support for elderly citizens and students.</p>
          </div>
          <div className="space-y-4">
            <Target className="text-orange-500" size={40} />
            <h3 className="text-xl font-bold text-[#003366]">Precision Engineering</h3>
            <p className="text-slate-500">Every ticket is handled with L2/L3 grade professionalism. No "hit or miss" local repairs.</p>
          </div>
          <div className="space-y-4">
            <ShieldCheck className="text-orange-500" size={40} />
            <h3 className="text-xl font-bold text-[#003366]">Data Transparency</h3>
            <p className="text-slate-500">Your data privacy is our #1 rule. Every repair happens right in front of your eyes.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;