import { ICourseData } from '@/lib/mockcourses/CourseMock'
import { CheckCircle, Circle, CircleAlert, Clock, Info } from 'lucide-react';
import React, { JSX } from 'react'

type CourseProps = {
    course: ICourseData;
}

export const InformationPanel = ({ course }: CourseProps) => {

    const statusStyles: Record<string, string> = {
        inProgress:
            "bg-green-100 shadow-lg shadow-green-500/25 text-green-800 rounded-full px-2 py-1",
        soon: "bg-yellow-100 shadow-lg shadow-yellow-500/25 text-yellow-800 rounded-lg px-2 py-1",
        pending:
            "bg-blue-100 shadow-lg shadow-blue-500/25 text-blue-800 rounded-tr-lg rounded-bl-lg px-2 py-1",
    };

    const statusIcons: Record<string, JSX.Element> = {
        inProgress: <Circle size={12} className="text-green-500 mr-1" />,
        soon: <Clock size={12} className="text-yellow-500 mr-1" />,
        pending: <CheckCircle size={12} className="text-blue-500 mr-1" />,
    };

    const statusLabel: Record<string, string> = {
        inProgress: "In progress",
        soon: "Coming soon",
        pending: "Open registrations",
    };


    const informationLabel: Record<string, React.ReactNode> = {
        pending: (
            <div className='my-4 text-md text-justify '>
                <p className=' font-normal text-center mb-5'>
                    This course is currently in the pre-enrolment phase. We’re organizing new groups and confirming the final schedule based on student interest and availability. <Info className="inline mb-2 ml-0.5 text-gray-500" size={13} />
                </p>
                <p className='mb-3'>
                    The information you provide is used solely to manage your pre-registration, help us schedule your start date, and place you in the group that best matches your level and goals.
                </p>
                <p className='mb-3'>
                    y completing this form, you’ll secure priority access once the group is confirmed and receive all details (start date, timetable, and format) directly from our academic team within 24 hours.
                </p>
                <p className='mb-3'>
                    There’s<strong> no payment or commitment at this stage</strong>. This pre-registration simply helps us match your profile with other learners and open the group that best fits your level and preferences.
                </p>
                <p className='mb-3'>
                    At Costa Spanish Academy, we value your trust and are committed to providing a serious, transparent, and personalized learning environment.
                </p>
                <p className='font-semibold text-center mb-3 mt-10'>
                    Start your Spanish journey today <br />Your place is waiting!
                </p>
            </div>
        ),

        soon: (
            <div className='my-4 text-md text-justify'>
                <p className='font-normal text-center mb-5'>
                    This course will be available very soon.
                    You can <strong>pre-register</strong> now to get priority access.<Info className="inline mb-2 ml-0.5 text-gray-500" size={13} />
                </p>
                <p className='mb-3'>
                    The information you provide is used solely to manage your pre-registration, help us schedule your start date, and place you in the group that best matches your level and goals.
                </p>

                <p className='mb-3'>
                    Submitting this form does not involve <strong> any payment or financial commitment</strong>. Our team will personally reach out to you <strong>within 24 hours</strong> to explain the next steps and answer any questions you may have.
                </p>
                <p className='mb-3'>
                    At Costa Spanish Academy, we value your trust and are committed to providing a serious, transparent, and personalized learning environment.
                </p>
                <p className='font-semibold text-center mb-3 mt-10'>
                    Get ahead and join our priority list of future students!
                </p>

            </div>
        ),

        inProgress: (
            <div className='my-4 text-md text-justify '>
                <p className='font-normal text-center mb-5'>
                    This course is already in progress, but you can still <strong>check availability or pre-book </strong>your spot for the next session. <Info className="inline mb-2 ml-0.5 text-gray-500" size={13} />
                </p>
                <p className='mb-3'>
                    The information you provide is used solely to manage your pre-registration, help us schedule your start date, and place you in the group that best matches your level and goals.
                </p>

                <p className='mb-3'>
                    Submitting this form does not involve <strong> any payment or financial commitment</strong>. Our team will personally reach out to you <strong>within 24 hours</strong> to explain the next steps and answer any questions you may have.
                </p>
                <p className='mb-3'>
                    At Costa Spanish Academy, we value your trust and are committed to providing a serious, transparent, and personalized learning environment.
                </p>
                <p className='font-semibold text-center mb-3 mt-10'>
                    Start learning Spanish your way — we’ll make it easy for you.
                </p>
            </div>
        ),
        private: (
            <div className='my-4 text-md text-justify'>
                <p className='font-normal text-center mb-5'>
                    You can start anytime — no need to join an ongoing group. We’ll tailor the schedule to your availability.<Info className="inline mb-2 ml-0.5 text-gray-500" size={13} />
                </p>
                <p className='mb-3'>
                    The information you provide is used solely to manage your pre-registration, help us schedule your start date, and place you in the group that best matches your level and goals.
                </p>

                <p className='mb-3'>
                    Submitting this form does not involve <strong> any payment or financial commitment</strong>. Our team will personally reach out to you <strong>within 24 hours</strong> to explain the next steps and answer any questions you may have.
                </p>
                <p className='mb-3'>
                    At Costa Spanish Academy, we value your trust and are committed to providing a serious, transparent, and personalized learning environment.
                </p>
                <p className='font-semibold text-center mb-3 mt-10'>
                    Start learning Spanish your way — we’ll make it easy for you.
                </p>
            </div>
        ),
    };


    return (
        <div className='bg-white rounded-md shadow-md p-4 flex flex-col m-3 xl:m-1'>
            <h1 className='text-xl font-semibold capitalize w-full text-center mb-2'>{course.title}</h1>
            <div className='w-full flex justify-center mb-2'>
                {course.status && (
                    <span
                        className={`h-fit flex items-center text-xs font-semibold w-fit ${statusStyles[course.status]}`}
                    >
                        {statusIcons[course.status]}
                        {statusLabel[course.status]}
                    </span>
                )}
            </div>
            {informationLabel[course.status ?? "pending"]}
            <div className='mt-auto mb-5'>
                <p className='text-sm font-light text-center'>
                    <span className='inline-block'>For more information contact us via:</span>
                    <span className='inline-block'>Whatsapp: +34 604 80 92 08</span>
                    <span className='inline-block'>Email: info@costaspanishclass.com</span>
                </p>
                <p className='text-sm font-light text-center flex items-start gap-2 mt-3'>
                    We will never share your data with third parties or use it for marketing purposes. It will only be used to contact you directly, confirm course details, and ensure you have the best possible learning experience.
                </p>
            </div>
        </div>
    )
}
