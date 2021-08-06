/*
   ✅ <Router /> didMount => path populated
   ✅ <Router /> render => passes state to Routes
   ✅ <Route /> didMount => Update state with matched, search, hash, and params
   ✅ <Route /> render => check if theres a match
 */
type state = {
  path: string,
  search: string,
  hash: string,
  params: Js.Dict.t(string),
  unlisten: (. unit) => unit,
};

type actions = {
  push: string => unit,
  replace: string => unit,
  updateMatch: (string, string, Js.Dict.t(string)) => unit,
};

type history = {
  state,
  actions,
};

type action =
  | Push(string)
  | Replace(string)
  | Go(int)
  | GoBack
  | GoForward
  | UpdatePath(string)
  | UpdateMatch(string, string, Js.Dict.t(string))
  | SetUnlisten((. unit) => unit);

// let component = ReasonReact.reducerComponent("Router");
[@react.component]
let make =
    (
      ~history: History.browserHistory=History.createBrowserHistory(),
      ~children,
    ) => {
  let initialState = {
    path: history##location##pathname,
    search: "",
    hash: "",
    params: Js.Dict.empty(),
    unlisten: (.) => (),
  };
  let (state, dispatch) =
    React.useReducer(
      (state, action) =>
        switch (action) {
        | Push(path) =>
          history##push(path);
          state;
        | Replace(path) =>
          history##replace(path);
          state;
        | Go(n) =>
          history##go(n);
          state;
        | GoBack =>
          history##goBack();
          state;
        | GoForward =>
          history##goForward();
          state;
        | UpdatePath(pathname) => {...state, path: pathname}
        | UpdateMatch(search, hash, params) => {
            ...state,
            search,
            hash,
            params,
          }
        | SetUnlisten(unsub) => {...state, unlisten: unsub}
        },
      initialState,
    );
  React.useEffect0(() => {
    let unsub =
      history##listen(location => {
        dispatch(UpdatePath(location##pathname));
        ();
      });
    Some(() => dispatch(SetUnlisten(unsub)));
  });
  // didMount: ({reduce}) => {
  //   let unsub =
  //     history##listen(
  //       (location) => {
  //         reduce((_e) => UpdatePath(location##pathname), ());
  //         ()
  //       }
  //     );
  //   reduce((_e) => SetUnlisten(unsub), ());
  //   ReasonReact.NoUpdate
  // },
  // willUnmount: (self) => [@bs] self.state.unlisten(),

  let history: history = {
    state,
    actions: {
      push: path => dispatch(Push(path)),
      replace: path => dispatch(Replace(path)),
      updateMatch: (search, hash, params) =>
        dispatch(UpdateMatch(search, hash, params)),
    },
  };
  (children[0])(history);
};
