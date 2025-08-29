import React, {useState} from 'react';
import {FaRegUserCircle} from "react-icons/fa";
import {FaBriefcase} from "react-icons/fa6";
import {IoSearch} from "react-icons/io5";
import HeroSection from "@/components/panels/Home/secion/HeroSection";
import StatsSection from "@/components/panels/Home/secion/StatsSection";
import VacanciesSection from "@/components/panels/Home/secion/VacanciesSection";
import HowItWorksSection from "@/components/panels/Home/secion/HowItWorksSection";
import PopularSection from "@/components/panels/Home/secion/PopularSection";
import FeaturedJobSection from "@/components/panels/Home/secion/FeaturedJobSection";
import TopCompaniesSection from "@/components/panels/Home/secion/TopCompaniesSection";
import TestimonialSection from "@/components/panels/Home/secion/TestimonialSection";
import CtaSection from "@/components/panels/Home/secion/CtaSection";


export default function HomePanel() {
    const [activeTab, setActiveTab] = useState('All');

    const stats = [
        {label: 'Live Jobs', value: '1,75,354'},
        {label: 'Companies', value: '97,354'},
        {label: 'Candidates', value: '7,38,724'},
        {label: 'New Jobs', value: '7,382'},
    ];

    const popularVacancies = [
        {title: 'Software Engineer', location: 'London, UK'},
        {title: 'UX Designer', location: 'New York, USA'},
        {title: 'Product Manager', location: 'San Francisco, USA'},
        {title: 'Data Scientist', location: 'Berlin, Germany'},
        {title: 'Marketing Specialist', location: 'Paris, France'},
        {title: 'Financial Analyst', location: 'Tokyo, Japan'},
    ];

    const howItWorks = [
        {
            icon: <FaRegUserCircle size={48} className="mx-auto"/>,
            title: 'Create Account',
            description: 'First, create an account on the platform.',
        },
        {
            icon: <FaBriefcase size={48} className="mx-auto"/>,
            title: 'Upload Your CV/Resume',
            description: 'Upload your updated resume or CV.',
        },
        {
            icon: <IoSearch size={48} className="mx-auto"/>,
            title: 'Search Job',
            description: 'Find your desired job you want.',
        },
        {
            icon: <FaBriefcase size={48} className="mx-auto"/>,
            title: 'Apply Job',
            description: 'Apply for the job you like and get placed.',
        },
    ];

    const jobCategories = [
        {icon: <FaBriefcase size={22}/>, title: 'Graphics & Design', jobs: '235'},
        {icon: <FaBriefcase size={22}/>, title: 'Video & Animation', jobs: '235'},
        {icon: <FaBriefcase size={22}/>, title: 'Digital Marketing', jobs: '235'},
        {icon: <FaBriefcase size={22}/>, title: 'Music & Audio', jobs: '235'},
        {icon: <FaBriefcase size={22}/>, title: 'Programming & Tech', jobs: '235'},
        {icon: <FaBriefcase size={22}/>, title: 'Business', jobs: '235'},
        {icon: <FaBriefcase size={22}/>, title: 'Data Entry', jobs: '235'},
        {icon: <FaBriefcase size={22}/>, title: 'Lifestyle', jobs: '235'},
    ];

    const featuredJobs = [
        {
            title: 'Social Media Assistant',
            company: 'Google Inc.',
            location: 'California, USA',
            type: 'Part Time',
            salary: '$300-600',
            description: 'A social assistant is a professional who helps individuals...',
            tags: ['Design', 'Art', 'Online'],
            logo: 'https://placehold.co/40x40/f4f4f4/6b7280?text=G',
        },
        {
            title: 'Sr. Product Designer',
            company: 'Google Inc.',
            location: 'California, USA',
            type: 'Full Time',
            salary: '$300-600',
            description: 'A social assistant is a professional who helps individuals...',
            tags: ['Design', 'Art', 'Online'],
            logo: 'https://placehold.co/40x40/f4f4f4/6b7280?text=G',
        },
        {
            title: 'Lead Graphic Designer',
            company: 'Google Inc.',
            location: 'California, USA',
            type: 'Full Time',
            salary: '$300-600',
            description: 'A social assistant is a professional who helps individuals...',
            tags: ['Design', 'Art', 'Online'],
            logo: 'https://placehold.co/40x40/f4f4f4/6b7280?text=G',
        },
        {
            title: 'Sr. Marketing Manager',
            company: 'Google Inc.',
            location: 'California, USA',
            type: 'Full Time',
            salary: '$300-600',
            description: 'A social assistant is a professional who helps individuals...',
            tags: ['Design', 'Art', 'Online'],
            logo: 'https://placehold.co/40x40/f4f4f4/6b7280?text=G',
        },
        {
            title: 'Marketing & Communication',
            company: 'Google Inc.',
            location: 'California, USA',
            type: 'Full Time',
            salary: '$300-600',
            description: 'A social assistant is a professional who helps individuals...',
            tags: ['Design', 'Art', 'Online'],
            logo: 'https://placehold.co/40x40/f4f4f4/6b7280?text=G',
        },
        {
            title: 'Project Manager',
            company: 'Google Inc.',
            location: 'California, USA',
            type: 'Part Time',
            salary: '$300-600',
            description: 'A social assistant is a professional who helps individuals...',
            tags: ['Design', 'Art', 'Online'],
            logo: 'https://placehold.co/40x40/f4f4f4/6b7280?text=G',
        },
    ];

    const topCompanies = [
        {
            name: 'Google',
            jobs: 25,
            logo: 'https://placehold.co/40x40/f4f4f4/6b7280?text=G',
        },
        {
            name: 'Google',
            jobs: 25,
            logo: 'https://placehold.co/40x40/f4f4f4/6b7280?text=G',
        },
        {
            name: 'Google',
            jobs: 25,
            logo: 'https://placehold.co/40x40/f4f4f4/6b7280?text=G',
        },
    ];

    const testimonials = [
        {
            text: 'Velit auctor a aliquea enim. Dictum proin morbi aenean aliquea enim. Amet, consectetur aliquea enim.',
            author: 'John Smith',
            role: 'CEO, Aliqua',
            rating: 5,
        },
        {
            text: 'Velit auctor a aliquea enim. Dictum proin morbi aenean aliquea enim. Amet, consectetur aliquea enim.',
            author: 'David Cooper',
            role: 'Project Manager, Loro',
            rating: 5,
        },
        {
            text: 'Velit auctor a aliquea enim. Dictum proin morbi aenean aliquea enim. Amet, consectetur aliquea enim.',
            author: 'David Cooper',
            role: 'Project Manager, Loro',
            rating: 5,
        },
        {
            text: 'Velit auctor a aliquea enim. Dictum proin morbi aenean aliquea enim. Amet, consectetur aliquea enim.',
            author: 'David Cooper',
            role: 'Project Manager, Loro',
            rating: 5,
        },
        {
            text: 'Velit auctor a aliquea enim. Dictum proin morbi aenean aliquea enim. Amet, consectetur aliquea enim.',
            author: 'David Cooper',
            role: 'Project Manager, Loro',
            rating: 5,
        },
        {
            text: 'Velit auctor a aliquea enim. Dictum proin morbi aenean aliquea enim. Amet, consectetur aliquea enim.',
            author: 'David Cooper',
            role: 'Project Manager, Loro',
            rating: 5,
        },
    ];

    return (
        <div className="font-sans antialiased text-gray-800 bg-white">

            {/* Hero Section */}
            <section className="relative bg-gray-100">
                <div className="max-w-7xl mx-auto px-4 bg-gray-100">
                    <HeroSection/>
                </div>
            </section>
            {/* Stats Section */}
            <div className="bg-gray-100">
                <div className="max-w-7xl mx-auto px-2 pb-10 sm:px-4 lg:px-6">
                    <StatsSection stats={stats}/>
                </div>
            </div>

            {/* Popular Vacancies Section */}
            <section className="bg-white">
                <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
                    <VacanciesSection popularVacancies={popularVacancies}/>
                </div>
            </section>

            {/* How it Works Section */}
            <section className="bg-gray-100 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <HowItWorksSection howItWorks={howItWorks}/>
                </div>
            </section>

            {/* Popular Category Section */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <PopularSection jobCategories={jobCategories}/>
                </div>
            </section>

            {/* Featured Jobs Section */}
            <section className="border-t-3 border-gray-100 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <FeaturedJobSection featuredJobs={featuredJobs}/>
                </div>
            </section>

            {/* Top Companies Section */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <TopCompaniesSection topCompanies={topCompanies}/>
                </div>
            </section>

            {/* Testimonial Section */}
            <section className="bg-gray-100 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <TestimonialSection testimonials={testimonials}/>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <CtaSection />
                </div>
            </section>
        </div>
    );
}