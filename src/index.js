import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

class ApplicationFrame extends React.Component {
    render() {
        return (
            <div>
                <NavBar/>

                <div className="container">
                    <ModelConfigurationOverview/>
                </div>
            </div>
        )
    }
}

class NavBar extends React.Component {
    render() {
        return (
            <nav className="navbar navbar-expand-sm bg-light">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link" href="#">Link 1</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Link 2</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Link 3</a>
                    </li>
                </ul>

            </nav>
        )
    }
}

class ModelConfigurationOverview extends React.Component {
    render() {
        return (
            <div>
                <div>
                    <h1>Model Configurations</h1>
                    <ModelConfigurationOverviewActionBar/>
                </div>

                <ModelConfigurationViewer/>
            </div>
        )
    }
}

class ModelConfigurationOverviewActionBar extends React.Component {
    render() {
        return (
            <form>
                <label>Select Configuration
                    <select name="model-selection">
                        <option value="none"/>
                        <option value="opt-1">A Model Config</option>
                    </select>
                </label>

                <label>Version
                    <select name="model-selection">
                        <option value="none"/>
                        <option value="version1">V1</option>
                        <option value="version2">V2</option>
                    </select>
                </label>
            </form>
        );
    }
}

class ModelConfigurationViewer extends React.Component {

    render() {
        return (
            <div>
                <h2>This is the selected model</h2>

                <SubmodelNavigationTabs/>

                <OverviewPanel/>
                <SubModelPanel/>
                <SubModelPanel/>
                <SubModelPanel/>
            </div>
        );
    }

}

class SubmodelNavigationTabs extends React.Component {
    render() {
        return (
            <ul className="nav nav-tabs">
                <li className="nav-item">
                    <a className="nav-link active" href="#">EAD</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">PD</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">LGD</a>
                </li>
            </ul>
        )
    }
}

class OverviewPanel extends React.Component {
    render() {
        return (
            <div>
                <h3>This is the overview panel</h3>
            </div>
        )
    }
}

class SubModelPanel extends React.Component {
    render() {
        return (
            <div>
                <h3>This is the panel for submodel: "EAD"</h3>

                <ScenarioPanel/>
            </div>
        )
    }
}

class ScenarioPanel extends React.Component {
    render() {
        return (
            <div>
                <form>
                    <label>Select Scenario
                        <select name="scenario-selection">
                            <option value="none"/>
                            <option value="opt-1">Scenario 1</option>
                        </select>
                    </label>
                </form>

                <SpecificSubmodelConfigurations />
            </div>
        )
    }
}

class SpecificSubmodelConfigurations extends React.Component {
    render() {
        return (
            <table className="table">
                <tr>
                    <td>Parameter One</td>
                    <td>Value One</td>
                </tr>

                <tr>
                    <td>Parameter Two</td>
                    <td>Value Two</td>
                </tr>
            </table>
        );
    }
}

// ========================================


ReactDOM.render(
    <ApplicationFrame/>,
    document.getElementById('root')
);