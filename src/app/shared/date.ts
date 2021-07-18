
export function getOffsetString() {
  const offset = new Date().getTimezoneOffset()/60;
  if (offset <= 0) {
    return "+" + (-offset).toString();
  } else {
    return "-" + offset.toString();
  }
}