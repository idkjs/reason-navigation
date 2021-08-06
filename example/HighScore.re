[@react.component]
let make = (~history) => {
  Js.log(history);
  <div>"HighScore"->React.string</div>
}
