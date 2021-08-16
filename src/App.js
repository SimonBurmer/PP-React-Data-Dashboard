import React, { Component } from "react"; // default
import MyResponsiveLine from './components/nivo';
import mydata from './components/default_data';

const borderColors = [
  'rgb(255, 99, 132)',
  'rgb(255, 159, 64)',
  'rgb(255, 205, 86)',
  'rgb(75, 192, 192)',
  'rgb(54, 162, 235)',
  'rgb(153, 102, 255)',
  'rgb(201, 203, 207)'
];

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}


// default
class App extends Component {
  // App Code
  //------------------------------
  constructor() {
    super();
    this.initialState = {
      data: mydata,
      countryname: '',
    };

    mydata[0].data.map(function (object, i) { this.initialState[object.x] = '' }, this);
    this.state = this.initialState;
    this.AddActive = 'active';
    this.ChangeActive = '';
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
    console.log(this.state);
  }

  handleSelectChange = (event) => {
    const { name, value } = event.target;

    for (var i = 0; i < this.state.data.length; i++) {
      if (this.state.data[i].id === value) {
        break;
      }
    }

    mydata[0].data.map(function (object, index) { this.state[object.x] = this.state.data[i].data[index].y }, this);
    this.state.countryname = value;
    this.setState(this.state);
  }

  handleAddData = (event) => {
    event.preventDefault(); // important!!
    const array = [];
    this.state.data[1].data.map(function (object) { array.push({ "x": object.x, "y": this.state[object.x] }) }, this);
    console.log(array);
    console.log("sdg");

    this.state.data.push({
      "id": this.state.countryname,
      "color": borderColors[getRndInteger(0, borderColors.length)],
      "data": array
    });
    this.state.countryname = '';
    mydata[0].data.map(function (object) { this.state[object.x] = '0' }, this);
    this.setState(this.state);
  }

  handleChangeData = (event) => {
    event.preventDefault();// important!!
    const array = [];
    this.state.data[1].data.map(function (object) { array.push({ "x": object.x, "y": this.state[object.x] }) }, this);
    
    for (var i = 0; i < this.state.data.length; i++) {
      if (this.state.data[i].id === this.state.countryname) {
        break;
      }
    }
    console.log(this.state);
    this.state.data[i].data = array;
    console.log(this.state);
    this.setState(this.state);
  }

  handleAddClick = () => {
    this.AddActive = "active";
    this.ChangeActive = "";
    this.state.countryname = "";
    mydata[0].data.map(function (object) { this.state[object.x] = '' }, this);
    this.setState(this.state);
  }

  handleChangeClick = () => {
    this.AddActive = "";
    this.ChangeActive = "active";
    this.state.countryname = "japan";
    mydata[0].data.map(function (object, index) { this.state[object.x] = this.state.data[0].data[index].y }, this);
    this.setState(this.state);
  }
  //------------------------------

  // default
  render() {
    let Form;
    if (this.AddActive === 'active') {
      Form = <div>
        <form onSubmit={this.handleAddData}>
          <div className="form-group row">
            <label htmlFor="Countryname" className="col-3 col-form-label">Country:</label>
            <div className="col-9">
              <input className="form-control" id="Countryname" placeholder="name" name="countryname" value={this.state.countryname} onChange={this.handleChange} />
            </div>
          </div>
          <table className="table text-center">
            <thead>
              <tr>
                <th scope="col">Count</th>
                <th scope="col">Transportation</th>
              </tr>
            </thead>
            <tbody>

              {this.state.data[1].data.map(function (object, i) {
                return <tr key={i}>
                  <td>
                    <input
                      className="form-control"
                      size="4"
                      type="text"
                      name={object.x}
                      placeholder="0"
                      value={this.state[object.x]}
                      onChange={this.handleChange} />
                  </td>
                  <td>
                    <input
                      className="form-control"
                      size="10"
                      type="text"
                      name="new_form_data"
                      value={object.x}
                      onChange={function () { }} />
                  </td>
                </tr>;
              }, this)}

            </tbody>
          </table>
          <button type="submit" className="btn btn-primary">Add to Graph</button>
        </form>
      </div>;

    } else {
      Form = <div>
        <form onSubmit={this.handleChangeData}>
          <div className="form-group row">
            <label htmlFor="Countryname" className="col-3 col-form-label">Country:</label>
            <div className="col-9">
              <select className="form-select" id="Countryname" name="countryname" value={this.state.countryname} onChange={this.handleSelectChange}>
                {this.state.data.map(function (object, i) {
                  return <option key={i} value={object.id}> {object.id}</option>;
                }, this)}
              </select>
            </div>
          </div>
          <table className="table text-center">
            <thead>
              <tr>
                <th scope="col">Count</th>
                <th scope="col">Transportation</th>
              </tr>
            </thead>
            <tbody>

              {this.state.data[1].data.map(function (object, i) {
                return <tr key={i}>
                  <td>
                    <input
                      className="form-control"
                      size="4"
                      type="text"
                      name={object.x}
                      value={this.state[object.x]}
                      onChange={this.handleChange} />
                  </td>
                  <td>
                    <input
                      className="form-control"
                      size="10"
                      type="text"
                      name="new_form_data"
                      value={object.x}
                      onChange={function () { }} />
                  </td>
                </tr>;
              }, this)}

            </tbody>
          </table>
          <button type="submit" className="btn btn-primary">Update</button>
        </form>
      </div>;
    }

    return (
      // App Code
      //------------------------------
      <div> {/* return beginnt immer mit div!*/}
        <header>
          <div className="navbar navbar-dark bg-dark box-shadow">
            <div className="container d-flex justify-content-between">
              <a href="#" className="navbar-brand d-flex align-items-center">
                <i className="bi bi-clipboard-data"></i>
                <span className="m-1">Data Visualiser</span>
              </a>
            </div>
          </div>
        </header>

        <main role="main">
          <section className="jumbotron">
            <div className="container" style={{ height: '50vh' }}>
              <MyResponsiveLine data={this.state.data} />
            </div>
            <div className="row mt-4">
              <div className="col-4"> </div>
              <div className="col-4">
                <div className="text-center">
                  <div className="card text-center">
                    <div className="card-header">
                      <ul className="nav nav-tabs card-header-tabs">
                        <li className="nav-item">
                          <a className={"nav-link " + this.AddActive} onClick={this.handleAddClick}>Add Data</a>
                        </li>
                        <li className="nav-item">
                          <a className={"nav-link " + this.ChangeActive} onClick={this.handleChangeClick}>Change Data</a>
                        </li>
                      </ul>
                    </div>
                    <div className="card-body">
                      {Form}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
      //------------------------------
    );
  }
}
// default
export default App;
