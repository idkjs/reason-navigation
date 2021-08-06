
[@react.component]
let make:
  (~history: Router.history, ~path: string, ~render: unit => React.element, 'a) =>
  React.element;
