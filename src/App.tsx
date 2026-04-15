import { lazy } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { ThemeProvider } from './contexts/ThemeContext'
import { ProgressProvider } from './contexts/ProgressContext'
import { BadgeProvider } from './contexts/BadgeContext'
import PublicLayout from './components/PublicLayout'
import ProtectedRoute from './components/ProtectedRoute'
import AdminGuard from './components/AdminGuard'

// Pages
const Home = lazy(() => import('./pages/Home'))
const Login = lazy(() => import('./pages/Login'))
const Register = lazy(() => import('./pages/Register'))
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'))
const Profile = lazy(() => import('./pages/Profile'))
const NotFound = lazy(() => import('./pages/NotFound'))
const Playground = lazy(() => import('./pages/Playground'))
// Projects
const ProjectsHome = lazy(() => import('./pages/projects/ProjectsHome'))
const CafeSales = lazy(() => import('./pages/projects/CafeSales'))
const StudentScores = lazy(() => import('./pages/projects/StudentScores'))
const SurveyDashboard = lazy(() => import('./pages/projects/SurveyDashboard'))
const WeatherPattern = lazy(() => import('./pages/projects/WeatherPattern'))
const ProductReview = lazy(() => import('./pages/projects/ProductReview'))
const HRAnalytics = lazy(() => import('./pages/projects/HRAnalytics'))
const References = lazy(() => import('./pages/References'))

// AICE Associate
const AICEHome = lazy(() => import('./pages/aice/AICEHome'))
const AICEClassification = lazy(() => import('./pages/aice/AICEClassification'))
const AICERegression = lazy(() => import('./pages/aice/AICERegression'))

// Intro
const WhatIsDataAnalysis = lazy(() => import('./pages/intro/WhatIsDataAnalysis'))
const PythonBasics = lazy(() => import('./pages/intro/PythonBasics'))
const PandasIntro = lazy(() => import('./pages/intro/PandasIntro'))
const ChatGPT = lazy(() => import('./pages/intro/ChatGPT'))
const DataTypes = lazy(() => import('./pages/intro/DataTypes'))
const ChartTypes = lazy(() => import('./pages/intro/ChartTypes'))
const BasicStats = lazy(() => import('./pages/intro/BasicStats'))

// Learn
const Preprocessing = lazy(() => import('./pages/learn/Preprocessing'))
const EDA = lazy(() => import('./pages/learn/EDA'))
const Statistics = lazy(() => import('./pages/learn/Statistics'))
const Visualization = lazy(() => import('./pages/learn/Visualization'))
const Classification = lazy(() => import('./pages/learn/Classification'))
const Regression = lazy(() => import('./pages/learn/Regression'))

// Practice
const Sales = lazy(() => import('./pages/practice/Sales'))
const Customer = lazy(() => import('./pages/practice/Customer'))
const Survey = lazy(() => import('./pages/practice/Survey'))
const TimeSeries = lazy(() => import('./pages/practice/TimeSeries'))
const Report = lazy(() => import('./pages/practice/Report'))

// Tips
const TipsHome = lazy(() => import('./pages/tips/TipsHome'))
const TipsChatGPT = lazy(() => import('./pages/tips/TipsChatGPT'))
const TipsPython = lazy(() => import('./pages/tips/TipsPython'))
const TipsPandas = lazy(() => import('./pages/tips/TipsPandas'))
const TipsVisualization = lazy(() => import('./pages/tips/TipsVisualization'))
const TipsAutomation = lazy(() => import('./pages/tips/TipsAutomation'))

// Lectures
const LecturesHome = lazy(() => import('./pages/lectures/LecturesHome'))
const LectureWrite = lazy(() => import('./pages/lectures/LectureWrite'))

// Workbook
const WorkbookHome = lazy(() => import('./pages/workbook/WorkbookHome'))

// Community
const CommunityList = lazy(() => import('./pages/community/CommunityList'))
const CommunityWrite = lazy(() => import('./pages/community/CommunityWrite'))
const CommunityView = lazy(() => import('./pages/community/CommunityView'))

