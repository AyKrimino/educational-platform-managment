# Educational Platform Management

A comprehensive full-stack learning management system (LMS) inspired by Google Classroom, enabling seamless interaction between teachers and students. Built with **Django REST Framework (DRF)** and **MySQL** for the backend, and **React.js** with **TailwindCSS** for the responsive frontend.

![Platform Overview](https://raw.githubusercontent.com/AyKrimino/educational-platform-managment/main/screenshots/desktop_home_page_desktop_2.png)

## Key Features
- **Role-based access control**: Teachers create/manage classrooms; students join/participate
- **Quiz system**: Instant grading and feedback for students
- **Cross-device compatibility**: Fully responsive design (see mobile/desktop screenshots below)
- **Real-time interactions**: Posts, comments, and classroom discussions
- **JWT authentication**: Secure API endpoints with token-based auth

---

## Screenshots & Features Walkthrough

### Authentication Flow
| Desktop | Mobile |
|---------|--------|
| ![Login Desktop](https://raw.githubusercontent.com/AyKrimino/educational-platform-managment/main/screenshots/login_page_desktop.png) | ![Login Mobile](https://raw.githubusercontent.com/AyKrimino/educational-platform-managment/main/screenshots/login_page_mobile.png) |
| **Clean login interface** | **Mobile-optimized** form layout |

| Desktop | Mobile |
|---------|--------|
| ![Register Desktop](https://raw.githubusercontent.com/AyKrimino/educational-platform-managment/main/screenshots/register_page_desktop.png) | ![Register Mobile](https://raw.githubusercontent.com/AyKrimino/educational-platform-managment/main/screenshots/register_page_mobile.png) |
| **Detailed registration** with validation and role selection | **Touch-friendly** input fields |

---

### Student Experience
| View | Desktop | Mobile |
|------|---------|--------|
| **Dashboard** | ![Student Home Desktop](https://raw.githubusercontent.com/AyKrimino/educational-platform-managment/main/screenshots/student_home_page_desktop_1.png) | ![Student Home Mobile](https://raw.githubusercontent.com/AyKrimino/educational-platform-managment/main/screenshots/student_home_page_mobile_1.png) |
| **Classroom List** | ![Student Classrooms Desktop](https://raw.githubusercontent.com/AyKrimino/educational-platform-managment/main/screenshots/student_classrooms_page_desktop.png) | ![Student Classrooms Mobile](https://raw.githubusercontent.com/AyKrimino/educational-platform-managment/main/screenshots/student_classrooms_page_mobile.png) |
| **Classroom Detail** | ![Student Classroom Desktop](https://raw.githubusercontent.com/AyKrimino/educational-platform-managment/main/screenshots/student_classroom_page_desktop.png) | ![Student Classroom Mobile](https://raw.githubusercontent.com/AyKrimino/educational-platform-managment/main/screenshots/student_classroom_page_mobile.png) |
| **Account Management** | ![Student Account Desktop](https://raw.githubusercontent.com/AyKrimino/educational-platform-managment/main/screenshots/student_account_page_desktop_1.png) | ![Student Account Mobile](https://raw.githubusercontent.com/AyKrimino/educational-platform-managment/main/screenshots/student_account_page_mobile_1.png) |

---

### Teacher Experience
| View | Desktop | Mobile |
|------|---------|--------|
| **Dashboard** | ![Teacher Home Desktop](https://raw.githubusercontent.com/AyKrimino/educational-platform-managment/main/screenshots/teacher_home_page_desktop_1.png) | ![Teacher Home Mobile](https://raw.githubusercontent.com/AyKrimino/educational-platform-managment/main/screenshots/teacher_home_page_mobile_1.png) |
| **Classroom Management** | ![Teacher Classroom Desktop](https://raw.githubusercontent.com/AyKrimino/educational-platform-managment/main/screenshots/teacher_classroom_page_desktop_1.png) | ![Teacher Classroom Mobile](https://raw.githubusercontent.com/AyKrimino/educational-platform-managment/main/screenshots/teacher_classroom_page_mobile_1.png) |
| **Quiz Creation** | ![Teacher Create Desktop](https://raw.githubusercontent.com/AyKrimino/educational-platform-managment/main/screenshots/teacher_create_classroom_desktop.png) | *Mobile view available* |
| **Account Settings** | ![Teacher Account Desktop](https://raw.githubusercontent.com/AyKrimino/educational-platform-managment/main/screenshots/teacher_account_page_desktop_1.png) | ![Teacher Account Mobile](https://raw.githubusercontent.com/AyKrimino/educational-platform-managment/main/screenshots/teacher_account_page_mobile.png) |

---

## Technology Stack
### Backend (Django/DRF)
```bash
├── Django ==5.0.6
├── djangorestframework ==3.15.1
├── mysqlclient ==2.2.4
└── drf-spectacular ==0.27.2  # API documentation
```
### Frontend (React)
```bash
├── React 18
├── Vite 4
├── TailwindCSS 3
└── Axios 1.6  # API communication
```
