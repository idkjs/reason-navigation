[@react.component]
let make = () => {
  <Router>
    ...{history =>
      <div>
        <h1> {React.string("Reason Router")} </h1>
        <Link history href="/game"> {React.string("GAME")} </Link>
        <Route history path="/" render={() => <Landing history />} />
        <Route history path="/game" render={() => <Canvas history />} />
        <Route
          history
          path="/re/:id"
          render={() => {
            switch (Match.getInt(history.state.params, "id")) {
            | Some(v) => Js.log(v)
            | None => Js.log("None")
            };
            <p> {React.string("Query params!")} </p>;
          }}
        />
        <Route
          history
          path="/highscores"
          render={() => <HighScore history />}
        />
      </div>
    }
  </Router>;
};