// Quiz & Badge
const QuizHome = lazy(() => import('./pages/quiz/QuizHome'))
const QuizDetail = lazy(() => import('./pages/quiz/QuizDetail'))
const BadgeCollection = lazy(() => import('./pages/BadgeCollection'))
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'))

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <ProgressProvider>
            <BadgeProvider>
              <Routes>
                <Route element={<PublicLayout />}>
                  <Route index element={<Home />} />
                  <Route path="login" element={<Login />} />
                  <Route path="register" element={<Register />} />
                  <Route path="forgot-password" element={<ForgotPassword />} />
                  <Route path="profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

                  {/* Intro */}
                  <Route path="intro/what-is-data-analysis" element={<WhatIsDataAnalysis />} />
                  <Route path="intro/python-basics" element={<PythonBasics />} />
                  <Route path="intro/pandas-intro" element={<PandasIntro />} />
                  <Route path="intro/chatgpt" element={<ChatGPT />} />
                  <Route path="intro/data-types" element={<DataTypes />} />
                  <Route path="intro/chart-types" element={<ChartTypes />} />
                  <Route path="intro/basic-stats" element={<BasicStats />} />

                  {/* Learn */}
                  <Route path="learn/preprocessing" element={<Preprocessing />} />
                  <Route path="learn/eda" element={<EDA />} />
                  <Route path="learn/statistics" element={<Statistics />} />
                  <Route path="learn/visualization" element={<Visualization />} />
                  <Route path="learn/classification" element={<Classification />} />
                  <Route path="learn/regression" element={<Regression />} />

                  {/* Practice */}
                  <Route path="practice/sales" element={<Sales />} />
                  <Route path="practice/customer" element={<Customer />} />
                  <Route path="practice/survey" element={<Survey />} />
                  <Route path="practice/timeseries" element={<TimeSeries />} />
                  <Route path="practice/report" element={<Report />} />

                  {/* Tips */}
                  <Route path="tips" element={<TipsHome />} />
                  <Route path="tips/chatgpt" element={<TipsChatGPT />} />
                  <Route path="tips/python" element={<TipsPython />} />
                  <Route path="tips/pandas" element={<TipsPandas />} />
                  <Route path="tips/visualization" element={<TipsVisualization />} />
                  <Route path="tips/automation" element={<TipsAutomation />} />

                  {/* Lectures */}
                  <Route path="lectures" element={<LecturesHome />} />
                  <Route path="lectures/write" element={<ProtectedRoute><LectureWrite /></ProtectedRoute>} />

                  {/* Workbook */}
                  <Route path="workbooks" element={<WorkbookHome />} />

                  {/* Community */}
                  <Route path="community" element={<CommunityList />} />
                  <Route path="community/write" element={<ProtectedRoute><CommunityWrite /></ProtectedRoute>} />
                  <Route path="community/:id" element={<CommunityView />} />

                  {/* Quiz & Badge */}
                  <Route path="quiz" element={<QuizHome />} />
                  <Route path="quiz/:quizId" element={<QuizDetail />} />
                  <Route path="badges" element={<BadgeCollection />} />

                  {/* Projects */}
                  <Route path="projects" element={<ProjectsHome />} />
                  <Route path="projects/cafe-sales" element={<CafeSales />} />
                  <Route path="projects/student-scores" element={<StudentScores />} />
                  <Route path="projects/survey-dashboard" element={<SurveyDashboard />} />
                  <Route path="projects/weather-pattern" element={<WeatherPattern />} />
                  <Route path="projects/product-review" element={<ProductReview />} />
                  <Route path="projects/hr-analytics" element={<HRAnalytics />} />

                  {/* AICE Associate */}
                  <Route path="aice" element={<AICEHome />} />
                  <Route path="aice/classification" element={<AICEClassification />} />
                  <Route path="aice/regression" element={<AICERegression />} />

                  {/* Utility */}
                  <Route path="playground" element={<Playground />} />
                  <Route path="references" element={<References />} />

                  <Route path="admin" element={<AdminGuard><AdminDashboard /></AdminGuard>} />
                  <Route path="*" element={<NotFound />} />
                </Route>
              </Routes>
            </BadgeProvider>
          </ProgressProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}
