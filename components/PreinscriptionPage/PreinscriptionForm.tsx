import { ICourseData } from '@/lib/mockcourses/CourseMock';
import React from 'react'

type CourseProp = {
    course: ICourseData;
}

export const PreinscriptionForm = ({ course }: CourseProp) => {
    return (
        <div className='col-span-2 mx-3 m-3 xl:m-1'>
            <form className="space-y-6 bg-white p-6 rounded-md shadow-md text-gray-800">
                {/* 1. Personal information */}
                <div>
                    <h2 className="text-lg font-semibold mb-2">Personal information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Full name</label>
                            <input type="text" name="name" required className="w-full border p-2 rounded-md" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Email</label>
                            <input type="email" name="email" required className="w-full border p-2 rounded-md" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Phone (with country code)</label>
                            <input type="tel" name="phone" className="w-full border p-2 rounded-md" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Country of residence</label>
                            <input type="text" name="country" className="w-full border p-2 rounded-md" />
                        </div>
                    </div>
                </div>

                {/* 2. Course & level info */}
                <div>
                    <h2 className="text-lg font-semibold mb-2">Course preferences</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Selected course</label>
                            <input
                                type="text"
                                name="course"
                                value={course.title}
                                readOnly
                                className="w-full border p-2 rounded-md bg-gray-50"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Spanish level</label>
                            <select name="level" className="w-full border p-2 rounded-md">
                                <option value="">Select your level</option>
                                <option value="A1">A1 – Beginner</option>
                                <option value="A2">A2 – Elementary</option>
                                <option value="B1">B1 – Intermediate</option>
                                <option value="B2">B2 – Upper Intermediate</option>
                                <option value="C1">C1 – Advanced</option>
                                <option value="C2">C2 – Proficient</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Preferred class type</label>
                            <select name="classType" className="w-full border p-2 rounded-md">
                                <option value="">Select an option</option>
                                <option value="group">Group lessons</option>
                                <option value="private">Private lessons</option>
                                <option value="intensive">Intensive course</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Availability</label>
                            <select name="availability" className="w-full border p-2 rounded-md">
                                <option value="">Select your availability</option>
                                <option value="morning">Morning (9:00–12:00)</option>
                                <option value="afternoon">Afternoon (12:00–17:00)</option>
                                <option value="evening">Evening (17:00–21:00)</option>
                                <option value="flexible">Flexible schedule</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* 3. Background & goals */}
                <div>
                    <h2 className="text-lg font-semibold mb-2">Learning background</h2>
                    <div className="space-y-3">
                        <div>
                            <label className="block text-sm font-medium mb-1">How long have you studied Spanish?</label>
                            <select name="experience" className="w-full border p-2 rounded-md">
                                <option value="">Select one</option>
                                <option value="none">I’m a complete beginner</option>
                                <option value="lessThan1">Less than 1 year</option>
                                <option value="1to3">1–3 years</option>
                                <option value="moreThan3">More than 3 years</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Have you studied Spanish in a classroom before?</label>
                            <select name="previousCourses" className="w-full border p-2 rounded-md">
                                <option value="no">No</option>
                                <option value="yes">Yes</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                What are your main goals for learning Spanish?
                            </label>
                            <textarea
                                name="goals"
                                placeholder="E.g. travel, work, study abroad, conversation, DELE exam..."
                                className="w-full border p-2 rounded-md h-24"
                            />
                        </div>
                    </div>
                </div>

                {/* 4. Additional info */}
                <div>
                    <h2 className="text-lg font-semibold mb-2">Additional information</h2>
                    <textarea
                        name="notes"
                        placeholder="Tell us anything that could help us adapt the course to you (learning style, specific needs, schedule restrictions...)"
                        className="w-full border p-2 rounded-md h-24"
                    />
                </div>

                {/* Consent */}
                <div className="flex items-start gap-2 text-sm text-gray-600">
                    <input type="checkbox" name="privacy" required className="mt-[3px]" />
                    <label>
                        I agree to the processing of my data in accordance with the academy’s privacy policy and understand
                        that this form does not imply any payment or financial commitment.
                    </label>
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    className="w-full bg-primary text-white font-medium py-2 rounded-md hover:bg-primary/90 transition"
                >
                    Send pre-registration
                </button>
            </form>

        </div>
    )
}
