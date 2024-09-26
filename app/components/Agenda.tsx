import React from 'react';
// import Timeline from './Timeline';
import { FaMicrophone, FaCode, FaPaperPlane } from 'react-icons/fa';
import { GrWorkshop } from "react-icons/gr";
import { FaChampagneGlasses } from "react-icons/fa6";
import { RiSlideshowLine } from "react-icons/ri";
import { GoCommentDiscussion } from "react-icons/go";


interface SessionItemProps {
    time: string;
    index: number;
    title: string;
    description: string;
    icon: JSX.Element;
    components?: JSX.Element | null;
}

// const sessionData = [
//     {
//         time: '09:00 - 10:30 AM',
//         title: 'Opening Keynote (45min) + Q&A (45min)',
//         description: 'Our keynote speakers give a talk on the topic of dynamic abstractions. The session will also include a 45-minute Q\&A moderated by one of the organizers, allowing attendees to engage with the speaker and delve deeper into the subject matter.',
//         icon: <FaMicrophone className="text-xl" />,
//         components: (
//             <div className="flex flex-col md:flex-row justify-between mt-3">
//                 <div className="flex items-center space-x-4 mb-4 md:mb-0"> {/* Add `mb-4 md:mb-0` to add margin-bottom on small screens and remove it on medium screens and larger */}
//                     <img src="https://avatars.githubusercontent.com/u/5403917?v=4" alt="Speaker 1" className="w-12 h-12 rounded-full" />
//                     <a href='https://thesephist.com/' target='_blank' rel='noreferrer noopener' className='hover:underline hover:text-blue-500'>Linus</a>
//                     <span className="text-gray-600 text-xs md:text-sm">
//                         Linus is currently researching and advising on AI interpretability, interfaces, and deployment at Thrive Capital. Previously, Linus was a Research Engineer at Notion, Researcher in Residence at Betaworks, and before that a software engineer at Replit, Hack Club, and Spensa.
//                     </span>
//                 </div>
//             </div>
//         )
//     },
//     {
//         time: '10:45- 11:30 PM',
//         title: 'Opening and introductions',
//         description: 'A brief introduction to the workshop, including the goals, schedule, and logistics. Organizers will provide an overview of the workshop theme and objectives, setting the stage for the day’s activities.',
//         icon: <FaChampagneGlasses className="text-xl" />,
//         components: null
//     },
//     {
//         time: '11:00 - 12:00 AM',
//         title: 'Group Brainstorming & Discussion',
//         description: 'Participants will engage in a group brainstorming session to explore the concept of dynamic abstractions. The session will be divided into small groups, each led by an organizer, to facilitate discussion and idea generation. Participants will be encouraged to share their thoughts, experiences, and insights on the topic, focusing on the following questions:',
//         icon: (<GrWorkshop className="text-xl" />),
//         components: (<ul className="list-disc pl-5">
//             <li>What examples of dynamic abstractions exist?</li>
//             <li>What design methods can we use to build dynamic abstractions?</li>
//             <li>What new challenges or opportunities do they introduce?</li>
//             <li>Which domains can benefit from dynamic abstractions?</li>
//         </ul>)
//     },
//     {
//         time: '13:00 - 14:30 PM',
//         title: 'Prototyping',
//         description: 'Attendees will prototype ideas that leverage the concept of dynamic abstractions. This hands-on session aims to translate brainstorming ideas into tangible prototypes, encouraging them to prototype, for example, dynamic and intelligent interfaces for diverse domains such as programming and data visualization. Organizers will participate in each group as facilitators to foster discussion, provide assistance, and manage time. At the end of the session, participants will present their prototypes to the group, reflecting on the challenges encountered during the process and identifying new opportunities and design patterns for applying these concepts to other domains and tasks.',
//         icon: <FaCode className="text-xl" />,
//     },
//     {
//         time: '14:30 - 15:30 PM',
//         title: 'Keynote 2',
//         description: 'The second keynote speaker will deliver a 50-minute talk on a relevant topic, providing further insights and inspiration. The session will also include a 10-minute Q\&A moderated by one of the organizers, allowing attendees to engage with the speaker and delve deeper into the subject matter.',
//         icon: <RiSlideshowLine className="text-xl" />,
//         components: (
//             <div className="flex flex-col md:flex-row justify-between mt-3">
//                 <div className="flex items-center space-x-4">
//                     <img src="https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg" alt="Speaker 2" className="w-12 h-12 rounded-full" />
//                     <p>Speaker 2 TBA</p>
//                 </div>
//             </div>
//         )
//     },
//     {
//         time: '15:30 - 16:00 PM',
//         title: 'Group Discussion - Research Agenda',
//         description: 'Participants will engage in a group discussion to identify and prioritize research agendas related to dynamic abstractions. Building on previous activities, such as keynotes, prototyping, and group discussion sessions, this session will focus on defining key research questions, exploring potential methodologies, and identifying collaborative opportunities. The goal is to create a clear roadmap for future research efforts and foster collaboration. ',
//         icon: <GoCommentDiscussion className="text-xl" />,
//     },
//     {
//         time: '16:00 - 16:30 PM',
//         title: 'Summary and Future Plans',
//         description: 'The final session will summarize the days discussions and activities. Organizers will outline future plans, including potential collaborations, follow-up meetings, and next steps for advancing the research on dynamic abstractions. Participants will be encouraged to share their thoughts and feedback.',
//         icon: <FaPaperPlane className="text-xl" />,
//     },
// ];


