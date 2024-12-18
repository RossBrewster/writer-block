import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { Activity, Book, Clock, Award, LucideIcon } from 'lucide-react';
import BorderBox from '../components/BorderBox';

interface MetricCardProps {
  icon: LucideIcon;
  title: string;
  value: string;
  color: string;
}

const UserDashboard: React.FC = () => {
  // Sample data - replace with real data
  const progressData = [
    { name: 'Mon', progress: 65 },
    { name: 'Tue', progress: 75 },
    { name: 'Wed', progress: 85 },
    { name: 'Thu', progress: 70 },
    { name: 'Fri', progress: 90 },
  ];

  const MetricCard: React.FC<MetricCardProps> = ({ icon: Icon, title, value, color }) => (
    <div className="bg-white bg-opacity-10 rounded-lg p-6 backdrop-blur-sm">
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="w-6 h-6 text-gray-900" />
        </div>
        <div>
          <h3 className="text-gray-400 text-sm">{title}</h3>
          <p className="text-white text-2xl font-bold">{value}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen w-full bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
            <p className="text-gray-400">Welcome back, Writer</p>
          </div>
          <BorderBox buttonText="New Project" />
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <MetricCard
            icon={Book}
            title="Total Projects"
            value="12"
            color="bg-pink-400"
          />
          <MetricCard
            icon={Activity}
            title="Active Sessions"
            value="3"
            color="bg-green-400"
          />
          <MetricCard
            icon={Clock}
            title="Hours Spent"
            value="28"
            color="bg-blue-400"
          />
          <MetricCard
            icon={Award}
            title="Achievements"
            value="5"
            color="bg-yellow-400"
          />
        </div>

        {/* Progress Chart */}
        <div className="bg-white bg-opacity-10 rounded-lg p-6 backdrop-blur-sm mb-8">
          <h2 className="text-xl font-bold mb-6">Weekly Progress</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={progressData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Bar
                  dataKey="progress"
                  fill="#EC4899"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Projects */}
        <div className="bg-white bg-opacity-10 rounded-lg p-6 backdrop-blur-sm">
          <h2 className="text-xl font-bold mb-6">Recent Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((index) => (
              <div
                key={index}
                className="bg-gray-800 bg-opacity-50 rounded-lg p-4
                          transform transition-transform duration-300 hover:scale-105"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="w-6 h-6 bg-pink-400 rounded" />
                  <span className="text-gray-400 text-sm">2 days ago</span>
                </div>
                <h3 className="font-bold mb-2">Project {index}</h3>
                <p className="text-gray-400 text-sm mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">Progress: 75%</span>
                  <div className="w-24 h-1 bg-gray-700 rounded">
                    <div className="w-3/4 h-full bg-pink-400 rounded" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;