import React from 'react';

class NavBar extends React.Component {
    render() {
        return (
            <nav className="navbar navbar-expand-sm bg-light">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <button className="nav-link">Link 1</button>
                    </li>
                    <li className="nav-item">
                        <button className="nav-link">Link 2</button>
                    </li>
                    <li className="nav-item">
                        <button className="nav-link">Link 3</button>
                    </li>
                </ul>

            </nav>
        )
    }
}

class ApplicationFrame extends React.Component {
    render() {
        return (
            <div>
                <NavBar/>

                <div className="container">
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default ApplicationFrame