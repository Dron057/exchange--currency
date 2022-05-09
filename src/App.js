import "./styles/App.css";
import React from "react";
import { TextField } from "@mui/material";
import { Autocomplete } from "@mui/material";
import { Stack } from "@mui/material";
import { IconButton } from "@mui/material";
import LoopIcon from "@mui/icons-material/Loop";
import EditInput from "./input";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allCurrency: [],
      oneCurrency: [""],
      twoCurrency: [""],
    };
  }

  componentDidMount() {
    this.getCurs();
    this.getInfoCurOne = this.getInfoCurOne.bind(this);
    this.getInfoCurTwo = this.getInfoCurTwo.bind(this);
    this.CurrencyInfo = this.CurrencyInfo.bind(this);
    this.swap = this.swap.bind(this);
  }

  async getCurs() {
    try {
      const response = await fetch("https://cdn.cur.su/api/latest.json");
      const result = await response.json();
      this.setState({
        allCurrency: Object.entries(result.rates)
      });
    } catch (e) {
      console.error(e);
    }

  };

  getInfoCurOne = (value) => {
    this.setState({
      oneCurrency: value,
    });
  };

  getInfoCurTwo = (value) => {
    this.setState({
      twoCurrency: value,
    });
  };

  CurrencyInfo() {
    return (
      this.state.oneCurrency[0] === '' || this.state.twoCurrency[0] === '' ? null : (
        <Stack direction="row" spacing={2}>
          <div className="Label">
            {"1" +
              this.state.oneCurrency[0] +
              " = " +
              (this.state.twoCurrency[1] / this.state.oneCurrency[1]).toFixed(3) +
              " " +
              this.state.twoCurrency[0]}
          </div>
          <div className="Label">
            {"1" +
              this.state.twoCurrency[0] +
              " = " +
              (this.state.oneCurrency[1] / this.state.twoCurrency[1]).toFixed(3) +
              " " +
              this.state.oneCurrency[0]}
          </div>
        </Stack>
      )
    )
  }

  swap = (e) => {
    this.setState((prevState) => ({
      oneCurrency: prevState.twoCurrency,
      twoCurrency: prevState.oneCurrency,
    }));
  };

  render() {
    return (
      <div className="App">
        <div className="content">
          <Stack direction="row" spacing={2}>
            <div className="Label">У меня есть </div>
            <div className="Label">Я получу </div>
          </Stack>

          <Autocomplete
            disablePortal
            id="disable-clearable"
            disableClearable
            size="small"
            options={this.state.allCurrency}
            getOptionLabel={(item) => item[0]}
            sx={{ width: 250 }}
            value={this.state.oneCurrency}
            //isOptionEqualToValue={(option, value) => value}
            style={{ display: "inline-block", marginTop: 10, marginBottom: 10, marginRight: 15 }}
            renderInput={(params) => <TextField {...params} />}
            onChange={(event, value) => this.getInfoCurOne(value)}
          />

          <IconButton color="primary" onClick={this.swap}>
            <LoopIcon />
          </IconButton>

          <Autocomplete
            disablePortal
            id="disable-clearable"
            disableClearable
            size="small"
            options={this.state.allCurrency}
            getOptionLabel={(item) => item[0]}
            sx={{ width: 260 }}
            value={this.state.twoCurrency}
           // isOptionEqualToValue={(option, value) => option}
            style={{ display: "inline-block", marginTop: 10, marginBottom: 10, marginLeft: 15 }}
            renderInput={(params) => <TextField {...params} />}
            onChange={(event, value) => this.getInfoCurTwo(value)}
          />

          <EditInput oneCurrencyValue={this.state.oneCurrency[1]} twoCurrencyValue={this.state.twoCurrency[1]} />

          {this.CurrencyInfo()}
        </div>
      </div>
    );
  }
}

export default App;
