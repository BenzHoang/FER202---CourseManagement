import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../styles/home.css";

const Home = () => {

    const [courses, setCourses] = useState([]);
    const [courseDetail, setCourseDetail] = useState(null);


    const getListCourse = async () => {
        const res = await axios.get("https://66604f675425580055b345d8.mockapi.io/course");
        if (res.status === 200) {
            setCourses(res.data);
        }
    }

    useEffect(() => {
        getListCourse();
    }, []);


    const handleView = (courses) => {
        setCourseDetail(courses);
    }

    const handleClose = () => {
        setCourseDetail(null);
    }


    return (
        <div className="container">
            {courses && courses.map((courses) => (
                <div className="card" key={courses.id}>
                    <img src={courses.image} alt={courses.id} />
                    <h3>{courses.title}</h3>
                    <button onClick={() => handleView(courses)}>View Details</button>
                </div>
            ))}

            {courseDetail && (
                <div className="popup">
                    <div className="popup-content">
                        <div>
                            <span className='close' onClick={handleClose}>
                                &times;
                            </span>
                            <img src={courseDetail.image} alt={courseDetail.id} />
                            <h2>ID: {courseDetail.id}</h2>
                            <p>Title: {courseDetail.title}</p>
                            <p>Desc: {courseDetail.desc}</p>
                            <p>Number of week: {courseDetail.number_of_week}</p>
                            <p>Start date: {courseDetail.Start_date}</p>
                            <p>Active: {String(courseDetail.active)}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );

};

export default Home;