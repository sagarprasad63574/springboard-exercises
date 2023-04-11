import React from "react";
import axios from "axios";
import Joke from "./Joke";
import "./JokeList.css";

class JokeList extends React.Component {
  static defaultProps = {
    numJokesToGet: 10
  };

  constructor() {
    super();
    this.state = { jokes: [] };

    this.generateNewJokes = this.generateNewJokes.bind(this);
    this.vote = this.vote.bind(this);
  }

  componentDidUpdate() {
    if (this.state.jokes.length < this.props.numJokesToGet) {
      this.getJokes();
    }
  }

  async getJokes() {
    try {
      let jokes = this.state.jokes;
      let seenJokes = new Set(jokes.map(j => j.id));

      while (jokes.length < this.props.numJokesToGet) {
        let res = await axios.get("https://icanhazdadjoke.com", {
          headers: { Accept: "application/json" }
        });
        let { status, ...joke } = res.data;

        if (!seenJokes.has(joke.id)) {
          seenJokes.add(joke.id);
          jokes.push({ ...joke, votes: 0 });
        } else {
          console.log("duplicate found!");
        }
      }

      this.setState({ jokes });
    } catch (e) {
      console.log(e);
    }
  }

  generateNewJokes() {
    this.setState([]);
  }

  vote(id, delta) {
    this.setState(st => ({
      jokes: st.jokes.map(j =>
        j.id === id ? { ...j, votes: j.votes + delta } : j
      )
    }));
  }

  render() {
    let sortedJokes = [...this.state.jokes].sort((a, b) => b.votes - a.votes);

    return (
      <div className="JokeList">
        <button
          className="JokeList-getmore"
          onClick={this.generateNewJokes}
        >
          Get New Jokes
        </button>

        {sortedJokes.map(j => (
          <Joke
            text={j.joke}
            key={j.id}
            id={j.id}
            votes={j.votes}
            vote={this.vote}
          />
        ))}

        {sortedJokes.length < this.props.numJokesToGet ? (
          <div className="loading">
            <i className="fas fa-4x fa-spinner fa-spin" />
          </div>
        ) : null}
      </div>
    );
  }
}
export default JokeList;
