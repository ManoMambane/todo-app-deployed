import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import withNavigation from './WithNavigation.jsx'	
import withParams from './withParams.jsx'

import AuthenticatedRoute from './AuthenticatedRoute.jsx'
import LoginComponent from './LoginComponent.jsx'
import HeaderComponent from './HeaderComponent.jsx'
import FooterComponent from './FooterComponent.jsx'
import LogoutComponent from './LogoutComponent.jsx'
import WelcomeComponent from './WelcomeComponent.jsx'
import ListTodosComponent from './ListTodosComponent.jsx'
import TodoComponent from './TodoComponent.jsx'


class TodoApp extends Component {
    render() {

        const LoginComponentWithNavigation = withNavigation(LoginComponent);
        const WelcomeComponentWithParams = withParams(WelcomeComponent);
        const HeaderComponentWithNavigation = withNavigation(HeaderComponent);
        const ListTodosComponentWithNavigation = withNavigation(ListTodosComponent)
        const TodoComponentWithParamsAndNavigation = withParams(withNavigation(TodoComponent));

        return (
            <div className="TodoApp">
                <Router>
                    <HeaderComponentWithNavigation />
                    <Routes>
                        <Route path="/" element={<LoginComponentWithNavigation />} />
                        <Route path="/login" element={<LoginComponentWithNavigation />} />
                        <Route path="/welcome/:name" element={
                            <AuthenticatedRoute>
                                <WelcomeComponentWithParams />
                            </AuthenticatedRoute>
                        } />
                        <Route path="/todos/:id" element={
                            <AuthenticatedRoute>
                                <TodoComponentWithParamsAndNavigation />
                            </AuthenticatedRoute>
                        } />
                        <Route path="/todos" element={
                            <AuthenticatedRoute>
                                <ListTodosComponentWithNavigation />
                            </AuthenticatedRoute>
                        } />
                        <Route path="/logout" element={
                            <AuthenticatedRoute>
                                <LogoutComponent />
                            </AuthenticatedRoute>
                        } />
                        <Route path="*" element={<ErrorComponent />} />
                    </Routes>
                </Router>
                <FooterComponent />
            </div>

        );
    }
}

function ErrorComponent() {
    return <div>An Error Ocured. I don't know what to do. Contact Mano</div>
}

export default TodoApp