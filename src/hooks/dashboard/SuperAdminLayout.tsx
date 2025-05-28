"use client";

import { useEffect, useState } from 'react';

import { useAuth } from "@/utils/context/AuthContext";

import { Sun } from 'lucide-react';
import { UserCog } from 'lucide-react';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement,
    Tooltip,
    Filler,
    TooltipItem
} from 'chart.js';

import { Doughnut } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement,
    Tooltip,
    Filler
);

interface WeatherState {
    temp: number | null;
    condition: string;
    city: string;
    error: string | null;
}

export default function DashboardPage() {
    const { user } = useAuth();
    const [weather, setWeather] = useState<WeatherState>({
        temp: null,
        condition: 'Loading...',
        city: 'Loading...',
        error: null
    });
    const [currentTime, setCurrentTime] = useState(new Date());

    const categoryData = [
        { name: 'Action', value: 35, color: '#f43f5e' },
        { name: 'Romance', value: 25, color: '#8b5cf6' },
        { name: 'Comedy', value: 20, color: '#10b981' },
        { name: 'Drama', value: 15, color: '#f59e0b' },
        { name: 'Horror', value: 5, color: '#6366f1' }
    ];

    useEffect(() => {
        // Fetch weather data
        const getWeather = async () => {
            try {
                if (!process.env.NEXT_PUBLIC_WEATHER_API_KEY) {
                    throw new Error('Weather API key not configured');
                }

                const response = await fetch(
                    `https://api.weatherapi.com/v1/current.json?key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&q=Jakarta&aqi=no`
                );

                if (!response.ok) {
                    throw new Error('Weather service unavailable');
                }

                const data = await response.json();
                setWeather({
                    temp: data.current.temp_c,
                    condition: data.current.condition.text,
                    city: data.location.name,
                    error: null
                });
            } catch (error) {
                console.error('Error fetching weather:', error);
                setWeather({
                    temp: null,
                    condition: 'Error',
                    city: 'Error',
                    error: 'Unable to load weather data'
                });
            }
        };

        getWeather();
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    // Chart.js data configuration for doughnut chart
    const doughnutChartData = {
        labels: categoryData.map(item => item.name),
        datasets: [
            {
                data: categoryData.map(item => item.value),
                backgroundColor: categoryData.map(item => item.color),
            }
        ]
    };

    const doughnutOptions = {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '60%',
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                callbacks: {
                    label: function (tooltipItem: TooltipItem<"doughnut">) {
                        return `${tooltipItem.label}: ${tooltipItem.raw}%`;
                    }
                }
            }
        }
    };

    return (
        <section className="min-h-full">
            <div className="flex flex-col gap-8">
                {/* Welcome Message with Digital Clock */}
                <div className="bg-[var(--card-bg)] backdrop-blur-lg rounded-3xl p-6 shadow-[var(--card-shadow)]">
                    <div className="flex items-center justify-between gap-8">
                        <h1 className="text-2xl font-bold text-[var(--text)]">
                            Halo, selamat datang {user?.displayName}! 👋
                        </h1>
                        <div className="text-2xl font-bold text-[var(--text)] bg-[var(--hover-bg)] px-4 py-2 rounded-xl">
                            {currentTime.toLocaleTimeString('id-ID')}
                        </div>
                    </div>
                </div>

                {/* Top Stats Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                    {/* Weather Card */}
                    <div className="bg-[var(--card-bg)] backdrop-blur-lg rounded-3xl p-6 shadow-[var(--card-shadow)] hover:shadow-[var(--header-shadow)] transition-all duration-300 border border-[var(--card-border)]">
                        <div className="flex items-center justify-between">
                            <div className="w-14 h-14 bg-[var(--primary)]/10 backdrop-blur rounded-2xl flex items-center justify-center">
                                <Sun className="w-7 h-7 text-[var(--primary)]" />
                            </div>
                            <span className="px-4 py-1.5 bg-[var(--primary)]/10 backdrop-blur text-[var(--primary)] text-sm font-medium rounded-full">Cuaca</span>
                        </div>
                        {weather.error ? (
                            <div className="mt-4">
                                <p className="text-[var(--error)] text-sm">{weather.error}</p>
                            </div>
                        ) : (
                            <div className="mt-6">
                                <h3 className="text-3xl font-bold mb-2 text-[var(--text)]">
                                    {weather.temp !== null ? `${weather.temp}°C` : '--°C'}
                                </h3>
                                <p className="text-[var(--text-secondary)] text-sm font-medium">{weather.condition}</p>
                                <p className="text-[var(--text-secondary)] text-sm">{weather.city}</p>
                            </div>
                        )}
                    </div>

                    {/* Account Type Card */}
                    <div className="bg-[var(--card-bg)] backdrop-blur-lg rounded-3xl p-6 shadow-[var(--card-shadow)] hover:shadow-[var(--header-shadow)] transition-all duration-300 border border-[var(--card-border)]">
                        <div className="flex items-center justify-between">
                            <div className="w-14 h-14 bg-[var(--secondary)]/10 backdrop-blur rounded-2xl flex items-center justify-center">
                                <UserCog className="w-7 h-7 text-[var(--secondary)]" />
                            </div>
                            <span className="px-4 py-1.5 bg-[var(--secondary)]/10 backdrop-blur text-[var(--secondary)] text-sm font-medium rounded-full capitalize">{user?.role || 'User'}</span>
                        </div>
                        <h3 className="text-3xl font-bold mt-6 mb-2 capitalize text-[var(--text)]">{user?.role || 'User'}</h3>
                        <p className="text-[var(--text-secondary)] text-sm font-medium">Status Akun</p>
                    </div>
                </div>

                {/* Category Distribution */}
                <div className="bg-[var(--card-bg)] backdrop-blur-lg rounded-3xl p-6 md:p-8 shadow-[var(--card-shadow)]">
                    <h3 className="text-2xl font-bold text-[var(--text)] mb-8">Kategori Anime</h3>
                    <div className="relative h-[280px] flex justify-center">
                        <Doughnut data={doughnutChartData} options={doughnutOptions} />
                    </div>
                    <div className="mt-6 space-y-3 max-h-[200px] overflow-y-auto custom-scrollbar pr-2">
                        {categoryData.map((item, index) => (
                            <div key={index} className="flex items-center justify-between p-3 hover:bg-[var(--hover-bg)]/80 rounded-xl transition-all duration-200">
                                <div className="flex items-center">
                                    <div
                                        className="w-4 h-4 rounded-full mr-3"
                                        style={{ backgroundColor: item.color }}
                                    />
                                    <span className="text-sm font-medium text-[var(--text)]">{item.name}</span>
                                </div>
                                <span className="text-sm font-semibold text-[var(--text)]">{item.value}%</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
} 