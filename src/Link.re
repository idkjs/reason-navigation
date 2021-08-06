

let getLinkEventData = (event, history: Router.history, href: string, target: string) => {
  let modified =
    ReactEvent.Mouse.metaKey(event)
    || ReactEvent.Mouse.altKey(event)
    || ReactEvent.Mouse.ctrlKey(event)
    || ReactEvent.Mouse.shiftKey(event);
  switch (ReactEvent.Mouse.button(event), modified, target) {
  | (0, false, "") =>
    /* left click, no target */
    ReactEvent.Mouse.preventDefault(event);
    history.actions.push(href)
  | _ => ()
  }
};
[@react.component]
let make = (~history: Router.history, ~href: string, ~target: string="", ~style, ~children) => {

    <a href onClick=((ev) => getLinkEventData(ev, history, href, target)) style>
      (React.array(children))
    </a>
};