const sessionData = [
    {
        time: '09:00 - 10:15 AM',
        title: 'Opening & Introductions',
        description: 'This session includes opening remarks, introductions, and networking.',
        icon: <FaChampagneGlasses className="text-xl" />,
        components: (
            <ul className="list-disc pl-5">
                <li>Opening (15 min): Organizers introduce themselves, discuss schedule</li>
                <li>Introductions (30 min): Attendees introduce themselves at their tables</li>
                <li>Networking (30 min): Participants swap around to connect with others</li>
            </ul>
        )
    },
    // {
    //     time: '10:15 - 10:45 AM',
    //     title: 'Coffee Break',
    //     description: 'A short break for refreshments and informal discussions.',
    //     icon: <FaCoffee className="text-xl" />,
    // },
    {
        time: '10:45 - 12:00 PM',
        title: 'Keynote',
        description: 'Our keynote speaker gives a talk followed by a Q&A session.',
        icon: <FaMicrophone className="text-xl" />,
        components: (
            <div className="flex flex-col md:flex-row justify-between mt-3">
                <div className="flex items-center space-x-4 mb-4 md:mb-0">
                    <img src="https://avatars.githubusercontent.com/u/5403917?v=4" alt="Speaker 1" className="w-16 h-16 rounded-full" />
                    <a href='https://thesephist.com/' target='_blank' rel='noreferrer noopener' className='hover:underline hover:text-blue-500'>Linus</a>
                    <span className="text-gray-600 text-xs md:text-sm">
                        Linus is currently researching and advising on AI interpretability, interfaces, and deployment at Thrive Capital. Previously, Linus was a Research Engineer at Notion, Researcher in Residence at Betaworks, and before that a software engineer at Replit, Hack Club, and Spensa.
                    </span>
                </div>
            </div>
        )
    },
    // {
    //     time: '12:00 - 1:30 PM',
    //     title: 'Lunch',
    //     description: 'Break for lunch. Attendees are encouraged to continue discussions and brainstorming during this time.',
    //     icon: <FaUtensils className="text-xl" />,
    // },
    {
        time: '01:30 - 03:00 PM',
        title: 'Brainstorm & Prototype',
        description: 'Participants engage in brainstorming and prototyping activities focused on dynamic abstractions.',
        icon: <GrWorkshop className="text-xl" />,
        components: (
            <ul className="list-disc pl-5">
                <li>Introduction (10 min): Expected fidelity, examples, and design process</li>
                <li>Discussion (20 min): Brainstorming compelling applications and use cases</li>
                <li>Prototype (60 min): Prototype based on brainstorming session</li>
            </ul>
        )
    },
    // {
    //     time: '3:00 - 3:30 PM',
    //     title: 'Coffee Break',
    //     description: 'A short break for refreshments. Some participants may use this time for final prototype adjustments.',
    //     icon: <FaCoffee className="text-xl" />,
    // },
    {
        time: '03:30 - 05:00 PM',
        title: 'Final Session',
        description: 'Presentation of prototypes, discussion of research agendas, and closing remarks.',
        icon: <FaPaperPlane className="text-xl" />,
        components: (
            <ul className="list-disc pl-5">
                <li>Present prototypes (30 min): Groups share their reflections and challenges</li>
                <li>Research agenda discussion (30 min): Future collaborations & plans</li>
                <li>Research agenda presentations (15 min): Groups present their ideas</li>
                <li>Closing remarks (15 min): Organizers outline future plans and next steps</li>
            </ul>
        )
    },
];

const SessionItem: React.FC<SessionItemProps> = ({ time, index, title, description, icon, components }) => {
    return (
        <div className="flex mb-8 items-start">
            <div className="flex flex-col mr-4 text-right">
                <p className="text-blue-400 text-sm font-semibold">{`Session ${index + 1}`}</p>
                <p className="text-sm font-bold">{time}</p>
            </div>
            <div className="flex">
                <div className="flex flex-col items-center mr-4 relative">
                    <div className="w-8 relative z-10">
                        <div className="w-8 h-8 bg-white border border-blue-400 flex items-center justify-center rounded-full text-blue-400">{icon}</div>
                    </div>
                    {index !== sessionData.length - 1 && <div className="block flex-1 h-full border-l-2 border-blue-400 absolute top-8 left-4"></div>}
                </div>
                <div className="flex-grow" style={{ maxWidth: '600px' }}>
                    <h4 className="text-lg font-semibold">{title}</h4>
                    <p>{description}</p>
                    <div className='mb-5'>{components}</div>
                </div>
            </div>
        </div>
    );
};

const Timeline: React.FC = () => {
    return (
        <div className="py-6">
            {sessionData.map((item, index) => (
                <SessionItem
                    key={index}
                    time={item.time}
                    index={index}
                    title={item.title}
                    description={item.description}
                    icon={item.icon}
                    components={item.components}
                />
            ))}
        </div>
    );
};

const Agenda: React.FC = () => {
    return (
        <div className="border-t mt-6 py-8 max-w-4xl mx-auto px-4">
            <h2 className="text-blue-500 text-2xl font-bold">Agenda</h2>
            <Timeline />
        </div>
    );
};

export default Agenda;