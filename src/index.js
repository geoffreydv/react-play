import React from 'react';
import _ from 'underscore'
import ApplicationFrame from "./Fluff";
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';


class ModelConfigurationPage extends React.Component {

    render() {
        return (
            <ApplicationFrame>
                <ModelConfigurationOverview
                    basicDataOfModels={
                        [
                            {
                                name: "Model 1",
                                availableVersions: ["1", "2"]
                            },
                            {
                                name: "GeoffreyModel",
                                availableVersions: ["1"]
                            }
                        ]
                    }
                    activeModelDetails={
                        {
                            name: "Model 1",
                            version: 2,
                            submodels: [
                                {
                                    displayName: "EAD",
                                    technicalName: "ead",
                                    scenarios: [
                                        {
                                            id: "1",
                                            name: "Scenario 1",
                                            segments: [
                                                {
                                                    name: "Segment One",
                                                    parameters: [
                                                        {
                                                            name: "Parameter One",
                                                            value: "Value Of Parameter 1"
                                                        }
                                                    ]
                                                },
                                                {
                                                    name: "Segment Two",
                                                    parameters: [
                                                        {
                                                            name: "Parameter One",
                                                            value: "Value Of Parameter 1"
                                                        }
                                                    ]
                                                },
                                                {
                                                    name: "Segment Three",
                                                    parameters: [
                                                        {
                                                            name: "Parameter One",
                                                            value: "Value Of Parameter 1"
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    displayName: "PD",
                                    technicalName: "pd",
                                    scenarios: [
                                        {
                                            id: "2",
                                            name: "Scenario 1",
                                            segments: [
                                                {
                                                    name: "Segment One",
                                                    parameters: [
                                                        {
                                                            name: "Parameter One",
                                                            value: "Value Of Parameter 1"
                                                        }
                                                    ]
                                                },
                                                {
                                                    name: "Segment Two",
                                                    parameters: [
                                                        {
                                                            name: "Parameter One",
                                                            value: "Value Of Parameter 1"
                                                        }
                                                    ]
                                                },
                                                {
                                                    name: "Segment Three",
                                                    parameters: [
                                                        {
                                                            name: "Parameter One",
                                                            value: "Value Of Parameter 1"
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    }
                    modelDropdownSelectedIndex={0}
                    modelVersionDropdownSelectedIndex={1}
                    openSubmodelCode="pd"
                    selectedScenarioId="1"
                    editMode={false}
                />
            </ApplicationFrame>
        )
    }
}

class ModelConfigurationOverview extends React.Component {
    render() {
        return (
            <div>
                <div>

                    <h1>Model Configurations</h1>

                    <ModelConfigurationOverviewActionBar
                        availableModels={this.props.basicDataOfModels}
                        selectedModelIndex={this.props.modelDropdownSelectedIndex}
                        selectedModelVersionIndex={this.props.modelVersionDropdownSelectedIndex}
                    />
                </div>

                <ModelConfigurationDetails
                    model={this.props.activeModelDetails}
                    selectedScenarioId={this.props.selectedScenarioId}
                    openSubmodelCode={this.props.openSubmodelCode}
                    editMode={this.props.editMode}
                />
            </div>
        )
    }
}

class ModelConfigurationOverviewActionBar extends React.Component {
    render() {
        return (
            <form>
                <label>Select Configuration
                    <select name="model-selection" value={this.props.selectedModelIndex}>
                        <option/>
                        {this.props.availableModels.map((model, i) => {
                            return <option key={i}
                                           value={i}>{model.name}</option>
                        })}
                    </select>
                </label>

                <label>Version
                    <select name="model-selection" value={this.props.selectedModelVersionIndex}>
                        <option value="none"/>
                        {
                            this.props.selectedModelIndex && this.props.availableModels[this.props.selectedModelIndex].availableVersions.map((version, i) => {
                                return <option
                                    key={i}
                                    value={i}
                                >{version}</option>
                            })}
                    </select>
                </label>
            </form>
        );
    }
}

class ModelConfigurationDetails extends React.Component {

    render() {
        return (
            <div>
                <h2>{this.props.model.name}</h2>

                <SubmodelNavigationTabs
                    submodels={this.props.model.submodels}
                    openSubmodelCode={this.props.openSubmodelCode}
                />

                <OverviewPanel/>

                {this.props.model.submodels.map(submodel => {
                    return <SubModelPanel
                        key={submodel.technicalName}
                        submodel={submodel}
                        selectedScenarioId={this.props.selectedScenarioId}
                        editMode={this.props.editMode}
                    />
                })}
            </div>
        );
    }

}

class SubmodelNavigationTabs extends React.Component {
    render() {
        return (
            <ul className="nav nav-tabs">
                {this.props.submodels.map(submodel => {
                    return (
                        <li key={submodel.technicalName} className="nav-item">
                            <a className={"nav-link" + (this.props.openSubmodelCode === submodel.technicalName ? " active" : "")}
                               href='#'>{submodel.displayName}</a>
                        </li>)
                })}
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
                <h3>This is the panel for submodel: "{this.props.submodel.displayName}"</h3>

                <ScenarioPanel
                    scenarios={this.props.submodel.scenarios}
                    selectedScenarioId={this.props.selectedScenarioId}
                    submodelType={this.props.submodel.technicalName}
                    editMode={this.props.editMode}
                />
            </div>
        )
    }
}

class ScenarioPanel extends React.Component {
    render() {

        const me = this;

        let segmentPanels = [];

        if (this.props.selectedScenarioId) {

            const activeScenario = _.findWhere(this.props.scenarios, {
                id: me.props.selectedScenarioId
            });

            if (activeScenario) {

                segmentPanels = activeScenario.segments.map(segment => {
                    if (me.props.submodelType === "ead") {
                        return (
                            <div>
                                <h4>{segment.name}</h4>
                                <EadParameters parameters={segment.parameters} editMode={me.props.editMode}/>
                            </div>
                        );
                    } else {
                        return <div className="alert alert-danger">Unknown submodel: {me.props.submodelType} </div>;
                    }
                })
            }
        }

        return (
            <div>
                <form>
                    <label>Select Scenario
                        <select value={this.props.selectedScenarioId} name="scenario-selection">
                            <option value="none"/>
                            {
                                this.props.scenarios.map(scenario => {
                                    return <option
                                        key={scenario.id}
                                        value={scenario.id}>{scenario.name}</option>
                                })
                            }
                        </select>
                    </label>
                </form>

                {segmentPanels}

            </div>
        )
    }
}

class EadParameters extends React.Component {
    render() {
        return (
            <table className="table">
                <tbody>
                <tr>
                    <td>Parameter One</td>
                    <td>{this.props.editMode ? (
                        <input type="text"/>
                    ) : (
                        <span>Not editing</span>
                    )}</td>
                </tr>

                <tr>
                    <td>Parameter Two</td>
                    <td>Value Two</td>
                </tr>
                </tbody>
            </table>
        );
    }
}

// ========================================


ReactDOM.render(
    <ModelConfigurationPage/>,
    document.getElementById('root')
);