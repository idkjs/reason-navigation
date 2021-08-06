 [@react.component]
let make:
  (
    ~history: Router.history,
    ~href: string,
    ~target: string=?,
    ~style: ReactDOMRe.style,
    ~children:array(React.element)
  ) =>React.element;
