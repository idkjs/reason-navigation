// let component = ReasonReact.statelessComponent("Route");
[@react.component]
let make = (~history: Router.history, ~path, ~render) => {
  React.useEffect0(()=>{
    switch (Match.matchPath(history.state.path, path)) {
    | Some((_url, pathsAndPatterns)) =>
      let {search, hash, params}: Match.t = Match.parseUrl(pathsAndPatterns);
      history.actions.updateMatch(search, hash, params)
    | None => ()
    };
    None
  });
    switch (Match.matchPath(history.state.path, path)) {
    | Some(_) => render()
    | None => React.null
    }
};
