import React from 'react';
import EducationTable from "@/components/forms/Candidate/Dashboard/Settings/AdditionalInfo/EducationTable";
import SkillsTable from "@/components/forms/Candidate/Dashboard/Settings/AdditionalInfo/SkillsTable";
import ExperienceTable from "@/components/forms/Candidate/Dashboard/Settings/AdditionalInfo/ExperienceTable";

export default function TableLayout() {

    const jobsData = [
        {
            company: 'Up',
            title: 'Networking Engineer',
            type: 'Remote',
            location: 'Washington',
            salary: '$50k-80k/month',
            startDate: 'Feb 2, 2019 19:28',
            endDate: 'Dec 7, 2019 23:26',
        },
        {
            company: 'P',
            title: 'Product Designer',
            type: 'Full Time',
            location: 'Dhaka',
            salary: '$50k-80k/month',
            startDate: 'Dec 7, 2019 23:26',
            endDate: 'Dec 4, 2019 21:42',
        },
        {
            company: 'A',
            title: 'Junior Graphic Designer',
            type: 'Temporary',
            location: 'Brazil',
            salary: '$50k-80k/month',
            startDate: 'Feb 2, 2019 19:28',
            endDate: 'Dec 7, 2019 23:26',
        },
        {
            company: 'M',
            title: 'Visual Designer',
            type: 'Contract Base',
            location: 'Wisconsin',
            salary: '$50k-80k/month',
            startDate: 'Dec 7, 2019 23:26',
            endDate: 'Dec 4, 2019 21:42',
        },
        {
            company: 'T',
            title: 'Marketing Officer',
            type: 'Full Time',
            location: 'United States',
            salary: '$50k-80k/month',
            startDate: 'Dec 4, 2019 21:42',
            endDate: 'Dec 7, 2019 23:26',
        },
    ];

    const skillsData = [
        {
            skill: 'HTML',
            level: 'Expert',
        },
        {
            skill: 'CSS',
            level: 'Expert',
        },
        {
            skill: 'JavaScript',
            level: 'Expert',
        },
        {
            skill: 'React',
            level: 'Expert',
        }
    ];

    const educationData = [
        {
            degree: 'Bachelor of Science',
            major: 'Computer Science',
            institution: 'University of California, Berkeley',
            startDate: '2010',
            endDate: '2014',
        },
        {
            degree: 'Master of Science',
            major: 'Computer Science',
            institution: 'University of California, Berkeley',
            startDate: '2014',
            endDate: '2016',
        }
    ]

    return (
        <div className="bg-white max-w-7xl mx-auto">
            <ExperienceTable jobsData={jobsData}/>
            <div
                className="grid grid-cols-1 md:grid-cols-2 gap-2 py-4 px-4 text-sm font-semibold text-gray-500 uppercase ">
                <EducationTable educationData={educationData}/>
                <SkillsTable skillsData={skillsData}/>
            </div>
        </div>
    );

}