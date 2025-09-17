import { CourseCard } from "../../components"
import intensiveGroup from '../../../assets/intensiveGroup.png'
import oneToOne from '../../../assets/onetoone.png'

export const CoursesSection = () => {
    return (
        <div id="courses" style={{ background: 'white' }}>
            <div className="container py-5">
                <p className="text-4xl font-extrabold mb-0">Classes</p>
                <p className="text-lg font-light">Spanish for foreign (ELE)</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-5">
                    <div className="flex justify-center">
                        <CourseCard
                            typeCard='firstType'
                            titleCard="Intensive Course"
                            maxPers="8 pers. max."
                            time="8h/week"
                            desc="Lorem Ipsuns simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
                            img={intensiveGroup}
                            moreInfo=''
                        />
                    </div>
                    <div className="flex justify-center">
                        <CourseCard
                            typeCard='secondType'
                            titleCard="One to One"
                            maxPers="1 per. (3 max.)"
                            time="1h"
                            desc="Lorem Ipsuns simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
                            img={oneToOne}
                        />
                    </div>
                    <div className="flex justify-center">
                        <CourseCard
                            typeCard='firstType'
                            titleCard="Semi-intensive Course"
                            maxPers="8 pers. max."
                            time="4.5h/week"
                            desc="Lorem Ipsuns simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
                            img={intensiveGroup}
                        />
                    </div>
                </div>
                <p className="text-lg font-light">English for Spanish</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    <div className="flex justify-center">
                        <CourseCard
                            typeCard='firstType'
                            titleCard="Intensive Course"
                            maxPers="8 pers. max."
                            time="8h/week"
                            desc="Lorem Ipsuns simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
                            img={intensiveGroup}
                        />
                    </div>
                    <div className="flex justify-center">
                        <CourseCard
                            typeCard='secondType'
                            titleCard="One to One"
                            maxPers="1 per. (3 max.)"
                            time="1h"
                            desc="Lorem Ipsuns simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
                            img={oneToOne}
                        />
                    </div>
                    <div className="flex justify-center">
                        <CourseCard
                            typeCard='firstType'
                            titleCard="Semi-intensive Course"
                            maxPers="8 pers. max."
                            time="4.5h/week"
                            desc="Lorem Ipsuns simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
                            img={intensiveGroup}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
