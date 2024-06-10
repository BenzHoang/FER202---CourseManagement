import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/course.css';
import { toast } from 'react-toastify';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const initialCourseState = {
    id: '',
    title: '',
    desc: '',
    number_of_week: '',
    image: '',
    start_date: '',
    active: false
};

const URL = 'https://66604f675425580055b345d8.mockapi.io/course';

const CRUDCourse = () => {
    const [courses, setCourses] = useState([]);
    const [course, setCourse] = useState(initialCourseState);
    const [isEditing, setIsEditing] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);   

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            const response = await axios.get(URL);
            setCourses(response.data);
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCourse({ ...course, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isEditing) {
            try {
                await axios.put(`${URL}/${course.id}`, course);
                fetchCourses();
            } catch (error) {
                toast.error('Error updating course');
            }
        } else {
            try {
                await axios.post(URL, course);
                fetchCourses();
            } catch (error) {
                toast.error('Error adding course');
            }
        }
        closeModal();
    };

    const handleEdit = (courseToEdit) => {
        setCourse(courseToEdit);
        setIsEditing(true);
        setIsModalOpen(true);
    };

    const [open, setOpen] = React.useState(false);

    const handleDelete = async (id) => {
        const res = await axios.delete(`${URL}/${id}`);
        if (res.status === 200) {
            fetchCourses();
            toast.success("Deleted Successfully");
        } else {
            toast.error("Delete: Error!");
        }
        handleClose();
    }

    const handleClickOpen = (id) => {
        setOpen(true);
        setCourse(id);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const openModal = () => {
        setCourse(initialCourseState);
        setIsEditing(false);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setCourse(initialCourseState);
        setIsEditing(false);
    };

    return (
        <div className="crud-course-container">
            <h2>CRUD Course</h2>
            <button onClick={openModal} className="btn add-btn">Add New Course</button>
            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close-btn" onClick={closeModal}>&times;</span>
                        <form onSubmit={handleSubmit} className="course-form">
                            <div className="form-group">
                                <label>Title:</label>
                                <input type="text" name="title" value={course.title} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label>Description:</label>
                                <textarea name="desc" value={course.desc} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label>Number of Weeks:</label>
                                <input type="number" name="number_of_week" value={course.number_of_week} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label>Image URL:</label>
                                <input type="text" name="image" value={course.image} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label>Start Date:</label>
                                <input type="text" name="start_date" value={course.Start_date} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label>Active:</label>
                                <input type="checkbox" name="active" checked={course.active} onChange={(e) => setCourse({ ...course, active: e.target.checked })} />
                            </div>
                            <button type="submit" className="btn add-btn">{isEditing ? 'Update Course' : 'Add Course'}</button>
                        </form>
                    </div>
                </div>
            )}
            <h2>Courses List</h2>
            <table className="courses-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Number of Weeks</th>
                        <th>Image</th>
                        <th>Start Date</th>
                        <th>Active</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {courses.map((course) => (
                        <tr key={course.id}>
                            <td>{course.id}</td>
                            <td>{course.title}</td>
                            <td>{course.desc}</td>
                            <td>{course.number_of_week}</td>
                            <td><img src={course.image} alt={course.title} className="course-image" /></td>
                            <td>{course.Start_date}</td>
                            <td>{String(course.active)}</td>
                            <td>
                                <button onClick={() => handleEdit(course)} className="btn edit-btn">Edit</button>
                                <button onClick={() => handleClickOpen(course.id)} className="btn delete-btn">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Do you want to delete Course?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure that you want to delete a course with ID: {course}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>No</Button>
                    <Button onClick={() => handleDelete(course)} autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default CRUDCourse;